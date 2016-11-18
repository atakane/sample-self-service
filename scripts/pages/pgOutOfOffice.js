/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:

(function() {
    var selectedStartDate;
    var selectedEndDate;

    var pgOutOfOffice = Pages.pgOutOfOffice = new SMF.UI.Page({
        name: "pgOutOfOffice",
        onKeyPress: pgOutOfOffice_onKeyPress,
        onShow: pgOutOfOffice_onShow
    });

    // var sliderDrawer = new SliderDrawer();
    // sliderDrawer.init(Pages.currentPage);
    createSliderDrawer(Pages.pgOutOfOffice, "sdSelfService");

    //Lines
    //  createRectangle(pgOutOfOffice, 252, 64, 1, 133, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, "29.5352%", "100%", 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, "44.5277%", "100%", 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, "49.90%", "29.5352%", 1, "14.9925%", "#e7e7e7");

    //Profile
    createImage(pgOutOfOffice, "imgAvatar", "", "5.3333%", "11.5442%", "14.4%", "8.0959%", SMF.UI.ImageFillType.ASPECTFIT);
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
        showDateTimePicker(false);
    });

    //Day Count Circle
    createImage(pgOutOfOffice, "imgCenterCircle", "circle.png", (Device.screenWidth - 81)/2, "31.3343%", 81, 81);
    createLabel(pgOutOfOffice, "lblSelectedDaysCount", "-", "39.4666%", "34%", 79, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgOutOfOffice, "lblSelectedDaysCountText", "day", "39.4666%", "37.4%", 79, "4.4977%", SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    createLabel(pgOutOfOffice, "lblStart", "OUT OF OFFICE MESSAGE", "4.4%", "47.1514%", "55%", "3%", SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");

    var txtOutOfOfficeMessage = new SMF.UI.TextBox({
        name: "txtOutOfOfficeMessage",
        text: "",
        left: getUnit("4.5333%"),
        top: getUnit("51.57421%"),
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
    pgOutOfOffice.add(txtOutOfOfficeMessage);

    //(Device.brandModel.toLowerCase().includes("plus")) ? 80 : 40,
    var myFont = new SMF.UI.Font({
        name: "FontAwesome",
        size: (Device.brandModel.toLowerCase().includes("plus")) ? 80 : 50,
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
            alert({
                    title: 'Warning!',
                    message: 'Do you want to update your "Out of Office" status?',
                    firstButtonText: "Update",
                    secondButtonText: "Cancel",
                    onFirstButtonPressed: function() {
                        oProfile.OutOfOffice = pgOutOfOffice.swtOutOfOffice.checked;
                        oProfile.OutOfOfficeMessage = pgOutOfOffice.txtOutOfOfficeMessage.text;
            
                        oProfile.OutOfOfficeStart = selectedStartDate;
                        oProfile.OutOfOfficeEnd = selectedEndDate;
            
                        alert('Your "Out of Office" status has been updated.');
                    },
                    onSecondButtonPressed: function() {}
                });
            
        });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgOutOfOffice
     */
    function pgOutOfOffice_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(reverseDefaultPageAnimation);
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

        addHeaderBar();

        pgOutOfOffice.imgAvatar.image = pgOutOfOffice.sdSelfService.imgSliderAvatar.image = oProfile.Avatar;
        pgOutOfOffice.lblFullName.text = pgOutOfOffice.sdSelfService.lblSliderFullName.text = oProfile.FullName;
        pgOutOfOffice.lblTeamRole.text = pgOutOfOffice.sdSelfService.lblSliderTeamRole.text = oProfile.Role + " / " + oProfile.Team;

        pgOutOfOffice.swtOutOfOffice.checked = oProfile.OutOfOffice;
        

        selectedStartDate = (isDate(oProfile.OutOfOfficeStart)) ? new Date(oProfile.OutOfOfficeStart) : new Date(Date.now());
        selectedEndDate = (isDate(oProfile.OutOfOfficeEnd)) ? new Date(oProfile.OutOfOfficeEnd) : new Date(Date.now()).addDays(7);

        setDateLabels(selectedStartDate, true);
        setDateLabels(selectedEndDate, false);
        
        calculateDaysBetween();
    }
    
    function setInitialOutOfficeText(){
        var oooText;
        
        if ((oProfile.OutOfOfficeMessage) && (oProfile.OutOfOfficeMessage.length > 0)){
            oooText = oProfile.OutOfOfficeMessage
        }else{
            oooText = templateOutOfOfficeText.replace('{FullName}',oProfile.FullName).replace('{Role}',oProfile.Role).replace('{Team}',oProfile.Team).replace('{EndDate}',selectedEndDate.format('dddd, MMMM d, y'));
        }
        
        pgOutOfOffice.txtOutOfOfficeMessage.text = oooText;
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);
        headerBar.setTitleView(Pages.currentPage, "Out of Office", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgOutOfOffice.sdSelfService.show(): Pages.pgOutOfOffice.sdSelfService.hide();
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
        var currentDate = (isStartDate) ? selectedStartDate : selectedEndDate ;
        
        var minDate = (isStartDate) ? new Date() : new Date(selectedStartDate);
        
        var maxDate = (isStartDate) ? (new Date(selectedEndDate)).addDays(-1) : (new Date(selectedStartDate)).addDays(365);
        
        SMF.UI.showDatePicker({
              currentDate : currentDate,
              mask : "dd-MM-yyyy",
              minDate : minDate,
              maxDate : maxDate,
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
        var _day = ('00' + date.getDate()).right(2);
        var _month = ('00' + (date.getMonth() + 1)).right(2);
        var _year = date.getFullYear().toString().right(2);

        if (isStartDate) {
            if (date < selectedEndDate) {
                pgOutOfOffice.lblStartDate.text = _month + "." + _day + "." + _year;
                selectedStartDate = date;
            }
            else {
                alert('"Start Date" should be prior to "End Date"');
            }
        }
        else {
            if (date > selectedStartDate) {
                pgOutOfOffice.lblEndDate.text = _month + "." + _day + "." + _year;
                selectedEndDate = date;
                setInitialOutOfficeText();
            }
            else {
                alert('"End Date" should be after "Start Date"');
            }

        }
        calculateDaysBetween();
    }

    function calculateDaysBetween() {
        var days = daysBetween(selectedStartDate, selectedEndDate).toFixed(0);
        pgOutOfOffice.lblSelectedDaysCount.text = days;
        pgOutOfOffice.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
    }
})();
