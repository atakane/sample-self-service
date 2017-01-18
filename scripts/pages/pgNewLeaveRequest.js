/* globals smfOracle oTimeTable oProfile oRequestList lunchBreakDuration fontAwesome*/

/*
TODO:
- use Router options to pass oRequest
*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const colors = require('pages/style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgNewLeaveRequest = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgNewLeaveRequest',
            onKeyPress: pgNewLeaveRequest_onKeyPress,
            onShow: pgNewLeaveRequest_onShow
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var leaveTypeSelectedIndex;
        var timeUnitSelectedIndex;

        var selectedStartDate;
        var selectedEndDate;

        // Vacation metrics
        var cntVacationBoxes = new SMF.UI.Container({
            name: 'cntVacationBoxes'
        });
        componentStyler(".Generic.cntLittleBoxes")(cntVacationBoxes);
        this.add(cntVacationBoxes);

        createVacationBoxes.call(this, cntVacationBoxes);

        // Lines
        var imgShadowLine = new SMF.UI.Image({});
        componentStyler(".pgNewLeaveRequest.imgShadowLine")(imgShadowLine);
        this.add(imgShadowLine);

        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgNewLeaveRequest.horizontalRectangle .pgNewLeaveRequest.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);

        var myRectangle2 = new SMF.UI.Rectangle({});
        componentStyler(".pgNewLeaveRequest.horizontalRectangle .pgNewLeaveRequest.myRectangle2Top")(myRectangle2);
        this.add(myRectangle2);

        // Request Details
        // FontAwesome 'Down arrow' UTF8 code: uf107
        var lblLeaveTypeText = new SMF.UI.Label({
            name: 'lblLeaveTypeText',
            text: lang['pgNewLeaveRequest.lblLeaveTypeText.text']
        });
        componentStyler(".textLeft .7pt .pgNewLeaveRequest.lblLeaveTypeText")(lblLeaveTypeText);
        this.add(lblLeaveTypeText);

        var lblDown1 = new SMF.UI.Label({
            text: JSON.parse('""'),
            font: fontAwesome
        });
        componentStyler(".textLeft .7pt .pgNewLeaveRequest.lblLeaveTypeText .pgNewLeaveRequest.lblDown1")(lblDown1);
        this.add(lblDown1);

        var lblTimeUnitText = new SMF.UI.Label({
            name: 'lblTimeUnitText',
            text: lang['pgNewLeaveRequest.lblTimeUnitText.text']
        });
        componentStyler(".textRight .7pt .pgNewLeaveRequest.lblLeaveTypeText .pgNewLeaveRequest.lblTimeUnitText")(lblTimeUnitText);
        this.add(lblTimeUnitText);

        var lblDown2 = lblDown1.clone();
        componentStyler(".textRight .7pt .pgNewLeaveRequest.lblLeaveTypeText .pgNewLeaveRequest.lblDown2")(lblDown2);
        this.add(lblDown2);

        var lblLeaveType = new SMF.UI.Label({
            name: 'lblLeaveType',
            text: lang['pgNewLeaveRequest.lblLeaveType.text'],
            touchEnabled: true,
            onTouchEnded: pickLeaveType
        });
        componentStyler(".textLeft .10pt .pgNewLeaveRequest.lblLeaveType")(lblLeaveType);
        this.add(lblLeaveType);


        var lblTimeUnit = new SMF.UI.Label({
            name: 'lblTimeUnit',
            text: lang['pgNewLeaveRequest.lblTimeUnit.text'],
            touchEnabled: true,
            onTouchEnded: pickTimeUnit
        });
        componentStyler(".textRight .10pt .pgNewLeaveRequest.lblLeaveType .pgNewLeaveRequest.lblTimeUnit")(lblTimeUnit);
        this.add(lblTimeUnit);

        // Start Date
        var cntStarts = new SMF.UI.Container({
            name: 'cntStarts'
        });
        componentStyler(".pgNewLeaveRequest.cntStarts")(cntStarts);

        var lblStart = new SMF.UI.Label({
            name: 'lblStart',
            text: lang['pgOutOfOffice.lblStart.text']
        });
        componentStyler(".textLeft .7pt .pgNewLeaveRequest.lblStart")(lblStart);
        cntStarts.add(lblStart);

        var lblDown3 = lblDown1.clone();
        componentStyler(".textLeft .7pt .pgNewLeaveRequest.lblStart .pgNewLeaveRequest.lblDown3")(lblDown3);
        cntStarts.add(lblDown3);

        var lblStartDate = new SMF.UI.Label({
            name: 'lblStartDate',
            text: '-',
            touchEnabled: true,
            onTouchEnded: function() {
                showDateTimePicker(true);
            }
        });
        componentStyler(".textLeft .12pt .pgNewLeaveRequest.lblStartDate")(lblStartDate);
        cntStarts.add(lblStartDate);

        var lblStartTime = new SMF.UI.Label({
            name: 'lblStartTime',
            text: '',
            onTouchEnded: function() {
                showTimePicker(true);
            }
        });
        componentStyler(".textLeft .8pt .pgNewLeaveRequest.lblStartTime")(lblStartTime);
        cntStarts.add(lblStartTime);

        this.add(cntStarts);

        // End Date
        var cntEnds = new SMF.UI.Container({
            name: 'cntEnds',

        });
        componentStyler(".pgNewLeaveRequest.cntEnds")(cntEnds);

        var lblEnd = new SMF.UI.Label({
            name: 'lblEnd',
            text: lang['pgOutOfOffice.lblEnd.text']
        });
        componentStyler(".textRight .7pt .pgNewLeaveRequest.lblEnd")(lblEnd);
        cntEnds.add(lblEnd);

        var lblDown4 = lblDown1.clone();
        componentStyler(".textRight .7pt .pgNewLeaveRequest.lblEnd .pgNewLeaveRequest.lblDown4")(lblDown4);
        cntEnds.add(lblDown4);

        var lblEndDate = new SMF.UI.Label({
            name: 'lblEndDate',
            text: '',
            touchEnabled: true,
            onTouchEnded: function() {
                showDateTimePicker(false);
            }
        });
        componentStyler(".textRight .12pt .pgNewLeaveRequest.lblEndDate")(lblEndDate);
        cntEnds.add(lblEndDate);

        var lblEndTime = new SMF.UI.Label({
            name: 'lblEndTime',
            text: '',
            onTouchEnded: function() {
                showTimePicker(false);
            }
        });
        componentStyler(".textRight .8pt .pgNewLeaveRequest.lblEndTime")(lblEndTime);
        cntEnds.add(lblEndTime);

        this.add(cntEnds);

        // Day Count Box
        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox'
        });
        componentStyler(".pgOutOfOffice.cntBlueBox .pgNewLeaveRequest.cntBlueBox")(cntBlueBox);
        this.add(cntBlueBox);

        var lblSelectedDaysCount = new SMF.UI.Label({
            name: 'lblSelectedDaysCount',
            text: '-'
        });
        componentStyler(".textCenter .16pt .bold .pgOutOfOffice.lblSelectedDaysCount")(lblSelectedDaysCount);
        cntBlueBox.add(lblSelectedDaysCount);

        var lblSelectedDaysCountText = new SMF.UI.Label({
            name: 'lblSelectedDaysCountText',
            text: lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.day']
        });
        componentStyler(".textCenter .7pt .pgOutOfOffice.lblSelectedDaysCountText")(lblSelectedDaysCountText);
        cntBlueBox.add(lblSelectedDaysCountText);

        // Leave Details
        var lblDescription = new SMF.UI.Label({
            name: 'lblDescription',
            text: lang['pgApproveLeaveRequest.lblStart.desc']
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblOutOfOfficeMessage .pgNewLeaveRequest.lblDescription")(lblDescription);
        this.add(lblDescription);

        // Message Text
        var txtAbsenceMessage = new SMF.UI.TextBox({
            name: 'txtAbsenceMessage',
            placeHolder: lang['pgNewLeaveRequest.txtAbsenceMessage.placeHolder'],
            text: ''
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage .pgNewLeaveRequest.txtOutOfOfficeMessage")(txtAbsenceMessage);
        this.add(txtAbsenceMessage);

        // Save Button
        // FontAwesome 'check icon' UTF8 code: uf00c
        // TODO: height will be moved to style file after styler-fix
        var btnSave = new SMF.UI.TextButton({
            name: 'btnSave',
            font: fontAwesome,
            onPressed: function(e) {
                alert({
                    title: lang['pgOutOfOffice.btnSave.onPressed.title'],
                    message: lang['pgNewLeaveRequest.btnSave.onPressed.message'],
                    firstButtonText: lang['pgNewLeaveRequest.btnSave.onPressed.text1'],
                    secondButtonText: lang['pgOutOfOffice.btnSave.onPressed.secondButtonText'],
                    onFirstButtonPressed: function() {
                        // Updating Stats (this should return from real service when we connected. For now updating the mock)
                        oProfile.LeaveRequestCount = oProfile.LeaveRequestCount + 1;
                        oProfile.LastRequestStartDate = selectedStartDate;
                        oProfile.LastRequestID = oProfile.LastRequestID + 1;

                        // Sample Mock Request 
                        var myRequest = {
                            'ID': oProfile.LastRequestID,
                            'EmployeeID': oProfile.EmployeeID,
                            'FullName': oProfile.FullName,
                            'Email': oProfile.Email,
                            'Avatar': 'avatar.png',
                            'Team': oProfile.Team,
                            'Role': oProfile.Role,
                            'StartDate': selectedStartDate,
                            'EndDate': selectedEndDate,
                            'TimeUnit': Pages.currentPage.lblTimeUnit.text,
                            'LeaveType': Pages.currentPage.lblLeaveType.text,
                            'AbsenceMessage': JSON.stringify(Pages.currentPage.txtAbsenceMessage.text),
                            'Status': lang['pgMyLeaveRequests.getStatusLetter.status1'],
                            'TotalDays': oTimeTable.TotalDays,
                            'Used': oTimeTable.Used,
                            'Remaining': oTimeTable.Remaining
                        }

                        oRequestList.push(myRequest);

                        alert({
                            title: lang['pgNewLeaveRequest.btnSave.onPressed. onFirstButtonPressed.title'],
                            message: lang['pgNewLeaveRequest.btnSave.onPressed. onFirstButtonPressed.message'],
                            firstButtonText: lang['pgNewLeaveRequest.btnSave.onPressed. onFirstButtonPressed.text'],
                            onFirstButtonPressed: function() {
                                router.go('pgStatus');
                            }
                        });
                    },
                    onSecondButtonPressed: function() {}
                });
            }
        });
        componentStyler(".12pt .pgOutOfOffice.btnSave")(btnSave);
        this.add(btnSave);

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgOutOfOffice
         */
        function pgNewLeaveRequest_onKeyPress(e) {
            if (e.keyCode === 4) {
                // Pages.back(reverseDefaultPageAnimation);
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgOutOfOffice
         */
        function pgNewLeaveRequest_onShow() {
            // We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle(lang['pgNewLeaveRequest.headerBar.setTitleView.titleText.New']);
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "back")
                    router.back();
            });

            fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);

            // resetting every time
            this.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            this.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            this.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            this.txtAbsenceMessage.text = '';
            this.lblLeaveType.text = lang['pgNewLeaveRequest.lblLeaveType.text'];
            this.lblTimeUnit.text = lang['pgNewLeaveRequest.lblTimeUnit.text'];
            this.cntStarts.lblStartTime.touchEnabled = false;
            this.cntEnds.lblEndTime.touchEnabled = false;

            leaveTypeSelectedIndex = 0;
            timeUnitSelectedIndex = 0;

            // dates
            selectedStartDate = new Date();
            selectedEndDate = (new Date()).addDays(7);

            setDateLabels(selectedStartDate, true);
            setDateLabels(selectedEndDate, false);

            // Calculating the day-count according to given Start and End dates
            calculateDaysBetween();

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgNewLeaveRequest_onShow');

            tinyUtils.fixOverlayBug();
        }

        // Showing Date Picker
        function showDateTimePicker(isStartDate) {
            SMF.UI.showDatePicker({
                currentDate: (isStartDate) ? selectedStartDate : selectedEndDate,
                mask: 'dd-MM-yyyy',
                minDate: (new Date()),
                maxDate: (new Date()).addDays(365),
                showWorkingDate: true,
                onSelect: function(e) {
                    var sDate = new Date(e.date);

                    if (Pages.currentPage.lblTimeUnit.text === lang['pgNewLeaveRequest.lblTimeUnit.text'])
                        Pages.currentPage.cntStarts.lblStartTime.text = Pages.currentPage.cntEnds.lblEndTime.text = '';
                    setDateLabels(sDate, isStartDate);
                },
                onCancel: function(e) {}
            });
        }

        // Showing Time Picker
        function showTimePicker(isStartDate) {
            SMF.UI.showTimePicker({
                currentTime: (isStartDate) ? '07:00' : '18:30',
                hourViewFormat24: true,
                minuteInterval: 5,
                minTime: '06:00',
                maxTime: '18:30',
                onSelect: function(e) {
                    var t = new Date(e.time);

                    var selectedTime = t.format('h:mm TT'); // ie; 6:45 PM

                    if (isStartDate) {
                        selectedStartDate = new Date(selectedStartDate.format('MM/dd/yyyy') + ' ' + t.format('hh:mm:00'));
                        Pages.currentPage.cntStarts.lblStartTime.text = selectedTime;
                    }
                    else {
                        selectedEndDate = new Date(selectedEndDate.format('MM/dd/yyyy') + ' ' + t.format('HH:mm:00'));

                        Pages.currentPage.cntEnds.lblEndTime.text = selectedTime;
                    }
                    calculateHoursBetween();
                },
                onCancel: function() {}
            });
        }

        // Assigning date-labels' texts
        function setDateLabels(date, isStartDate) {
            var _day = ('00' + date.getDate()).right(2);
            var _month = ('00' + (date.getMonth() + 1)).right(2);
            var _year = date.getFullYear().toString().right(2);

            var _time = date.format('h:mm TT');

            if (isStartDate) {
                if (Pages.currentPage.lblTimeUnit.text === lang['pgNewLeaveRequest.lblTimeUnit.text']) {
                    if (date < selectedEndDate) {
                        Pages.currentPage.cntStarts.lblStartDate.text = _month + '.' + _day + '.' + _year;
                        selectedStartDate = date;
                    }
                    else {
                        alert(lang['pgOutOfOffice.alert.startDate']);
                    }
                }
                else {
                    // If TimeUnit is HOUR then EndDate = StartDate
                    Pages.currentPage.cntStarts.lblStartTime.text = _time;
                    Pages.currentPage.cntStarts.lblStartDate.text = Pages.currentPage.cntStarts.lblStartDate.text = _month + '.' + _day + '.' + _year;
                    selectedStartDate = selectedEndDate = date;
                }
            }
            else {
                if (date > selectedStartDate) {
                    Pages.currentPage.cntEnds.lblEndDate.text = _month + '.' + _day + '.' + _year;
                    selectedEndDate = date;

                    if (Pages.currentPage.lblTimeUnit.text === lang['pgNewLeaveRequest.lblTimeUnit.text1']) {
                        Pages.currentPage.cntEnds.lblEndTime.text = _time;
                    }
                }
                else {
                    alert(lang['pgOutOfOffice.alert.endDate']);
                }

            }
            calculateDaysBetween();
        }

        // Calculates the day-count between Start and End Dates
        function calculateDaysBetween() {
            var days = tinyUtils.daysBetween(selectedStartDate.format('MM/dd/yyyy'), selectedEndDate.format('MM/dd/yyyy'));

            Pages.currentPage.cntBlueBox.lblSelectedDaysCount.text = days;
            Pages.currentPage.cntBlueBox.lblSelectedDaysCountText.text = (days == 1) ? lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.day'] : lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.days'];
        }

        // Calculates the hour-count between Start and End Times
        function calculateHoursBetween() {
            var hours = tinyUtils.daysBetween(selectedStartDate, selectedEndDate, true) - ((selectedEndDate.format('HH') < 13) ? 0 : lunchBreakDuration);

            Pages.currentPage.cntBlueBox.lblSelectedDaysCount.text = hours;
            Pages.currentPage.cntBlueBox.lblSelectedDaysCountText.text = (hours == 1) ? lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hour'] : lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hours'];
        }

        // Show Leave-Type picker
        function pickLeaveType() {
            var leaveTypes = [lang['pgNewLeaveRequest.lblLeaveType.text'], lang['pgNewLeaveRequest.lblLeaveType.text1']];
            pick(
                leaveTypes,
                (leaveTypeSelectedIndex) ? leaveTypeSelectedIndex : 0,
                function(e) {
                    Pages.currentPage.lblLeaveType.text = leaveTypes[e.index];
                    leaveTypeSelectedIndex = e.index;
                },
                function() {}
            );

        }

        // Show Time-Unit picker
        function pickTimeUnit() {
            var timeUnits = [lang['pgNewLeaveRequest.lblTimeUnit.text'], lang['pgNewLeaveRequest.lblTimeUnit.text1']];
            pick(
                timeUnits,
                (timeUnitSelectedIndex) ? timeUnitSelectedIndex : 0,
                function(e) {
                    Pages.currentPage.lblTimeUnit.text = timeUnits[e.index];
                    timeUnitSelectedIndex = e.index;

                    if (timeUnits[e.index] === lang['pgNewLeaveRequest.lblTimeUnit.text1']) {
                        var newStartDate = new Date(selectedStartDate);
                        newStartDate.setHours(9);
                        newStartDate.setMinutes(0);

                        selectedStartDate = newStartDate;
                        setDateLabels(newStartDate, true);

                        var newEndDate = new Date(selectedStartDate);
                        newEndDate.setHours(18);
                        newEndDate.setMinutes(00);

                        selectedEndDate = newEndDate;
                        setDateLabels(newEndDate, false);

                        // disabling EndDate, it should be same as StartDate
                        Pages.currentPage.cntStarts.lblStartDate.fontColor = colors.GrayLight;
                        Pages.currentPage.cntEnds.lblEndDate.fontColor = colors.GrayLight;
                        Pages.currentPage.cntStarts.lblStartDate.touchEnabled = false;
                        Pages.currentPage.cntEnds.lblEndDate.touchEnabled = false;

                        Pages.currentPage.cntStarts.lblStartTime.touchEnabled = true;
                        Pages.currentPage.cntEnds.lblEndTime.touchEnabled = true;

                        calculateHoursBetween();
                    }
                    else {
                        var newStartDate = new Date(selectedStartDate);
                        newStartDate.setHours(0);
                        newStartDate.setMinutes(0);

                        selectedStartDate = newStartDate;
                        setDateLabels(newStartDate, true);

                        var newEndDate = new Date(selectedEndDate);
                        newEndDate.setHours(23);
                        newEndDate.setMinutes(59);

                        selectedEndDate = newEndDate;
                        setDateLabels(newEndDate, false);


                        // enabling EndDate access
                        Pages.currentPage.cntStarts.lblStartDate.fontColor = colors.Gray29;
                        Pages.currentPage.cntEnds.lblEndDate.fontColor = colors.Gray29;
                        Pages.currentPage.cntStarts.lblStartDate.touchEnabled = true;
                        Pages.currentPage.cntEnds.lblEndDate.touchEnabled = true;

                        // disabling Start & End Time
                        Pages.currentPage.cntStarts.lblStartTime.touchEnabled = false;
                        Pages.currentPage.cntEnds.lblEndTime.touchEnabled = false;

                        Pages.currentPage.cntStarts.lblStartTime.text = '';
                        Pages.currentPage.cntEnds.lblEndTime.text = '';
                    }
                },
                function() {}
            );

        }

        // Drawing day-boxes 
        function createVacationBoxes(parent) {
            // Total days box and texts
            var boxTotalDays = new SMF.UI.Container({
                name: 'boxTotalDays',
            });
            componentStyler(".Generic.boxTotalDays")(boxTotalDays);

            var lblTotalDays = new SMF.UI.Label({
                name: 'lblTotalDays',
                text: '-'
            });
            componentStyler(".textCenter .12pt .Generic.lblTotalDays")(lblTotalDays);
            boxTotalDays.add(lblTotalDays);

            var lblTotalDaysText = new SMF.UI.Label({
                name: 'lblTotalDaysText',
                text: lang['pgStatus.boxTotal']
            });
            componentStyler(".textCenter .5pt .Generic.lblTotalDays .Generic.lblTotalDaysText")(lblTotalDaysText);
            boxTotalDays.add(lblTotalDaysText);

            // Used days box and texts
            var boxUsed = new SMF.UI.Container({
                name: 'boxUsed',
            });
            componentStyler(".Generic.boxUsed")(boxUsed);

            var lblUsedDays = new SMF.UI.Label({
                name: 'lblUsedDays',
                text: '-'
            });
            componentStyler(".textCenter .12pt .Generic.lblTotalDays .Generic.lblUsedDays")(lblUsedDays);
            boxUsed.add(lblUsedDays);

            var lblUsedDaysText = new SMF.UI.Label({
                name: 'lblTotalDaysText',
                text: lang['pgStatus.boxUsed']
            });
            componentStyler(".textCenter .5pt .Generic.lblTotalDaysText .Generic.lblUsedDays")(lblUsedDaysText);
            boxUsed.add(lblUsedDaysText);


            // Remaining days box and texts
            var boxRemaining = new SMF.UI.Container({
                name: 'boxRemaining',
            });
            componentStyler(".Generic.boxRemaining")(boxRemaining);

            var imgRemaining = new SMF.UI.Image({
                name: 'imgRemaining'
            });
            componentStyler(".allArea .pgStatus.imgRemaining")(imgRemaining);
            boxRemaining.add(imgRemaining);

            var lblRemainingDays = new SMF.UI.Label({
                name: 'lblRemainingDays',
                text: '-'
            });
            componentStyler(".textCenter .12pt .Generic.lblTotalDays .Generic.lblRemainingDays")(lblRemainingDays);
            boxRemaining.add(lblRemainingDays);

            var lblRemainingDaysText = new SMF.UI.Label({
                name: 'lblRemainingDaysText',
                text: lang['pgStatus.boxRem']
            });
            componentStyler(".textCenter .5pt .Generic.lblTotalDaysText .Generic.lblRemainingDays")(lblRemainingDaysText);
            boxRemaining.add(lblRemainingDaysText);

            parent.add(boxTotalDays);
            parent.add(boxUsed);
            parent.add(boxRemaining);
        }

        // We trigger this function when a new update occurs
        function fillVacationMetrics(TotalDays, Used, Remaining) {
            cntVacationBoxes.boxTotalDays.lblTotalDays.text = TotalDays;
            cntVacationBoxes.boxUsed.lblUsedDays.text = Used;
            cntVacationBoxes.boxRemaining.lblRemainingDays.text = Remaining;
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgNewLeaveRequest;
