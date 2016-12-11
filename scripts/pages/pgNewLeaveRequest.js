/* globals smfOracle oTimeTable oProfile oRequestList lunchBreakDuration*/

/*
TODO:
- use Router options to pass oRequest
*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFcomponents = require('./component/SMFcomponents.js');
const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const actionBarOptions = require("./actionbar/generic.actionbar.js");
const ActionBarWrapper = require("js-base/component/action-bar.js");

const tinyUtils = require('./component/tinyUtils.js');
const getUnit = require('./component/getUnit.js');

// Router
const router = require('js-base/core/router');

const pgNewLeaveRequest = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, { 
        name: 'pgNewLeaveRequest',
        onKeyPress: pgNewLeaveRequest_onKeyPress,
        onShow: pgNewLeaveRequest_onShow
    });

        actionBarOptions.setTitle('New Leave Request');
        const actionBarWrapper = ActionBarWrapper(this._view, actionBarOptions.options);
        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');
        
        var leaveTypeSelectedIndex;
        var timeUnitSelectedIndex;
    
        var selectedStartDate;
        var selectedEndDate;
    
        // Vacation metrics
        var cntVacationBoxes = new SMF.UI.Container({
            name: 'cntVacationBoxes',
            left: getUnit(0),
            top: getUnit({iOS:'0',Android:'2%'}),
            width: getUnit('100%'),
            height: getUnit('21.0644%'),
            fillColor: SMF.UI.Color.WHITE,
            backgroundTransparent: false,
            borderWidth: 0,
            roundedEdge: 0
        });
        this.add(cntVacationBoxes);
    
        createVacationBoxes.call(this,cntVacationBoxes);
    
        //Lines
        SMFcomponents.createImage(this, 'imgShadowLine', 'shadow_line.png', '0', getUnit({iOS:'21.0644%',Android:'23.0644%'}), '100%', '6', SMF.UI.ImageFillType.STRETCH);
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'32.5037%',Android:'34.5037%'}), '100%', 1, '#e7e7e7');
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'47.4962%',Android:'49.4962%'}), '100%', 1, '#e7e7e7');
    
        // Request Details
        // FontAwesome 'Down arrow' UTF8 code: uf107
        SMFcomponents.createLabel(this, 'lblLeaveTypeText', 'LEAVE TYPE', '4.5333%', getUnit({iOS:'23.68815%',Android:'25.68815%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(this, 'lblDown1', JSON.parse('""'), '29%', getUnit({iOS:'23.68815%',Android:'25.68815%'}), '10%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(this, 'lblTimeUnitText', 'TIME UNIT', '62%', getUnit({iOS:'23.68815%',Android:'25.68815%'}), '30%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(this, 'lblDown2', JSON.parse('""'), '90%', getUnit({iOS:'23.68815%',Android:'25.68815%'}), '5%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(this, 'lblLeaveType', 'PERSONAL', '4.5333%', getUnit({iOS:'27.5%',Android:'29.5%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '10pt', false, '#4a4a4a', pickLeaveType);
        SMFcomponents.createLabel(this, 'lblTimeUnit', 'DAY', '60.4667%', getUnit({iOS:'27%',Android:'29%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '10pt', false, '#4a4a4a', pickTimeUnit);
    
        // Start Date
        var cntStarts = new SMF.UI.Container({
            name: 'cntStarts',
            left: '4.53%',
            top: getUnit({iOS:'34.8%',Android:'36.8%'}),
            height: '12%',
            width: '29%',
            borderWidth: 0,
            backgroundTransparent: true
        });
    
        SMFcomponents.createLabel(cntStarts, 'lblStart', 'STARTS', 0, 0, '100%', getUnit({iOS:'15%', Android:'30%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(cntStarts, 'lblDown3', JSON.parse('""'), '60%', 0, '50%', getUnit({iOS:'15%', Android:'30%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(cntStarts, 'lblStartDate', '-', 0, '30%', '100%', getUnit({iOS:'30%', Android:'60%'}), SMF.UI.TextAlignment.LEFT, false, '12pt', false, '#4a4a4a', function() {
            showDateTimePicker(true);
        });
        SMFcomponents.createLabel(cntStarts, 'lblStartTime', '', 0, '70%', getUnit({iOS:'92%', Android:'85%'}), getUnit({iOS:'20%', Android:'40%'}), SMF.UI.TextAlignment.LEFT, false, '8pt', false, '#4a4a4a', function() {
            showTimePicker(true);
        });
    
        this.add(cntStarts);
    
        // End Date
        var cntEnds = new SMF.UI.Container({
            name: 'cntEnds',
            left: '65%',
            top: getUnit({iOS:'34.8%',Android:'36.8%'}),
            height: '12%',
            width: '30.6%',
            borderWidth: 0,
            backgroundTransparent: true
        });
    
        SMFcomponents.createLabel(cntEnds, 'lblEnd', 'ENDS', 0, 0, '87%', getUnit({iOS:'15%', Android:'30%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(cntEnds, 'lblDown4', JSON.parse('""'), 0, 0, '97%', getUnit({iOS:'15%', Android:'30%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(cntEnds, 'lblEndDate', '11.25.16', 0, '30%', '100%', getUnit({iOS:'30%', Android:'60%'}), SMF.UI.TextAlignment.RIGHT, false, '12pt', false, '#4a4a4a', function() {
            showDateTimePicker(false);
        });
        SMFcomponents.createLabel(cntEnds, 'lblEndTime', '', 0, '70%', '100%', getUnit({iOS:'20%', Android:'40%'}), SMF.UI.TextAlignment.RIGHT, false, '8pt', false, '#4a4a4a', function() {
            showTimePicker(false);
        });
    
        this.add(cntEnds);
    
        //Day Count Box
        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox',
            left: '40%',
            width: '20%',
            top: getUnit({iOS:'32.5037%',Android:'34.5037%'}),
            height: getUnit('14.9925%'),
            borderWidth: 0,
            fillColor: '#248afd',
            backgroundTransparent: false
        });
        
        this.add(cntBlueBox);
        
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCount', '-', '0', getUnit({iOS:'28%',Android:'3%'}), '100%', getUnit({iOS:'30%', Android:'45%'}), SMF.UI.TextAlignment.CENTER, false, '16pt', true, '#ffffff');
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCountText', 'day', '0', getUnit({iOS:'60%',Android:'60%'}), '100%', getUnit({iOS:'20%', Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#ffffff');
    
        SMFcomponents.createLabel(this, 'lblStart', 'DESCRIPTION', '4.4%', getUnit({iOS:'50.1199%',Android:'52.1199%'}), '55%', getUnit({iOS:'3%', Android:'6%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
        //
        var txtAbsenceMessage = new SMF.UI.TextBox({
            name: 'txtAbsenceMessage',
            placeHolder: 'Please add your "Absence" reason briefly',
            text: '',
            left: getUnit('4.5333%'),
            top: getUnit({iOS:'54.5427%',Android:'57.5427%'}),
            width: getUnit('90.9334%'),
            height: getUnit({iOS:'34.8621%',Android:'31.8621%'}),
            multipleLine: true,
            textAlignment: SMF.UI.TextAlignment.TOP,
            borderWidth: 0,
            roundedEdge: 0,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: '#37404a',
            horizontalGap:0
        })
        this.add(txtAbsenceMessage);
    
        // Custom icon font
        var myFont = new SMF.UI.Font({
            name: 'FontAwesome',
            size: '12pt',
            bold: false
        });
    
        // Save Button
        // FontAwesome 'check icon' UTF8 code: uf00c
        SMFcomponents.createTextButtonWithCustomFont(this,
            'btnSave',
            JSON.parse('""'),
            0, '90.4048%', '100%', '9.5952%',
            SMF.UI.TextAlignment.CENTER,
            myFont,
            '#7ed321', '#5b9918',
            SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
            function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to make this request?',
                    firstButtonText: 'Submit',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {
                        //Updating Stats (this should return from real service when we connected. For now updating the mock)
                        oProfile.LeaveRequestCount = oProfile.LeaveRequestCount + 1;
                        oProfile.LastRequestStartDate = selectedStartDate;
                        oProfile.LastRequestID = oProfile.LastRequestID + 1;
    
                        //Sample Mock Request 
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
                            'Status': 'waiting',
                            'TotalDays': oTimeTable.TotalDays,
                            'Used': oTimeTable.Used,
                            'Remaining': oTimeTable.Remaining
                        }
    
                        oRequestList.push(myRequest);
    
                        alert({
                            title: 'Request submitted',
                            message: 'Your "Leave of Absence" request has been forwarded for approval.',
                            firstButtonText: 'OK',
                            onFirstButtonPressed: function() {
                                router.go('pgStatus');
                            }
                        });
                    },
                    onSecondButtonPressed: function() {}
                });
    
    
            });
    
    
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
            //We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;
    
            // Hiding 'wait' dialog
            Dialog.removeWait();
    
            // Adding header bar (actionbar for Android, navigationbar for iOS)
            actionBarWrapper.reload();
    
            fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);
    
            // resetting every time
            this.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            this.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            this.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;
    
            this.txtAbsenceMessage.text = '';
            this.lblLeaveType.text = 'PERSONAL';
            this.lblTimeUnit.text = 'DAY';
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
    
                    if (Pages.currentPage.lblTimeUnit.text === 'DAY')
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
                    if (Pages.currentPage.lblTimeUnit.text === 'DAY') {
                    if (date < selectedEndDate) {
                        Pages.currentPage.cntStarts.lblStartDate.text = _month + '.' + _day + '.' + _year;
                        selectedStartDate = date;
                    }
                    else {
                        alert('"Start Date" should be prior to "End Date"');
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
    
                    if (Pages.currentPage.lblTimeUnit.text === 'HOUR') {
                        Pages.currentPage.cntEnds.lblEndTime.text = _time;
                    }
                }
                else {
                    alert('"End Date" should be after "Start Date"');
                }
    
            }
            calculateDaysBetween();
        }
    
        // Calculates the day-count between Start and End Dates
        function calculateDaysBetween() {
            var days = tinyUtils.daysBetween(selectedStartDate.format('MM/dd/yyyy'), selectedEndDate.format('MM/dd/yyyy'));
    
            Pages.currentPage.cntBlueBox.lblSelectedDaysCount.text = days;
            Pages.currentPage.cntBlueBox.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
        }
    
        // Calculates the hour-count between Start and End Times
        function calculateHoursBetween() {
            var hours = tinyUtils.daysBetween(selectedStartDate, selectedEndDate, true)  - ((selectedEndDate.format('HH') < 13) ? 0 : lunchBreakDuration);
            
            Pages.currentPage.cntBlueBox.lblSelectedDaysCount.text = hours;
            Pages.currentPage.cntBlueBox.lblSelectedDaysCountText.text = (hours == 1) ? 'hour' : 'hours';
        }
    
        // Show Leave-Type picker
        function pickLeaveType() {
            var leaveTypes = ['PERSONAL', 'MEDICAL'];
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
            var timeUnits = ['DAY', 'HOUR'];
            pick(
                timeUnits,
                (timeUnitSelectedIndex) ? timeUnitSelectedIndex : 0,
                function(e) {
                    Pages.currentPage.lblTimeUnit.text = timeUnits[e.index];
                    timeUnitSelectedIndex = e.index;
    
                    if (timeUnits[e.index] === 'HOUR') {
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
    
                        //disabling EndDate, it should be same as StartDate
                        Pages.currentPage.cntEnds.lblEndDate.fontColor = '#a0a0a0';
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
    
    
                        //enabling EndDate access
                        Pages.currentPage.cntEnds.lblEndDate.fontColor = '#4a4a4a';
                        Pages.currentPage.cntEnds.lblEndDate.touchEnabled = true;
                    
                        //disabling Start & End Time
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
            var boxTotalDays = new SMF.UI.Container({
                name: 'boxTotalDays',
                left: getUnit('3.76%'),
                top: getUnit('55.87188%'),
                width: getUnit('13.8933%'),
                height: getUnit('37.0106%'),
                borderWidth: 1,
                borderColor: '#979797',
                roundedEdge: 0
            });
    
            SMFcomponents.createLabel(boxTotalDays, 'lblTotalDays', '-', '0', getUnit({iOS:'20%',Android:'2%'}), '100%', getUnit({iOS:'40%',Android:'61%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#979797');
            SMFcomponents.createLabel(boxTotalDays, 'lblTotalDaysText', 'Total', '0', getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#979797');
    
    
            var boxUsed = new SMF.UI.Container({
                name: 'boxUsed',
                left: getUnit('19.41333%'),
                top: getUnit('55.87188%'),
                width: getUnit('13.8933%'),
                height: getUnit('37.0106%'),
                borderWidth: 1,
                borderColor: '#cca2b5',
                roundedEdge: 0
            });
    
            SMFcomponents.createLabel(boxUsed, 'lblUsedDays', '-', '0', getUnit({iOS:'20%',Android:'2%'}), '100%', getUnit({iOS:'40%',Android:'61%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#cca2b5');
            SMFcomponents.createLabel(boxUsed, 'lblUsedDaysText', 'Used', '0', getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#cca2b5');
    
            var boxRemaining = new SMF.UI.Container({
                name: 'boxRemaining',
                left: getUnit('35.2%'),
                top: getUnit('55.87188%'),
                width: getUnit('13.8933%'),
                height: getUnit('37.0106%'),
                borderWidth: 0,
                roundedEdge: 0
            });
    
            SMFcomponents.createImage(boxRemaining, 'imgRemaining', 'square_stripe.png', '0', '0', '100%', '100%', SMF.UI.ImageFillType.ASPECTFIT);
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDays', '-', '0', getUnit({iOS:'20%',Android:'2%'}), '100%', getUnit({iOS:'40%',Android:'61%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#37404a');
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDaysText', 'Rem.', 0, getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#37404a');
    
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
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.changeStateHandlder = function(state) {};
    });

module.exports = pgNewLeaveRequest;
