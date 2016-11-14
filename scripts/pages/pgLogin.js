/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation*/
(function() {

    var pgLogin = Pages.pgLogin = new SMF.UI.Page({
        name: "pgLogin",
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

    var imgHome = new SMF.UI.Image({
        name: "imgHome",
        image: "home_back.png",
        left: 0,
        top: 0,
        width: "100%",
        height: "40%",
        imageFillType: SMF.UI.ImageFillType.STRETCH
    });

    var lblWelcome = new SMF.UI.Label({
        top: "15%",
        left: "10%",
        width: "80%",
        height: "15%",
        text: "EBS\nSelf Service",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "17pt"
        }),
        fontColor: SMF.UI.Color.WHITE,
        touchEnabled: false,
        showScrollBar: false,
        multipleLine: true,
        borderWidth: 0
    });

    var lblWelcome2 = new SMF.UI.Label({
        top: "29%",
        left: "10%",
        width: "80%",
        height: "8%",
        text: "Powered & secured by Oracle MCS & ICS",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "7pt"
        }),
        fontColor: SMF.UI.Color.WHITE,
        touchEnabled: false,
        showScrollBar: false,
        borderWidth: 0
    });

    var lblVersion = new SMF.UI.Label({
        top: "97%",
        left: "0%",
        width: "99%",
        height: "3%",
        text: 'v.' + Application.version,
        textAlignment: SMF.UI.TextAlignment.RIGHT,
        font: new SMF.UI.Font({
            size: "4pt"
        }),
        fontColor: SMF.UI.Color.BLACK,
        touchEnabled: false,
        showScrollBar: false,
        borderWidth: 0,
        multipleLine: false
    });

    var txtUserName = new SMF.UI.TextBox({
        top: "51%",
        left: "10%",
        width: "80%",
        height: "8%",
        placeHolder: "Username",
        text: "test",
        horizontalGap: 15,
        roundedEdge: 0
    });

    var txtPassword = new SMF.UI.TextBox({
        top: "60%",
        left: "10%",
        width: "80%",
        height: "8%",
        placeHolder: "Password",
        text: "Qwe12345",
        isPassword: true,
        horizontalGap: 15,
        roundedEdge: 0
    });

    var btnLogin = new SMF.UI.TextButton({
        top: "69%",
        left: "10%",
        width: "80%",
        height: "8%",
        text: "Login",
        textAlignment: SMF.UI.TextAlignment.CENTER,
        onPressed: pgLogin_btnLogin_onPressed,
        roundedEdge: 1
    });
    (Device.deviceOS === "Android") && (btnLogin.effects.ripple.enabled = true);

    var lblInfoText = new SMF.UI.Label({
        top: "78%",
        left: "10%",
        width: "80%",
        height: "8%",
        text: "Please login with your MCS realm user.",
        textAlignment: SMF.UI.TextAlignment.TOP,
        font: new SMF.UI.Font({
            size: "6pt"
        })
    });

    pgLogin.add(imgHome);
    pgLogin.add(lblWelcome);
    pgLogin.add(lblWelcome2);
    pgLogin.add(lblVersion);
    pgLogin.add(txtUserName);
    pgLogin.add(txtPassword);
    pgLogin.add(btnLogin);
    pgLogin.add(lblInfoText);


    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgLogin_onShow() {
        SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
        Dialog.removeWait();
        btnLogin.enabled = true;
        btnLogin.fillColor = "#00A1F1";
    }

    function pgLogin_btnLogin_onPressed(e) {
        getUserInfo()
            // smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');

        // this.enabled = false;
        // btnLogin.fillColor = SMF.UI.Color.GREY;

        // Dialog.showWait();

        // smfOracle.logAnalytics('pgLogin_btnLogin_onPressed');

        // mcsUser = txtUserName.text;
        // mcsPassword = txtPassword.text;

        // if ((mcsUser) && (mcsPassword)) {
        //     var successCallback = function(e) {
        //         //analytics log for auth.
        //         smfOracle.logAnalytics("user authenticated");

        //         Dialog.showWait();

        //         //Registering for Push notification

        //         //Resgistering device to Google and Apple servers
        //         Notifications.remote.registerForPushNotifications({
        //             OnSuccess: function(e) {
        //                 //alert("registerForPushNotifications Success:" + JSON.prune(e));

        //                 var registrationID = Notifications.remote.token;
        //                 var appId = "io.smartface.sample.filemanager";
        //                 var appVersion = Application.version;

        //                 //Registering device to Oracle MCS
        //                 smfOracle.registerNotification(registrationID, appId, appVersion, function(err) {
        //                     if (!err) getUserInfo();
        //                 });

        //             },
        //             OnFailure: function(e) {
        //                 // alert("registerForPushNotifications Failed:" + JSON.prune(e));
        //                 // downloading objects from mcs storage
        //                 getUserInfo();
        //             }
        //         });
        //     };

        //     var failureCallback = function(e) {
        //         //analytics log for auth fail
        //         smfOracle.logAnalytics('[error] auth failed ' + e);
        //         console.log(mcsUser + ' authentication failed ' + e);

        //         Dialog.removeWait();

        //         alert('Username or Password is incorrect, please try again');
        //         btnLogin.enabled = true;
        //         btnLogin.fillColor = "#00A1F1";
        //     }

        //     smfOracle.authenticate(mcsUser, mcsPassword, successCallback, failureCallback)
        // }
        // else {
        //     Dialog.removeWait();
        //     alert('Please enter your username and password.');
        //     btnLogin.enabled = true;
        //     btnLogin.fillColor = "#00A1F1";
        // }
    }

    //Downloads collection objects and assign them to repeatbox
    function getUserInfo() {
        // Get self service details from EBS service
        // For now we're going dummy

        // var gravatar = md5hash("atakan.eser@smartface.io");
        oProfile = {
            "FullName": "Osman Celik",
            "Email": "osman.celik@smartface.io",
            "Team": "HR Team",
            "Role": "Recruiter",
            "OutOfOffice": true,
            "OutOfOfficeMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus diam id orci dignissim consequat. Fusce tincidunt neque et neque luctus dignissim. Sed ex ipsum, vulputate eget lectus eget, efficitur fermentum turpis. Nulla facilisi. In sit amet convallis neque. Sed tristique non lorem vitae efficitur. Quisque ullamcorper arcu vitae vestibulum tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla sollicitudin id orci ac ullamcorper. Nunc consequat diam vel convallis vehicula. Nunc hendrerit maximus consequat. Sed euismod eleifend nisl, sit amet finibus nulla porta eget. Suspendisse dapibus semper lectus vitae aliquam. Suspendisse sed elit rhoncus, blandit nibh a, sodales dolor.",
            "OutOfOfficeStart": "9/15/16",
            "OutOfOfficeEnd": "11/25/16",
            "Avatar": "avatar.png" //"http://www.gravatar.com/avatar/" + gravatar
        }

        oTimeTable = {
            "TotalDays": 22,
            "Used": 11,
            "Remaining": 11
        }

        oRequestList = [{
                "FullName": "Osman Celik",
                "Email": "osman.celik@smartface.io",
                "Team": "HR Team",
                "Role": "Recruiter",
                "StartDate": "",
                "EndDate": "",
                "EmployeeID": "",
                "IsApproved": false
                },
            {
                "FullName": "Atakan Eser",
                "Email": "atakan.eser@smartface.io",
                "Team": "UAT Team",
                "Role": "Developer",
                "StartDate": "",
                "EndDate": "",
                "EmployeeID": "",
                "IsApproved": false
        }]

        // passing objects to pgFiles
        Pages.pgDashboard.myProfile = oProfile;
        Pages.pgDashboard.myTimeTable = oTimeTable;

        Pages.pgDashboard.show(defaultPageAnimation);
    }
})();
