/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:
//include("pages/pgOutOfOffice.js");
(function() {
    var pgOutOfOffice = Pages.pgOutOfOffice = new SMF.UI.Page({
        name: "pgOutOfOffice",
        onKeyPress: pgOutOfOffice_onKeyPress,
        onShow: pgOutOfOffice_onShow
    });

    //Lines
    createRectangle(pgOutOfOffice, 252, 64, 1, 133, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, 197, 375, 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, 0, 297, 375, 1, "#e7e7e7");
    createRectangle(pgOutOfOffice, 187, 197, 1, 100, "#e7e7e7");

    //Profile
    createImage(pgOutOfOffice, "imgAvatar", "", 20, 77, 54, 54, SMF.UI.ImageFillType.ASPECTFIT);
    createLabel(pgOutOfOffice, "lblFullName", "", 17, 142, 200, 23, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#27bc66");
    createLabel(pgOutOfOffice, "lblTeamRole", "", 17, 165, 200, 20, SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#444444");

    //Out of Office switch
    var swtOutOfOffice = new SMF.UI.SwitchButton({
        name: "swtOutOfOffice",
        left: getUnit(287),
        top: getUnit(91),
        checked: false,
        onTintColor: "#248afd",
        tintColor: "#248afd",
        onChange: function(e) {
            pgOutOfOffice.lblOOOStatusText.text = this.checked == true ? "Mode On" : "Mode Off";
        }
    });
    pgOutOfOffice.add(swtOutOfOffice);

    createLabel(pgOutOfOffice, "lblOOOStatusTitle", "Out Of Office", 252, 142, 123, 20, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#a0a0a0");
    createLabel(pgOutOfOffice, "lblOOOStatusText", "Mode Off", 252, 162, 123, 20, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    // Dates
    // Start Date
    createLabel(pgOutOfOffice, "lblStart", "STARTS", 17, 208, 70, 20, SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");
    createLabel(pgOutOfOffice, "lblStartMonth", "12", 17, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    createRectangle(pgOutOfOffice, 54.5, 240, 3, 29, "#e7e7e7");
    createLabel(pgOutOfOffice, "lblStartDay", "29", 63, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    createRectangle(pgOutOfOffice, 96.5, 240, 3, 29, "#e7e7e7");
    createLabel(pgOutOfOffice, "lblStartYear", "16", 104.5, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");

    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgOutOfOffice, "cntSelectStartDate", 16.5, 230, 130, 50, SMF.UI.Color.WHITE, true, function() {
        alert('select start date');
    });

    // End Date
    createLabel(pgOutOfOffice, "lblEnd", "ENDS", 317, 208, 50, 20, SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");

    createLabel(pgOutOfOffice, "lblEndMonth", "12", 240, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    createRectangle(pgOutOfOffice, 276, 240, 3, 29, "#e7e7e7");
    createLabel(pgOutOfOffice, "lblEndDay", "31", 286, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");
    createRectangle(pgOutOfOffice, 321, 240, 3, 29, "#e7e7e7");
    createLabel(pgOutOfOffice, "lblEndYear", "16", 329, 240, 33, 30, SMF.UI.TextAlignment.LEFT, false, "12pt", false, "#4a4a4a");

    // Adding a container layer on top of the date to be touchable as a single object
    createContainer(pgOutOfOffice, "cntSelectEndDate", 227, 230, 140, 50, SMF.UI.Color.WHITE, true, function() {
        alert('select end date');
    });

    //Day Count Circle
    createImage(pgOutOfOffice, "imgCenterCircle", "circle.png", 147, 209, 81, 81);
    createLabel(pgOutOfOffice, "lblSelectedDaysCount", "07", 148, 228, 79, 30, SMF.UI.TextAlignment.CENTER, false, "16pt", true, "#248afd");
    createLabel(pgOutOfOffice, "lblSelectedDaysCount", "days", 148, 252, 79, 30, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#37404a");

    createLabel(pgOutOfOffice, "lblStart", "OUT OF OFFICE MESSAGE", 16.5, 314.5, 200, 20, SMF.UI.TextAlignment.LEFT, false, "7pt", false, "#248afd");

    var txtOutOfOfficeMessage = new SMF.UI.TextBox({
        name: "txtOutOfOfficeMessage",
        text: "",
        left: getUnit(17),
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
        0, 603, 375, 64,
        SMF.UI.TextAlignment.CENTER,
        myFont,
        "#7ed321", "#5b9918",
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
        function(e) {
            Pages.pgDashboard.myProfile.OutOfOffice = pgOutOfOffice.swtOutOfOffice.checked;
            Pages.pgDashboard.myProfile.OutOfOfficeMessage = pgOutOfOffice.txtOutOfOfficeMessage.text;
            alert('Your "OutOfOffice" status has been updated.');
        });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgOutOfOffice
     */
    function pgOutOfOffice_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back();
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


        pgOutOfOffice.imgAvatar.image = Pages.pgDashboard.myProfile.Avatar;
        pgOutOfOffice.lblFullName.text = Pages.pgDashboard.myProfile.FullName;
        pgOutOfOffice.lblTeamRole.text = Pages.pgDashboard.myProfile.Role + " / " + Pages.pgDashboard.myProfile.Team;
        pgOutOfOffice.swtOutOfOffice.checked = Pages.pgDashboard.myProfile.OutOfOffice;
        pgOutOfOffice.txtOutOfOfficeMessage.text = Pages.pgDashboard.myProfile.OutOfOfficeMessage;
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        headerBar.setTitleView(Pages.currentPage, "Out of Office", "#248afd", null, 0, 0, 240, 44, 20);
        headerBar.setLeftItemImage("back.png", function() {
            Pages.back();
        });

        console.log(SMF.UI.iOS.NavigationBar.translucent);

    }

})();
