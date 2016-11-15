/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:
(function() {

    var pgDashboard = Pages.pgDashboard = new SMF.UI.Page({
        name: "pgDashboard",
        onKeyPress: pgDashboard_onKeyPress,
        onShow: pgDashboard_onShow,
        onTouch: fillUsedDaysBar,
        myProfile: [],
        myTimeTable: []
    });

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgDashboard
     */
    function pgDashboard_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back();
        }
    }

    var imgHome = new SMF.UI.Image({
        name: "imgHome",
        image: "home_back.png",
        left: 0,
        top: 0,
        width: "100%",
        height: "285dp",
        // height: (100*(285/Device.screenHeight)) + "%",
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });

    var cntProgressBar = new SMF.UI.Container({
        name: "cntProgressBar",
        left: 0,
        width: "100%",
        top: "279dp",
        height: "55dp",
        borderWidth: 0
    });

    var imgProgressBackground = new SMF.UI.Image({
        image: "slider_stripe.png",
        left: 0,
        top: 0,
        width: "100%",
        height: "55dp"
    })
    var recProgress = new SMF.UI.Rectangle({
        name: "recProgress",
        left: 0,
        top: 0,
        width: "0",
        height: "55dp",
        fillColor: "#ebc0d3",
        borderWidth: 0,
        roundedEdge: 0
    })

    cntProgressBar.add(imgProgressBackground);
    cntProgressBar.add(recProgress);

    pgDashboard.add(cntProgressBar);
    pgDashboard.add(imgHome);

    // Profile
    var imgAvatar = new SMF.UI.Image({
        name: "imgAvatar",
        image: "",
        left: getUnit(148),
        top: getUnit(95),
        width: getUnit(80),
        height: getUnit(80),
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });
    pgDashboard.add(imgAvatar);

    var lblFullName = new SMF.UI.Label({
        name: "lblFullName",
        left: 0,
        top: getUnit(196.5),
        width: "100%",
        height: getUnit(20),
        text: "",
        textAlignment: SMF.UI.TextAlignment.CENTER,
        font: new SMF.UI.Font({
            size: "12pt",
            bold: false
        }),
        multipleLine: false,
        fontColor: SMF.UI.Color.WHITE
    });
    pgDashboard.add(lblFullName);

    var lblTeamRole = new SMF.UI.Label({
        name: "lblTeamRole",
        left: 0,
        top: getUnit(223),
        width: "100%",
        height: getUnit(20),
        text: "",
        textAlignment: SMF.UI.TextAlignment.CENTER,
        font: new SMF.UI.Font({
            size: "7pt",
            bold: false
        }),
        multipleLine: false,
        fontColor: SMF.UI.Color.WHITE
    });
    pgDashboard.add(lblTeamRole);



    // Vacation Boxes & Numbers
    createVacationBoxes();

    var cntOutOfOfficeBar = new SMF.UI.Container({
        name: "cntOutOfOfficeBar",
        left: 0,
        width: "100%",
        top: getUnit(501.5),
        height: getUnit(64),
        borderWidth: 0,
        fillColor: "#e7e7e7",
        backgroundTransparent: false,
        onTouchEnded: function(e) {
            Pages.pgOutOfOffice.show(defaultPageAnimation);
        }
    });

    var swtOutOfOffice = new SMF.UI.SwitchButton({
        name: "swtOutOfOffice",
        left: getUnit(21.5),
        top: getUnit(19.5),
        checked: false,
        onTintColor: "#248afd",
        tintColor: "#248afd",
        // onChange: function(e) {
        //     Pages.pgDashboard.cntOutOfOfficeBar.lblOOOStatusText.text = this.checked == true ? "Mode On" : "Mode Off";
        // },
        touchEnabled: false,
        visible: false
    });
    cntOutOfOfficeBar.add(swtOutOfOffice);

    var lblOOOStatusTitle = new SMF.UI.Label({
        name: "lblOOOStatusTitle",
        left: getUnit(17),
        top: getUnit(14),
        width: "60%",
        height: "25%",
        text: "OUT OF OFFICE STATUS",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#cca2b5"
    });
    cntOutOfOfficeBar.add(lblOOOStatusTitle);

    var lblOOOStatusTitle2 = new SMF.UI.Label({
        name: "lblOOOStatusTitle2",
        left: getUnit(17),
        top: getUnit(34.5),
        width: "24%",
        height: "25%",
        text: "Out Of Office",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#a0a0a0"
    });
    cntOutOfOfficeBar.add(lblOOOStatusTitle2);

    var lblOOOStatusText = new SMF.UI.Label({
        name: "lblOOOStatusText",
        left: getUnit(110),
        top: getUnit(34.5),
        width: "30%",
        height: "25%",
        text: "Mode Off",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#37404a"
    });
    cntOutOfOfficeBar.add(lblOOOStatusText);

    var imgDetail = new SMF.UI.Image({
        image: "right_arrow.png",
        left: getUnit(340),
        top: getUnit(26),
        width: getUnit(12),
        height: getUnit(20),
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });
    cntOutOfOfficeBar.add(imgDetail);

    pgDashboard.add(cntOutOfOfficeBar);
    // pgDashboard.add(imgOutOfOfficeShadowLine);
    createImage(pgDashboard, "imgOutOfOfficeShadowLine", "shadow_line.png", "0", "74.8875%", "100%", "6", SMF.UI.ImageFillType.ASPECTFIT);


    // New Leave bar
    // var cntNewLeaveRequest = new SMF.UI.Container({
    //     name: "cntNewLeaveRequest",
    //     left: 0,
    //     width: "20%",
    //     top: "75.1874%",
    //     height: "9.5952%",
    //     borderWidth: 0,
    //     fillColor: "RED",
    //     backgroundTransparent: false
    // });
    // pgDashboard.add(cntNewLeaveRequest);

    var lblNewRequestTitle = new SMF.UI.Label({
        name: "lblNewRequestTitle",
        left: getUnit(23.2),
        top: getUnit(583.5),
        width: "60%",
        height: getUnit(19.5),
        text: "NEW LEAVE REQUEST",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#cca2b5"
    });
    // pgDashboard.add(lblNewRequestTitle);

    var lblNewRequestText = new SMF.UI.Label({
        name: "lblNewRequestText",
        left: getUnit(23.5),
        top: getUnit(607.5),
        width: getUnit(183),
        height: getUnit(38),
        text: "Your next request can start from",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        multipleLine: true,
        fontColor: "#a0a0a0"
    });
    // pgDashboard.add(lblNewRequestText);

    var lblNewRequestTextDate = new SMF.UI.Label({
        name: "lblNewRequestTextDate",
        left: getUnit(58),
        top: getUnit(623),
        width: getUnit(80),
        height: getUnit(19.5),
        text: "21.05.2017",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: "#37404a"
    });
    // pgDashboard.add(lblNewRequestTextDate);

    var imgAdd = new SMF.UI.Image({
        image: "btn_plus.png",
        left: getUnit("78.2666%"),
        top: getUnit("88.9805%"),
        width: getUnit({
            iOS: 63,
            Android: 61
        }),
        height: getUnit({
            iOS: 66,
            Android: 64
        }),
        imageFillType: SMF.UI.ImageFillType.NORMAL,
        onTouchEnded: function(e) {
            Pages.pgLeaveRequest.show(defaultPageAnimation);
        }
    });
    pgDashboard.add(imgAdd);


    // var pageSliderDrawer = new SliderMenu();
    // pgDashboard.add(pageSliderDrawer);


    // pgDashboard.add(sdSelfService);

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgDashboard
     */
    function pgDashboard_onShow() {
        //We are going w/ dark mode. Our navbar is white.
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

        // var sliderDrawer = new SliderDrawer();
        // sliderDrawer.init(Pages.currentPage);
        createSliderDrawer(Pages.pgDashboard, "sdMenuDashboard");

        addHeaderBar();

        //var timerID = setTimeout(function() {
        // setTimeout(function() {
        fillUsedDaysBar();
        // }, 100);

        fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);

        //TODO: Add Avatar pic
        // pgDashboard.imgAvatar.image = pgDashboard.myProfile.Avatar;
        pgDashboard.imgAvatar.image = pgDashboard.myProfile.Avatar; //pgDashboard.sdSelfService.imgSliderAvatar.image =
        pgDashboard.lblFullName.text = pgDashboard.myProfile.FullName; //pgDashboard.sdSelfService.lblSliderFullName.text = 
        pgDashboard.lblTeamRole.text = pgDashboard.myProfile.Role + " / " + pgDashboard.myProfile.Team; //pgDashboard.sdSelfService.lblSliderTeamRole.text = 
        pgDashboard.cntOutOfOfficeBar.swtOutOfOffice.checked = pgDashboard.myProfile.OutOfOffice;
        pgDashboard.cntOutOfOfficeBar.lblOOOStatusText.text = (pgDashboard.myProfile.OutOfOffice) ? "Mode On" : "Mode Off";
    }

    function fillUsedDaysBar() {
        recProgress.width = "0%";
        recProgress.animate({
            property: 'width',
            endValue: (100 * (pgDashboard.myTimeTable.Used / pgDashboard.myTimeTable.TotalDays)) + "%",
            motionEase: SMF.UI.MotionEase.DECELERATING,
            duration: 700,
            onFinish: function() {
                //do your action after finishing the animation
            }
        });
    }

    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        headerBar.setTitleImageView(Pages.currentPage, "self_service.png", 84, 15, 120, 24);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? pgDashboard.sdMenuDashboard.show(): pgDashboard.sdMenuDashboard.hide();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
        }
        else {
            Pages.currentPage.actionBar.displayShowHomeEnabled = true;
            Pages.currentPage.actionBar.icon = "menu.png";
        }
    }

    // Drawing day-boxes 
    function createVacationBoxes() {
        var boxTotalDays = new SMF.UI.Container({
            name: "boxTotalDays",
            left: getUnit("4%"),
            top: getUnit("56.6716%"),
            width: getUnit("28%"),
            height: getUnit("15.5922%"),
            borderWidth: 1,
            borderColor: "#979797",
            roundedEdge: 0
        });

        createLabel(boxTotalDays, "lblTotalDays", "-", "0", "0", "100%", "73%", SMF.UI.TextAlignment.CENTER, false, "30pt", true, "#979797");
        createLabel(boxTotalDays, "lblTotalDaysText", "Total", "0", "73", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "6pt", true, "#979797");


        var boxUsed = new SMF.UI.Container({
            name: "boxUsed",
            left: getUnit("36%"),
            top: getUnit("56.6716%"),
            width: getUnit("28%"),
            height: getUnit("15.5922%"),
            borderWidth: 1,
            borderColor: "#cca2b5",
            roundedEdge: 0
        });

        createLabel(boxUsed, "lblUsedDays", "-", "0", "0", "100%", "73%", SMF.UI.TextAlignment.CENTER, false, "30pt", true, "#cca2b5");
        createLabel(boxUsed, "lblUsedDaysText", "Used", "0", "73", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "6pt", true, "#cca2b5");


        var boxRemaining = new SMF.UI.Container({
            name: "boxRemaining",
            left: getUnit("68%"),
            top: getUnit("56.6716%"),
            width: getUnit("28%"),
            height: getUnit("15.5922%"),
            borderWidth: 0,
            roundedEdge: 0
        });

        createImage(boxRemaining, "imgRemaining", "square_stripe.png", "0", "0", "100%", "100%", SMF.UI.ImageFillType.ASPECTFIT);
        createLabel(boxRemaining, "lblRemainingDays", "-", "0", "0", "100%", "73%", SMF.UI.TextAlignment.CENTER, false, "30pt", true, "#37404a");
        createLabel(boxRemaining, "lblRemainingDaysText", "Remaining", "0", "73", "100%", "20%", SMF.UI.TextAlignment.CENTER, false, "6pt", true, "#37404a");


        pgDashboard.add(boxTotalDays);
        pgDashboard.add(boxUsed);
        pgDashboard.add(boxRemaining);
    }

    // We'll use this function when a new update occurs
    function fillVacationMetrics(TotalDays, Used, Remaining) {
        pgDashboard.boxTotalDays.lblTotalDays.text = TotalDays;
        pgDashboard.boxUsed.lblUsedDays.text = Used;
        pgDashboard.boxRemaining.lblRemainingDays.text = Remaining;
    }


})();
