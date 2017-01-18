/* globals oMenuItems*/
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
    // oMenuItems is loading at login.js 

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

    var contentSpaceForMenuItem = 6.25;
    var menuLineTop = 0;
    var menuLabelTop = 1.9207;
    var menuHeight = 10.0360;
    var totalMenuItemCount = 0;
    var totalSubMenuCount = 0;

    for (var i = 0; i < oMenuItems.length; i++) {
        var text = lang.hasOwnProperty(oMenuItems[i].text) ? lang[oMenuItems[i].text] : oMenuItems[i].text;
        var targetPage = oMenuItems[i].targetPage;
        var subItems = oMenuItems[i].subItems;

        // creating a top level menu item
        createMenu(svMenu, false, text, targetPage, menuLabelTop);

        if (subItems && (subItems.length != 0)) {
            menuLineTop = menuLineTop + menuHeight;
            menuLabelTop = menuLabelTop + menuHeight;
            totalSubMenuCount += subItems.length;

            for (var s = 0; s < subItems.length; s++) {

                var textSubMenu = lang.hasOwnProperty(subItems[s].text) ? lang[subItems[s].text] : subItems[s].text;
                var targetPageSubMenu = subItems[s].targetPage;
                var subMenuIconStyle = subItems[s].iconStyle;

                // creating a sub menu item
                createMenu(svMenu, true, textSubMenu, targetPageSubMenu, menuLabelTop);

                // adding Icon
                if (subMenuIconStyle) {
                    createIcon(svMenu, menuLabelTop + 1, subMenuIconStyle)
                }

                menuLineTop = menuLineTop + menuHeight;
                menuLabelTop = menuLabelTop + menuHeight;

                // drawing underline
                createUnderline(svMenu, menuLineTop);
            }
        }
        else {
            menuLineTop = menuLineTop + menuHeight;
            menuLabelTop = menuLabelTop + menuHeight;

            // drawing underline if this is not last menu item
            if (i != oMenuItems.length - 1) {
                createUnderline(svMenu, menuLineTop)
            }
            else {
                // 1 for logout static menu item
                totalMenuItemCount = oMenuItems.length + totalSubMenuCount + 1;
                
                if (totalMenuItemCount > 10) {
                    svMenu.contentHeight = (contentSpaceForMenuItem * totalMenuItemCount) + '%';
                    createUnderline(svMenu, menuLineTop);
                }

                createLogoutButton(svMenu, menuLabelTop);
            };
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

    function createLogoutButton(parent, top) {
        // Main Menu 5
        var btnLogout = new SMF.UI.TextButton({
            name: 'btnLogout',
            text: lang['pgsliderdrawer.btnLogout.text'],
            onPressed: function(e) {
                router.goTransitionless('pgLogin');
            }
        });
        componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnLogout")(btnLogout);

        if (totalMenuItemCount > 10) {
            btnLogout.top = top + '%';
        }
        else {
            // topline
            var recLineLogout = new SMF.UI.Rectangle({});
            componentStyler(".sliderDrawer.underlineTemplate .sliderDrawer.recUnderlineLogout")(recLineLogout);
            parent.add(recLineLogout);
        }

        parent.add(btnLogout);
    }

    cntGeneral.add(svMenu);
    page.add(sliderDrawer);
}
