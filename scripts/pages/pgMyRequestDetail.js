/* globals smfOracle oProfile oRequestList lunchBreakDuration*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFcomponents = require('./component/SMFcomponents.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');
const getUnit = require('./component/getUnit.js');

const colors = require('./style/colors.js');

// Router
const router = require('js-base/core/router');

const pgMyRequestDetail = extend(Page)(
    //Page Constructor
    function(_super) {
        var oRequest = [];
    
        _super(this, { 
            name: 'pgMyRequestDetail',
            onKeyPress: pgMyRequestDetail_onKeyPress,
            onShow: pgMyRequestDetail_onShow
        },
        "", 
        {
            oRequest: []
        });
    
        var self = this;
        
        headerBarOptions.setTitle('My Leave Request');
        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        var selectedStartDate;
        var selectedEndDate;
         

        // Profile
        SMFcomponents.createImage(this, 'imgAvatar', '', '5.3333%', getUnit({iOS:'11.5442%',Android:'14.5%'}), '14.4%', '8.0959%', SMF.UI.ImageFillType.ASPECTFIT);
        SMFcomponents.createLabel(this, 'lblFullName', '', '4.5333%', getUnit({iOS:'20%',Android:'22%'}), '53.3333%', '4.7376%', SMF.UI.TextAlignment.LEFT, false, '12pt', false, colors.GreenDark);
        SMFcomponents.createLabel(this, 'lblTeamRole', '', '4.5333%', getUnit({iOS:'24.7376%',Android:'26.7376%'}), '53.3333%', '3.4482%', SMF.UI.TextAlignment.LEFT, false, '7pt', false, colors.GrayDark);
    
        // Vacation metrics
        var cntVacationBoxes = new SMF.UI.Container({
            name: 'cntVacationBoxes',
            left: getUnit('48%'),
            top:  getUnit({iOS:'0',Android:'2%'}),
            width: getUnit('100%'),
            height: getUnit('21.0644%'),
            fillColor: SMF.UI.Color.WHITE,
            backgroundTransparent: false,
            borderWidth: 0,
            roundedEdge: 0
        });
        this.add(cntVacationBoxes);
    
        createVacationBoxes(cntVacationBoxes);
    
        //Lines
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'29.4152%',Android:'31.4152%'}), '100%', 1, colors.GrayLighter);
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'40.8545%',Android:'42.8545%'}), '100%', 1, colors.GrayLighter);
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'55.847%',Android:'57.847%'}), '100%', 1, colors.GrayLighter);
    
        // Request Details
        SMFcomponents.createLabel(this, 'lblLeaveTypeText', 'LEAVE TYPE', '4.5333%', getUnit({iOS:'32.0389%',Android:'32.0389%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, colors.BlueMedium);
        SMFcomponents.createLabel(this, 'lblTimeUnitText', 'TIME UNIT', '60.4667%', getUnit({iOS:'32.0389%',Android:'32.0389%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, colors.BlueMedium);
    
        SMFcomponents.createLabel(this, 'lblLeaveType', 'PERSONAL', '4.5333%', getUnit({iOS:'35.8508%',Android:'35.8508%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '10pt', false, colors.Gray29);
        SMFcomponents.createLabel(this, 'lblTimeUnit', 'DAY', '60.4667%', getUnit({iOS:'35.8508%',Android:'35.8508%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '10pt', false, colors.Gray29);
    
        // Start Date
        SMFcomponents.createLabel(this, 'lblStart', 'STARTS', '4.5333%', getUnit({iOS:'42.5037%',Android:'44.5037%'}), '17%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, colors.BlueMedium);
        SMFcomponents.createLabel(this, 'lblStartDate', '-', '4.5333%', getUnit({iOS:'47.3013%',Android:'49.3013%'}), '37.3333%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '12pt', false, colors.Gray29);
        SMFcomponents.createLabel(this, 'lblStartTime', '', '4.5333%', getUnit({iOS:'51.3013%',Android:'53.3013%'}), '29.2%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '8pt', false, colors.Gray29);
        
        // End Date
        SMFcomponents.createLabel(this, 'lblEnd', 'ENDS', '80.4667%', getUnit({iOS:'42.5037%',Android:'44.5037%'}), '15%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, colors.BlueMedium);
        SMFcomponents.createLabel(this, 'lblEndDate', '-', '60.4667%', getUnit({iOS:'47.3013%',Android:'49.3013%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '12pt', false, colors.Gray29);
        SMFcomponents.createLabel(this, 'lblEndTime', '', '60.4667%', getUnit({iOS:'51.3013%',Android:'53.3013%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '8pt', false, colors.Gray29);
        
        //Day Count Box
        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox',
            left: '40%',
            width: '20%',
            top: getUnit({iOS:'40.8545%',Android:'42.8545%'}),
            height: getUnit('14.9925%'),
            borderWidth: 0,
            fillColor: colors.BlueMedium,
            backgroundTransparent: false
        });
        this.add(cntBlueBox);
        
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCount', '-', '0', getUnit({iOS:'28%',Android:'20%'}), '100%', getUnit({iOS:'30%', Android:'40%'}), SMF.UI.TextAlignment.CENTER, false, '16pt', true, colors.White);
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCountText', 'day', '0', getUnit({iOS:'60%',Android:'60%'}), '100%', getUnit({iOS:'20%', Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '7pt', false, colors.White);
    
        SMFcomponents.createContainer(this, 'cntDescriptionBack', 0, getUnit({iOS:'55.847%',Android:'57.847%'}), '100%', '44.153%', colors.GrayLighter, false);
        SMFcomponents.createLabel(this, 'lblStart', 'DESCRIPTION', '4.4%', getUnit({iOS:'58.4707%',Android:'60.4707%'}), '63.3508%', '3%', SMF.UI.TextAlignment.LEFT, false, '7pt', false, colors.BlueMedium);
    
        // Textbox for Absence Message
        this.txtAbsenceMessage = new SMF.UI.TextBox({
            name: 'txtAbsenceMessage',
            text: '',
            left: getUnit('4.5333%'),
            top: getUnit({iOS:'62.8935%',Android:'64.8935%'}),
            width: getUnit('90.9334%'),
            height: getUnit({iOS:'27.5113%', Android:'25.5113%'}),
            multipleLine: true,
            textAlignment: SMF.UI.TextAlignment.TOP,
            borderWidth: 0,
            roundedEdge: 0,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: colors.BlueDark,
            touchEnabled: false,
            enabled: false,
            backgroundTransparent: true
        })
        this.add(this.txtAbsenceMessage);
    
    
        // Custom icon font
        var myFont = new SMF.UI.Font({
            name: 'FontAwesome',
            size: '12pt',
            bold: false
        });
    
        // Delete Button
        // FontAwesome 'delete icon' UTF8 code: 'uf08b'
        SMFcomponents.createTextButtonWithCustomFont(this,
            'btnDelete',
            JSON.parse('""'),
            '0', '90.4048%', '100%', '9.5952%',
            SMF.UI.TextAlignment.CENTER,
            myFont,
            '#ee2736', '#eb2c3d',
            SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
            function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to delete this request?',
                    firstButtonText: 'Delete',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {
                        
                        // console.log(self, self.state);
                        tinyUtils.setTargetID(self.getState().oRequest.ID);
                        oRequestList = oRequestList.filter(tinyUtils.filterOutByID)
    
                        //Updating Stats (this should return from real service when we connected. For now updating the mock)
                        oProfile.LeaveRequestCount = oProfile.LeaveRequestCount - 1;
    
                        alert({
                            title: 'Request deleted',
                            message: 'This leave request deleted.',
                            firstButtonText: 'OK',
                            onFirstButtonPressed: function() {
                                // Pages.pgMyRequests.show(reverseDefaultPageAnimation);
                                router.back();
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
        function pgMyRequestDetail_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }
    
        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgOutOfOffice
         */
        function pgMyRequestDetail_onShow() {
            //We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;
    
            // Hiding 'wait' dialog
            Dialog.removeWait();
    
            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "back")
                    router.back();
            });
    
            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgMyRequestDetail_onShow');
            tinyUtils.fixOverlayBug();
        }

        this.updatePageObjects = function(oRequest) {
            fillVacationMetrics(oRequest.TotalDays, oRequest.Used, oRequest.Remaining);
        
            // resetting every time
            this._view.imgAvatar.image = oRequest.Avatar;
            this.lblFullName.text = oRequest.FullName;
            this.lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;
        
            this.txtAbsenceMessage.text = oRequest.AbsenceMessage;
            this.lblLeaveType.text = oRequest.LeaveType;
            this.lblTimeUnit.text = oRequest.TimeUnit;
        
            // dates
            selectedStartDate = new Date(oRequest.StartDate);
            selectedEndDate = new Date(oRequest.EndDate);
        
            setDateLabels.call(this, selectedStartDate, true);
            setDateLabels.call(this, selectedEndDate, false);
        
            // Calculating the day-count according to given Start and End dates
            this.calculateDaysBetween();
        }
    
        // Setting the date labels according to their relations between each other
        function setDateLabels(date, isStartDate) {
            var _day = ('00' + date.getDate()).right(2);
            var _month = ('00' + (date.getMonth() + 1)).right(2);
            var _year = date.getFullYear().toString().right(2);
    
            if (isStartDate) {
                if (date < selectedEndDate) {
                    this.lblStartDate.text = _month + '.' + _day + '.' + _year;
                    selectedStartDate = date;
                }
                else {
                    alert('"Start Date" should be prior to "End Date"');
                }
            }
            else {
                if (date > selectedStartDate) {
                    this.lblEndDate.text = _month + '.' + _day + '.' + _year;
                    selectedEndDate = date;
                }
                else {
                    alert('"End Date" should be after "Start Date"');
                }
    
            }
            this.calculateDaysBetween();
        }
        
        // var calculateDaysBetween = calculateDaysBetweenFunc.bind(this);
        // calculateDaysBetween()
    
        // Calculates the day-count between Start and End Dates
        this.calculateDaysBetween = function () {
            var count, countText;
            if (this.lblTimeUnit.text === 'DAY') {
                count = tinyUtils.daysBetween(selectedStartDate.format('MM/dd/yyyy'), selectedEndDate.format('MM/dd/yyyy'));
                countText = (count > 1) ? 'days' : 'day';
    
            }
            else {
                count = tinyUtils.daysBetween(selectedStartDate, selectedEndDate, true) - ((selectedEndDate.format('HH') < 13) ? 0 : lunchBreakDuration);
                countText = (count > 1) ? 'hours' : 'hour';
                this.lblStartTime.text = selectedStartDate.format('HH:mm TT');
                this.text = selectedEndDate.format('HH:mm TT');
            }
    
            cntBlueBox.lblSelectedDaysCount.text = count;
            cntBlueBox.lblSelectedDaysCountText.text = countText
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
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDays', '-', '0', getUnit({iOS:'20%',Android:'2%'}), '100%', getUnit({iOS:'40%',Android:'61%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, colors.BlueDark);
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDaysText', 'Rem.', 0, getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, colors.BlueDark);

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
        _proto.setRouteParams = function(request) {
            // inherited from UIComponent
            if (request) {
                this._changeState({
                    oRequest: request
                });
            }
        };
        _proto.stateChangedHandler = function(state) {
            this.updatePageObjects(state.oRequest);
        };
    });
   
module.exports = pgMyRequestDetail;