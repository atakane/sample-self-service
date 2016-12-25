/* globals smfOracle mcsUser mcsPassword urlMockServicePath oProfile oTimeTable oRequestList*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFAjax = require('js-base/utils/SMFAjax');
const Dialog = require('smf-dialog');
const tinyUtils = require('./component/tinyUtils.js');

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgLogin = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgLogin',
            onKeyPress: pgLogin_onKeyPress,
            onShow: pgLogin_onShow,
            backgroundImage: 'stripe.png'
        });


        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgLogin_onKeyPress(e) {
            if (e.keyCode === 4) {
                Application.exit();
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

        // Username and password inputs
        var txtUserName = new SMF.UI.TextBox({
            name: 'txtUserName'
        });
        componentStyler(".pgLogin.txtUserName")(txtUserName);

        var txtPassword = new SMF.UI.TextBox({
            name: 'txtPassword'
        });
        componentStyler(".pgLogin.txtPassword")(txtPassword);

        var btnLogin = new SMF.UI.TextButton({
            name: 'btnLogin',
            onPressed: pgLogin_btnLogin_onPressed,
        });
        componentStyler(".pgLogin.btnLogin")(btnLogin);
        (Device.deviceOS === 'Android') && (btnLogin.effects.ripple.enabled = true);

        this.add(txtUserName);
        this.add(txtPassword);
        this.add(btnLogin);

        // Warning text
        var lblInfoText = new SMF.UI.Label({
            name: 'lblInfoText',
            text: 'Please login with your MCS realm user.'
        });
        componentStyler(".textTop .6pt .pgLogin.lblInfoText")(lblInfoText);
        this.add(lblInfoText);

        // Version text
        var lblVersion = new SMF.UI.Label({
            name: 'lblVersion',
            text: 'v.' + Application.version
        });
        componentStyler(".textRight .4pt .Generic.lblVersion")(lblVersion);
        this.add(lblVersion);


        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgLogin_onShow() {
            smfOracle.logAnalytics('pgLogin_onShow');
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
            Dialog.removeWait();
            btnLogin.enabled = true;
            btnLogin.fillColor = '#00A1F1';
            tinyUtils.fixOverlayBug();
        }

        function pgLogin_btnLogin_onPressed(e) {
            // getUserInfo()
            smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');

            this.enabled = false;
            btnLogin.fillColor = SMF.UI.Color.GREY;

            Dialog.showWait();

            smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');

            mcsUser = txtUserName.text;
            mcsPassword = txtPassword.text;

            if ((mcsUser) && (mcsPassword)) {
                var successCallback = function(e) {
                    // analytics log for auth.
                    smfOracle.logAnalytics('user authenticated');

                    Dialog.showWait();

                    // Registering for Push notification

                    // Resgistering device to Google and Apple servers
                    Notifications.remote.registerForPushNotifications({
                        OnSuccess: function(e) {
                            // alert('registerForPushNotifications Success:' + JSON.prune(e));

                            var registrationID = Notifications.remote.token;
                            var appId = 'io.smartface.sample.filemanager';
                            var appVersion = Application.version;

                            // Registering device to Oracle MCS
                            smfOracle.registerNotification(registrationID, appId, appVersion, function(err) {
                                if (!err) getUserInfo();
                            });

                        },
                        OnFailure: function(e) {
                            // alert('registerForPushNotifications Failed:' + JSON.prune(e));
                            // downloading objects from mcs storage
                            getUserInfo();
                        }
                    });
                };

                var failureCallback = function(e) {
                    // analytics log for auth fail
                    smfOracle.logAnalytics('[error] auth failed ' + e);
                    console.log(mcsUser + ' authentication failed ' + e);

                    Dialog.removeWait();

                    alert('Username or Password is incorrect, please try again');
                    btnLogin.enabled = true;
                    btnLogin.fillColor = '#00A1F1';
                }

                smfOracle.authenticate(mcsUser, mcsPassword, successCallback, failureCallback)
            }
            else {
                Dialog.removeWait();
                alert('Please enter your username and password.');
                btnLogin.enabled = true;
                btnLogin.fillColor = '#00A1F1';
            }
        }

        // Downloads collection objects and assign them to repeatbox
        function getUserInfo() {
            // Get self service details from EBS service
            // For now we're going dummy
            Dialog.showWait();

            getDataFromService(function() {
                // Routing to the Status Page
                router.go('pgStatus');
            });
        }

        // Currently we're working from a mock url that provides all 3 JSON files
        // When we connected to a Real EBS service or MCS instance we'll change these to point real endpoints.
        function getDataFromService(callback) {
            // Getting oProfile
            SMFAjax.getJSON(urlMockServicePath + 'profile.json', {
                command: 'GET'
            }, function(data) {
                oProfile = data;

                // Getting TimeTable
                SMFAjax.getJSON(urlMockServicePath + 'timetable.json', {
                    command: 'GET'
                }, function(data) {
                    oTimeTable = data;

                    // Getting RequestList
                    SMFAjax.getJSON(urlMockServicePath + 'requestlist.json', {
                        command: 'GET'
                    }, function(data) {
                        oRequestList = data;

                        Dialog.removeWait();
                        oProfile && oTimeTable && oRequestList && callback && callback();
                    });
                });
            });
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgLogin;
