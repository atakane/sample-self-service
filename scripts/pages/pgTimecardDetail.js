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

const pgTimecardDetail = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgTimecardDetail',
                onKeyPress: pgTimecardDetail_onKeyPress,
                onShow: pgTimecardDetail_onShow,
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
            name: 'rptTimecardDetail',
            onSelectedItem: function(e) {
                router.go('pgTimecardDetailDay', {
                    'id': self.getState().oRequest.ID,
                    'request': self.getState().oRequest,
                    'date': self.getState().oRequest.days[e.rowIndex].date
                });

            }
        };
        var rptParams = {};
        componentStyler(".Generic.repeater .pgNewTimeCard.repeater")(rptParams);
        rptParams = merge.all([rptDefault, rptParams]);

        var rptTimecardDetail = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate5items")(paramItemTemplate);

        rptTimecardDetail.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptTimecardDetail.itemTemplate.height = paramItemTemplate.height;

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
            name: 'lblStartEndDate',
            text: ''
        });
        componentStyler(".textRight .10pt .pgNewTimeCard.lblStartEndDate")(lblStartEndDate);
        this.add(lblStartEndDate);

        var lblWeekTotalHours = new SMF.UI.Label({
            name: 'lblWeekTotalHours',
            text: ''
        });
        componentStyler(".textRight .16pt .pgNewTimeCard.lblWeekTotalHours")(lblWeekTotalHours);
        this.add(lblWeekTotalHours);

        var lblStatus = new SMF.UI.Label({
            name: 'lblStatus'
        });
        componentStyler(".textRight .7pt .pgNewTimeCard.lblStatus")(lblStatus);
        this.add(lblStatus);

        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .Generic.horizontalLine .pgApproveLeaveRequest.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);
        rptTimecardDetail.top = myRectangle1.top + 1;

        // item 
        rptTimecardDetail.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptTimecardDetail.activeItemTemplate.height = paramActiveItemTemplate.height;
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

        rptTimecardDetail.itemTemplate.add(lblDayofWeek);
        rptTimecardDetail.itemTemplate.add(lblDate);
        rptTimecardDetail.itemTemplate.add(lblDayTotalHours);

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

            rptTimecardDetail.itemTemplate.add(cntHour);
            rptTimecardDetail.itemTemplate.add(lblHour);
            lastPos = lastPos + hourGap + hourWidth;
        }

        rptTimecardDetail.itemTemplate.add(recHorizontalLine);

        rptTimecardDetail.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        // row.controls[0] -> Day of week
        // row.controls[1] -> Date
        // row.controls[2] -> Week total
        // row.controls[3] -> Hour 0 box
        // row.controls[4] -> Hour 0 text
        // row.controls[5] -> Hour 1 box
        // row.controls[6] -> Hour 1 text
        // row.controls[(i*2)+3] -> Hour i box

        rptTimecardDetail.onRowRender = function(e) {
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

                }

            }
            this.controls[2].text = (myDaysArray.hours.length > 0) ? myDaysArray.hours.length + ' hours' : '';
        };



        // adding repeatbox to the page
        this.add(rptTimecardDetail);


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
        function pgTimecardDetail_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgTimecardDetail_onShow() {

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


            displayTimecardDays.call(this, self.getState().oRequest);

            getStatusText(self.getState().oRequest.Status, lblStatus);

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgTimecardDetail_onShow');
            tinyUtils.fixOverlayBug();
        }

        // Parsing storage objects 
        function displayTimecardDays(oRequest) {

            rptTimecardDetail.dataSource = [];
            rptTimecardDetail.refresh();
            lblWeekTotalHours.text = '';

            // Updating logged in user's info on the this page's slider drawer
            var textTimeCardDate

            var startDate = new Date(oRequest.StartDate);
            var endDate = new Date(oRequest.EndDate);

            var tmp1 = "";
            if (startDate.format('MMM') != endDate.format('MMM')) tmp1 = endDate.format(' MMM');

            textTimeCardDate = ('{0} - {1}{2}').format(startDate.format('MMM. d'), tmp1, endDate.format('d, yyyy'));

            lblStartEndDate.text = textTimeCardDate;
            lblWeekTotalHours.text = (oRequest.TotalHours > 0) ? oRequest.TotalHours + ' hours' : '';
            // getStatusText(oRequest.Status, lblStatus);

            imgAvatar.image = oRequest.Avatar;
            lblFullName.text = oRequest.FullName;
            lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;


            // binding objects array
            rptTimecardDetail.closePullItems();
            rptTimecardDetail.dataSource = oRequest.days;
            rptTimecardDetail.refresh();
            Dialog.removeWait();

            this.lblNoData.visible = (oRequest.length == 0);
            rptTimecardDetail.visible = !(oRequest.length == 0);
        }

        function getStatusText(status, statusObject) {
            // for mock system status may be used as string, 
            // this switch written here to prevent further problems. 
            // if your EBS installation's status type are different, you may just change below lines to match your configuration.
            switch (status.toUpperCase()) {
                case 'PENDING':
                    statusObject.text = 'pending for approval';
                    statusObject.fontColor = colors.BlueMedium;
                    break;
                case 'APPROVED':
                    statusObject.text = status.toLowerCase();
                    statusObject.fontColor = colors.GreenDarker;
                    break;
                case 'REJECTED':
                    statusObject.text = status.toLowerCase();
                    statusObject.fontColor = colors.RedDark;
                    break;
                case 'NEW':
                    statusObject.text = 'new - add a work log';
                    statusObject.fontColor = SMF.UI.Color.RED
                    break;
            }
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
            // this.displayTimecardDays(state.oRequest)
        };
    });

module.exports = pgTimecardDetail;