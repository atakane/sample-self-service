/* globals Dialog getUnit createImage createLabel createRectangle createContainer createTextButtonWithCustomFont
targetID filterOutByID oRequestList oProfile reverseDefaultPageAnimation daysBetween
*/

(function() {
    var selectedStartDate;
    var selectedEndDate;

    var pgMyRequestDetail = Pages.pgMyRequestDetail = new SMF.UI.Page({
        name: 'pgMyRequestDetail',
        onKeyPress: pgMyRequestDetail_onKeyPress,
        onShow: pgMyRequestDetail_onShow,
        oRequest: []
    });

    // Profile
    createImage(pgMyRequestDetail, 'imgAvatar', '', '5.3333%', getUnit({iOS:'11.5442%',Android:'13.5442%'}), '14.4%', '8.0959%', SMF.UI.ImageFillType.ASPECTFIT);
    createLabel(pgMyRequestDetail, 'lblFullName', '', '4.5333%', getUnit({iOS:'20%',Android:'22%'}), '53.3333%', '4.7376%', SMF.UI.TextAlignment.LEFT, false, '12pt', false, '#27bc66');
    createLabel(pgMyRequestDetail, 'lblTeamRole', '', '4.5333%', getUnit({iOS:'24.7376%',Android:'26.7376%'}), '53.3333%', '3.4482%', SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#444444');

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
    pgMyRequestDetail.add(cntVacationBoxes);

    createVacationBoxes(cntVacationBoxes);

    //Lines
    createRectangle(pgMyRequestDetail, 0, getUnit({iOS:'29.4152%',Android:'31.4152%'}), '100%', 1, '#e7e7e7');
    createRectangle(pgMyRequestDetail, 0, getUnit({iOS:'40.8545%',Android:'42.8545%'}), '100%', 1, '#e7e7e7');
    createRectangle(pgMyRequestDetail, 0, getUnit({iOS:'55.847%',Android:'57.847%'}), '100%', 1, '#e7e7e7');

    // Request Details
    createLabel(pgMyRequestDetail, 'lblLeaveTypeText', 'LEAVE TYPE', '4.5333%', getUnit({iOS:'32.0389%',Android:'32.0389%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    createLabel(pgMyRequestDetail, 'lblTimeUnitText', 'TIME UNIT', '60.4667%', getUnit({iOS:'32.0389%',Android:'32.0389%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');

    createLabel(pgMyRequestDetail, 'lblLeaveType', 'PERSONAL', '4.5333%', getUnit({iOS:'35.8508%',Android:'35.8508%'}), '40%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '10pt', false, '#4a4a4a');
    createLabel(pgMyRequestDetail, 'lblTimeUnit', 'DAY', '60.4667%', getUnit({iOS:'35.8508%',Android:'35.8508%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '10pt', false, '#4a4a4a');

    // Start Date
    createLabel(pgMyRequestDetail, 'lblStart', 'STARTS', '4.5333%', getUnit({iOS:'42.5037%',Android:'44.5037%'}), '17%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    createLabel(pgMyRequestDetail, 'lblStartDate', '-', '4.5333%', getUnit({iOS:'47.3013%',Android:'49.3013%'}), '37.3333%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '12pt', false, '#4a4a4a');

    // End Date
    createLabel(pgMyRequestDetail, 'lblEnd', 'ENDS', '80.4667%', getUnit({iOS:'42.5037%',Android:'44.5037%'}), '15%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
    createLabel(pgMyRequestDetail, 'lblEndDate', '-', '60.4667%', getUnit({iOS:'47.3013%',Android:'49.3013%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '12pt', false, '#4a4a4a');

    //Day Count Box
    var cntBlueBox = new SMF.UI.Container({
        name: 'cntBlueBox',
        left: '40%',
        width: '20%',
        top: getUnit({iOS:'40.8545%',Android:'42.8545%'}),
        height: getUnit('14.9925%'),
        borderWidth: 0,
        fillColor: '#248afd',
        backgroundTransparent: false
    });
    pgMyRequestDetail.add(cntBlueBox);
    createLabel(cntBlueBox, 'lblSelectedDaysCount', '-', '0', getUnit({iOS:'28%',Android:'20%'}), '100%', getUnit({iOS:'30%', Android:'40%'}), SMF.UI.TextAlignment.CENTER, false, '16pt', true, '#ffffff');
    createLabel(cntBlueBox, 'lblSelectedDaysCountText', 'day', '0', getUnit({iOS:'60%',Android:'60%'}), '100%', getUnit({iOS:'20%', Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#ffffff');

    createContainer(pgMyRequestDetail, 'cntDescriptionBack', 0, getUnit({iOS:'55.847%',Android:'57.847%'}), '100%', '44.153%', '#e7e7e7', false);
    createLabel(pgMyRequestDetail, 'lblStart', 'DESCRIPTION', '4.4%', getUnit({iOS:'58.4707%',Android:'60.4707%'}), '63.3508%', '3%', SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');

    // Textbox for Absence Message
    var txtAbsenceMessage = new SMF.UI.TextBox({
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
        fontColor: '#37404a',
        touchEnabled: false,
        enabled: false,
        backgroundTransparent: true
    })
    pgMyRequestDetail.add(txtAbsenceMessage);


    // Custom icon font
    var myFont = new SMF.UI.Font({
        name: 'FontAwesome',
        size: '12pt',
        bold: false
    });

    // Delete Button
    // FontAwesome 'delete icon' UTF8 code: 'uf08b'
    createTextButtonWithCustomFont(pgMyRequestDetail,
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
                    targetID = pgMyRequestDetail.oRequest.ID;
                    console.log(targetID);
                    oRequestList = oRequestList.filter(filterOutByID)

                    //Updating Stats (this should return from real service when we connected. For now updating the mock)
                    oProfile.LeaveRequestCount = oProfile.LeaveRequestCount - 1;

                    alert({
                        title: 'Request deleted',
                        message: 'This leave request deleted.',
                        firstButtonText: 'OK',
                        onFirstButtonPressed: function() {
                            Pages.pgMyRequests.show(reverseDefaultPageAnimation);
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
            Pages.back(reverseDefaultPageAnimation);
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
        addHeaderBar();

        fillVacationMetrics(pgMyRequestDetail.oRequest.TotalDays, pgMyRequestDetail.oRequest.Used, pgMyRequestDetail.oRequest.Remaining);

        // resetting every time
        pgMyRequestDetail.imgAvatar.image = pgMyRequestDetail.oRequest.Avatar;
        pgMyRequestDetail.lblFullName.text = pgMyRequestDetail.oRequest.FullName;
        pgMyRequestDetail.lblTeamRole.text = pgMyRequestDetail.oRequest.Role + ' / ' + pgMyRequestDetail.oRequest.Team;


        pgMyRequestDetail.txtAbsenceMessage.text = pgMyRequestDetail.oRequest.AbsenceMessage;
        pgMyRequestDetail.lblLeaveType.text = pgMyRequestDetail.oRequest.LeaveType;
        pgMyRequestDetail.lblTimeUnit.text = pgMyRequestDetail.oRequest.TimeUnit;

        // dates
        selectedStartDate = new Date(pgMyRequestDetail.oRequest.StartDate);
        selectedEndDate = new Date(pgMyRequestDetail.oRequest.EndDate);

        setDateLabels(selectedStartDate, true);
        setDateLabels(selectedEndDate, false);

        // Calculating the day-count according to given Start and End dates
        calculateDaysBetween();

        // Oracle MCS Analytics logging 
        smfOracle.logAndFlushAnalytics('pgMyRequestDetail_onShow');
        fixOverlayBug();
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        // console.log(SMF.UI.iOS.NavigationBar.translucent);
        headerBar.setTitleView(Pages.currentPage, 'My Leave Request', '#248afd', null, 0, 0, 240, 44, 20);

        headerBar.setLeftItemImage('back.png', function() {
            Pages.back(reverseDefaultPageAnimation);
        });

    }

    // Setting the date labels according to their relations between each other
    function setDateLabels(date, isStartDate) {
        var _day = ('00' + date.getDate()).right(2);
        var _month = ('00' + (date.getMonth() + 1)).right(2);
        var _year = date.getFullYear().toString().right(2);

        if (isStartDate) {
            if (date < selectedEndDate) {
                pgMyRequestDetail.lblStartDate.text = _month + '.' + _day + '.' + _year;
                selectedStartDate = date;
            }
            else {
                alert('"Start Date" should be prior to "End Date"');
            }
        }
        else {
            if (date > selectedStartDate) {
                pgMyRequestDetail.lblEndDate.text = _month + '.' + _day + '.' + _year;
                selectedEndDate = date;
            }
            else {
                alert('"End Date" should be after "Start Date"');
            }

        }
        calculateDaysBetween();
    }

    // Calculates the day-count between Start and End Dates
    function calculateDaysBetween() {
        console.log('selectedStartDate = ' + selectedStartDate.format('MM/dd/yyyy'));
        console.log('selectedEndDate = ' + selectedEndDate.format('MM/dd/yyyy'));

        var days = daysBetween(selectedStartDate.format('MM/dd/yyyy'), selectedEndDate.format('MM/dd/yyyy'));

        pgMyRequestDetail.cntBlueBox.lblSelectedDaysCount.text = days;
        pgMyRequestDetail.cntBlueBox.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
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

        createLabel(boxTotalDays, 'lblTotalDays', '-', '0', getUnit({iOS:'20%',Android:'5%'}), '100%', getUnit({iOS:'40%',Android:'55%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#979797');
        createLabel(boxTotalDays, 'lblTotalDaysText', 'Total', '0', getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#979797');


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

        createLabel(boxUsed, 'lblUsedDays', '-', '0', getUnit({iOS:'20%',Android:'5%'}), '100%', getUnit({iOS:'40%',Android:'55%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#cca2b5');
        createLabel(boxUsed, 'lblUsedDaysText', 'Used', '0', getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#cca2b5');

        var boxRemaining = new SMF.UI.Container({
            name: 'boxRemaining',
            left: getUnit('35.2%'),
            top: getUnit('55.87188%'),
            width: getUnit('13.8933%'),
            height: getUnit('37.0106%'),
            borderWidth: 0,
            roundedEdge: 0
        });

        createImage(boxRemaining, 'imgRemaining', 'square_stripe.png', '0', '0', '100%', '100%', SMF.UI.ImageFillType.ASPECTFIT);
        createLabel(boxRemaining, 'lblRemainingDays', '-', '0', getUnit({iOS:'20%',Android:'5%'}), '100%', getUnit({iOS:'40%',Android:'55%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', true, '#37404a');
        createLabel(boxRemaining, 'lblRemainingDaysText', 'Rem.', 0, getUnit({iOS:'70%',Android:'65%'}), '100%', getUnit({iOS:'20%',Android:'30%'}), SMF.UI.TextAlignment.CENTER, false, '5pt', false, '#37404a');

        parent.add(boxTotalDays);
        parent.add(boxUsed);
        parent.add(boxRemaining);
    }

    // We trigger this function when a new update occurs
    function fillVacationMetrics(TotalDays, Used, Remaining) {
        pgMyRequestDetail.cntVacationBoxes.boxTotalDays.lblTotalDays.text = TotalDays;
        pgMyRequestDetail.cntVacationBoxes.boxUsed.lblUsedDays.text = Used;
        pgMyRequestDetail.cntVacationBoxes.boxRemaining.lblRemainingDays.text = Remaining;
    }
})();
