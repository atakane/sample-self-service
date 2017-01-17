/* globals*/
// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

exports.createSliderDrawer = function(page, name) {

    // Adding Slider Drawer 

    const sliderDrawer = new SMF.UI.SliderDrawer({
        name: name,
        onHide: function() {}
    });
    componentStyler(".sliderDrawer.self")(sliderDrawer);

    // Main container will be the parent of the all components added to slider-drawer
    var cntGeneral = new SMF.UI.Container({
        name: 'cntGeneral'
    });
    componentStyler(".sliderDrawer.cntGeneral")(cntGeneral);
    sliderDrawer.add(cntGeneral);

    // Profile
    var cntTop = new SMF.UI.Container({
        name: 'cntTop'
    });
    componentStyler(".sliderDrawer.cntTop")(cntTop);
    cntGeneral.add(cntTop);


    // Profile Section
    // Profile Background
    var imgSliderProfileBackground = new SMF.UI.Image({
        name: 'imgSliderProfileBackground',
    });
    componentStyler(".sliderDrawer.imgSliderProfileBackground")(imgSliderProfileBackground);
    cntTop.add(imgSliderProfileBackground);

    // Profile Image
    var imgSliderAvatar = new SMF.UI.Image({
        name: 'imgSliderAvatar',
    });
    componentStyler(".sliderDrawer.imgSliderAvatar")(imgSliderAvatar);
    cntTop.add(imgSliderAvatar);

    // FullName & Role
    var lblSliderFullName = new SMF.UI.Label({
        name: 'lblSliderFullName'
    });
    componentStyler(".textCenter .12pt .sliderDrawer.lblSliderFullName")(lblSliderFullName);
    cntTop.add(lblSliderFullName);

    var lblSliderTeamRole = new SMF.UI.Label({
        name: 'lblSliderTeamRole'
    });
    componentStyler(".textCenter .7pt .sliderDrawer.lblSliderFullName .sliderDrawer.lblSliderTeamRole")(lblSliderTeamRole);
    cntTop.add(lblSliderTeamRole);

    // Dynamic menu

    var oMenuItems = [{
        "text": lang['pgsliderdrawer.btnStatus.text'],
        "targetPage": "pgStatus",
        "iconStyle": "",
        "subItems": []
    }, {
        "text": lang['pgsliderdrawer.lblLeaveManagement.text'],
        "targetPage": "pgMyRequests",
        "iconStyle": "",
        "subItems": []
    }, {
        "text": "Timecards",
        "targetPage": "",
        "iconStyle": "",
        "subItems": []
    }, {
        "text": lang['pgsliderdrawer.btnApprovals.text'],
        "targetPage": "",
        "subItems": [{
            "text": "Timecards",
            "targetPage": "pgApprovalTimecards",
            "iconStyle": ".sliderDrawer.imgSliderMenuStatus"
        }, {
            "text": "Leave Requests",
            "targetPage": "pgApprovalWorklist",
            "iconStyle": ".sliderDrawer.imgSliderMenuRequest"
        }]
    }, {
        "text": lang['pgStatus.lblOOOStatusTitle2.text'],
        "targetPage": "pgOutOfOffice",
        "iconStyle": "",
        "subItems": []
    }, {
        "text": lang['pgsliderdrawer.btnAbout.text'],
        "targetPage": "pgAbout",
        "iconStyle": "",
        "subItems": []
    }]

    var svMenu = new SMF.UI.ScrollView({
        name: 'svMenu',
        left: '0%',
        top: '36.3571%',
        width: '100%',
        height: '63.6429%',
        contentHeight: '62.4438%',
        contentWidth: '100%',
        // autoSize: true,
        layoutType: SMF.UI.LayoutType.ABSOLUTE,
        orientation: SMF.UI.Orientation.VERTICAL,
        horizontalGap: '0dp',
        verticalGap: '0dp',
        borderWidth: 0
    });

    var menuLineTop = 0;
    var menuLabelTop = 1.9207;
    var menuHeight = 10.0360;

    for (var i = 0; i < oMenuItems.length; i++) {
        var text = oMenuItems[i].text;
        var targetPage = oMenuItems[i].targetPage;
        var subItems = oMenuItems[i].subItems;


        createMenu(svMenu, false, text, targetPage, menuLabelTop);

        // /// patlak kisim
        // var tmpButton = new SMF.UI.TextButton({
        //     top: menuLabelTop + '%',
        //     text: text,
        //     onPressed: function(e) {
        //         //(Pages.currentPage === Pages.pgApprovalWorklist) ? sliderDrawer.hide(): 
        //         console.log(targetPage);
        //         // if (btnMenuItem.targetPage)
        //         // router.goTransitionless(eval('btnMenuItem' + i + '.targetPage'));
        //     }
        // });

        // var styleName = ".sliderDrawer.btnMenuTemplate";
        // componentStyler(".textLeft .8pt " + styleName)(tmpButton);
        // svMenu.add(tmpButton);

        // /// patlak kisim

        if (subItems && (subItems.length != 0)) {
            menuLineTop = menuLineTop + menuHeight;
            menuLabelTop = menuLabelTop + menuHeight;

            for (var s = 0; s < subItems.length; s++) {

                var textSubMenu = subItems[s].text;
                var targetPageSubMenu = subItems[s].targetPage;
                var subMenuStyle = subItems[s].iconStyle;

                createMenu(svMenu, true, textSubMenu, targetPageSubMenu, menuLabelTop);

                if (subMenuStyle) {
                    createIcon(svMenu, menuLabelTop + 1, subMenuStyle)
                }

                menuLineTop = menuLineTop + menuHeight;
                menuLabelTop = menuLabelTop + menuHeight;
                createUnderline(svMenu, menuLineTop);
            }
        }
        else {
            menuLineTop = menuLineTop + menuHeight;
            menuLabelTop = menuLabelTop + menuHeight;

            if (i != oMenuItems.length - 1) createUnderline(svMenu, menuLineTop);
        }
    }

    function createMenu(parent, isSubMenu, text, targetPage, top) {
        var tmpButton = new SMF.UI.TextButton({
            top: top + '%',
            text: text,
            onPressed: function(e) {
                if (targetPage && (targetPage.length > 0))
                    (Pages.currentPage.name === targetPage) ? sliderDrawer.hide() : router.goTransitionless(targetPage);
            }
        });

        var styleName = ".sliderDrawer.btnMenuTemplate";
        if (isSubMenu) {
            styleName = ".sliderDrawer.btnSubMenuTemplate";
        }
        componentStyler(".textLeft .8pt " + styleName)(tmpButton);
        parent.add(tmpButton);
    }

    function createUnderline(parent, top) {
        var tmpLine = new SMF.UI.Rectangle({
            top: top + '%'
        });
        componentStyler(".sliderDrawer.underlineTemplate")(tmpLine);

        parent.add(tmpLine);
    }

    function createIcon(parent, top, style) {
        var tmpIcon = new SMF.UI.Image({
            top: top + '%'
        });
        componentStyler(style)(tmpIcon);

        parent.add(tmpIcon);
    }



    // underline
    var recUnderlineLogout = new SMF.UI.Rectangle({
        name: 'recUnderlineLogout'
    });
    componentStyler(".sliderDrawer.underlineTemplate .sliderDrawer.recUnderlineLogout")(recUnderlineLogout);
    svMenu.add(recUnderlineLogout);

    // Main Menu 5
    var btnLogout = new SMF.UI.TextButton({
        name: 'btnLogout',
        text: lang['pgsliderdrawer.btnLogout.text'],
        onPressed: function(e) {
            router.goTransitionless('pgLogin');
        }
    });
    componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnLogout")(btnLogout);
    svMenu.add(btnLogout);



    cntGeneral.add(svMenu);

    page.add(sliderDrawer);
}
