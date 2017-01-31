/* globals smfOracle mcsUser mcsPassword urlMockServicePath oMenuItems oProfile oTimeTable oLeaveRequestList fingerPrintStatus fingerPrintSuccess touchIDUserName touchIDPassword*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFAjax = require('js-base/utils/SMFAjax');
const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');

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
            text: lang['pgAbout.lblWelcome2.text']
        });
        componentStyler(".7pt .pgLogin.lblWelcome2")(lblWelcome2);
        this.add(lblWelcome2);

        // Username and password inputs
        var txtUserName = new SMF.UI.TextBox({
            name: 'txtUserName',
            returnKeyType: SMF.UI.ReturnKeyType.NEXT,
            onReturnKey: function(e) {
                txtPassword.focus();
            }
        });

        componentStyler(".pgLogin.txtUserName")(txtUserName);

        var txtPassword = new SMF.UI.TextBox({
            name: 'txtPassword',
            returnKeyType: SMF.UI.ReturnKeyType.SEND,
            onReturnKey: function(e) {
                pgLogin_btnLogin_onPressed();
            }
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
            text: lang['pgLogin.lblInfoText.text']
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
            touchIDUserName = SMF.getVariable("username");
            touchIDPassword = SMF.getVariable("password");
            txtUserName.text = touchIDUserName;
            if (Device.canEvaluateFingerPrint && fingerPrintStatus == 'allowed') {
                Device.scanFingerPrint({
                    title: lang['touhidtitle'],
                    subtitle: "",
                    icon: "myicon.png",
                    fallbackText: lang['touchidpassword'],
                }, function onSuccess(e) {
                    fingerPrintSuccess = true;
                    pgLogin_btnLogin_onPressed();
                }, function onError(e) {
                    if (e.code != -4) {
                        // alert("code: " + e.code +
                        //     "\n description: " + e.description);
                    }
                });

            }
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
            Dialog.removeWait();
            btnLogin.enabled = true;
            btnLogin.fillColor = '#00A1F1';
            tinyUtils.fixOverlayBug();

        }

        function pgLogin_btnLogin_onPressed(e) {
            if (fingerPrintSuccess) {
                txtUserName.text = touchIDUserName;
                txtPassword.text = touchIDPassword;
            }
            // getUserInfo()
            smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');

            this.enabled = false;
            btnLogin.fillColor = SMF.UI.Color.GREY;

            Dialog.showWait();

            smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');
            mcsUser = txtUserName.text;
            mcsPassword = txtPassword.text;

            SMF.setVariable("username", mcsUser, true, false);
            SMF.setVariable("password", mcsPassword, true, false);

            if ((mcsUser) && (mcsPassword)) {
                var successCallback = function(e) {
                    // analytics log for auth.
                    smfOracle.logAnalytics('user authenticated');

                    // Dialog.showWait();

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
                    txtUserName.text = "";
                    txtPassword.text = "";
                    SMF.setVariable("username", "", true, false);
                    SMF.setVariable("password", "", true, false);
                    smfOracle.logAnalytics('[error] auth failed ' + e);
                    console.log(mcsUser + ' authentication failed ' + e);

                    Dialog.removeWait();

                    alert(lang['pgLogin.alert1']);
                    btnLogin.enabled = true;
                    btnLogin.fillColor = '#00A1F1';
                }

                smfOracle.authenticate(mcsUser, mcsPassword, successCallback, failureCallback)
            }
            else {
                txtUserName.text = "";
                txtPassword.text = "";
                Dialog.removeWait();
                SMF.setVariable("username", "", true, false);
                SMF.setVariable("password", "", true, false);

                alert(lang['pgLogin.alert2']);
                btnLogin.enabled = true;
                btnLogin.fillColor = '#00A1F1';
            }
        }

        // Downloads collection objects and assign them to repeatbox
        function getUserInfo() {
            // Get self service details from EBS service
            // For now we're going dummy
            // Dialog.showWait();

            getDataFromService(function() {
                // Routing to the Status Page
                router.go('pgStatus');
            });
        }

        // Currently we're working from a mock url that provides all 3 JSON files
        // When we connected to a Real EBS service or MCS instance we'll change these to point real endpoints.
        function getDataFromService(callback) {
            // Getting oMenuItems
            SMFAjax.getJSON(urlMockServicePath + 'menu.json', {
                command: 'GET'
            }, function(data) {
                oMenuItems = data;

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
                        SMFAjax.getJSON(urlMockServicePath + 'leaverequestlist.json', {
                            command: 'GET'
                        }, function(data) {
                            oLeaveRequestList = data;

                            // Getting TimecardList
                            SMFAjax.getJSON(urlMockServicePath + 'timecardlist.json', {
                                command: 'GET'
                            }, function(data) {
                                oTimecardList = data;

                                Dialog.removeWait();
                                oMenuItems && oProfile && oTimeTable && oLeaveRequestList && oTimecardList && callback && callback();
                            });
                        });
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
