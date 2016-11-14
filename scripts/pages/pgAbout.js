/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation*/
(function() {

    var pgAbout = Pages.pgAbout = new SMF.UI.Page({
        name: "pgAbout",
        onKeyPress: pgAbout_onKeyPress,
        onShow: pgAbout_onShow,
        backgroundImage: 'stripe.png'
    });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgLogin
     */
    function pgAbout_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(defaultPageAnimation);
        }
    }

    // top image
    createImage(pgAbout, "imgHome", "home_back.png", "0", "0", "100%", "40%", SMF.UI.ImageFillType.STRETCH);
    
    // Welcome texts
    createLabel(pgAbout, "lblWelcome", "EBS\nSelf Service", "9.5%", "15%", "80%", "15%", SMF.UI.TextAlignment.TOP, true, "17pt", false, SMF.UI.Color.WHITE);
    createLabel(pgAbout, "lblWelcome2", "Powered & secured by Oracle MCS & ICS", "10%", "29%", "80%", "8%", SMF.UI.TextAlignment.TOP, false, "7pt", false, SMF.UI.Color.WHITE);
    
    // About
    var aboutText ="Develop superior native apps and manage the full frontend and backend lifecycle with the power of the cloud using Oracle Cloud integration in Smartface Cloud.";
    createLabel(pgAbout, "lblInfoText", aboutText, "6%", "45%", "88%", "49%", SMF.UI.TextAlignment.TOP, true, "7pt", false, SMF.UI.Color.BLACK);

    // Version text
    createLabel(pgAbout, "lblVersion", "v." + Application.version, "0", "97%", "99%", "3%", SMF.UI.TextAlignment.RIGHT, false, "4pt", false, SMF.UI.Color.BLACK);


    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgAbout_onShow() {
        Dialog.removeWait();

        // var sliderDrawer = new SliderDrawer();
        // sliderDrawer.init(Pages.currentPage);
        createSliderDrawer(Pages.pgAbout,"sdMenuAbout");

        addHeaderBar();
    }


    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        headerBar.setTitleView(Pages.currentPage, "About", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgAbout.sdMenuAbout.show(): Pages.pgAbout.sdMenuAbout.hide();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
        }
        else {
            Pages.currentPage.actionBar.displayShowHomeEnabled = true;
            Pages.currentPage.actionBar.icon = "menu.png";
        }
    }
})();
