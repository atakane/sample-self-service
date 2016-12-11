/* globals*/
// const SliderDrawerBaseComponent = require("js-base/component/slider-drawer");


// const SliderDrawerComp = function(params){
//   this._view = new SMF.UI.SliderDrawer(params);
//   this._isShowed = false;
// };

// SliderDrawerComp.prototype.show = function(){
//   this._view.show();
//   this._isShowed = true;
// };

// SliderDrawerComp.prototype.hide = function(){
//   this._view.hide();
//   this._isShowed = false;
// };

// SliderDrawerComp.prototype.toggle = function(){
//   this._isShowed ? this.hide() : this.show();
// };

// module.exports = SliderDrawerComp;

const SMFcomponents = require('./SMFcomponents.js');
const getUnit = require('./getUnit.js');

// Router
const router = require('js-base/core/router'); 

exports.createSliderDrawer = function (page, name) {
    
    // Adding Slider Drawer 

	const sliderDrawer = new SMF.UI.SliderDrawer({
	    name: name,
		width: getUnit('89.6%'),
		height: "100%",
		horizontalGap: 0,
		verticalGap: 0,
		left: 0,
		top: 0,
		position: 'left',
		onHide: function() {}
	});
    
    var cntGeneral = new SMF.UI.Container({
        name: 'cntGeneral',
        left: 0,
        width: '100%',
        top: 0,
        height: '100%',
        borderWidth: 0,
        backgroundTransparent: true
    });
    sliderDrawer.add(cntGeneral);
    
    
    // Profile
    var cntTop = new SMF.UI.Container({
        name: 'cntTop',
        left: 0,
        width: '100%',
        top: getUnit({iOS:0,Android:80}),
        height: getUnit({iOS:'33.7331%',Android:'24.7331%'}),
        borderWidth: 0,
        backgroundTransparent: true
    });
    cntGeneral.add(cntTop);

    SMFcomponents.createImage(cntTop, 'imgSliderProfileBackground', 'slider_rectangle.png', 0, 0, '100%', '100%', SMF.UI.ImageFillType.STRETCH);
    SMFcomponents.createImage(cntTop, 'imgSliderAvatar', '', getUnit('37.797%') ,getUnit({iOS:'24.4292%',Android:'14%'}), getUnit(80), getUnit(80), SMF.UI.ImageFillType.ASPECTFIT);
    SMFcomponents.createLabel(cntTop, 'lblSliderFullName', '', 0, getUnit({iOS:'64.7534%',Android:'65%'}), '100%', getUnit({iOS:'15%',Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '12pt', false, '#248afd');
    SMFcomponents.createLabel(cntTop, 'lblSliderTeamRole', '', 0, getUnit({iOS:'78.8767%',Android:'81%'}), '100%', getUnit(20), SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#248afd');


    //Slider Menus
    SMFcomponents.createLabel(cntGeneral, 'lblLeaveManagement', 'Leave Management', '4.9333%', '37.5562%', '55%', 23, SMF.UI.TextAlignment.LEFT, false, '8pt', false, '#248afd');

    SMFcomponents.createImage(cntGeneral, 'imgSliderMenuStatus', 'icon_status.png', '5.4666%', '44.4527%', getUnit({iOS:21, Android:20.2}), getUnit({iOS:19,Android:18.2}),SMF.UI.ImageFillType.ASPECTFIT);
    SMFcomponents.createTextButton(cntGeneral,
        'btnStatus',
        'Status',
        '18.2666%', '43.4032%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '9pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#444444', '#a0a0a0',
        function(e) {
            (Pages.currentPage === Pages.pgStatus) ? sliderDrawer.hide(): Pages.pgStatus.show();
        });
    //336
    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '49.1754%', '95.506%', 1, '#e7e7e7');
    SMFcomponents.createImage(cntGeneral, 'imgSliderMenuRequest', 'icon_request.png', '5.8666%', '51.4992%', getUnit({iOS:22, Android:20.7}), getUnit({iOS:20, Android:18.7}),SMF.UI.ImageFillType.ASPECTFIT);
    SMFcomponents.createTextButton(cntGeneral,
        'btnRequest',
        'New Request',
        '18.2666%', '50.5247%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '9pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#444444', '#a0a0a0',
        function(e) {
            (Pages.currentPage === Pages.pgNewLeaveRequest) ? sliderDrawer.hide(): Pages.pgNewLeaveRequest.show();
        });

    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '56.2968%', '95.506%', 1, '#e7e7e7');

    SMFcomponents.createImage(cntGeneral, 'imgSliderMenuMyRequests', 'icon_info.png', '5.8666%', '58.6206%', getUnit({iOS:22, Android:18.5}), getUnit({iOS:20, Android:18.5}),SMF.UI.ImageFillType.ASPECTFIT);
    SMFcomponents.createTextButton(cntGeneral,
        'btnMyRequests',
        'My Requests',
        '18.2666%', '57.6461%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '9pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#444444', '#a0a0a0',
        function(e) {
             (Pages.currentPage === Pages.pgMyRequests) ? sliderDrawer.hide(): router.go('pgMyRequests');
        });

    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '63.4182%', '95.506%', 1, '#e7e7e7');

    SMFcomponents.createTextButton(cntGeneral,
        'btnApprovals',
        'Approval Worklist',
        '4.9333%', '64.7222%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '8pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#248afd', '#1961c1',
        function(e) {
            (Pages.currentPage === Pages.pgApprovalWorklist) ? sliderDrawer.hide(): router.go('pgApprovalWorklist');
        });

    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '69.79%', '95.506%', 1, '#e7e7e7');
    SMFcomponents.createTextButton(cntGeneral,
        'btnOutOfOffice',
        'Out Of Office',
        '4.9333%', '70.9891%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '8pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#248afd', '#1961c1',
        function(e) {
            (Pages.currentPage === Pages.pgOutOfOffice) ? sliderDrawer.hide(): Pages.pgOutOfOffice.show();
        });
    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '76.0569%', '95.506%', 1, '#e7e7e7');
    SMFcomponents.createTextButton(cntGeneral,
        'btnAbout',
        'About',
        '4.9333%', '77.256%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '8pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#248afd', '#1961c1',
        function(e) {
            (Pages.currentPage === Pages.pgAbout) ? sliderDrawer.hide(): router.go('pgAbout');
        });
        
    SMFcomponents.createRectangle(cntGeneral, '4.4940%', '93.02848%', '95.506%', 1, '#e7e7e7');

    SMFcomponents.createTextButton(cntGeneral,
        'btnLogout',
        'Logout',
        '4.9333%', '94.2278%', '55%', '4.5%',
        SMF.UI.TextAlignment.LEFT,
        '8pt', false,
        SMF.UI.Color.WHITE, SMF.UI.Color.WHITE,
        '#f64b95', '#ebc0d3',
        function(e) {
            router.go('pgLogin');
        });

    page.add(sliderDrawer);
}