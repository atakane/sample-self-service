/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:

(function() {
    var selectedStartDate;
    var selectedEndDate;

    var pgApproveLeaveRequest = Pages.pgApproveLeaveRequest = new SMF.UI.Page({
        name: "pgApproveLeaveRequest",
        onKeyPress: pgApproveLeaveRequest_onKeyPress,
        onShow: pgApproveLeaveRequest_onShow,
        recordID:0,
        oRequest: []
    });


    // createContainer(pgLeaveRequest, "cntVacationBoxes", "0", "64", "100%", "11.46926%", SMF.UI.Color.WHITE, false);


    //Profile
    //Profile
    createImage(pgApproveLeaveRequest, "imgAvatar", "", "5.3333%", "11.5442%", "14.4%", "8.0959%", SMF.UI.ImageFillType.ASPECTFIT);
    createLabel(pgApproveLeaveRequest, "lblFullName", "", "4.5333%", "20%", "53.3333%", "4.7376%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#27bc66");
    createLabel(pgApproveLeaveRequest, "lblTeamRole", "", "4.5333%", "24.7376%", "53.3333%", "3.4482%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#444444");


    var cntVacationBoxes = new SMF.UI.Container({
        name: "cntVacationBoxes",
        left: getUnit("51.2%"),
        top: getUnit(0),
        width: getUnit("48.8%"),
        height: getUnit("21.0644%"),
        fillColor: SMF.UI.Color.WHITE,
        backgroundTransparent: false,
        borderWidth: 0,
        roundedEdge: 0
    });
    pgApproveLeaveRequest.add(cntVacationBoxes);

    createVacationBoxes(cntVacationBoxes);

    //Lines
    // createImage(pgApproveLeaveRequest, "imgShadowLine", "shadow_line.png", "0", "21.0644%", "100%", "6", SMF.UI.ImageFillType.ASPECTFIT);
    createRectangle(pgApproveLeaveRequest, 0, "29.4152%", "100%", 1, "#e7e7e7");
    createRectangle(pgApproveLeaveRequest, 0, "40.8545%", "100%", 1, "#e7e7e7");
    createRectangle(pgApproveLeaveRequest, 0, "55.847%", "100%", 1, "#e7e7e7");
    createRectangle(pgApproveLeaveRequest, "49.90%", "40.8545%", 1, "14.9925%", "#e7e7e7");

    //Request

    createLabel(pgApproveLeaveRequest, "lblLeaveTypeText", "LEAVE TYPE", "4.5333%", "32.0389%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgApproveLeaveRequest, "lblTimeUnitText", "TIME UNIT", "60.4667%", "32.0389%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgApproveLeaveRequest, "lblLeaveType", "ANNUAL", "4.5333%", "35.8508%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "10pt", false, "#4a4a4a");
    createLabel(pgApproveLeaveRequest, "lblTimeUnit", "DAY", "60.4667%", "35.8508%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "10pt", false, "#4a4a4a");


    // Dates
    // Start Date
    createLabel(pgApproveLeaveRequest, "lblStart", "STARTS", "4.5333%", "42.5037%", "17%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgApproveLeaveRequest, "lblStartDate", "-", "4.5333%", "47.3013%", "37.3333%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");

    // End Date
    createLabel(pgApproveLeaveRequest, "lblEnd", "ENDS", "80.4667%", "42.5037%", "15%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgApproveLeaveRequest, "lblEndDate", "-", "60.4667%", "47.3013%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "12pt", false, "#4a4a4a");

    //Day Count Circle
    createImage(pgApproveLeaveRequest, "imgCenterCircle", "circle.png", (Device.screenWidth - 81)/2, "42.6536%", 81, 81);
    createLabel(pgApproveLeaveRequest, "lblSelectedDaysCount", "-", (Device.screenWidth - 81)/2, "45%", 81, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgApproveLeaveRequest, "lblSelectedDaysCountText", "", (Device.screenWidth - 81)/2, "48.7%", 81, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    createContainer(pgApproveLeaveRequest, "cntDescriptionBack", 0, "55.847%", "100%", "44.153%", "#e7e7e7", false);
    createLabel(pgApproveLeaveRequest, "lblStart", "DESCRIPTION", "4.4%", "58.4707%", "63.3508%", "3%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    //
    var txtAbsenceMessage = new SMF.UI.TextBox({
        name: "txtAbsenceMessage",
        text: '',
        left: getUnit("4.5333%"),
        top: getUnit("62.8935%"),
        width: getUnit("90.9334%"),
        height: getUnit("25%"),
        multipleLine: true,
        textAlignment: SMF.UI.TextAlignment.JUSTIFIED,
        borderWidth: 0,
        roundedEdge: 0,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#37404a",
        touchEnabled: false,
        enabled:false,
        backgroundTransparent: true
    })
    pgApproveLeaveRequest.add(txtAbsenceMessage);

    //(Device.brandModel.toLowerCase().includes("plus")) ? 80 : 40,
    var myFont = new SMF.UI.Font({
        name: "FontAwesome",
        size: (Device.brandModel.toLowerCase().includes("plus")) ? 80 : 50,
        bold: false
    });

    // close: uf00d
    createTextButtonWithCustomFont(pgApproveLeaveRequest,
        "btnReject",
        JSON.parse('""'),
        "0", "90.4048%", "50%", "9.5952%",
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#ee2736", "#eb2c3d",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to reject this request?',
                    firstButtonText: "Reject",
                    secondButtonText: "Cancel",
                    onFirstButtonPressed: function() {
                        oRequestList[pgApproveLeaveRequest.recordID].Status = "rejected";

                        alert({
                            title: 'Request rejected',
                            message: 'This leave request rejected and requester informed.',
                            firstButtonText: "OK",
                            onFirstButtonPressed: function()
                            {
                                Pages.pgApprovalWorklist.show(reverseDefaultPageAnimation);
                            }});
                    },
                    onSecondButtonPressed: function() {}
                });
        });

    // check: uf00c
    createTextButtonWithCustomFont(pgApproveLeaveRequest,
        "btnSave",
        JSON.parse('""'),
        "50%", "90.4048%", "50%", "9.5952%",
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#7ed321", "#5b9918",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
              alert({
                    title: 'Warning!',
                    message: 'Do you want to approve this request?',
                    firstButtonText: "Approve",
                    secondButtonText: "Cancel",
                    onFirstButtonPressed: function() {
                        oRequestList[pgApproveLeaveRequest.recordID].Status = "approved";
                    
                        alert({
                            title: 'Request approved',
                            message: 'This leave request approved and requester informed.',
                            firstButtonText: "OK",
                            onFirstButtonPressed: function()
                            {
                                Pages.pgApprovalWorklist.show(reverseDefaultPageAnimation);
                            }});
                        
                    },
                    onSecondButtonPressed: function() {}
                });            

        });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgOutOfOffice
     */
    function pgApproveLeaveRequest_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(reverseDefaultPageAnimation);
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

        addHeaderBar();


        fillVacationMetrics(pgApproveLeaveRequest.oRequest.TotalDays, pgApproveLeaveRequest.oRequest.Used, pgApproveLeaveRequest.oRequest.Remaining);

        // resetting each time
        pgApproveLeaveRequest.imgAvatar.image = pgApproveLeaveRequest.oRequest.Avatar;
        pgApproveLeaveRequest.lblFullName.text = pgApproveLeaveRequest.oRequest.FullName;
        pgApproveLeaveRequest.lblTeamRole.text = pgApproveLeaveRequest.oRequest.Role + " / " + pgApproveLeaveRequest.oRequest.Team;


        pgApproveLeaveRequest.txtAbsenceMessage.text = pgApproveLeaveRequest.oRequest.AbsenceMessage;
        pgApproveLeaveRequest.lblLeaveType.text = pgApproveLeaveRequest.oRequest.LeaveType;
        pgApproveLeaveRequest.lblTimeUnit.text = pgApproveLeaveRequest.oRequest.TimeUnit;

        // dates
        selectedStartDate = new Date(pgApproveLeaveRequest.oRequest.StartDate);
        selectedEndDate = new Date(pgApproveLeaveRequest.oRequest.EndDate);

        setDateLabels(selectedStartDate, true);
        setDateLabels(selectedEndDate, false);

        calculateDaysBetween();
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        // console.log(SMF.UI.iOS.NavigationBar.translucent);
        headerBar.setTitleView(Pages.currentPage, "Approve Request", "#248afd", null, 0, 0, 240, 44, 20);

        headerBar.setLeftItemImage("back.png", function() {
            Pages.back();
        });

    }


    function setDateLabels(date, isStartDate) {
        // var currentStartDate = pgDashboard.myProfile.OutOfOfficeStart;
        // var currentStartDate = pgDashboard.myProfile.OutOfOfficeEnd;
        var _day = ('00' + date.getDate()).right(2);
        var _month = ('00' + (date.getMonth() + 1)).right(2);
        var _year = date.getFullYear().toString().right(2);

        if (isStartDate) {
            if (date < selectedEndDate) {
                pgApproveLeaveRequest.lblStartDate.text = _month + "." + _day + "." + _year;
                selectedStartDate = date;
            }
            else {
                alert('"Start Date" should be prior to "End Date"');
            }
        }
        else {
            if (date > selectedStartDate) {
                pgApproveLeaveRequest.lblEndDate.text = _month + "." + _day + "." + _year;
                selectedEndDate = date;
            }
            else {
                alert('"End Date" should be after "Start Date"');
            }

        }
        calculateDaysBetween();
    }

    function calculateDaysBetween() {
        console.log("selectedStartDate = " + selectedStartDate.format("MM/dd/yyyy"));
        console.log("selectedEndDate = " + selectedEndDate.format("MM/dd/yyyy"));

        var days = daysBetween(selectedStartDate.format("MM/dd/yyyy"), selectedEndDate.format("MM/dd/yyyy"));
        console.log("days = " + days);

        pgApproveLeaveRequest.lblSelectedDaysCount.text = days;
        pgApproveLeaveRequest.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
    }

    // Drawing day-boxes 
    function createVacationBoxes(parent) {
        var boxTotalDays = new SMF.UI.Container({
            name: "boxTotalDays",
            left: getUnit("4%"),
            top: getUnit("55.87188%"),
            width: getUnit("27.3224%"),
            height: getUnit("37.0106%"),
            borderWidth: 1,
            borderColor: "#979797",
            roundedEdge: 0
        });

        createLabel(boxTotalDays, "lblTotalDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#979797");
        createLabel(boxTotalDays, "lblTotalDaysText", "Total", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#979797");

        var boxUsed = new SMF.UI.Container({
            name: "boxUsed",
            left: getUnit("34.601%"),
            top: getUnit("55.87188%"),
            width: getUnit("27.3224%"),
            height: getUnit("37.0106%"),
            borderWidth: 1,
            borderColor: "#cca2b5",
            roundedEdge: 0
        });

        createLabel(boxUsed, "lblUsedDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#cca2b5");
        createLabel(boxUsed, "lblUsedDaysText", "Used", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#cca2b5");

        var boxRemaining = new SMF.UI.Container({
            name: "boxRemaining",
            left: getUnit("65.2021%"),
            top: getUnit("55.87188%"),
            width: getUnit("30%"),
            height: getUnit("38.4341%"),
            borderWidth: 0,
            roundedEdge: 0
        });

        createImage(boxRemaining, "imgRemaining", "square_stripe.png", "0", "0", "100%", "100%", SMF.UI.ImageFillType.ASPECTFIT);
        createLabel(boxRemaining, "lblRemainingDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#37404a");
        createLabel(boxRemaining, "lblRemainingDaysText", "Rem.", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#37404a");

        parent.add(boxTotalDays);
        parent.add(boxUsed);
        parent.add(boxRemaining);
    }

    // We'll use this function when a new update occurs
    function fillVacationMetrics(TotalDays, Used, Remaining) {
        pgApproveLeaveRequest.cntVacationBoxes.boxTotalDays.lblTotalDays.text = TotalDays;
        pgApproveLeaveRequest.cntVacationBoxes.boxUsed.lblUsedDays.text = Used;
        pgApproveLeaveRequest.cntVacationBoxes.boxRemaining.lblRemainingDays.text = Remaining;
    }


})();
