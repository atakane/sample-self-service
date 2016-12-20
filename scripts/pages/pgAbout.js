/* globals smfOracle oProfile*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// Router
const router = require('js-base/core/router');

const pgLogin = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgAbout',
            onKeyPress: pgAbout_onKeyPress,
            onShow: pgAbout_onShow,
            backgroundImage: 'stripe.png'
        });

        headerBarOptions.setTitle('About');
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

        // Home Background
        var imgHome = new SMF.UI.Image({
            name: 'imgHome',
            image: 'home_back.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '40%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        });

        var lblWelcome = new SMF.UI.Label({
            top: '15%',
            left: '10%',
            width: '80%',
            height: '15%',
            text: 'EBS\nSelf Service',
            textAlignment: SMF.UI.TextAlignment.TOP,
            font: new SMF.UI.Font({
                size: '17pt'
            }),
            fontColor: SMF.UI.Color.WHITE,
            touchEnabled: false,
            showScrollBar: false,
            multipleLine: true,
            borderWidth: 0
        });
        

        var lblWelcome2 = new SMF.UI.Label({
            top: '29%',
            left: '10%',
            width: '80%',
            height: '8%',
            text: 'Powered & secured by Oracle MCS & ICS',
            textAlignment: SMF.UI.TextAlignment.TOP,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: SMF.UI.Color.WHITE,
            touchEnabled: false,
            showScrollBar: false,
            borderWidth: 0
        });

        var lblVersion = new SMF.UI.Label({
            top: '97%',
            left: '0%',
            width: '99%',
            height: '3%',
            text: 'v.' + Application.version,
            textAlignment: SMF.UI.TextAlignment.RIGHT,
            font: new SMF.UI.Font({
                size: '4pt'
            }),
            fontColor: SMF.UI.Color.BLACK,
            touchEnabled: false,
            showScrollBar: false,
            borderWidth: 0,
            multipleLine: false
        });

        // About text
        var lblInfoText = new SMF.UI.Label({
            top: '45%',
            left: '6%',
            width: '88%',
            height: '49%',
            text: 'This app is an employee self-service app that is integrated with Oracle Integration Cloud Service (ICS). Through ICS, this app can be integrated with all Oracle systems such as E-Business Suite or Applications Cloud.\n\nIt is a fully native app developed with the Smartface Cloud Platform. Full source code is available and enterprises can extend this app in the cloud development environment, only with JavaScript knowledge.',
            textAlignment: SMF.UI.TextAlignment.TOP,
            font: new SMF.UI.Font({
                size: '8pt'
            }),
            multipleLine: true,
            borderWidth: 0
        });

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
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgLogin;
