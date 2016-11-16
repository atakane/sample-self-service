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


    // top image
    createImage(pgLogin, "imgHome", "home_back.png", "0", "0", "100%", "40%", SMF.UI.ImageFillType.STRETCH);

    // Welcome texts
    createLabel(pgLogin, "lblWelcome", "EBS\nSelf Service", "9.5%", "15%", "80%", "15%", SMF.UI.TextAlignment.TOP, true, "17pt", false, SMF.UI.Color.WHITE);
    createLabel(pgLogin, "lblWelcome2", "Powered & secured by Oracle MCS & ICS", "10%", "29%", "80%", "8%", SMF.UI.TextAlignment.TOP, false, "7pt", false, SMF.UI.Color.WHITE);

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

    pgLogin.add(txtUserName);
    pgLogin.add(txtPassword);
    pgLogin.add(btnLogin);

    // Warning text
    createLabel(pgLogin, "lblInfoText", "Please login with your MCS realm user.", "10%", "78%", "80%", "8%", SMF.UI.TextAlignment.TOP, false, "6pt", false, SMF.UI.Color.BLACK);

    // Version text
    createLabel(pgLogin, "lblVersion", "v." + Application.version, "0", "97%", "99%", "3%", SMF.UI.TextAlignment.RIGHT, false, "4pt", false, SMF.UI.Color.BLACK);


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
            "EmployeeID": "8927191",
            "FullName": "Emre Celik",
            "Email": "osman.celik@smartface.io",
            "Team": "HR Team",
            "Role": "Director",
            "OutOfOffice": true,
            "OutOfOfficeMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus diam id orci dignissim consequat. Fusce tincidunt neque et neque luctus dignissim. Sed ex ipsum, vulputate eget lectus eget, efficitur fermentum turpis. Nulla facilisi. In sit amet convallis neque. Sed tristique non lorem vitae efficitur. Quisque ullamcorper arcu vitae vestibulum tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla sollicitudin id orci ac ullamcorper. Nunc consequat diam vel convallis vehicula. Nunc hendrerit maximus consequat. Sed euismod eleifend nisl, sit amet finibus nulla porta eget. Suspendisse dapibus semper lectus vitae aliquam. Suspendisse sed elit rhoncus, blandit nibh a, sodales dolor.",
            "OutOfOfficeStart": "9/15/16",
            "OutOfOfficeEnd": "11/25/16",
            "Avatar": "avatar.png" //"http://www.gravatar.com/avatar/" + gravatar
        }

        oTimeTable = {
            "TotalDays": 37,
            "Used": 18,
            "Remaining": 19
        }


        oRequestList = [{
                "EmployeeID": "88771100",
                "FullName": "William Campell",
                "Email": "wc@smartface.io",
                "Avatar": "avatar6.png",
                "Team": "R&D",
                "Role": "Sr. Researcher",
                "StartDate": "11/18/16",
                "EndDate": "11/28/16",
                "LeaveType": "ANNUAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "I need a few days for paper works.",
                "Status": "waiting",
                "TotalDays": 29,
                "Used": 16,
                "Remaining": 13
                },
            {

                "EmployeeID": "88711203",
                "FullName": "Robert Harris",
                "Email": "robert@smartface.io",
                "Avatar": "avatar2.png",
                "Team": "Software Dev.",
                "Role": "Developer",
                "StartDate": "11/16/16",
                "EndDate": "11/22/16",
                "LeaveType": "MEDICAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "I've a planned surgery. Going to be at hospital for 2 weeks.",
                "Status": "waiting",
                "TotalDays": 22,
                "Used": 16,
                "Remaining": 6
        }, {

                "EmployeeID": "1902837",
                "FullName": "Kevin Parker",
                "Email": "john.smart@bigcorp.io",
                "Avatar": "avatar3.png",
                "Team": "Dev-Ops",
                "Role": "Sys. Eng.",
                "StartDate": "12/24/16",
                "EndDate": "12/31/16",
                "LeaveType": "ANNUAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "You know, it's Christmas time!!! :)",
                "Status": "waiting",
                "TotalDays": 15,
                "Used": 9,
                "Remaining": 6
        }, {

                "EmployeeID": "1902837",
                "FullName": "Patricia Lewis",
                "Email": "plewis@hotmail.io",
                "Avatar": "avatar4.png",
                "Team": "HR",
                "Role": "Assistant",
                "StartDate": "11/23/16",
                "EndDate": "11/24/16",
                "LeaveType": "MEDICAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "Doctor checkup",
                "Status": "waiting",
                "TotalDays": 19,
                "Used": 3,
                "Remaining": 16
        }, {

                "EmployeeID": "1902837",
                "FullName": "Patricia Lewis",
                "Email": "plewis@hotmail.io",
                "Avatar": "avatar4.png",
                "Team": "HR",
                "Role": "Assistant",
                "StartDate": "12/18/16",
                "EndDate": "12/31/16",
                "LeaveType": "ANNUAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "New Year's eve. I need to keep up with the Family. Michelle will take the calls while I'm away.",
                "Status": "waiting",
                "TotalDays": 19,
                "Used": 3,
                "Remaining": 16
        }, {

                "EmployeeID": "341561",
                "FullName": "Michelle Edward",
                "Email": "md@lab.cp",
                "Avatar": "avatar5.png",
                "Team": "Visual",
                "Role": "Art Director",
                "StartDate": "3/15/17",
                "EndDate": "3/27/17",
                "LeaveType": "ANNUAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "European division site visit with Sr. Vice President Mr. Thomas.",
                "Status": "waiting",
                "TotalDays": 45,
                "Used": 20,
                "Remaining": 25
        }]

        // passing objects to pgFiles

        console.log(oProfile.FullName);
        Pages.pgDashboard.myProfile = oProfile;
        Pages.pgDashboard.myTimeTable = oTimeTable;

        Pages.pgDashboard.show(defaultPageAnimation);
    }
})();
