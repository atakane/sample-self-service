/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation*/
(function() {

    var pgAbout = Pages.pgAbout = new SMF.UI.Page({
        name: "pgAbout",
        onKeyPress: pgAbout_onKeyPress,
        onShow: pgAbout_onShow,
        backgroundImage: 'stripe.png'
    });

    // var sliderDrawer = new SliderDrawer();
    // sliderDrawer.init(Pages.currentPage);
    createSliderDrawer(Pages.pgAbout, "sdSelfService");

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgLogin
     */
    function pgAbout_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(reverseDefaultPageAnimation);
        }
    }

    var imgHome = new SMF.UI.Image({
        name: "imgHome",
        image: "home_back.png",
        left: 0,
        top: 0,
        width: "100%",
        height: "40%",
        imageFillType: SMF.UI.ImageFillType.STRETCH
    });

    var lblWelcome = new SMF.UI.Label({
        top: "15%",
        left: "10%",
        width: "80%",
        height: "15%",
        text: "EBS\nSelf Service",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "17pt"
        }),
        fontColor: SMF.UI.Color.WHITE,
        touchEnabled: false,
        showScrollBar: false,
        multipleLine: true,
        borderWidth: 0
    });

    var lblWelcome2 = new SMF.UI.Label({
        top: "29%",
        left: "10%",
        width: "80%",
        height: "8%",
        text: "Powered & secured by Oracle MCS & ICS",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: SMF.UI.Color.WHITE,
        touchEnabled: false,
        showScrollBar: false,
        borderWidth: 0
    });

    var lblVersion = new SMF.UI.Label({
        top: "97%",
        left: "0%",
        width: "99%",
        height: "3%",
        text: 'v.' + Application.version,
        textAlignment: SMF.UI.TextAlignment.RIGHT,
        font: new SMF.UI.Font({
            size: "4pt"
        }),
        fontColor: SMF.UI.Color.BLACK,
        touchEnabled: false,
        showScrollBar: false,
        borderWidth: 0,
        multipleLine: false
    });


    var lblInfoText = new SMF.UI.Label({
        top: "45%",
        left: "6%",
        width: "88%",
        height: "49%",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus diam id orci dignissim consequat. Fusce tincidunt neque et neque luctus dignissim. Sed ex ipsum, vulputate eget lectus eget, efficitur fermentum turpis. Nulla facilisi. In sit amet convallis neque.",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "8pt"
        }),
        multipleLine: true,
        borderWidth: 0,
        // borderColor: "#e7e7e7",
        fillColor: SMF.UI.Color.WHITE,
        backgroundTransparent: true
    });

    pgAbout.add(imgHome);
    pgAbout.add(lblWelcome);
    pgAbout.add(lblWelcome2);
    pgAbout.add(lblVersion);
    pgAbout.add(lblInfoText);



    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgAbout_onShow() {
        // SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
        Dialog.removeWait();


        addHeaderBar();
        
        pgAbout.sdSelfService.imgSliderAvatar.image = oProfile.Avatar;
        pgAbout.sdSelfService.lblSliderFullName.text = oProfile.FullName;
        pgAbout.sdSelfService.lblSliderTeamRole.text = oProfile.Role + " / " + oProfile.Team;

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
                    (!isSliderDrawerOpen) ? Pages.pgAbout.sdSelfService.show(): Pages.pgAbout.sdSelfService.hide();
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
