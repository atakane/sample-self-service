/* globals*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const merge = require('deepmerge');
const colors = require('./style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgApprovalWorklistTimecardDetail = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgApprovalWorklistTimecardDetail',
                onKeyPress: pgApprovalWorklistTimecardDetail_onKeyPress,
                onShow: pgApprovalWorklistTimecardDetail_onShow,
                fillColor: colors.GrayLighter
            },
            "", {
                targetTimecardID: 0,
                oTimecard: []
            });
        var self = this;

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating a repeatbox to show our requests
        // styling the repeater
        // We used a different way here beacause of the by-design nature of repeater component
        var rptDefault = {
            name: 'rptApprovalList',
            onSelectedItem: function(e) {
                // router.go('pgMyTimecardDetail', arrayRequests[e.rowIndex]);
            }
        };
        var rptParams = {};
        componentStyler(".Generic.repeater .pgNewTimeCard.repeater")(rptParams);
        rptParams = merge.all([rptDefault, rptParams]);

        var rptTimecardDays = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate5items")(paramItemTemplate);

        rptTimecardDays.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptTimecardDays.itemTemplate.height = paramItemTemplate.height;

        var paramActiveItemTemplate = {};
        componentStyler(".Generic.activeItemTemplate")(paramActiveItemTemplate);

        // Profile Section
        // Profile Image
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
        });
        componentStyler(".pgOutOfOffice.imgAvatar")(imgAvatar);
        this.add(imgAvatar);

        // FullName & Role
        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName'
        });
        componentStyler(".textLeft .12pt .pgOutOfOffice.lblFullName")(lblFullName);
        this.add(lblFullName);

        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole'
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblTeamRole")(lblTeamRole);
        this.add(lblTeamRole);

        var lblStartEndDate = new SMF.UI.Label({
            name: 'lblStartEndDate'
        });
        componentStyler(".textRight .10pt .pgNewTimeCard.lblStartEndDate")(lblStartEndDate);
        this.add(lblStartEndDate);

        var lblWeekTotalHours = new SMF.UI.Label({
            name: 'lblWeekTotalHours'
        });
        componentStyler(".textRight .12pt .pgNewTimeCard.lblWeekTotalHours")(lblWeekTotalHours);
        this.add(lblWeekTotalHours);

        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .Generic.horizontalLine .pgApproveLeaveRequest.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);
        rptTimecardDays.top = myRectangle1.top + 1;

        // item 
        rptTimecardDays.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptTimecardDays.activeItemTemplate.height = paramActiveItemTemplate.height;
        var lblDayofWeek = new SMF.UI.Label({
            name: 'lblDayofWeek',
            text: '-',
        });
        componentStyler(".textLeft .12pt .pgNewTimeCard.lblDayofWeek")(lblDayofWeek);

        var lblDate = new SMF.UI.Label({
            name: 'lblDate',
            text: '-',
        });
        componentStyler(".textRight .5pt .pgNewTimeCard.lblDate")(lblDate);

        var lblDayTotalHours = new SMF.UI.Label({
            name: 'lblDayTotalHours',
            text: '',
        });
        componentStyler(".textRight .6pt .pgNewTimeCard.lblDayTotalHours")(lblDayTotalHours);

        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine5items")(recHorizontalLine);

        rptTimecardDays.itemTemplate.add(lblDayofWeek);
        rptTimecardDays.itemTemplate.add(lblDate);
        rptTimecardDays.itemTemplate.add(lblDayTotalHours);

        // we'll not use styler for "days", it is a little bit of design issue
        var hourWidth = 14;
        var hourGap = 1;
        var lastPos = 8;

        var unitType = (Device.deviceOS === 'Android') ? 'dp' : 'pt';

        for (var i = 0; i < 24; i++) {
            var cntHour = new SMF.UI.Rectangle({
                name: 'cntHour' + i,
                left: lastPos + unitType,
                top: '48%',
                width: hourWidth + unitType,
                height: '35%',
                borderWidth: 1,
                fillColor: SMF.UI.Color.WHITE,
                backgroundTransparent: false,
                roundedEdge: 0,
                borderColor: colors.GrayLight
            });
            var lblHour = new SMF.UI.Label({
                name: 'lblHour' + i,
                left: lastPos + unitType,
                top: '87%',
                width: hourWidth + unitType,
                height: '10%',
                text: i
            });
            componentStyler(".textLeft .5pt")(lblHour);

            rptTimecardDays.itemTemplate.add(cntHour);
            rptTimecardDays.itemTemplate.add(lblHour);
            lastPos = lastPos + hourGap + hourWidth;
        }

        rptTimecardDays.itemTemplate.add(recHorizontalLine);

        rptTimecardDays.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        // row.controls[0] -> Day of week
        // row.controls[1] -> Date
        // row.controls[2] -> Hour 0 box
        // row.controls[3] -> Hour 0 text
        // row.controls[4] -> Hour 1 box
        // row.controls[5] -> Hour 1 text
        // row.controls[(i*2)+2] -> Hour i box

        var totalHoursWeek = 0;
        rptTimecardDays.onRowRender = function(e) {
            // {
            // "days": [{
            //  "date": "1/3/17",
            //  "hours": []
            //  }]
            // }
            var myDaysArray = self.getState().oRequest.days[e.rowIndex];
            var tmpDate = new Date(myDaysArray.date);

            this.controls[0].text = tmpDate.format('dddd');
            this.controls[1].text = tmpDate.format('MMM. d, yyyy');

            for (var i = 0; i < 24; i++) {
                this.controls[(i * 2) + 3].fillColor = SMF.UI.Color.WHITE;
                
                if (myDaysArray.hours.indexOf(i) !== -1) {
                    var fillColor = ((i < dayWorkHoursStart) || (i > dayWorkHoursEnd - 1)) ? SMF.UI.Color.RED : colors.BlueMedium;
                    this.controls[(i * 2) + 3].fillColor = fillColor;

                    totalHoursWeek++;
                }

            }
            this.controls[2].text =  (myDaysArray.hours.length > 0) ? myDaysArray.hours.length + ' hours' : '';

            if (e.rowIndex == self.getState().oRequest.days.length - 1) {
                lblWeekTotalHours.text = (totalHoursWeek > 0) ? totalHoursWeek + ' hours' : '';
            }
        };

        // adding repeatbox to the page
        this.add(rptTimecardDays);


        // adding label for no-data
        this.lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: lang['pgMyLeaveRequests.lblNoData.text']
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(this.lblNoData);
        this.add(this.lblNoData);

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgApprovalWorklistTimecardDetail_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgApprovalWorklistTimecardDetail_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('Week in Detail');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "back") {
                    router.back();
                }
                if (e.type == "add") {
                    router.go('pgNewTimecard');
                }
            });

            // displayTimecardDays.call(this);

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgMyTimecardDetail_onShow');
            tinyUtils.fixOverlayBug();
        }

        // this.createDayHours = function(parent) {
        //     var hourWidth = 4.16
        //     for (var i = 0; i < 24; i++) {
        //         var cntHour = new SMF.UI.Rectangle({
        //             name: 'cntHour' + i,
        //             left: (hourWidth * i) + '%',
        //             top: '45%',
        //             width: hourWidth + '%',
        //             height: '50%',
        //             borderWidth: 1,
        //             fillColor: SMF.UI.Color.WHITE,
        //             backgroundTransparent: false,
        //             roundedEdge: 0
        //         });
        //         parent.add(cntHour)
        //     }

        // }

        // Parsing storage objects 
        this.displayTimecardDays = function(oRequest) {

            // Updating logged in user's info on the this page's slider drawer
            var textTimeCardDate

            var startDate = new Date(oRequest.StartDate);
            var endDate = new Date(oRequest.EndDate);

            var tmp1 = "";
            if (startDate.format('MMM') != endDate.format('MMM')) tmp1 = endDate.format(' MMM');

            textTimeCardDate = ('{0} - {1}{2}').format(startDate.format('MMM. d'), tmp1, endDate.format('d, yyyy'));

            lblStartEndDate.text = textTimeCardDate;
            imgAvatar.image = oRequest.Avatar;
            lblFullName.text = oRequest.FullName;
            lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;

            // binding objects array
            rptTimecardDays.closePullItems();
            rptTimecardDays.dataSource = oRequest.days;
            rptTimecardDays.refresh();
            Dialog.removeWait();

            this.lblNoData.visible = (oRequest.length == 0);
            rptTimecardDays.visible = !(oRequest.length == 0);
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function(params) {
            // inherited from UIComponent
            if (params) {
                this._changeState({
                    targetTimecardID: params.id,
                    oRequest: params.request
                });
            }
        };
        _proto.stateChangedHandler = function(state) {
            this.displayTimecardDays(state.oRequest)
        };
    });

module.exports = pgApprovalWorklistTimecardDetail;
