/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation createImage createLabel SMFAjax urlMockServicePath oProfile oTimeTable oRequestList*/
(function() {

    var pgLogin = Pages.pgLogin = new SMF.UI.Page({
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
    createImage(pgLogin, 'imgHome', 'home_back.png', '0', '0', '100%', '40%', SMF.UI.ImageFillType.STRETCH);

    // Welcome texts
    createLabel(pgLogin, 'lblWelcome', 'EBS\nSelf Service', '9.5%', '15%', '80%', '15%', SMF.UI.TextAlignment.TOP, true, '17pt', false, SMF.UI.Color.WHITE);
    createLabel(pgLogin, 'lblWelcome2', 'Powered & secured by Oracle MCS & ICS', '10%', '29%', '80%', '8%', SMF.UI.TextAlignment.TOP, false, '7pt', false, SMF.UI.Color.WHITE);

    var txtUserName = new SMF.UI.TextBox({
        top: '51%',
        left: '10%',
        width: '80%',
        height: '8%',
        placeHolder: 'Username',
        text: '',
        horizontalGap: 15,
        roundedEdge: 0
    });

    var txtPassword = new SMF.UI.TextBox({
        top: '60%',
        left: '10%',
        width: '80%',
        height: '8%',
        placeHolder: 'Password',
        text: '',
        isPassword: true,
        horizontalGap: 15,
        roundedEdge: 0
    });

    var btnLogin = new SMF.UI.TextButton({
        top: '69%',
        left: '10%',
        width: '80%',
        height: '8%',
        text: 'Login',
        textAlignment: SMF.UI.TextAlignment.CENTER,
        onPressed: pgLogin_btnLogin_onPressed,
        roundedEdge: 1
    });
    (Device.deviceOS === 'Android') && (btnLogin.effects.ripple.enabled = true);

    pgLogin.add(txtUserName);
    pgLogin.add(txtPassword);
    pgLogin.add(btnLogin);

    // Warning text
    createLabel(pgLogin, 'lblInfoText', 'Please login with your MCS realm user.', '10%', '78%', '80%', '8%', SMF.UI.TextAlignment.TOP, false, '6pt', false, SMF.UI.Color.BLACK);

    // Version text
    createLabel(pgLogin, 'lblVersion', 'v.' + Application.version, '0', '97%', '99%', '3%', SMF.UI.TextAlignment.RIGHT, false, '4pt', false, SMF.UI.Color.BLACK);


    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgLogin_onShow() {
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
        Dialog.removeWait();
        btnLogin.enabled = true;
        btnLogin.fillColor = '#00A1F1';
        fixOverlayBug();
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
                //analytics log for auth.
                smfOracle.logAnalytics('user authenticated');

                Dialog.showWait();

                //Registering for Push notification

                //Resgistering device to Google and Apple servers
                Notifications.remote.registerForPushNotifications({
                    OnSuccess: function(e) {
                        //alert('registerForPushNotifications Success:' + JSON.prune(e));

                        var registrationID = Notifications.remote.token;
                        var appId = 'io.smartface.sample.filemanager';
                        var appVersion = Application.version;

                        //Registering device to Oracle MCS
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
                //analytics log for auth fail
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

    //Downloads collection objects and assign them to repeatbox
    function getUserInfo() {
        // Get self service details from EBS service
        // For now we're going dummy
        Dialog.showWait();

        getDataFromService(function() {
            Pages.pgStatus.show(defaultPageAnimation);
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
})();
