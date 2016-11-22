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
    var cntTop = new SMF.UI.Container({
        name: "cntTop",
        left: 0,
        width: "100%",
        top: 0,
        height: getUnit("33.7331%"),
        borderWidth: 0,
        backgroundTransparent: true
            // layoutType: SMF.UI.LayoutType.FLOW,
            // layoutAlignment: SMF.UI.LayoutAlignment.CENTER
    });
    sdSelfService.add(cntTop);

    createImage(cntTop, "imgSliderProfileBackground", "slider_rectangle.png", 0, 0, "100%", "100%", SMF.UI.ImageFillType.STRETCH);

    createImage(sdSelfService, "imgSliderAvatar", "", 127, 53.5, 80, 80);
    createLabel(sdSelfService, "lblSliderFullName", "", 0, 155, 336, 20, SMF.UI.TextAlignment.CENTER, false, "12pt", false, "#248afd");
    createLabel(sdSelfService, "lblSliderTeamRole", "", 0, 181.5, 336, 20, SMF.UI.TextAlignment.CENTER, false, "7pt", false, "#248afd");


    //Slider Menus
    createLabel(sdSelfService, "lblLeaveManagement", "Leave Management", "4.9333%", "37.5562%", "55%", 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createImage(sdSelfService, "imgSliderMenuStatus", "icon_status.png", "5.4666%", "44.4527%", 21, 19);
    createTextButton(sdSelfService,
        "btnStatus",
        "Status",
        "18.2666%", "43.4032%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            (Pages.currentPage === Pages.pgDashboard) ? sdSelfService.hide(): Pages.pgDashboard.show();
        });
    //336
    createRectangle(sdSelfService, "4.4940%", "49.1754%", "95.506%", 1, "#e7e7e7");
    createImage(sdSelfService, "imgSliderMenuRequest", "icon_request.png", "5.8666%", "51.4992%", 22, 20);
    createTextButton(sdSelfService,
        "btnRequest",
        "New Request",
        "18.2666%", "50.5247%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            (Pages.currentPage === Pages.pgLeaveRequest) ? sdSelfService.hide(): Pages.pgLeaveRequest.show();
        });

    createRectangle(sdSelfService, "4.4940%", "56.2968%", "95.506%", 1, "#e7e7e7");

    createImage(sdSelfService, "imgSliderMenuMyRequests", "icon_info.png", "5.8666%", "58.6206%", 22, 20);
    createTextButton(sdSelfService,
        "btnMyRequests",
        "My Requests",
        "18.2666%", "57.6461%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            (Pages.currentPage === Pages.pgMyRequests) ? sdSelfService.hide(): Pages.pgMyRequests.show();
        });


    createRectangle(sdSelfService, "4.4940%", "63.4182%", "95.506%", 1, "#e7e7e7");

    createTextButton(sdSelfService,
        "btnApprovals",
        "Approval Worklist",
        "4.9333%", "64.7222%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            (Pages.currentPage === Pages.pgApprovalWorklist) ? sdSelfService.hide(): Pages.pgApprovalWorklist.show();
        });

    createRectangle(sdSelfService, "4.4940%", "69.79%", "95.506%", 1, "#e7e7e7");
    createTextButton(sdSelfService,
        "btnOutOfOffice",
        "Out Of Office",
        "4.9333%", "70.9891%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            (Pages.currentPage === Pages.pgOutOfOffice) ? sdSelfService.hide(): Pages.pgOutOfOffice.show();
        });
    createRectangle(sdSelfService, "4.4940%", "76.0569%", "95.506%", 1, "#e7e7e7");
    createTextButton(sdSelfService,
        "btnAbout",
        "About",
        "4.9333%", "77.256%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            (Pages.currentPage === Pages.pgAbout) ? sdSelfService.hide(): Pages.pgAbout.show();
        });

    // createLabel(sdSelfService, "lblAbout", "About", 18.5, 570, 155, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createRectangle(sdSelfService, "4.4940%", "93.02848%", "95.506%", 1, "#e7e7e7");


    createTextButton(sdSelfService,
        "btnLogout",
        "Logout",
        "4.9333%", "94.2278%", "55%", "4.5%",
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#f64b95", "#ebc0d3",
        function(e) {
            Pages.pgLogin.show();
        });


    // this.init = function(page) {
    page.add(sdSelfService);
    // }

}
// global.SliderDrawer = SliderDrawer;
// })();
