/* globals*/

/*
TODO:
- Add filter to actionbar
- use Router options to pass recordID
- use Router for pages.back
*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/pgApprovalWorklist.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');
const getUnit = require('./component/getUnit.js');

// Router
const router = require('js-base/core/router');

const pgApprovalWorklist = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgApprovalWorklist',
            onKeyPress: pgApprovalWorklist_onKeyPress,
            onShow: pgApprovalWorklist_onShow,
            backgroundImage: 'stripe.png'
        });

        headerBarOptions.setTitle('Approval Worklist');
        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);
        
        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');
        
        var arrayRequests;
    
        //creating a repeatbox to show our files
        var rptApprovalList = new SMF.UI.RepeatBox({
            top: getUnit({iOS:64,Android:80}),
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
                router.go('pgApproveLeaveRequest',{'rowIndex': e.rowIndex, 'request' : arrayRequests[e.rowIndex]});
            }
        });
    
        // Profile
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
            image: 'avatar.png',
            left: '3%',
            top: getUnit({iOS: ((((Device.screenHeight - 64) / 7) - 60) / 2), Android: 10}),
            width: getUnit(60),
            height: getUnit(60),
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        });
    
        var recVerticalLine = new SMF.UI.Rectangle({
            name: 'recVerticalLine',
            left: getUnit('22%'),
            top: getUnit('17%'),
            width: getUnit(1),
            height: '71%',
            fillColor: '#979797',
            borderWidth: 0,
            roundedEdge: 0
        });
    
        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName',
            text: '-',
            left: '25%',
            top: getUnit({iOS:'9%',Android:'8%'}),
            width: '60%',
            height: '40%',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            multipleLine: false,
            font: new SMF.UI.Font({
                size: '11pt',
                bold: false
            }),
            fontColor: '#248afd',
            borderWidth: 0
        });
    
        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole',
            text: '-',
            left: '25%',
            top: getUnit({iOS:'46%',Android:'40%'}),
            width: '60%',
            height: getUnit({iOS:'20%',Android:'30%'}),
            textAlignment: SMF.UI.TextAlignment.LEFT,
            multipleLine: false,
            font: new SMF.UI.Font({
                size: '7pt',
                bold: false
            }),
            fontColor: '#4a4a4a',
            borderWidth: 0
        });
    
        var lblLeaveDetails = new SMF.UI.Label({
            name: 'lblLeaveDetails',
            text: '-',
            left: '25%',
            top: '63%',
            width: '75%',
            height: '30%',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            multipleLine: false,
            font: new SMF.UI.Font({
                size: '6pt',
                bold: false
            }),
            fontColor: '#4a4a4a',
            borderWidth: 0
        });
    
        var imgDetail = new SMF.UI.Image({
            name: 'imgDetail',
            image: 'right_arrow.png',
            left: '88%',
            top: '38%',
            width: '10%',
            height: '30%',
            imageFillType: SMF.UI.ImageFillType.NORMAL
        });
    
        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine',
            left: getUnit(0),
            top:getUnit({iOS: ((Device.screenHeight - 64) / 7)-1, Android: 79}),
            width: getUnit('100%'),
            height: 1,
            fillColor: '#FFFFFF',
            borderWidth: 0,
            roundedEdge: 0
        });
    
        //adding files to repeatbox's itemtemplate
        
        rptApprovalList.itemTemplate.height = getUnit({iOS: (Device.screenHeight - 64) / 7, Android: 80});
        rptApprovalList.itemTemplate.add(imgAvatar);
        rptApprovalList.itemTemplate.add(recVerticalLine);
        rptApprovalList.itemTemplate.add(lblFullName);
        rptApprovalList.itemTemplate.add(lblTeamRole);
        rptApprovalList.itemTemplate.add(lblLeaveDetails);
        rptApprovalList.itemTemplate.add(imgDetail);
        rptApprovalList.itemTemplate.add(recHorizontalLine);
        rptApprovalList.itemTemplate.fillColor = '#e7e7e7';
    
        //activeItemTemplate
        var imgAvatar2 = imgAvatar.clone();
        var recVerticalLine2 = recVerticalLine.clone();
        var lblFullName2 = lblFullName.clone();
        var lblTeamRole2 = lblTeamRole.clone();
        var lblLeaveDetails2 = lblLeaveDetails.clone();
        var imgDetail2 = imgDetail.clone();
        var recHorizontalLine2 = recHorizontalLine.clone();
    
        rptApprovalList.activeItemTemplate.height =getUnit({iOS: (Device.screenHeight - 64) / 7, Android: 80});
        rptApprovalList.activeItemTemplate.add(imgAvatar2);
        rptApprovalList.activeItemTemplate.add(recVerticalLine2);
        rptApprovalList.activeItemTemplate.add(lblFullName2);
        rptApprovalList.activeItemTemplate.add(lblTeamRole2);
        rptApprovalList.activeItemTemplate.add(lblLeaveDetails2);
        rptApprovalList.activeItemTemplate.add(imgDetail2);
        rptApprovalList.activeItemTemplate.add(recHorizontalLine2);
        rptApprovalList.activeItemTemplate.fillColor = '#FFFFFF';
    
        rptApprovalList.pullDownItem.height = '8%';
    
        //onRowRender will work for each item bound
        rptApprovalList.onRowRender = function(e) {
            // {
            // 'ID' : 1,
            // 'EmployeeID': '88711203',
            // 'FullName': 'Atakan Eser',
            // 'Email': 'atakan.eser@smartface.io',
            // 'Team': 'UAT Team',
            // 'Role': 'Developer',
            // 'StartDate': '11/16/16',
            // 'EndDate': '11/22/16',
            // 'LeaveType': 'MEDICAL',
            // 'TimeUnit': 'DAY',
            // 'AbsenceMessage': 'I've a planned surgery. Going to be at hospital for 2 weeks.',
            // 'Status': 'approved',
            // 'TotalDays ': 29,
            // 'Used': 16,
            // 'Remaining': 13
            // }
    
            var startDate = new Date(arrayRequests[e.rowIndex].StartDate);
            var endDate = arrayRequests[e.rowIndex].EndDate;
            var days = tinyUtils.daysBetween(startDate, endDate);
            
            var leaveDetails, leaveText;
            if (arrayRequests[e.rowIndex].TimeUnit === 'DAY') {
                var days = tinyUtils.daysBetween(startDate.format('MM/dd/yyyy'), endDate.format('MM/dd/yyyy'));
                leaveDetails = arrayRequests[e.rowIndex].LeaveType + ', ' + days + ' ' + ((days > 1) ? 'days' : 'day');
                leaveText = ('{0}, starts {1}').format(leaveDetails, startDate.format('ddd, MMM. d'));
            }
            else {
                var hours = tinyUtils.daysBetween(startDate, endDate, true)  - ((endDate.format('HH') < 13) ? 0 : lunchBreakDuration);
                leaveDetails = arrayRequests[e.rowIndex].LeaveType + ', ' + hours + ' ' + ((hours > 1) ? 'hours' : 'hour');
                leaveText = ('{0}, at {1}').format(leaveDetails, startDate.format('ddd, MMM. d, HH:mm'));
            }
             
    
            this.controls[0].image = arrayRequests[e.rowIndex].Avatar;
            this.controls[2].text = arrayRequests[e.rowIndex].FullName;
            this.controls[3].text = arrayRequests[e.rowIndex].Role + ' / ' + arrayRequests[e.rowIndex].Team;
            this.controls[4].text = leaveText;
    
    
            this.controls[7].image = arrayRequests[e.rowIndex].Avatar;
            this.controls[9].text = arrayRequests[e.rowIndex].FullName;
            this.controls[10].text = arrayRequests[e.rowIndex].Role + ' / ' + arrayRequests[e.rowIndex].Team;
            this.controls[11].text = leaveText;
    
        };
    
    
        //adding repeatbox to the page
        this.add(rptApprovalList);
    
        //adding label for no-data
        var lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: 'No requests found!',
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            textAlignment: SMF.UI.TextAlignment.CENTER,
            multipleLine: true,
            font: new SMF.UI.Font({
                size: "7pt",
                bold: false
            }),
            fontColor: "#4a4a4a",
            borderWidth: 0,
            visible: false
        });
        this.add(lblNoData);
        
        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgApprovalWorklist_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }
    
        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgApprovalWorklist_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();
    
            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu") {
                    Pages.currentPage.sdSelfService.show();
                }
                if (e.type == "filter") {
                    filterMenu.call(this);
                }
            });
            
            // Updating logged in user's info on the this page's slider drawer
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;
    
            displayApprovalRequests.call(this);
    
            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgAbout_onShow');
            tinyUtils.fixOverlayBug();
        }
    
    
        //filter requests menu item
        function filterMenu(e) {
            var item1 = {
                title: 'Waiting',
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('waiting');
                }
            };
            var item2 = {
                title: 'Approved',
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('approved');
                }
            }
            var item3 = {
                title: 'Rejected',
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('rejected');
                }
            }
    
            var item4 = {
                title: 'Cancel',
                itemType: SMF.UI.MenuItemType.cancel, //  iOS Only
                onSelected: function(e) {}
            };
            var myItems = [item1, item2, item3, item4]; // assume that items are predefined
            var menu1 = new SMF.UI.Menu({
                menuStyle: SMF.UI.MenuStyle.OPTIONALMENU,
                icon: 'menu_icon.png', // Android Context Menu Only
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
                    'ID': 1,
                    'EmployeeID': '88711203',
                    'FullName': 'Atakan Eser',
                    'Email': 'atakan.eser@smartface.io',
                    'Avatar' : 'avatar.png',
                    'Team': 'UAT Team',
                    'Role': 'Developer',
                    'StartDate': '11/16/16',
                    'EndDate': '11/22/16',
                    'LeaveType': 'MEDICAL',
                    'TimeUnit': 'DAY',
                    'AbsenceMessage': 'I've a planned surgery. Going to be at hospital for 2 weeks.',
                    'Status': 'waiting',
                    'TotalDays': 29,
                    'Used': 16,
                    'Remaining': 13
            }]
            */
    
    
            var parsedResponse = oRequestList;
            arrayRequests = [];
    
            //if (parsedResponse.length > 0)
            // lblWelcome2.text = 'You have ' + (parsedResponse.length) + ' file(s) in your storage';
    
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
            
            lblNoData.visible = (arrayRequests.length == 0);
            rptApprovalList.visible = !(arrayRequests.length == 0);
        }
    },
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgApprovalWorklist;