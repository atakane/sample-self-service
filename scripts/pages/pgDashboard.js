/* globals */
//TODO: include this file in onStart in pages/index.js Use the code below:

// require('libs/utils/sliderdrawer.js');

(function() {
    var isSliderDrawerOpen = false;

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

    // Out Of Office Section top line
    var imgOutOfOfficeShadowLine = new SMF.UI.Image({
        image: "shadow_line.png",
        left: 0,
        top: getUnit(499.5),
        width: getUnit(375),
        height: getUnit(6),
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });
    var cntOutOfOfficeBar = new SMF.UI.Container({
        name: "cntOutOfOfficeBar",
        left: 0,
        width: "100%",
        top: getUnit(501.5),
        height: getUnit(64),
        borderWidth: 0,
        fillColor: "#e7e7e7",
        backgroundTransparent: false,
        onTouchEnded:function(e) {
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
        touchEnabled:false
    });
    cntOutOfOfficeBar.add(swtOutOfOffice);

    var lblOOOStatusTitle = new SMF.UI.Label({
        name: "lblOOOStatusTitle",
        left: getUnit(95.8),
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
        left: getUnit(95.8),
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
        left: getUnit(190),
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
    pgDashboard.add(imgOutOfOfficeShadowLine);


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
    pgDashboard.add(lblNewRequestTitle);

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
    pgDashboard.add(lblNewRequestText);

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
    pgDashboard.add(lblNewRequestTextDate);

    var imgAdd = new SMF.UI.Image({
        image: "btn_plus.png",
        left: getUnit({
            iOS: 293.5,
            Android: 281.8
        }),
        top: getUnit({
            iOS: 593.5,
            Android: 569.8
        }),
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
            alert('Request a new leave');
        }
    });
    pgDashboard.add(imgAdd);

    // Adding Slider Drawer
    //slider drawer
    var sdSelfService = new SMF.UI.SliderDrawer({
        name: "sdSelfService",
        width: getUnit(336),
        touchEnabled: 'true',
        backgroundColor: SMF.UI.Color.WHITE,
        position: 'left',
        onShow: function() {
            isSliderDrawerOpen = true;
        },
        onHide: function() {
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
            alert('status page');
        });

    createRectangle(sdSelfService, 15.1, 328, 320.1, 1, "#979797");
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
            alert('Request page');
        });

    createRectangle(sdSelfService, 15.1, 375.5, 320.1, 1, "#979797");
    createImage(sdSelfService, "imgSliderMenuInfo", "icon_info.png", 20.5, 388.2, 20, 20);
    createTextButton(sdSelfService,
        "btnInfo",
        "Info",
        68.5, 381.5, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            alert('Info page');
        });

    createRectangle(sdSelfService, 15.1, 418, 320.1, 1, "#979797");

    createLabel(sdSelfService, "lblApprovalWorklist", "Approval Worklist", 18.5, 430, 155, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");
    createImage(sdSelfService, "imgSliderMenuStatus", "icon_worklist.png", 24, 479.5, 16, 19);
    createTextButton(sdSelfService,
        "btnWorklist",
        "Worklist",
        68.5, 472, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "9pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#444444", "#a0a0a0",
        function(e) {
            alert('Worklist page');
        });
    createRectangle(sdSelfService, 15.1, 513, 320.1, 1, "#979797");
    // createLabel(sdSelfService, "lblOutOfOffice", "Out Of Office", 18.5, 530, 155, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createTextButton(sdSelfService,
        "btnOutOfOffice",
        "Out Of Office",
        18.5, 530, 155, 23,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#248afd", "#1961c1",
        function(e) {
            Pages.pgOutOfOffice.show(defaultPageAnimation);
        });


    createLabel(sdSelfService, "lblAbout", "About", 18.5, 570, 155, 23, SMF.UI.TextAlignment.LEFT, false, "8pt", false, "#248afd");

    createRectangle(sdSelfService, 15.1, 620.5, 320.1, 1, "#979797");


    createTextButton(sdSelfService,
        "btnLogout",
        "Logout",
        18.5, 628.5, 200, 30,
        SMF.UI.TextAlignment.LEFT,
        "8pt", false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        "#f64b95", "#ebc0d3",
        function(e) {
            Pages.pgLogin.show(defaultPageAnimation);
        });




    pgDashboard.add(sdSelfService);

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgDashboard
     */
    function pgDashboard_onShow() {
        //We are going w/ dark mode. Our navbar is white.
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;
        addHeaderBar();

        //var timerID = setTimeout(function() {
        // setTimeout(function() {
        fillUsedDaysBar();
        // }, 100);

        fillVacationMetrics(pgDashboard.myTimeTable.TotalDays, pgDashboard.myTimeTable.Used, pgDashboard.myTimeTable.Remaining);

        //TODO: Add Avatar pic
        // pgDashboard.imgAvatar.image = pgDashboard.myProfile.Avatar;
        pgDashboard.imgAvatar.image = pgDashboard.sdSelfService.imgSliderAvatar.image = pgDashboard.myProfile.Avatar;
        pgDashboard.lblFullName.text = pgDashboard.sdSelfService.lblSliderFullName.text = pgDashboard.myProfile.FullName;
        pgDashboard.lblTeamRole.text = pgDashboard.sdSelfService.lblSliderTeamRole.text = pgDashboard.myProfile.Role + " / " + pgDashboard.myProfile.Team;
        pgDashboard.cntOutOfOfficeBar.swtOutOfOffice.checked = pgDashboard.myProfile.OutOfOffice;
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
                    (!isSliderDrawerOpen) ? pgDashboard.sdSelfService.show(): pgDashboard.sdSelfService.hide();
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
            left: getUnit(15),
            top: getUnit(378),
            width: getUnit(105),
            height: getUnit(104),
            borderWidth: 1,
            borderColor: "#979797",
            roundedEdge: 0
        });

        var lblTotalDays = new SMF.UI.Label({
            name: "lblTotalDays",
            top: "0",
            left: "0",
            width: "100%",
            height: "73%",
            text: "-",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "30pt",
                bold: true
            }),
            fontColor: "#979797"
        });
        var lblTotalDaysText = new SMF.UI.Label({
            name: "lblTotalDaysText",
            top: "73%",
            left: "0",
            width: "100%",
            height: "20%",
            text: "Total",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "6pt",
                bold: true
            }),
            fontColor: "#979797"
        });

        boxTotalDays.add(lblTotalDays);
        boxTotalDays.add(lblTotalDaysText);

        var boxUsed = new SMF.UI.Container({
            name: "boxUsed",
            left: getUnit(135),
            top: getUnit(378),
            width: getUnit(105),
            height: getUnit(104),
            borderWidth: 1,
            borderColor: "#cca2b5",
            roundedEdge: 0
        });

        var lblUsedDays = new SMF.UI.Label({
            name: "lblUsedDays",
            top: "0",
            left: "0",
            width: "100%",
            height: "73%",
            text: "-",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "30pt",
                bold: true
            }),
            fontColor: "#cca2b5"
        });

        var lblUsedDaysText = new SMF.UI.Label({
            name: "lblUsedDaysText",
            top: "73%",
            left: "0",
            width: "100%",
            height: "20%",
            text: "Used",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "6pt",
                bold: true
            }),
            fontColor: "#cca2b5"
        });
        boxUsed.add(lblUsedDays);
        boxUsed.add(lblUsedDaysText);

        var boxRemaining = new SMF.UI.Container({
            name: "boxRemaining",
            left: getUnit(255),
            top: getUnit(378),
            width: getUnit(105),
            height: getUnit(104),
            borderWidth: 0,
            roundedEdge: 0
        });

        var imgRemaining = new SMF.UI.Image({
            name: "imgRemaining",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            borderWidth: 0,
            image: "square_stripe.png",
            imageFillType: SMF.UI.ImageFillType.NORMAL
        });

        var lblRemainingDays = new SMF.UI.Label({
            name: "lblRemainingDays",
            top: "0",
            left: "0",
            width: "100%",
            height: "73%",
            text: "-",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "30pt",
                bold: true
            }),
            fontColor: "#37404a"
        });

        var lblRemainingDaysText = new SMF.UI.Label({
            name: "lblRemainingDaysText",
            top: "73%",
            left: "0",
            width: "100%",
            height: "20%",
            text: "Remaining",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: "6pt",
                bold: true
            }),
            fontColor: "#37404a"
        });

        boxRemaining.add(imgRemaining);
        boxRemaining.add(lblRemainingDays);
        boxRemaining.add(lblRemainingDaysText);

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
