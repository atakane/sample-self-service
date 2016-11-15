/* globals */
// (function() {
function createSliderDrawer(page, name, backgroundColor) {
    // if (!(this instanceof SliderDrawer)) {
    //     return new SliderDrawer();
    // }

    // Adding Slider Drawer
    //slider drawer
    var sdSelfService = new SMF.UI.SliderDrawer({
        name: name,
        width: getUnit("89.6%"),
        touchEnabled: 'true',
        backgroundColor: (backgroundColor) ? backgroundColor : SMF.UI.Color.WHITE,
        position: 'left',
        onShow: function() {
            console.log("isSliderDrawerOpen = " + isSliderDrawerOpen);
            isSliderDrawerOpen = true;
        },
        onHide: function() {
            console.log("isSliderDrawerOpen = " + isSliderDrawerOpen);
            isSliderDrawerOpen = false;
        }
    });

    // Profile
    createImage(sdSelfService, "imgSliderProfileBackground", "slider_rectangle.png", 0, 0, 340, 225);
    createImage(sdSelfService, "imgSliderAvatar", "", 127, 53.5, 80, 80);
    createLabel(sdSelfService, "lblSliderFullName", "", 0, 155, 336, 20, SMF.UI.TextAlignment.CENTER, false, "12pt", false, "#248afd");
    createLabel(sdSelfService, "lblSliderTeamRole", "", 0, 181.5, 336, 20, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#248afd");


    //Slider Menus
    createLabel(sdSelfService, "lblLeaveManagement", "Leave Management", 18.5, 250.5, 200, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createImage(sdSelfService, "imgSliderMenuStatus", "icon_status.png", 20.5, 296.5, 21, 19);
    createTextButton(sdSelfService,
        "btnStatus",
        "Status",
        68.5, 289.5, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            Pages.pgDashboard.show();
        });

    createRectangle(sdSelfService, 15.1, 328, 320.1, 1, "#e7e7e7");
    createImage(sdSelfService, "imgSliderMenuRequest", "icon_request.png", 22, 343.5, 22, 20);
    createTextButton(sdSelfService,
        "btnRequest",
        "Request",
        68.5, 337, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            Pages.pgLeaveRequest.show();
        });

    createRectangle(sdSelfService, 15.1, 375.5, 320.1, 1, "#e7e7e7");

    createTextButton(sdSelfService,
        "btnApprovals",
        "Approval Worklist",
        18.5, 388.2, 155, 23,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            //Pages.pgOutOfOffice.show(defaultPageAnimation);
            alert('Worklist page');
        });

    createRectangle(sdSelfService, 15.1, 418, 320.1, 1, "#e7e7e7");
    createTextButton(sdSelfService,
        "btnOutOfOffice",
        "Out Of Office",
        18.5, 430, 155, 23,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            Pages.pgOutOfOffice.show();
        });
    createRectangle(sdSelfService, 15.1, 459.8, 320.1, 1, "#e7e7e7");
    createTextButton(sdSelfService,
        "btnAbout",
        "About",
        18.5, 471.8, 155, 23,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            Pages.pgAbout.show();
        });

    // createLabel(sdSelfService, "lblAbout", "About", 18.5, 570, 155, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createRectangle(sdSelfService, 15.1, 620.5, 320.1, 1, "#e7e7e7");


    createTextButton(sdSelfService,
        "btnLogout",
        "Logout",
        18.5, 628.5, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#f64b95", "#ebc0d3",
        function(e) {
            Pages.pgLogin.show();
        });


    // this.init = function(page) {
    sdSelfService.imgSliderAvatar.image = (oProfile) ? oProfile.Avatar : "";
    sdSelfService.lblSliderFullName.text = (oProfile) ? oProfile.FullName : "";
    sdSelfService.lblSliderTeamRole.text = (oProfile) ? oProfile.Role + " / " + oProfile.Team : "";

    page.add(sdSelfService);
    // }

}
// global.SliderDrawer = SliderDrawer;
// })();
