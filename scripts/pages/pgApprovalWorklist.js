/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation*/
(function() {
    var arrayRequests;
    var pgApprovalWorklist = Pages.pgApprovalWorklist = new SMF.UI.Page({
        name: "pgApprovalWorklist",
        onKeyPress: pgApprovalWorklist_onKeyPress,
        onShow: pgApprovalWorklist_onShow,
        backgroundImage: 'stripe.png'
    });

    // var sliderDrawer = new SliderDrawer();
    // sliderDrawer.init(Pages.currentPage);
    createSliderDrawer(Pages.pgApprovalWorklist, "sdSelfService");


    //creating a repeatbox to show our files
    var rptApprovalList = new SMF.UI.RepeatBox({
        top: Device.deviceOS == "Android" ? "64" : "64", //navbar is translucent
        left: '0%',
        width: '100%',
        height: '100%',
        borderWidth: 0,
        showScrollbar: true,
        autoSize: false,
        touchEnabled: true,
        //onSelectedItem: _onSelectedItem,
        enableScroll: true,
        backgroundTransparent: false,
        enablePullUpToRefresh: false,
        enablePullDownToRefresh: true,
        useActiveItem: false,
        allowDeletingItem: false,
        onSelectedItem: function(e) {
            Pages.pgApproveLeaveRequest.recordID = e.rowIndex;
            Pages.pgApproveLeaveRequest.oRequest = arrayRequests[e.rowIndex];
            Pages.pgApproveLeaveRequest.show(defaultPageAnimation);
        },
        onPullDown: function(e) {
            Dialog.showWait();
            displayApprovalRequests();
        }
    });


    //an activity indicator for pulldown action on file repeatbox
    var aiPullDown = new SMF.UI.ActivityIndicator({
        top: "0%",
        left: "45%",
        widht: "10%",
        height: "10%",
        style: SMF.UI.ActivityIndicatorStyle.GRAY,
    });
    rptApprovalList.pullDownItem.add(aiPullDown);
    rptApprovalList.pullDownItemTemplate.fillColor = "#FFFFFF";




    // Adding a container layer on top of the date to be touchable as a single object
    // var cntTotalDays = new SMF.UI.Container({
    //     name: "cntTotalDays",
    //     left: 0,
    //     top: 0,
    //     width: "27%",
    //     height: "100%",
    //     backgroundTransparent: true,
    //     touchEnabled: false,
    //     borderWidth: 0,
    //     roundedEdge: 0
    // });


    var lblSelectedDaysCount = new SMF.UI.Label({
        name: "lblSelectedDaysCount",
        text: "-",
        left: 0,
        top: "17%",
        width: "22%",
        height: "50%",
        textAlignment: SMF.UI.TextAlignment.CENTER,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "16pt",
            bold: true
        }),
        fontColor: "#248afd",
        borderWidth: 0
    });

    var lblSelectedDaysCountText = new SMF.UI.Label({
        name: "lblSelectedDaysCountText",
        text: "-",
        left: 0,
        top: "59%",
        width: "22%",
        height: "20%",
        textAlignment: SMF.UI.TextAlignment.CENTER,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "7pt",
            bold: false
        }),
        fontColor: "#37404a",
        borderWidth: 0
    });

    var recVerticalLine = new SMF.UI.Rectangle({
        name: "recVerticalLine",
        left: getUnit("22%"),
        top: getUnit("17%"),
        width: getUnit(1),
        height: "71%",
        fillColor: "#979797",
        borderWidth: 0,
        roundedEdge: 0
    });

    var lblFullName = new SMF.UI.Label({
        name: "lblFullName",
        text: "-",
        left: "25%",
        top: "18.5%",
        width: "60%",
        height: "40%",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "12pt",
            bold: false
        }),
        fontColor: "#248afd",
        borderWidth: 0
    });


    var lblTeamRole = new SMF.UI.Label({
        name: "lblTeamRole",
        text: "-",
        left: "25%",
        top: "58.5%",
        width: "60%",
        height: "30%",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "7pt",
            bold: false
        }),
        fontColor: "#4a4a4a",
        borderWidth: 0
    });

    var imgDetail = new SMF.UI.Image({
        name: "imgDetail",
        image: "right_arrow.png",
        left: "88%",
        top: "40%",
        width: "10%",
        height: "30%",
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });

    var recHorizontalLine = new SMF.UI.Rectangle({
        name: "recHorizontalLine",
        left: getUnit(0),
        top: getUnit(((Device.screenHeight - 64) / 8) - 1),
        width: getUnit("100%"),
        height: 1,
        fillColor: "#FFFFFF",
        borderWidth: 0,
        roundedEdge: 0
    });

    //adding files to repeatbox's itemtemplate
    rptApprovalList.itemTemplate.height = (Device.screenHeight - 64) / 8;
    rptApprovalList.itemTemplate.add(lblSelectedDaysCount);
    rptApprovalList.itemTemplate.add(lblSelectedDaysCountText);
    rptApprovalList.itemTemplate.add(recVerticalLine);
    rptApprovalList.itemTemplate.add(lblFullName);
    rptApprovalList.itemTemplate.add(lblTeamRole);
    rptApprovalList.itemTemplate.add(imgDetail);
    rptApprovalList.itemTemplate.add(recHorizontalLine);
    rptApprovalList.itemTemplate.fillColor = "#e7e7e7";

    //activeItemTemplate
    var lblSelectedDaysCount2 = lblSelectedDaysCount.clone();
    var lblSelectedDaysCountText2 = lblSelectedDaysCountText.clone();
    var recVerticalLine2 = recVerticalLine.clone();
    var lblFullName2 = lblFullName.clone();
    var lblTeamRole2 = lblTeamRole.clone();
    var imgDetail2 = imgDetail.clone();
    var recHorizontalLine2 = recHorizontalLine.clone();

    rptApprovalList.activeItemTemplate.height = (Device.screenHeight - 64) / 8;
    rptApprovalList.activeItemTemplate.add(lblSelectedDaysCount2);
    rptApprovalList.activeItemTemplate.add(lblSelectedDaysCountText2);
    rptApprovalList.activeItemTemplate.add(recVerticalLine2);
    rptApprovalList.activeItemTemplate.add(lblFullName2);
    rptApprovalList.activeItemTemplate.add(lblTeamRole2);
    rptApprovalList.activeItemTemplate.add(imgDetail2);
    rptApprovalList.activeItemTemplate.add(recHorizontalLine2);
    rptApprovalList.activeItemTemplate.fillColor = "#FFFFFF";

    rptApprovalList.pullDownItem.height = "8%";

    //onRowRender will work for each item bound

    rptApprovalList.onRowRender = function(e) {
        // {
        // "EmployeeID": "88711203",
        // "FullName": "Atakan Eser",
        // "Email": "atakan.eser@smartface.io",
        // "Team": "UAT Team",
        // "Role": "Developer",
        // "StartDate": "11/16/16",
        // "EndDate": "11/22/16",
        // "LeaveType": "MEDICAL",
        // "TimeUnit": "DAY",
        // "AbsenceMessage": "I've a planned surgery. Going to be at hospital for 2 weeks.",
        // "Status": "approved",
        // "TotalDays ": 29,
        // "Used": 16,
        // "Remaining": 13
        // }

        var startDate = arrayRequests[e.rowIndex].StartDate;
        var endDate = arrayRequests[e.rowIndex].EndDate;
        var days = daysBetween(startDate, endDate);

        this.controls[0].text = ('00' + days).right(2);
        this.controls[1].text = (days > 1) ? "days" : "day";
        this.controls[3].text = arrayRequests[e.rowIndex].FullName;
        this.controls[4].text = arrayRequests[e.rowIndex].Role + " / " + arrayRequests[e.rowIndex].Team;

        this.controls[7].text = days;
        this.controls[8].text = (days > 1) ? "days" : "day";
        this.controls[10].text = arrayRequests[e.rowIndex].FullName;
        this.controls[11].text = arrayRequests[e.rowIndex].Role + " / " + arrayRequests[e.rowIndex].Team;
    };


    //adding repeatbox to the page
    pgApprovalWorklist.add(rptApprovalList);

    /**
     * Creates action(s) that are run when the user press the key of the devices.
     * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
     * @this Pages.pgLogin
     */
    function pgApprovalWorklist_onKeyPress(e) {
        if (e.keyCode === 4) {
            Pages.back(defaultPageAnimation);
        }
    }

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgApprovalWorklist_onShow() {
        // SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.LIGHTCONTENT;
        Dialog.removeWait();


        addHeaderBar();

        pgApprovalWorklist.sdSelfService.imgSliderAvatar.image = oProfile.Avatar;
        pgApprovalWorklist.sdSelfService.lblSliderFullName.text = oProfile.FullName;
        pgApprovalWorklist.sdSelfService.lblSliderTeamRole.text = oProfile.Role + " / " + oProfile.Team;

        displayApprovalRequests();

    }


    // Adding a new navigation or actionbar to the page
    function addHeaderBar() {

        var headerBar = new HeaderBar();
        headerBar.init(Pages.currentPage);

        headerBar.setTitleView(Pages.currentPage, "Approval Worklist", "#248afd", null, 0, 0, 240, 44, 20);

        // Preparing left items 
        if (Device.deviceOS !== "Android") {
            var itemMenu = new SMF.UI.iOS.BarButtonItem({
                image: 'menu.png',
                onSelected: function() {
                    (!isSliderDrawerOpen) ? Pages.pgApprovalWorklist.sdSelfService.show(): Pages.pgApprovalWorklist.sdSelfService.hide();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
        }
        else {
            Pages.currentPage.actionBar.displayShowHomeEnabled = true;
            Pages.currentPage.actionBar.icon = "menu.png";
        }
    }

    //Parsing storage objects 
    function displayApprovalRequests() {

        /*
        Sample item 
       [
            {
                "EmployeeID": "88711203",
                "FullName": "Atakan Eser",
                "Email": "atakan.eser@smartface.io",
                "Avatar" : "avatar.png",
                "Team": "UAT Team",
                "Role": "Developer",
                "StartDate": "11/16/16",
                "EndDate": "11/22/16",
                "LeaveType": "MEDICAL",
                "TimeUnit": "DAY",
                "AbsenceMessage": "I've a planned surgery. Going to be at hospital for 2 weeks.",
                "Status": "waiting",
                "TotalDays": 29,
                "Used": 16,
                "Remaining": 13
        }]
        */


        var parsedResponse = oRequestList;
        arrayRequests = [];

        //if (parsedResponse.length > 0)
        // lblWelcome2.text = "You have " + (parsedResponse.length) + " file(s) in your storage";

        for (var i = 0; i < parsedResponse.length; i++) {
            var objRequestObject = {};

            if (parsedResponse[i].Status === "waiting") {
                objRequestObject.EmployeeID = parsedResponse[i].EmployeeID;
                objRequestObject.FullName = parsedResponse[i].FullName;
                objRequestObject.Email = parsedResponse[i].Email;
                objRequestObject.Avatar = parsedResponse[i].Avatar;
                objRequestObject.Team = parsedResponse[i].Team;
                objRequestObject.Role = parsedResponse[i].Role;
                objRequestObject.StartDate = parsedResponse[i].StartDate;
                objRequestObject.EndDate = parsedResponse[i].EndDate;
                objRequestObject.LeaveType = parsedResponse[i].LeaveType;
                objRequestObject.TimeUnit = parsedResponse[i].TimeUnit;
                objRequestObject.AbsenceMessage = parsedResponse[i].AbsenceMessage;
                objRequestObject.Status = parsedResponse[i].Status;
                objRequestObject.TotalDays = parsedResponse[i].TotalDays;
                objRequestObject.Used = parsedResponse[i].Used;
                objRequestObject.Remaining = parsedResponse[i].Remaining;

                arrayRequests.push(objRequestObject);
                // arrayRequests.sort(function(a, b) {
                //     return new Date(b.EndDate) - new Date(a.EndDate);
                // });
            }
        }


        //binding objects array
        // rptBoxObjects.pullDownItemTemplate.visible = true;
        rptApprovalList.closePullItems();
        rptApprovalList.dataSource = arrayRequests;
        rptApprovalList.refresh();
        Dialog.removeWait();
    }

})();
