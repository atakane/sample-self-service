/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:

(function() {
    var leaveTypeSelectedIndex;
    var timeUnitSelectedIndex;

    var selectedStartDate;
    var selectedEndDate;

    var pgLeaveRequest = Pages.pgLeaveRequest = new SMF.UI.Page({
        name: "pgLeaveRequest",
        onKeyPress: pgLeaveRequest_onKeyPress,
        onShow: pgLeaveRequest_onShow
    });


    // var sliderDrawer = new SliderDrawer();
    // sliderDrawer.init(Pages.currentPage);
    createSliderDrawer(Pages.pgLeaveRequest, "sdSelfService");

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
    createImage(pgLeaveRequest, "imgShadowLine", "shadow_line.png", "0", "21.0644%", "100%", "6", SMF.UI.ImageFillType.STRETCH);
    createRectangle(pgLeaveRequest, 0, "32.5037%", "100%", 1, "#e7e7e7");
    createRectangle(pgLeaveRequest, 0, "47.4962%", "100%", 1, "#e7e7e7");
    createRectangle(pgLeaveRequest, "49.90%", "32.5037%", 1, "14.9925%", "#e7e7e7");

    //Request

    createLabel(pgLeaveRequest, "lblLeaveTypeText", "LEAVE TYPE", "4.5333%", "23.68815%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgLeaveRequest, "lblTimeUnitText", "TIME UNIT", "60.4667%", "23.68815%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgLeaveRequest, "lblLeaveType", "ANNUAL", "4.5333%", "27.5%", "40%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "10pt", false, "#4a4a4a", pickLeaveType);
    createLabel(pgLeaveRequest, "lblTimeUnit", "DAY", "60.4667%", "27%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "10pt", false, "#4a4a4a", pickTimeUnit);

    //pickTimeUnit


    // Dates
    // Start Date
    var cntStarts = new SMF.UI.Container({
        name: "cntStarts",
        left: "4.53%",
        top: "34.8%",
        height: "12%",
        width: "27.6%",
        borderWidth: 0,
        backgroundTransparent: true,
        onTouchEnded: function(e) {
            showDateTimePicker(true);
        }
    });

    createLabel(cntStarts, "lblStart", "STARTS", 0, 0, "100%", "15%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(cntStarts, "lblStartDate", "-", 0, "30%", "100%", "30%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    createLabel(cntStarts, "lblStartTime", "", 0, "70%", "100%", "20%", SMF.UI.TextAlignment.RIGHT, false, "8pt", false, "#4a4a4a");

    pgLeaveRequest.add(cntStarts);

    // End Date
    var cntEnds = new SMF.UI.Container({
        name: "cntEnds",
        left: "65%",
        top: "34.8%",
        height: "12%",
        width: "30.6%",
        borderWidth: 0,
        backgroundTransparent: true,
        onTouchEnded: function(e) {
            showDateTimePicker(false);
        }
    });

    createLabel(cntEnds, "lblEnd", "ENDS", 0, 0, "100%", "15%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");
    createLabel(cntEnds, "lblEndDate", "11.25.16", 0, "30%", "100%", "30%", SMF.UI.TextAlignment.RIGHT, false, "12pt", false, "#4a4a4a");
    createLabel(cntEnds, "lblEndTime", "", 0, "70%", "100%", "20%", SMF.UI.TextAlignment.RIGHT, false, "8pt", false, "#4a4a4a");

    pgLeaveRequest.add(cntEnds);

    //Day Count Circle
    createImage(pgLeaveRequest, "imgCenterCircle", "circle.png", (Device.screenWidth - 81) / 2, "34.3028%", 81, 81);
    createLabel(pgLeaveRequest, "lblSelectedDaysCount", "-", (Device.screenWidth - 81) / 2, "37.1514%", 81, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgLeaveRequest, "lblSelectedDaysCountText", "", (Device.screenWidth - 81) / 2, "40.7496%", 81, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

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

    var myFont = new SMF.UI.Font({
        name: "FontAwesome",
        size: (Device.brandModel.toLowerCase().includes("plus")) ? 80 : 50,
        bold: false
    });

    // check: uf00c
    createTextButtonWithCustomFont(pgLeaveRequest,
        "btnSave",
        JSON.parse('""'),
        0, "90.4048%", "100%", "9.5952%",
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#7ed321", "#5b9918",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
            alert({
                title: 'Warning!',
                message: 'Do you want to make this request?',
                firstButtonText: "Submit",
                secondButtonText: "Cancel",
                onFirstButtonPressed: function() {
                    //Sample
                    var myRequest = {
                        "EmployeeID": oProfile.EmployeeID,
                        "FullName": oProfile.FullName,
                        "Email": oProfile.Email,
                        "Avatar": "avatar.png",
                        "Team": oProfile.Team,
                        "Role": oProfile.Role,
                        "StartDate": selectedStartDate,
                        "EndDate": selectedEndDate,
                        "TimeUnit": pgLeaveRequest.lblTimeUnit.text,
                        "LeaveType": pgLeaveRequest.lblLeaveType.text,
                        "AbsenceMessage": JSON.stringify(pgLeaveRequest.txtAbsenceMessage.text),
                        "Status": "waiting",
                        "TotalDays": oTimeTable.TotalDays,
                        "Used": oTimeTable.Used,
                        "Remaining": oTimeTable.Remaining
                    }

                    oRequestList.push(myRequest);

                    alert({
                        title: 'Request submitted',
                        message: 'Your "Leave of Absence" request has been forwarded for approval.',
                        firstButtonText: "OK",
                        onFirstButtonPressed: function() {
                            Pages.pgStatus.show(reverseDefaultPageAnimation);
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
    function pgLeaveRequest_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(reverseDefaultPageAnimation);
        }
    }

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgOutOfOffice
     */
    function pgLeaveRequest_onShow() {
        //We are going w/ dark mode. Our navbar is white.
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

        addHeaderBar();

        fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);

        // resetting each time
        pgLeaveRequest.sdSelfService.imgSliderAvatar.image = oProfile.Avatar;
        pgLeaveRequest.sdSelfService.lblSliderFullName.text = oProfile.FullName;
        pgLeaveRequest.sdSelfService.lblSliderTeamRole.text = oProfile.Role + " / " + oProfile.Team;


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
        headerBar.setTitleView(Pages.currentPage, "New Leave Request", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgLeaveRequest.sdSelfService.show(): Pages.pgLeaveRequest.sdSelfService.hide();
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
            maxDate: (new Date()).addDays(365),
            showWorkingDate: true,
            onSelect: function(e) {
                var sDate = new Date(e.date);

                setDateLabels(sDate, isStartDate);

                if (pgLeaveRequest.lblTimeUnit.text === "HOUR") {
                    SMF.UI.showTimePicker({
                        currentTime: (isStartDate) ? "07:00" : "18:30",
                        hourViewFormat24: true,
                        minuteInterval: 5,
                        minTime: "06:00",
                        maxTime: "18:30",
                        onSelect: function(e) {
                            var t = new Date(e.time);
                            var selectedTime = t.getHours() + ':' + ('00' + t.getMinutes()).right(2);

                            if (isStartDate) {
                                pgLeaveRequest.cntStarts.lblStartTime.text = selectedTime;
                            }
                            else {
                                pgLeaveRequest.cntEnds.lblEndTime.text = selectedTime;
                            }
                        },
                        onCancel: function() {}
                    });

                }
                else {
                    pgLeaveRequest.cntStarts.lblStartTime.text = pgLeaveRequest.cntEnds.lblEndTime.text = "";
                }
            },
            onCancel: function(e) {
                //alert("Picker cancelled!");
            }
        });
    }

    function setDateLabels(date, isStartDate) {
        // var currentStartDate = pgStatus.myProfile.OutOfOfficeStart;
        // var currentStartDate = pgStatus.myProfile.OutOfOfficeEnd;
        var _day = ('00' + date.getDate()).right(2);
        var _month = ('00' + (date.getMonth() + 1)).right(2);
        var _year = date.getFullYear().toString().right(2);
        var _hour = date.getHours();
        var _min = date.getMinutes();
        var _time = ('00' + _hour).right(2) + ':' + ('00' + _min).right(2);

        if (pgLeaveRequest.lblTimeUnit.text === "HOUR") {
            if (isStartDate) {
                pgLeaveRequest.cntStarts.lblStartTime.text = _time;
            }
            else {
                pgLeaveRequest.cntEnds.lblEndTime.text = _time;
            }
        }

        if (isStartDate) {
            if (date < selectedEndDate) {
                pgLeaveRequest.cntStarts.lblStartDate.text = _month + "." + _day + "." + _year;
                selectedStartDate = date;
            }
            else {
                alert('"Start Date" should be prior to "End Date"');
            }
        }
        else {
            if (date > selectedStartDate) {
                pgLeaveRequest.cntEnds.lblEndDate.text = _month + "." + _day + "." + _year;
                selectedEndDate = date;
            }
            else {
                alert('"End Date" should be after "Start Date"');
            }

        }
        calculateDaysBetween();
    }

    function calculateDaysBetween() {
        if (pgLeaveRequest.lblTimeUnit.text === "HOUR") {
            var hours = daysBetween(selectedStartDate, selectedEndDate, true);

            pgLeaveRequest.lblSelectedDaysCount.text = hours;
            pgLeaveRequest.lblSelectedDaysCountText.text = (hours == 1) ? 'hour' : 'hours';
        }
        else {
            var days = daysBetween(selectedStartDate.format("MM/dd/yyyy"), selectedEndDate.format("MM/dd/yyyy"));

            pgLeaveRequest.lblSelectedDaysCount.text = days;
            pgLeaveRequest.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';

        }
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

        createLabel(boxTotalDays, "lblTotalDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#979797");
        createLabel(boxTotalDays, "lblTotalDaysText", "Total", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#979797");


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

        createLabel(boxUsed, "lblUsedDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#cca2b5");
        createLabel(boxUsed, "lblUsedDaysText", "Used", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#cca2b5");

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
        createLabel(boxRemaining, "lblRemainingDays", "-", "0", "20%", "100%", "40%", SMF.UI.TextAlignment.CENTER, false, "12pt", true, "#37404a");
        createLabel(boxRemaining, "lblRemainingDaysText", "Rem.", "0", "70%", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "5pt", false, "#37404a");

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
        var leaveTypes = ["PERSONAL", "MEDICAL"];
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

                if (timeUnits[e.index] === "HOUR") {
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

                }
            },
            function() {}
        );

    }
})();
