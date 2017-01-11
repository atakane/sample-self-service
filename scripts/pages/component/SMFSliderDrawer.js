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

    // Slider Menus
    // Main Menu 1
    var lblLeaveManagement = new SMF.UI.Label({
        name: 'lblLeaveManagement',
        text: lang['pgsliderdrawer.lblLeaveManagement.text']
    });
    componentStyler(".textLeft .8pt .sliderDrawer.lblLeaveManagement")(lblLeaveManagement);
    cntGeneral.add(lblLeaveManagement);

    // Sub Menu 1.1
    // icon
    var imgSliderMenuStatus = new SMF.UI.Image({
        name: 'imgSliderMenuStatus',
    });
    componentStyler(".sliderDrawer.imgSliderMenuStatus")(imgSliderMenuStatus);
    cntGeneral.add(imgSliderMenuStatus);

    // button
    var btnStatus = new SMF.UI.TextButton({
        name: 'btnStatus',
        text: lang['pgsliderdrawer.btnStatus.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgStatus) ? sliderDrawer.hide(): router.goTransitionless('pgStatus');
        }
    });
    componentStyler(".textLeft .9pt .sliderDrawer.btnSubMenuTemplate .sliderDrawer.btnStatus")(btnStatus);
    cntGeneral.add(btnStatus);

    // underline
    var recUnderline1 = new SMF.UI.Rectangle({
        name: 'recUnderline1',
    });
    componentStyler(".sliderDrawer.underlineTemplate .sliderDrawer.recUnderline1")(recUnderline1);
    cntGeneral.add(recUnderline1);


    // Sub Menu 1.2
    // icon
    var imgSliderMenuRequest = new SMF.UI.Image({
        name: 'imgSliderMenuRequest',
    });
    componentStyler(".sliderDrawer.imgSliderMenuRequest")(imgSliderMenuRequest);
    cntGeneral.add(imgSliderMenuRequest);

    // button
    var btnNewRequest = new SMF.UI.TextButton({
        name: 'btnNewRequest',
        text: lang['pgsliderdrawer.btnRequest.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgNewLeaveRequest) ? sliderDrawer.hide(): router.goTransitionless('pgNewLeaveRequest');
        }
    });
    componentStyler(".textLeft .9pt .sliderDrawer.btnSubMenuTemplate .sliderDrawer.btnNewRequest")(btnNewRequest);
    cntGeneral.add(btnNewRequest);

    // underline
    var recUnderline2 =  recUnderline1.clone(); 
    componentStyler(".sliderDrawer.recUnderline2")(recUnderline2);
    cntGeneral.add(recUnderline2);


    // Sub Menu 1.3
    var imgSliderMenuMyRequests = new SMF.UI.Image({
        name: 'imgSliderMenuMyRequests',
    });
    componentStyler(".sliderDrawer.imgSliderMenuMyRequests")(imgSliderMenuMyRequests);
    cntGeneral.add(imgSliderMenuMyRequests);

    // button
    var btnMyRequests = new SMF.UI.TextButton({
        name: 'btnMyRequests',
        text: lang['pgsliderdrawer.btnMyRequests.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgMyRequests) ? sliderDrawer.hide(): router.goTransitionless('pgMyRequests');
        }
    });
    componentStyler(".textLeft .9pt .sliderDrawer.btnSubMenuTemplate .sliderDrawer.btnMyRequests")(btnMyRequests);
    cntGeneral.add(btnMyRequests);

    // underline
    var recUnderline3  =  recUnderline1.clone(); 
    componentStyler(".sliderDrawer.recUnderline3")(recUnderline3);
    cntGeneral.add(recUnderline3);


    // Main Menu 2
    var btnApprovals = new SMF.UI.TextButton({
        name: 'btnApprovals',
        text: lang['pgsliderdrawer.btnApprovals.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgApprovalWorklist) ? sliderDrawer.hide(): router.goTransitionless('pgApprovalWorklist');
        }
    });
    componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnApprovals")(btnApprovals);
    cntGeneral.add(btnApprovals);

    // underline
    var recUnderline4 =  recUnderline1.clone(); 
    componentStyler(".sliderDrawer.recUnderline4")(recUnderline4);
    cntGeneral.add(recUnderline4);


    // Main Menu 3
    var btnOutOfOffice = new SMF.UI.TextButton({
        name: 'btnOutOfOffice',
        text: lang['pgStatus.lblOOOStatusTitle2.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgOutOfOffice) ? sliderDrawer.hide(): router.goTransitionless('pgOutOfOffice');
        }
    });
    componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnOutOfOffice")(btnOutOfOffice);
    cntGeneral.add(btnOutOfOffice);

    // underline
    var recUnderline5 = recUnderline1.clone(); 
    componentStyler(".sliderDrawer.recUnderline5")(recUnderline5);
    cntGeneral.add(recUnderline5);

    // Main Menu 4
    var btnAbout = new SMF.UI.TextButton({
        name: 'btnAbout',
        text: lang['pgsliderdrawer.btnAbout.text'],
        onPressed: function(e) {
            (Pages.currentPage === Pages.pgAbout) ? sliderDrawer.hide(): router.goTransitionless('pgAbout');
        }
    });
    componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnAbout")(btnAbout);
    cntGeneral.add(btnAbout);

    // underline
    var recUnderline6 =  recUnderline1.clone(); 
    componentStyler(".sliderDrawer.recUnderline6")(recUnderline6);
    cntGeneral.add(recUnderline6);

    // Main Menu 5
    var btnLogout = new SMF.UI.TextButton({
        name: 'btnLogout',
        text: lang['pgsliderdrawer.btnLogout.text'],
        onPressed: function(e) {
            router.goTransitionless('pgLogin');
        }
    });
    componentStyler(".textLeft .8pt .sliderDrawer.btnMenuTemplate .sliderDrawer.btnLogout")(btnLogout);
    cntGeneral.add(btnLogout);

    page.add(sliderDrawer);
}
