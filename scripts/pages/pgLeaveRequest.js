/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:

(function() {
    var leaveTypeSelectedIndex;
    var timeUnitSelectedIndex;

    var selectedStartDate;
    var selectedEndDate;

    var pgLeaveRequest = Pages.pgLeaveRequest = new SMF.UI.Page({
        name: "pgLeaveRequest",
        onKeyPress: pgOutOfOffice_onKeyPress,
        onShow: pgOutOfOffice_onShow
    });

    // createContainer(pgLeaveRequest, "cntVacationBoxes", "0", "64", "100%", "11.46926%", SMF.UI.Color.WHITE, false);

    var cntVacationBoxes = new SMF.UI.Container({
        name: "cntVacationBoxes",
        left: getUnit(0),
        top: getUnit(0),
        width: getUnit("100%"),
        height: getUnit("21.0644%"),
        fillColor: SMF.UI.Color.WHITE,
        backgroundTransparent: false,
        borderWidth: 0,
        roundedEdge: 0
    });
    pgLeaveRequest.add(cntVacationBoxes);

    createVacationBoxes(cntVacationBoxes);

    //Lines
    createImage(pgLeaveRequest, "imgShadowLine", "shadow_line.png", "0", "21.0644%", "100%", "6", SMF.UI.ImageFillType.ASPECTFIT);
    createRectangle(pgLeaveRequest, 0, "32.5037%", "100%", 1, "#e7e7e7");
    createRectangle(pgLeaveRequest, 0, "47.4962%", "100%", 1, "#e7e7e7");
    createRectangle(pgLeaveRequest, "49.90%", "32.5037%", 1, "14.9925%", "#e7e7e7");

    //Request

    createLabel(pgLeaveRequest, "lblLeaveTypeText", "LEAVE TYPE", "4.5333%", "23.68815%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgLeaveRequest, "lblTimeUnitText", "TIME UNIT", "60.4667%", "23.68815%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgLeaveRequest, "lblLeaveType", "ANNUAL", "4.5333%", "27.5%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "10pt", false, "#4a4a4a", pickLeaveType);
    createLabel(pgLeaveRequest, "lblTimeUnit", "DAY", "60.4667%", "27.5%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "10pt", false, "#4a4a4a", pickTimeUnit);


    // Dates
    // Start Date
    createLabel(pgLeaveRequest, "lblStart", "STARTS", "4.5333%", "34.1529%", "17%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgLeaveRequest, "lblStartDate", "-", "4.5333%", "38.9505%", "37.3333%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgLeaveRequest, "cntSelectStartDate", "4.5333%", "38.9505%", "37.3333%", "6.5967%", SMF.UI.Color.WHITE, true, function() {
        showDateTimePicker(true);
    });

    // End Date
    createLabel(pgLeaveRequest, "lblEnd", "ENDS", "80.4667%", "34.1529%", "15%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgLeaveRequest, "lblEndDate", "-", "60.4667%", "38.9505%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "12pt", false, "#4a4a4a");

    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgLeaveRequest, "cntSelectEndDate", "67%", "38.9505%", "37.3333%", "6.5967%", SMF.UI.Color.WHITE, true, function() {
        showDateTimePicker();
    });

    //Day Count Circle
    createImage(pgLeaveRequest, "imgCenterCircle", "circle.png", "39.2%", "34.3028%", 81, 81);
    createLabel(pgLeaveRequest, "lblSelectedDaysCount", "-", "39.4666%", "37.1514%", 79, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgLeaveRequest, "lblSelectedDaysCountText", "", "39.4666%", "40.7496%", 79, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    createLabel(pgLeaveRequest, "lblStart", "DESCRIPTION", "4.4%", "50.1199%", "55%", "3%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    //
    var txtAbsenceMessage = new SMF.UI.TextBox({
        name: "txtAbsenceMessage",
        placeHolder: 'Please add your "Absence" reason briefly',
        text: '',
        left: getUnit("4.5333%"),
        top: getUnit("54.54271%"),
        width: getUnit("90.9334%"),
        height: getUnit("35.982%"),
        multipleLine: true,
        textAlignment: SMF.UI.TextAlignment.JUSTIFIED,
        borderWidth: 0,
        roundedEdge: 0,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#37404a"
    })
    pgLeaveRequest.add(txtAbsenceMessage);

    //(Device.brandModel.toLowerCase().includes("plus")) ? 80 : 40,
    var myFont = new SMF.UI.Font({
        name: "FontAwesome",
        size: "10pt",
        bold: false
    });

    // check: uf00c
    createTextButtonWithCustomFont(pgLeaveRequest,
        "btnSave",
        JSON.parse('""'),
        0, "90.4048%", "100%", "9.5952%",
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#f64b95", "#ebc0d3",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
            var myRequest = {
                "EmployeeID": "999999",
                "FullName": oProfile.FullName,
                "Email": oProfile.Email,
                "Team": oProfile.Team,
                "Role": oProfile.Role,
                "StartDate": selectedStartDate,
                "EndDate": selectedEndDate,
                "TimeUnit": pgLeaveRequest.lblTimeUnit.text,
                "LeaveType": pgLeaveRequest.lblLeaveType.text,
                "AbsenceMessage": JSON.stringify(pgLeaveRequest.txtAbsenceMessage.text),
                "IsApproved": false
            }

            oRequestList.push(myRequest);


            alert('Your "Leave of Absence" request has been forwarded for approval.');

            Pages.pgDashboard.show(defaultPageAnimation);
        });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgOutOfOffice
     */
    function pgOutOfOffice_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(defaultPageAnimation);
        }
    }

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgOutOfOffice
     */
    function pgOutOfOffice_onShow() {
        //We are going w/ dark mode. Our navbar is white.
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

        // var sliderDrawer = new SliderDrawer();
        // sliderDrawer.init(Pages.currentPage);
        createSliderDrawer(Pages.pgLeaveRequest, "sdMenuLeaveRequest");

        addHeaderBar();


        fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);


        // resetting each time
        pgLeaveRequest.txtAbsenceMessage.text = '';
        pgLeaveRequest.lblLeaveType.text = 'ANNUAL';
        pgLeaveRequest.lblTimeUnit.text = 'DAY';
        leaveTypeSelectedIndex = 0;
        timeUnitSelectedIndex = 0;

        // dates
        selectedStartDate = new Date();
        selectedEndDate = (new Date()).addDays(7);

        setDateLabels(selectedStartDate, true);
        setDateLabels(selectedEndDate, false);

        calculateDaysBetween();
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        // console.log(SMF.UI.iOS.NavigationBar.translucent);
        headerBar.setTitleView(Pages.currentPage, "Leave of Absence", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgLeaveRequest.sdMenuLeaveRequest.show(): Pages.pgLeaveRequest.sdMenuLeaveRequest.hide();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
        }
        else {
            Pages.currentPage.actionBar.displayShowHomeEnabled = true;
            Pages.currentPage.actionBar.icon = "menu.png";
        }

    }

    function showDateTimePicker(isStartDate) {
        SMF.UI.showDatePicker({
            currentDate: (isStartDate) ? selectedStartDate : selectedEndDate, //(new Date()).toString(), // date is given with JavaScript date object
            mask: "dd-MM-yyyy",
            minDate: (new Date()),
            maxDate: (new Date()).addDays(90),
            showWorkingDate: true,
            onSelect: function(e) {
                var sDate = new Date(e.date);

                setDateLabels(sDate, isStartDate);
            },
            onCancel: function(e) {
                //alert("Picker cancelled!");
            }
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
                pgLeaveRequest.lblStartDate.text = _month + "." + _day + "." + _year;
                selectedStartDate = date;
            }
            else {
                alert('"Start Date" should be prior to "End Date"');
            }
        }
        else {
            if (date > selectedStartDate) {
                pgLeaveRequest.lblEndDate.text = _month + "." + _day + "." + _year;
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

        pgLeaveRequest.lblSelectedDaysCount.text = days;
        pgLeaveRequest.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
    }

    // Drawing day-boxes 
    function createVacationBoxes(parent) {
        var boxTotalDays = new SMF.UI.Container({
            name: "boxTotalDays",
            left: getUnit("3.76%"),
            top: getUnit("55.87188%"),
            width: getUnit("13.8933%"),
            height: getUnit("37.0106%"),
            borderWidth: 1,
            borderColor: "#979797",
            roundedEdge: 0
        });

        createLabel(boxTotalDays, "lblTotalDays", "-", "0", "0", "100%", "100%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#979797");

        var boxUsed = new SMF.UI.Container({
            name: "boxUsed",
            left: getUnit("19.41333%"),
            top: getUnit("55.87188%"),
            width: getUnit("13.8933%"),
            height: getUnit("37.0106%"),
            borderWidth: 1,
            borderColor: "#cca2b5",
            roundedEdge: 0
        });

        createLabel(boxUsed, "lblUsedDays", "-", "0", "0", "100%", "100%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#cca2b5");

        var boxRemaining = new SMF.UI.Container({
            name: "boxRemaining",
            left: getUnit("35.2%"),
            top: getUnit("55.87188%"),
            width: getUnit("13.8933%"),
            height: getUnit("37.0106%"),
            borderWidth: 0,
            roundedEdge: 0
        });

        createImage(boxRemaining, "imgRemaining", "square_stripe.png", "0", "0", "100%", "100%", SMF.UI.ImageFillType.ASPECTFIT);
        createLabel(boxRemaining, "lblRemainingDays", "-", "0", "0", "100%", "100%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#37404a");

        parent.add(boxTotalDays);
        parent.add(boxUsed);
        parent.add(boxRemaining);
    }

    // We'll use this function when a new update occurs
    function fillVacationMetrics(TotalDays, Used, Remaining) {
        pgLeaveRequest.cntVacationBoxes.boxTotalDays.lblTotalDays.text = TotalDays;
        pgLeaveRequest.cntVacationBoxes.boxUsed.lblUsedDays.text = Used;
        pgLeaveRequest.cntVacationBoxes.boxRemaining.lblRemainingDays.text = Remaining;
    }

    function pickLeaveType() {
        var leaveTypes = ["ANNUAL", "DAILY", "MEDICAL"];
        pick(
            leaveTypes,
            (leaveTypeSelectedIndex) ? leaveTypeSelectedIndex : 0,
            function(e) {
                pgLeaveRequest.lblLeaveType.text = leaveTypes[e.index];
                leaveTypeSelectedIndex = e.index;
            },
            function() {}
        );

    }

    function pickTimeUnit() {
        var timeUnits = ["DAY", "HOUR"];
        pick(
            timeUnits,
            (timeUnitSelectedIndex) ? timeUnitSelectedIndex : 0,
            function(e) {
                pgLeaveRequest.lblTimeUnit.text = timeUnits[e.index];
                timeUnitSelectedIndex = e.index;
            },
            function() {}
        );

    }
})();
