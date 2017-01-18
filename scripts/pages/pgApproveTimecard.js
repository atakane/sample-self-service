/* globals smfOracle oProfile*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgApproveTimecard = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgApproveTimecard',
            onKeyPress: pgApproveTimecard_onKeyPress,
            onShow: pgApproveTimecard_onShow,
            backgroundImage: 'stripe.png'
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgApproveTimecard_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        
        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgApproveTimecard_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('Approve Timecard');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "back")
                    router.back();
            });

            // Updating logged in user's info on the this page's slider drawer
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgApproveTimecard_onShow');
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgApproveTimecard;
