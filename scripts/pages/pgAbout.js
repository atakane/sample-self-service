/* globals smfOracle oProfile*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgLogin = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgAbout',
            onKeyPress: pgAbout_onKeyPress,
            onShow: pgAbout_onShow,
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
        function pgAbout_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        // top image
        var imgHome = new SMF.UI.Image({
            name: 'imgHome'
        });
        componentStyler(".Generic.imgHome")(imgHome);
        this.add(imgHome);

        // Welcome texts
        var lblWelcome = new SMF.UI.Label({
            name: 'lblWelcome',
            text: 'EBS\nSelf Service'
        });
        componentStyler(".17pt .pgLogin.lblWelcome")(lblWelcome);
        this.add(lblWelcome);

        var lblWelcome2 = new SMF.UI.Label({
            name: 'lblWelcome2',
            text: 'Powered & secured by Oracle MCS & ICS'
        });
        componentStyler(".7pt .pgLogin.lblWelcome2")(lblWelcome2);
        this.add(lblWelcome2);

        // Version text
        var lblVersion = new SMF.UI.Label({
            name: 'lblVersion',
            text: 'v.' + Application.version
        });
        componentStyler(".textRight .4pt .Generic.lblVersion")(lblVersion);
        this.add(lblVersion);

        // About text
        var lblInfoText = new SMF.UI.Label({
            name: 'lblInfoText',
            text: 'This app is an employee self-service app which is integrated with Oracle Integration Cloud Service (ICS). Through ICS, this app can be integrated with all Oracle systems such as E-Business Suite or Applications Cloud.\n\nIt is a fully native app developed with the Smartface Cloud Platform. Full source code is available and enterprises can extend this app in the cloud development environment, only with JavaScript knowledge.'
        });
        componentStyler(".8pt .pgAbout.lblInfoText")(lblInfoText);

        this.add(imgHome);
        this.add(lblWelcome);
        this.add(lblWelcome2);
        this.add(lblVersion);
        this.add(lblInfoText);

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgAbout_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('About');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu")
                    Pages.currentPage.sdSelfService.show();
            });

            // Updating logged in user's info on the this page's slider drawer
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgAbout_onShow');
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgLogin;
