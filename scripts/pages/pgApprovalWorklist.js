/* globals*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const merge = require('deepmerge');
const colors = require('./style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/pgApprovalWorklist.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgApprovalWorklist = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgApprovalWorklist',
            onKeyPress: pgApprovalWorklist_onKeyPress,
            onShow: pgApprovalWorklist_onShow,
            backgroundImage: 'stripe.png'
        });

        headerBarOptions.setTitle(lang['pgApprovalWorklist.headerBar.setTitleView.titleText']);
        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var arrayRequests;

        // creating a repeatbox to show our files
        var rptDefault = {
            name: 'rptApprovalList',
            onSelectedItem: function(e) {
                router.go('pgApproveLeaveRequest', {
                    'rowIndex': e.rowIndex,
                    'request': arrayRequests[e.rowIndex]
                });
            }
        };
        var rptParams = {};
        componentStyler(".Generic.repeater")(rptParams);
        rptParams = merge.all([rptDefault, rptParams]);

        var rptApprovalList = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate")(paramItemTemplate);

        rptApprovalList.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptApprovalList.itemTemplate.height = paramItemTemplate.height;

        var paramActiveItemTemplate = {};
        componentStyler(".Generic.activeItemTemplate")(paramActiveItemTemplate);
        rptApprovalList.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptApprovalList.activeItemTemplate.height = paramActiveItemTemplate.height;
        // Profile
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
            image: 'avatar.png',
        });
        componentStyler(".Generic.imgCircle")(imgAvatar);

        var recVerticalLine = new SMF.UI.Rectangle({
            name: 'recVerticalLine'
        });
        componentStyler(".Generic.verticalLine")(recVerticalLine);

        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName',
            text: '-'
        });
        componentStyler(".textLeft .11pt .Generic.lblTopLine")(lblFullName);


        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole',
            text: '-'
        });
        componentStyler(".textLeft .7pt .Generic.lblMiddleLine")(lblTeamRole);

        var lblLeaveDetails = new SMF.UI.Label({
            name: 'lblLeaveDetails',
            text: '-'
        });
        componentStyler(".textLeft .6pt .Generic.lblMiddleLine .Generic.lblBottomLine")(lblLeaveDetails);

        var imgDetail = new SMF.UI.Image({
            name: 'imgDetail'
        });
        componentStyler(".Generic.imgArrow")(imgDetail);

        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine")(recHorizontalLine);

        // adding files to repeatbox's itemtemplate
        rptApprovalList.itemTemplate.add(imgAvatar);
        rptApprovalList.itemTemplate.add(recVerticalLine);
        rptApprovalList.itemTemplate.add(lblFullName);
        rptApprovalList.itemTemplate.add(lblTeamRole);
        rptApprovalList.itemTemplate.add(lblLeaveDetails);
        rptApprovalList.itemTemplate.add(imgDetail);
        rptApprovalList.itemTemplate.add(recHorizontalLine);
        rptApprovalList.itemTemplate.fillColor = colors.GrayLighter;

        // activeItemTemplate
        var imgAvatar2 = imgAvatar.clone();
        var recVerticalLine2 = recVerticalLine.clone();
        var lblFullName2 = lblFullName.clone();
        var lblTeamRole2 = lblTeamRole.clone();
        var lblLeaveDetails2 = lblLeaveDetails.clone();
        var imgDetail2 = imgDetail.clone();
        var recHorizontalLine2 = recHorizontalLine.clone();

        rptApprovalList.activeItemTemplate.add(imgAvatar2);
        rptApprovalList.activeItemTemplate.add(recVerticalLine2);
        rptApprovalList.activeItemTemplate.add(lblFullName2);
        rptApprovalList.activeItemTemplate.add(lblTeamRole2);
        rptApprovalList.activeItemTemplate.add(lblLeaveDetails2);
        rptApprovalList.activeItemTemplate.add(imgDetail2);
        rptApprovalList.activeItemTemplate.add(recHorizontalLine2);
        rptApprovalList.activeItemTemplate.fillColor = colors.White;

        rptApprovalList.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
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
            if (arrayRequests[e.rowIndex].TimeUnit === lang['pgNewLeaveRequest.lblTimeUnit.text']) {
                var days = tinyUtils.daysBetween(startDate.format('MM/dd/yyyy'), endDate.format('MM/dd/yyyy'));
                leaveDetails = arrayRequests[e.rowIndex].LeaveType + ', ' + days + ' ' + ((days > 1) ? lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.days'] : lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.day']);
                leaveText = ('{0}, starts {1}').format(leaveDetails, startDate.format('ddd, MMM. d'));
            }
            else {
                var hours = tinyUtils.daysBetween(startDate, endDate, true) - ((endDate.format('HH') < 13) ? 0 : lunchBreakDuration);
                leaveDetails = arrayRequests[e.rowIndex].LeaveType + ', ' + hours + ' ' + ((hours > 1) ? lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hours'] : lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hour']);
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


        // adding repeatbox to the page
        this.add(rptApprovalList);

        // adding label for no-data
        var lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: lang['pgApprovalWorklist.lblNoData.text'],
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(lblNoData);
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


        // filter requests menu item
        function filterMenu(e) {
            var item1 = {
                title: lang['pgApprovalWorklist.item1.title'],
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('waiting');
                }
            };
            var item2 = {
                title: lang['pgApprovalWorklist.item2.title'],
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('approved');
                }
            }
            var item3 = {
                title: lang['pgApprovalWorklist.item3.title'],
                icon: 'icon.png', // Andrid 3.0- only
                onSelected: function(e) {
                    displayApprovalRequests('rejected');
                }
            }

            var item4 = {
                title: lang['pgOutOfOffice.btnSave.onPressed.secondButtonText'],
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

        // Parsing storage objects 
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

            // if (parsedResponse.length > 0)
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


            // binding objects array
            // rptBoxObjects.pullDownItemTemplate.visible = true;
            rptApprovalList.closePullItems();
            rptApprovalList.dataSource = arrayRequests;
            rptApprovalList.refresh();
            Dialog.removeWait();

            lblNoData.visible = (arrayRequests.length == 0);
            rptApprovalList.visible = !(arrayRequests.length == 0);
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgApprovalWorklist;
