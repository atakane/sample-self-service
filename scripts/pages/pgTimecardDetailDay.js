/* globals oProfile oTimecardList fontAwesome dayWorkHoursStart dayWorkHoursEnd */

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const merge = require('deepmerge');
const colors = require('./style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const headerBarOptions2 = require("./headerbar/pgTimecardDetailDay.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgTimecardDetailDay = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgTimecardDetailDay',
                onKeyPress: pgTimecardDetailDay_onKeyPress,
                onShow: pgTimecardDetailDay_onShow,
                fillColor: colors.GrayLighter
            },
            "", {
                targetTimecardID: 0,
                oRequest: [],
                targetDate: null,
                isMe: false
            });
        var self = this;
        var arrayRequests = [];

        var headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);
        var headerBarWrapper2 = HeaderBarWrapper(this._view, headerBarOptions2.options);

        // Creating a repeatbox to show our requests
        // styling the repeater
        // We used a different way here beacause of the by-design nature of repeater component
        var rptDefault = {
            name: 'rptTimecardDetailDays',
            onSelectedItem: function(e) {
                // router.go('pgTimecardDetailDay', arrayRequests[e.rowIndex]);
            },
            enableScroll: false,
            touchEnabled: false
        };
        var rptParams = {};
        componentStyler(".Generic.repeater .pgNewTimeCard.repeater .Generic.itemTemplate5items")(rptParams);
        rptParams = merge.all([rptParams, rptDefault]);

        var rptTimecardDetailDays = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate5items")(paramItemTemplate);

        rptTimecardDetailDays.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptTimecardDetailDays.itemTemplate.height = paramItemTemplate.height;

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
        rptTimecardDetailDays.top = myRectangle1.top + 1;

        // item 
        rptTimecardDetailDays.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptTimecardDetailDays.activeItemTemplate.height = paramActiveItemTemplate.height;

        var lblDayofWeek = new SMF.UI.Label({
            name: 'lblDayofWeek',
            text: '-',
        });
        componentStyler(".textLeft .12pt .pgNewTimeCard.lblDayofWeek")(lblDayofWeek);

        var lblLocation = new SMF.UI.Label({
            name: 'lblLocation',
            text: '-'
        });
        componentStyler(".textRight .5pt .pgNewTimeCard.lblDate .pgNewTimeCard.lblLocation")(lblLocation);

        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine5items")(recHorizontalLine);

        rptTimecardDetailDays.itemTemplate.add(lblDayofWeek);
        rptTimecardDetailDays.itemTemplate.add(lblLocation);

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

            rptTimecardDetailDays.itemTemplate.add(cntHour);
            rptTimecardDetailDays.itemTemplate.add(lblHour);
            lastPos = lastPos + hourGap + hourWidth;
        }

        // rptTimecardDetailDays.itemTemplate.add(recHorizontalLine);

        // rptTimecardDetailDays.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        // row.controls[0] -> Day of week
        // row.controls[1] -> Location
        // row.controls[2] -> Hour 0 box
        // row.controls[3] -> Hour 0 text
        // row.controls[4] -> Hour 1 box
        // row.controls[5] -> Hour 1 text
        // row.controls[(i*2)+2] -> Hour i box

        rptTimecardDetailDays.onRowRender = function(e) {
            // {
            //  "date": "1/3/17",
            //  "hours": [],
            //  "location" : ""
            // }
            var myDaysArray = arrayRequests[e.rowIndex];
            var tmpDate = new Date(myDaysArray.date);
            var location = (myDaysArray.logs) ? (myDaysArray.logs.length != 0) ? myDaysArray.logs[0].location : '' : '';

            this.controls[0].text = tmpDate.format('dddd');
            this.controls[1].text = location;

            for (var i = 0; i < 24; i++) {
                this.controls[(i * 2) + 2].fillColor = SMF.UI.Color.WHITE;

                if (myDaysArray.hours.indexOf(i) !== -1) {
                    var fillColor = ((i < dayWorkHoursStart) || (i > dayWorkHoursEnd - 1)) ? SMF.UI.Color.RED : colors.BlueMedium;
                    this.controls[(i * 2) + 2].fillColor = fillColor;
                }
            }
        };



        // adding repeatbox to the page
        this.add(rptTimecardDetailDays);

        // adding label for no-data
        this.lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: lang['pgMyLeaveRequests.lblNoData.text']
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(this.lblNoData);
        this.add(this.lblNoData);

        // WorkLog area
        // work logs container
        var cntWorkLog = new SMF.UI.Container({
            name: 'cntWorkLog'
        })
        componentStyler(".pgNewTimeCard.cntWorkLog")(cntWorkLog);
        this.add(cntWorkLog);

        var lblWorkLog = new SMF.UI.Label({
            name: 'lblWorkLog',
            text: 'Work Log'
        });
        componentStyler(".textLeft .10pt .pgNewTimeCard.lblDayofWeek .pgNewTimeCard.lblWorkLog")(lblWorkLog);
        cntWorkLog.add(lblWorkLog);

        // Creating a repeatbox to show our day details
        // styling the repeater
        // We used a different way here beacause of the by-design nature of repeater component
        var rptWorkLogDefault = {
            name: 'rptWorkLog',
            onSelectedItem: function(e) {
                // router.go('pgTimecardDetailDay', arrayRequests[e.rowIndex]);
            },
            top: "10%",
            height: "90%"
        };
        var rptWorkLogParams = {};
        componentStyler(".Generic.repeater")(rptParams);
        rptWorkLogParams = merge.all([rptParams, rptWorkLogDefault]);

        var rptWorkLog = new SMF.UI.RepeatBox(rptWorkLogParams);

        // styling repeater item templates
        var paramWorkLogItemTemplate = {};
        componentStyler(".pgNewTimeCard.rptWorkLogItem")(paramWorkLogItemTemplate);
        rptWorkLog.itemTemplate.fillColor = paramWorkLogItemTemplate.fillColor;
        // repeater's height is dynamic by design. Because of this we're calculating rowHeight from parent object which is cntWorkLog
        // rptWorkLogDefault's height is 90% of cntWorkLog 
        // We want to show 2 item at a time
        rptWorkLog.itemTemplate.height = (cntWorkLog.height * 0.9) / 2

        var lblWorkLogTotalHour = new SMF.UI.Label({
            name: 'lblWorkLogTotalHour',
            text: ''
        });
        componentStyler(".textLeft .12pt .pgNewTimeCard.lblWorkLogTotalHour")(lblWorkLogTotalHour);

        var lblWorkLogStartEndHours = new SMF.UI.Label({
            name: 'lblWorkLogStartEndHours',
            text: ''
        });
        componentStyler(".textRight .5pt .bold .pgNewTimeCard.lblWorkLogStartEndHours")(lblWorkLogStartEndHours);

        var lblWorkLogLocation = new SMF.UI.Label({
            name: 'lblWorkLogTotalHour',
            text: ''
        });
        componentStyler(".textLeft .5pt .bold .pgNewTimeCard.lblWorkLogLocation")(lblWorkLogLocation);

        // Textbox for WorkLog
        var txtWorkLog = new SMF.UI.Label({
            name: 'txtWorkLog',
            text: ''
        });
        componentStyler(".6pt .Generic.txtDisabled .pgOutOfOffice.txtOutOfOfficeMessage .pgNewTimeCard.txtWorkLog")(txtWorkLog);

        var rptWorkLogItemHorizontalLine = new SMF.UI.Rectangle({
            name: 'rptWorkLogItemHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine .pgNewTimeCard.rptWorkLogItemHorizontalLine")(rptWorkLogItemHorizontalLine);

        rptWorkLog.itemTemplate.add(lblWorkLogTotalHour);
        rptWorkLog.itemTemplate.add(lblWorkLogStartEndHours);
        rptWorkLog.itemTemplate.add(lblWorkLogLocation);
        rptWorkLog.itemTemplate.add(txtWorkLog);
        rptWorkLog.itemTemplate.add(rptWorkLogItemHorizontalLine);

        rptWorkLog.onRowRender = function(e) {
            //     "logs": [{
            //         "hours": [9, 10, 11],
            //         "location": "The Bike Company Inc., Palo Alto",
            //         "log": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."
            //     }, {
            //         "hours": [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            //         "location": "The Chip Company Company Inc., Santa Clara",
            //         "log": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."
            //     }]

            var myHoursArray = arrayRequests[0].logs[e.rowIndex].hours;
            var startHour = myHoursArray[0];
            var endHour = myHoursArray[myHoursArray.length - 1];

            var logHours = myHoursArray.length
            this.controls[0].text = (logHours < 3) ? logHours + ' hour' : logHours + ' hours';
            this.controls[1].text = ('{0}:00 - {1}:00').format(startHour, endHour);
            this.controls[2].text = arrayRequests[0].logs[e.rowIndex].location;
            this.controls[3].text = arrayRequests[0].logs[e.rowIndex].log;
        };



        cntWorkLog.add(rptWorkLog);

        // Reject Button
        // FontAwesome 'close icon' UTF8 code: uf00d
        // TODO: height will be moved to style file after styler-fix
        var btnReject = new SMF.UI.TextButton({
            name: 'btnReject',
            font: fontAwesome,
            height: '9.5952%',
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to reject this timecard? This action will set whole-week\'s status as rejected not only this-day\'s.',
                    firstButtonText: 'Reject',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {

                        // finding related item and setting status
                        for (var i = 0; i < oTimecardList.length; i++) {
                            if (oTimecardList[i].ID === self.getState().targetTimecardID) {
                                oTimecardList[i].Status = 'rejected';
                            }
                        }

                        alert({
                            title: 'Timecard rejected',
                            message: 'Timecard is rejected and timecard-owner has been notified',
                            firstButtonText: 'OK',
                            onFirstButtonPressed: function() {
                                router.back();
                            }
                        });
                    },
                    onSecondButtonPressed: function() {}
                });
            }
        });
        componentStyler(".12pt .pgApproveLeaveRequest.btnReject")(btnReject);
        this.add(btnReject);

        // Save button
        // FontAwesome 'check icon' UTF8 code: uf00c
        // TODO: height will be moved to style file after styler-fix
        var btnSave = new SMF.UI.TextButton({
            name: 'btnSave',
            font: fontAwesome,
            height: '9.5952%',
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to approve this timecard? This action will set whole-week\'s status as approved not only this-day\'s.',
                    firstButtonText: 'Approve',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {

                        // finding related item and setting status
                        for (var i = 0; i < oTimecardList.length; i++) {
                            if (oTimecardList[i].ID === self.getState().targetTimecardID) {
                                oTimecardList[i].Status = 'approved';
                            }
                        }

                        alert({
                            title: 'Timecard approved',
                            message: 'Timecard is approved and timecard-owner has been notified',
                            firstButtonText: 'OK',
                            onFirstButtonPressed: function() {
                                router.back();
                            }
                        });

                    },
                    onSecondButtonPressed: function() {}
                });
            }
        });
        componentStyler(".12pt .pgApproveLeaveRequest.btnSave")(btnSave);
        this.add(btnSave);

        this.hideAdminButtons = function() {
            btnReject.visible = false;
            btnSave.visible = false;
            componentStyler(".pgNewTimeCard.cntWorkLog .pgNewTimeCard.cntWorkLogWithoutAdminButtons")(cntWorkLog);
            rptWorkLog.itemTemplate.height = (cntWorkLog.height * 0.9) / 2
        };

        this.showAdminButtons = function() {
            btnReject.visible = true;
            btnSave.visible = true;
            componentStyler(".pgNewTimeCard.cntWorkLog")(cntWorkLog);
            rptWorkLog.itemTemplate.height = (cntWorkLog.height * 0.9) / 2
        };

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgTimecardDetailDay_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgTimecardDetailDay_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            if (self.getState().isMe) {
                self.hideAdminButtons();
                headerBarOptions2.setTitle('My Day');
                headerBarWrapper2.reload();

                headerBarOptions2.eventCallback(function(e) {
                    if (e.type == "back") {
                        router.back();
                    }
                    if (e.type == "add") {
                        // router.go('pgTimecardAddHour');
                        router.go('pgTimecardDetailDayAddEdit', {
                            'id': self.getState().targetTimecardID,
                            'request': self.getState().oRequest,
                            'date': self.getState().targetDate
                        });
                    }
                });
            }
            else {
                self.showAdminButtons();
                headerBarOptions.setTitle('Day in Detail');
                headerBarWrapper.reload();

                headerBarOptions.eventCallback(function(e) {
                    if (e.type == "back") {
                        router.back();
                    }
                });
            }

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgTimecardDetailDay_onShow');
            tinyUtils.fixOverlayBug();
        }

        // Parsing storage objects 
        this.displayData = function(oRequest, targetDate) {
            //resetting repeatboxes
            rptTimecardDetailDays.dataSource = [];
            rptTimecardDetailDays.refresh();

            rptWorkLog.dataSource = [];
            rptWorkLog.refresh();

            // binding objects to an array
            arrayRequests = [];

            for (var i = 0; i < oRequest.days.length; i++) {
                if (oRequest.days[i].date === self.getState().targetDate) {
                    arrayRequests.push(oRequest.days[i]);
                }
            }

            // Updating Day details
            var cardDate = new Date(targetDate);
            lblStartEndDate.text = cardDate.format('MMM. d, yyyy');

            lblWeekTotalHours.text = (arrayRequests[0].hours.length > 0) ? arrayRequests[0].hours.length + ' hours' : '';
            getStatusText(oRequest.Status, lblStatus);

            imgAvatar.image = oRequest.Avatar;
            lblFullName.text = oRequest.FullName;
            lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;

            // Preparing 1st repeater will show only selected day
            rptTimecardDetailDays.closePullItems();
            rptTimecardDetailDays.dataSource = arrayRequests;
            rptTimecardDetailDays.refresh();

            rptWorkLog.closePullItems();
            rptWorkLog.dataSource = arrayRequests[0].logs;
            rptWorkLog.refresh();

            Dialog.removeWait();

            this.lblNoData.visible = (oRequest.length == 0);
            rptTimecardDetailDays.visible = !(oRequest.length == 0);
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
                    oRequest: params.request,
                    targetDate: params.date,
                    isMe: (oProfile.EmployeeID === params.request.EmployeeID)
                });
            }
        };
        _proto.stateChangedHandler = function(state) {
            this.displayData(state.oRequest, state.targetDate);
        };
    });

module.exports = pgTimecardDetailDay;
