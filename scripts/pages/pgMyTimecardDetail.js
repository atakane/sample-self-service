/* globals*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
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

const pgMyTimecardDetail = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgMyTimecardDetail',
                onKeyPress: pgMyTimecardDetail_onKeyPress,
                onShow: pgMyTimecardDetail_onShow,
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
        // rptTimecardDays.top:''

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate")(paramItemTemplate);

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
        var lblTimeCardDate = new SMF.UI.Label({
            name: 'lblTimeCardDate',
            text: '-'
        });
        componentStyler(".textRight .12pt .pgNewTimeCard.lblTimeCardDate")(lblTimeCardDate);
        this.add(lblTimeCardDate);

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

        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine")(recHorizontalLine);

        rptTimecardDays.itemTemplate.add(lblDayofWeek);
        rptTimecardDays.itemTemplate.add(lblDate);
        rptTimecardDays.itemTemplate.add(recHorizontalLine);

        // activeItemTemplate
        var lblDayofWeek2 = lblDayofWeek.clone();
        var lblDate2 = lblDate.clone();
        var recHorizontalLine2 = recHorizontalLine.clone();

        rptTimecardDays.activeItemTemplate.add(lblDayofWeek2);
        rptTimecardDays.activeItemTemplate.add(lblDate2);
        rptTimecardDays.activeItemTemplate.add(recHorizontalLine2);

        rptTimecardDays.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        rptTimecardDays.onRowRender = function(e) {
            // {
            // "days": [{
            //  "date": "1/3/17",
            //  "hours": []
            //  }]
            // }

            var tmpDate = new Date(self.getState().oRequest.days[e.rowIndex].date);

            this.controls[0].text = tmpDate.format('dddd');
            this.controls[1].text = tmpDate.format('MMM. d yyyy');

            this.controls[3].text = tmpDate.format('dddd');
            this.controls[4].text = tmpDate.format('MMM. d, yyyy');;
        };

        // adding repeatbox to the page
        this.add(rptTimecardDays);

        // If you want, you can add some legend here
        // createLabel(pgMyLeaveRequests, 'lblLegend', 'W: Waiting\nA: Approved\nR: Rejected', '5%', '0%', '90%', '10%', SMF.UI.TextAlignment.LEFT, true, '5pt', false, colors.Gray);

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
        function pgMyTimecardDetail_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgMyTimecardDetail_onShow() {
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


        // Parsing storage objects 
        this.displayTimecardDays = function(oRequest) {

            // Updating logged in user's info on the this page's slider drawer
            var textTimeCardDate
            
            var startDate = new Date(oRequest.StartDate);
            var endDate = new Date(oRequest.EndDate);

            var tmp1 = "";
            if (startDate.format('MMM') != endDate.format('MMM')) tmp1 = endDate.format(' MMM');
            
            textTimeCardDate = ('{0} - {1}{2}').format(startDate.format('MMM. d'), tmp1, endDate.format('d, yyyy'));
            
            lblTimeCardDate.text = textTimeCardDate;
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
            console.log(JSON.prune(state));
            this.displayTimecardDays(state.oRequest)
        };
    });

module.exports = pgMyTimecardDetail;
