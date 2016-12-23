/* globals oRequestList fontAwesome*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');

const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgApproveLeaveRequest = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgApproveLeaveRequest',
                onKeyPress: pgApproveLeaveRequest_onKeyPress,
                onShow: pgApproveLeaveRequest_onShow
            },
            "", {
                targetRowIndex: 0,
                oRequest: []
            });

        var self = this;

        headerBarOptions.setTitle('Approve Request');
        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        var selectedStartDate;
        var selectedEndDate;

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


        // Vacation metrics
        var cntVacationBoxes = new SMF.UI.Container({
            name: 'cntVacationBoxes'
        });
        componentStyler(".Generic.cntLittleBoxes .Generic.cntLittleBoxesRight")(cntVacationBoxes);
        this.add(cntVacationBoxes);

        createVacationBoxes(cntVacationBoxes);

        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .pgApproveLeaveRequest.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);

        var myRectangle2 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .pgApproveLeaveRequest.myRectangle2Top")(myRectangle2);
        this.add(myRectangle2);

        var myRectangle3 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .pgApproveLeaveRequest.myRectangle3Top")(myRectangle3);
        this.add(myRectangle3);



        // Request Details
        var lblLeaveTypeText = new SMF.UI.Label({
            name: 'lblLeaveTypeText',
            text: 'LEAVE TYPE'
        });
        componentStyler(".textLeft .7pt .pgApproveLeaveRequest.lblLeaveTypeText")(lblLeaveTypeText);
        this.add(lblLeaveTypeText);

        var lblTimeUnitText = new SMF.UI.Label({
            name: 'lblTimeUnitText',
            text: 'TIME UNIT'
        });
        componentStyler(".textRight .7pt .pgApproveLeaveRequest.lblLeaveTypeText .pgApproveLeaveRequest.lblTimeUnitText")(lblTimeUnitText);
        this.add(lblTimeUnitText);

        var lblLeaveType = new SMF.UI.Label({
            name: 'lblLeaveType',
            text: 'PERSONAL'
        });
        componentStyler(".textLeft .10pt .pgApproveLeaveRequest.lblLeaveType")(lblLeaveType);
        this.add(lblLeaveType);

        var lblTimeUnit = new SMF.UI.Label({
            name: 'lblTimeUnit',
            text: 'DAY'
        });
        componentStyler(".textRight .10pt .pgApproveLeaveRequest.lblLeaveType .pgApproveLeaveRequest.lblTimeUnit")(lblTimeUnit);
        this.add(lblTimeUnit);


        // Start Date
        var lblStart = new SMF.UI.Label({
            name: 'lblStart',
            text: 'STARTS'
        });
        componentStyler(".textLeft .7pt .pgApproveLeaveRequest.lblStart")(lblStart);
        this.add(lblStart);

        var lblStartDate = new SMF.UI.Label({
            name: 'lblStartDate',
            text: '-'
        });
        componentStyler(".textLeft .12pt .pgApproveLeaveRequest.lblStartDate")(lblStartDate);
        this.add(lblStartDate);

        var lblStartTime = new SMF.UI.Label({
            name: 'lblStartTime',
            text: ''
        });
        componentStyler(".textLeft .8pt .pgApproveLeaveRequest.lblStartTime")(lblStartTime);
        this.add(lblStartTime);


        // End Date
        // SMFcomponents.createLabel(this, 'lblEnd', 'ENDS', '80.4667%', getUnit({iOS:'42.5037%',Android:'44.5037%'}), '15%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, colors.BlueMedium);
        // SMFcomponents.createLabel(this, 'lblEndDate', '-', '60.4667%', getUnit({iOS:'47.3013%',Android:'49.3013%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '12pt', false, colors.Gray29);
        // SMFcomponents.createLabel(this, 'lblEndTime', '', '60.4667%', getUnit({iOS:'51.3013%',Android:'53.3013%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '8pt', false, colors.Gray29);
        var lblEnd = new SMF.UI.Label({
            name: 'lblEnd',
            text: 'ENDS'
        });
        componentStyler(".textRight .7pt .pgApproveLeaveRequest.lblEnd")(lblEnd);
        this.add(lblEnd);

        var lblEndDate = new SMF.UI.Label({
            name: 'lblEndDate',
            text: ''
        });
        componentStyler(".textRight .12pt .pgApproveLeaveRequest.lblEndDate")(lblEndDate);
        this.add(lblEndDate);

        var lblEndTime = new SMF.UI.Label({
            name: 'lblEndTime',
            text: ''
        });
        componentStyler(".textRight .8pt .pgApproveLeaveRequest.lblEndTime")(lblEndTime);
        this.add(lblEndTime);


        //Day Count Box
        // var cntBlueBox = new SMF.UI.Container({
        //     name: 'cntBlueBox',
        //     left: '40%',
        //     width: '20%',
        //     top: getUnit({iOS:'40.8545%',Android:'42.8545%'}),
        //     height: getUnit('14.9925%'),
        //     borderWidth: 0,
        //     fillColor: colors.BlueMedium,
        //     backgroundTransparent: false
        // });

        // this.add(cntBlueBox);
        // SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCount', '-', '0', getUnit({iOS:'28%',Android:'20%'}), '100%', getUnit({iOS:'30%', Android:'40%'}), SMF.UI.TextAlignment.CENTER, false, '16pt', true, colors.White);
        // SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCountText', 'day', '0', getUnit({iOS:'60%',Android:'60%'}), '100%', getUnit({iOS:'20%', Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '7pt', false, colors.White);

        // SMFcomponents.createContainer(this, 'cntDescriptionBack', 0, getUnit({iOS:'55.847%',Android:'57.847%'}), '100%', '44.153%', colors.GrayLighter, false);

        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox'
        });
        componentStyler(".pgOutOfOffice.cntBlueBox .pgApproveLeaveRequest.cntBlueBox")(cntBlueBox);
        this.add(cntBlueBox);

        var lblSelectedDaysCount = new SMF.UI.Label({
            name: 'lblSelectedDaysCount',
            text: '-'
        });
        componentStyler(".textCenter .16pt .bold .pgOutOfOffice.lblSelectedDaysCount")(lblSelectedDaysCount);
        cntBlueBox.add(lblSelectedDaysCount);

        var lblSelectedDaysCountText = new SMF.UI.Label({
            name: 'lblSelectedDaysCountText',
            text: 'day'
        });
        componentStyler(".textCenter .7pt .pgOutOfOffice.lblSelectedDaysCountText")(lblSelectedDaysCountText);
        cntBlueBox.add(lblSelectedDaysCountText);

        //Leave Details
        var lblDescription = new SMF.UI.Label({
            name: 'lblDescription',
            text: 'DESCRIPTION'
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblOutOfOfficeMessage .pgApproveLeaveRequest.lblDescription")(lblDescription);
        this.add(lblDescription);

        // Textbox for Absence Message
        // this.txtAbsenceMessage = new SMF.UI.TextBox({
        //     name: 'txtAbsenceMessage',
        //     text: '',
        //     left: getUnit('4.5333%'),
        //     top: getUnit({iOS:'62.8935%',Android:'64.8935%'}),
        //     width: getUnit('90.9334%'),
        //     height: getUnit({iOS:'27.5113%', Android:'25.5113%'}),
        //     multipleLine: true,
        //     textAlignment: SMF.UI.TextAlignment.TOP,
        //     borderWidth: 0,
        //     roundedEdge: 0,
        //     font: new SMF.UI.Font({
        //         size: '7pt'
        //     }),
        //     fontColor: colors.BlueDark,
        //     touchEnabled: false,
        //     enabled: false,
        //     backgroundTransparent: true
        // })
        var txtAbsenceMessage = new SMF.UI.TextBox({
            name: 'txtAbsenceMessage',
            placeHolder: 'Please add your "Absence" reason briefly',
            text: '',
            touchEnabled: false,
            enabled: false
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage .pgApproveLeaveRequest.txtAbsenceMessage")(txtAbsenceMessage);
        this.add(txtAbsenceMessage);

        // Custom icon font
        var myFont = new SMF.UI.Font({
            name: 'FontAwesome',
            size: '12pt',
            bold: false
        });

        // Reject Button
        // FontAwesome 'close icon' UTF8 code: uf00d
        var btnReject = new SMF.UI.TextButton({
            name: 'btnReject',
            font: fontAwesome,
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to reject this request?',
                    firstButtonText: 'Reject',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {
                        oRequestList[self.getState().targetRowIndex].Status = 'rejected';

                        alert({
                            title: 'Request rejected',
                            message: 'This leave request rejected and requester informed.',
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
        var btnSave = new SMF.UI.TextButton({
            name: 'btnSave',
            font: fontAwesome,
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to approve this request?',
                    firstButtonText: 'Approve',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {
                        oRequestList[self.getState().targetRowIndex].Status = 'approved';

                        alert({
                            title: 'Request approved',
                            message: 'This leave request approved and requester informed.',
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

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgOutOfOffice
         */
        function pgApproveLeaveRequest_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgOutOfOffice
         */
        function pgApproveLeaveRequest_onShow() {
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
            smfOracle.logAndFlushAnalytics('pgApproveLeaveRequest_onShow');
            tinyUtils.fixOverlayBug();
        }

        this.updatePageObjects = function(oRequest) {
            fillVacationMetrics(oRequest.TotalDays, oRequest.Used, oRequest.Remaining);

            // resetting every time
            imgAvatar.image = oRequest.Avatar;
            lblFullName.text = oRequest.FullName;
            lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;


            txtAbsenceMessage.text = oRequest.AbsenceMessage;
            lblLeaveType.text = oRequest.LeaveType;
            lblTimeUnit.text = oRequest.TimeUnit;

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
                    lblStartDate.text = _month + '.' + _day + '.' + _year;
                    selectedStartDate = date;
                }
                else {
                    alert('"Start Date" should be prior to "End Date"');
                }
            }
            else {
                if (date > selectedStartDate) {
                    lblEndDate.text = _month + '.' + _day + '.' + _year;
                    selectedEndDate = date;
                }
                else {
                    alert('"End Date" should be after "Start Date"');
                }

            }
            this.calculateDaysBetween();
        }

        // Calculates the day-count between Start and End Dates
        this.calculateDaysBetween = function() {

            var count, countText;
            if (lblTimeUnit.text === 'DAY') {
                count = tinyUtils.daysBetween(selectedStartDate.format('MM/dd/yyyy'), selectedEndDate.format('MM/dd/yyyy'));
                countText = (count > 1) ? 'days' : 'day';

            }
            else {
                count = tinyUtils.daysBetween(selectedStartDate, selectedEndDate, true) - ((selectedEndDate.format('HH') < 13) ? 0 : lunchBreakDuration);
                countText = (count > 1) ? 'hours' : 'hour';
                this.lblStartTime.text = selectedStartDate.format('HH:mm TT');
                this.lblEndTime.text = selectedEndDate.format('HH:mm TT');
            }

            cntBlueBox.lblSelectedDaysCount.text = count;
            cntBlueBox.lblSelectedDaysCountText.text = countText
        }

        // Drawing day-boxes 
        // Drawing day-boxes 
        function createVacationBoxes(parent) {
            //Total days box and texts
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
                text: 'Total'
            });
            componentStyler(".textCenter .5pt .Generic.lblTotalDays .Generic.lblTotalDaysText")(lblTotalDaysText);
            boxTotalDays.add(lblTotalDaysText);

            //Used days box and texts
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
                text: 'Used'
            });
            componentStyler(".textCenter .5pt .Generic.lblTotalDaysText .Generic.lblUsedDays")(lblUsedDaysText);
            boxUsed.add(lblUsedDaysText);


            //Remaining days box and texts
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
                text: 'Rem.'
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
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        // _proto.setRouteParams = function(targetRowIndex, request) {
        _proto.setRouteParams = function(params) {
            // inherited from UIComponent
            if (params) {
                this._changeState({
                    targetRowIndex: params.rowIndex,
                    oRequest: params.request
                });
            }
        };
        _proto.stateChangedHandler = function(state) {
            console.log(JSON.prune(state));
            this.updatePageObjects(state.oRequest)
        };
    });
module.exports = pgApproveLeaveRequest;
