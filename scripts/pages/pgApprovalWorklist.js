/* globals smfOracle mcsUser mcsPassword Dialog defaultPageAnimation createSliderDrawer reverseDefaultPageAnimation
oProfile*/
(function() {
    var arrayRequests;
    var pgApprovalWorklist = Pages.pgApprovalWorklist = new SMF.UI.Page({
        name: "pgApprovalWorklist",
        onKeyPress: pgApprovalWorklist_onKeyPress,
        onShow: pgApprovalWorklist_onShow,
        backgroundImage: 'stripe.png'
    });

    // Creating Slider Drawer
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
        enableScroll: true,
        backgroundTransparent: false,
        enablePullUpToRefresh: false,
        enablePullDownToRefresh: false,
        useActiveItem: false,
        allowDeletingItem: false,
        onSelectedItem: function(e) {
            Pages.pgApproveLeaveRequest.recordID = e.rowIndex;
            Pages.pgApproveLeaveRequest.oRequest = arrayRequests[e.rowIndex];
            Pages.pgApproveLeaveRequest.show(defaultPageAnimation);
        }
    });

    // Profile
    var imgAvatar = new SMF.UI.Image({
        name: "imgAvatar",
        image: "avatar.png",
        left: "3%",
        top: ((((Device.screenHeight - 64) / 7) - 60) / 2),
        width: "60",
        height: "60",
        imageFillType: SMF.UI.ImageFillType.ASPECTFIT
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
        top: "9%",
        width: "60%",
        height: "40%",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "11pt",
            bold: false
        }),
        fontColor: "#248afd",
        borderWidth: 0
    });


    var lblTeamRole = new SMF.UI.Label({
        name: "lblTeamRole",
        text: "-",
        left: "25%",
        top: "46%",
        width: "60%",
        height: "20%",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "7pt",
            bold: false
        }),
        fontColor: "#4a4a4a",
        borderWidth: 0
    });

    var lblLeaveDetails = new SMF.UI.Label({
        name: "lblLeaveDetails",
        text: "-",
        left: "25%",
        top: "63%",
        width: "75%",
        height: "30%",
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false,
        font: new SMF.UI.Font({
            size: "6pt",
            bold: false
        }),
        fontColor: "#4a4a4a",
        borderWidth: 0
    });

    var imgDetail = new SMF.UI.Image({
        name: "imgDetail",
        image: "right_arrow.png",
        left: "88%",
        top: "38%",
        width: "10%",
        height: "30%",
        imageFillType: SMF.UI.ImageFillType.NORMAL
    });

    var recHorizontalLine = new SMF.UI.Rectangle({
        name: "recHorizontalLine",
        left: getUnit(0),
        top: getUnit(((Device.screenHeight - 64) / 7) - 1),
        width: getUnit("100%"),
        height: 1,
        fillColor: "#FFFFFF",
        borderWidth: 0,
        roundedEdge: 0
    });

    //adding files to repeatbox's itemtemplate
    rptApprovalList.itemTemplate.height = (Device.screenHeight - 64) / 7;
    rptApprovalList.itemTemplate.add(imgAvatar);
    rptApprovalList.itemTemplate.add(recVerticalLine);
    rptApprovalList.itemTemplate.add(lblFullName);
    rptApprovalList.itemTemplate.add(lblTeamRole);
    rptApprovalList.itemTemplate.add(lblLeaveDetails);
    rptApprovalList.itemTemplate.add(imgDetail);
    rptApprovalList.itemTemplate.add(recHorizontalLine);
    rptApprovalList.itemTemplate.fillColor = "#e7e7e7";

    //activeItemTemplate
    var imgAvatar2 = imgAvatar.clone();
    var recVerticalLine2 = recVerticalLine.clone();
    var lblFullName2 = lblFullName.clone();
    var lblTeamRole2 = lblTeamRole.clone();
    var lblLeaveDetails2 = lblLeaveDetails.clone();
    var imgDetail2 = imgDetail.clone();
    var recHorizontalLine2 = recHorizontalLine.clone();

    rptApprovalList.activeItemTemplate.height = (Device.screenHeight - 64) / 7;
    rptApprovalList.activeItemTemplate.add(imgAvatar2);
    rptApprovalList.activeItemTemplate.add(recVerticalLine2);
    rptApprovalList.activeItemTemplate.add(lblFullName2);
    rptApprovalList.activeItemTemplate.add(lblTeamRole2);
    rptApprovalList.activeItemTemplate.add(lblLeaveDetails2);
    rptApprovalList.activeItemTemplate.add(imgDetail2);
    rptApprovalList.activeItemTemplate.add(recHorizontalLine2);
    rptApprovalList.activeItemTemplate.fillColor = "#FFFFFF";

    rptApprovalList.pullDownItem.height = "8%";

    //onRowRender will work for each item bound
    rptApprovalList.onRowRender = function(e) {
        // {
        // "ID" : 1,
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

        var startDate = new Date(arrayRequests[e.rowIndex].StartDate);
        var endDate = arrayRequests[e.rowIndex].EndDate;
        var days = daysBetween(startDate, endDate);
        var leaveDetails = arrayRequests[e.rowIndex].LeaveType + ', ' + days + ' ' + ((days > 1) ? 'days' : 'day');

        var leaveText = ("{0}, starts {1}").format(leaveDetails, startDate.format("ddd, MMM. d"));

        this.controls[0].image = arrayRequests[e.rowIndex].Avatar;
        this.controls[2].text = arrayRequests[e.rowIndex].FullName;
        this.controls[3].text = arrayRequests[e.rowIndex].Role + " / " + arrayRequests[e.rowIndex].Team;
        this.controls[4].text = leaveText;


        this.controls[7].image = arrayRequests[e.rowIndex].Avatar;
        this.controls[9].text = arrayRequests[e.rowIndex].FullName;
        this.controls[10].text = arrayRequests[e.rowIndex].Role + " / " + arrayRequests[e.rowIndex].Team;
        this.controls[11].text = leaveText;

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
            Pages.back(reverseDefaultPageAnimation);
        }
    }

    /**
     * Creates action(s) that are run when the page is appeared
     * @param {EventArguments} e Returns some attributes about the specified functions
     * @this Pages.pgLogin
     */
    function pgApprovalWorklist_onShow() {
        // Hiding "wait" dialog
        Dialog.removeWait();

        // Adding header bar (actionbar for Android, navigationbar for iOS)
        addHeaderBar();

        // Updating logged in user's info on the this page's slider drawer
        pgApprovalWorklist.sdSelfService.imgSliderAvatar.image = oProfile.Avatar;
        pgApprovalWorklist.sdSelfService.lblSliderFullName.text = oProfile.FullName;
        pgApprovalWorklist.sdSelfService.lblSliderTeamRole.text = oProfile.Role + " / " + oProfile.Team;

        displayApprovalRequests();

        // Oracle MCS Analytics logging 
        smfOracle.logAndFlushAnalytics('pgAbout_onShow');
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

            var itemFilter = new SMF.UI.iOS.BarButtonItem({
                image: 'filter.png',
                onSelected: function() {
                    filterMenu();
                }
            });

            Pages.currentPage.navigationItem.leftBarButtonItems = [itemMenu];
            Pages.currentPage.navigationItem.rightBarButtonItems = [itemFilter];
        }
        else {
            Pages.currentPage.actionBar.displayShowHomeEnabled = true;
            Pages.currentPage.actionBar.icon = "menu.png";
        }
    }

    //filter requests menu item
    function filterMenu(e) {
        var item1 = {
            title: "Waiting",
            icon: "icon.png", // Andrid 3.0- only
            onSelected: function(e) {
                displayApprovalRequests('waiting');
            }
        };
        var item2 = {
            title: "Approved",
            icon: "icon.png", // Andrid 3.0- only
            onSelected: function(e) {
                displayApprovalRequests('approved');
            }
        }
        var item3 = {
            title: "Rejected",
            icon: "icon.png", // Andrid 3.0- only
            onSelected: function(e) {
                displayApprovalRequests('rejected');
            }
        }

        var item4 = {
            title: "Cancel",
            itemType: SMF.UI.MenuItemType.cancel, //  iOS Only
            onSelected: function(e) {}
        };
        var myItems = [item1, item2, item3, item4]; // assume that items are predefined
        var menu1 = new SMF.UI.Menu({
            menuStyle: SMF.UI.MenuStyle.OPTIONALMENU,
            icon: "menu_icon.png", // Android Context Menu Only
            items: myItems
        });
        menu1.show();
    }

    //Parsing storage objects 
    function displayApprovalRequests(status) {
        if (!(status) || (status.length == 0)) status = 'waiting';
        /*
        Sample item 
       [
            {
                "ID": 1,
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

            if (parsedResponse[i].Status === status) {
                objRequestObject.ID = parsedResponse[i].ID;
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
