/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:
//include("pages/pgOutOfOffice.js");
(function() {
    var selectedStartDate;
    var selectedEndDate;

    var pgOutOfOffice = Pages.pgOutOfOffice = new SMF.UI.Page({
        name: "pgOutOfOffice",
        onKeyPress: pgOutOfOffice_onKeyPress,
        onShow: pgOutOfOffice_onShow
    });


    //Lines
    //  createRectangle(pgOutOfOffice, 252, 64, 1, 133, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, "29.5352%", "100%", 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, "44.5277%", "100%", 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, "49.90%", "29.5352%", 1, "14.9925%", "#e7e7e7");
    
    //Profile
    createImage(pgOutOfOffice, "imgAvatar", "", "5.3333%", "11.5442%", "14.4%" , "8.0959%", SMF.UI.ImageFillType.ASPECTFIT);
    createLabel(pgOutOfOffice, "lblFullName", "", "4.5333%", "20%", "53.3333%", "4.7376%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#27bc66");
    createLabel(pgOutOfOffice, "lblTeamRole", "", "4.5333%", "24.7376%", "53.3333%", "3.4482%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#444444");

    //Out of Office switch
    var swtOutOfOffice = new SMF.UI.SwitchButton({
        name: "swtOutOfOffice",
        left: getUnit("76.5333%"),
        top: getUnit("13.6431%"),
        checked: false,
        onTintColor: "#248afd",
        tintColor: "#248afd",
        onChange: function(e) {
            pgOutOfOffice.lblOOOStatusText.text = this.checked == true ? "Mode On" : "Mode Off";
        }
    });
    pgOutOfOffice.add(swtOutOfOffice);

    createLabel(pgOutOfOffice, "lblOOOStatusTitle", "Out Of Office", "67.2%", "21.2893%", "32.8%", "2.9985%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#a0a0a0");
    createLabel(pgOutOfOffice, "lblOOOStatusText", "Mode Off", "67.2%", "24.2878%", "32.8%", "2.9985%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    // Dates
    // Start Date
    createLabel(pgOutOfOffice, "lblStart", "STARTS", "4.5333%", "31.1844%", "17%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgOutOfOffice, "lblStartDate", "-", "4.5333%", "35.9820%", "37.3333%", "2.9985%", SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgOutOfOffice, "cntSelectStartDate", "4.5333%", "35.9820%", "37.3333%", "6.5967%", SMF.UI.Color.WHITE, true, function() {
        showDateTimePicker(true);
    });

    // End Date
    createLabel(pgOutOfOffice, "lblEnd", "ENDS", "80.4667%", "31.1844%", "15%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "7pt", false, "#248afd");

    createLabel(pgOutOfOffice, "lblEndDate", "-", "60.4667%", "35.9820%", "35%", "2.9985%", SMF.UI.TextAlignment.RIGHT, false, "12pt", false, "#4a4a4a");

    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgOutOfOffice, "cntSelectEndDate", "67%", "35.9820%", "37.3333%", "6.5967%", SMF.UI.Color.WHITE, true, function() {
        showDateTimePicker();
    });

    //Day Count Circle
    createImage(pgOutOfOffice, "imgCenterCircle", "circle.png", "39.2%", "31.3343%", 81, 81);
    createLabel(pgOutOfOffice, "lblSelectedDaysCount", "07", "39.4666%", "34.1829%", 79, 30, SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgOutOfOffice, "lblSelectedDaysCount", "days", "39.4666%", "37.78110%", 79, 30, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    createLabel(pgOutOfOffice, "lblStart", "OUT OF OFFICE MESSAGE", "4.4%", "47.1514%", "55%", "3%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");

    var txtOutOfOfficeMessage = new SMF.UI.TextBox({
        name: "txtOutOfOfficeMessage",
        text: "",
        left: getUnit("4.5333%"),
        top: getUnit(344),
        width: getUnit(331),
        height: getUnit(240),
        multipleLine: true,
        textAlignment: SMF.UI.TextAlignment.JUSTIFIED,
        borderWidth: 0,
        roundedEdge: 0,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#37404a"
    })
    pgOutOfOffice.add(txtOutOfOfficeMessage);

    //(Device.brandModel.toLowerCase().includes("plus")) ? 80 : 40,
    var myFont = new SMF.UI.Font({
        name: "FontAwesome",
        size: "10pt",
        bold: false
    });

    // check: uf00c
    createTextButtonWithCustomFont(pgOutOfOffice,
        "btnSave",
        JSON.parse('""'),
        0, "90.4048%", "100%", "9.5952%",
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#7ed321", "#5b9918",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
            oProfile.OutOfOffice = pgOutOfOffice.swtOutOfOffice.checked;
            oProfile.OutOfOfficeMessage = pgOutOfOffice.txtOutOfOfficeMessage.text;

            oProfile.OutOfOfficeStart = selectedStartDate;
            oProfile.OutOfOfficeEnd = selectedEndDate;

            alert('Your "Out of Office" status has been updated.');
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

        var sliderDrawer = new SliderDrawer();
        sliderDrawer.init(Pages.currentPage);

        addHeaderBar();


        pgOutOfOffice.imgAvatar.image = oProfile.Avatar;
        pgOutOfOffice.lblFullName.text = oProfile.FullName;
        pgOutOfOffice.lblTeamRole.text = oProfile.Role + " / " + oProfile.Team;
        pgOutOfOffice.swtOutOfOffice.checked = oProfile.OutOfOffice;
        pgOutOfOffice.txtOutOfOfficeMessage.text = oProfile.OutOfOfficeMessage;

        selectedStartDate = new Date(oProfile.OutOfOfficeStart);
        selectedEndDate = new Date(oProfile.OutOfOfficeEnd);

        setDateLabels(selectedStartDate, true);
        setDateLabels(selectedEndDate, false);
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        // headerBar.setTitleView(Pages.currentPage, "Out of Office", "#248afd", null, 0, 0, 240, 44, 20);
        // headerBar.setLeftItemImage("back.png", function() {
        //     Pages.back();
        // });

        // console.log(SMF.UI.iOS.NavigationBar.translucent);
        headerBar.setTitleView(Pages.currentPage, "Out of Office", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.currentPage.sdSelfService.show(): Pages.currentPage.sdSelfService.hide();
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
            minDate: (new Date()).getDate(),
            maxDate: (new Date()).getDate() + 90,
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
            pgOutOfOffice.lblStartDate.text =  _month + "." + _day + "."+ _year;
            selectedStartDate = date;
        }
        else {
            pgOutOfOffice.lblEndDate.text =  _month + "." + _day + "."+ _year;
            selectedEndDate = date;
        }

    }
})();
