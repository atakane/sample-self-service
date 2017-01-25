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

const pgApprovalWorklistTimecards = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgApprovalWorklistTimecards',
            onKeyPress: pgApprovalWorklistTimecards_onKeyPress,
            onShow: pgApprovalWorklistTimecards_onShow,
            backgroundImage: 'stripe.png'
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var arrayRequests;

        // creating a repeatbox to show our files
        var rptDefault = {
            name: 'rptApprovalList',
            onSelectedItem: function(e) {
                router.go('pgTimecardDetail', {
                    'id': arrayRequests[e.rowIndex].ID,
                    'request': arrayRequests[e.rowIndex]
                });
            }
        };
        var rptParams = {};
        componentStyler(".Generic.repeater")(rptParams);
        rptParams = merge.all([rptParams, rptDefault]);

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
            // "ID": 11,
            // "EmployeeID": "88771100",
            // "FullName": "William Campell",
            // "Email": "wc@smartface.io",
            // "Avatar": "avatar6.png",
            // "Team": "R&D",
            // "Role": "Sr. Researcher",
            // "StartDate": "12/12/16",
            // "EndDate": "12/16/16",
            // "TotalHours": "43",
            // "Status": "waiting",
            // "Location" : "NA"
            // }

            var startDate = new Date(arrayRequests[e.rowIndex].StartDate);
            var endDate = new Date(arrayRequests[e.rowIndex].EndDate);

            var leaveDetails, leaveText;
            leaveDetails = 'Total: ' + arrayRequests[e.rowIndex].TotalHours + ' hours'
            leaveText = ('{0}, {1} - {2}').format(leaveDetails, startDate.format('MMM. d'), endDate.format('MMM. d'));


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
        function pgApprovalWorklistTimecards_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgApprovalWorklistTimecards_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('Team\'s Timecards');
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
            smfOracle.logAndFlushAnalytics('pgApprovalWorklistTimecards_onShow');
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
                    "ID": 11,
                    "EmployeeID": "88771100",
                    "FullName": "William Campell",
                    "Email": "wc@smartface.io",
                    "Avatar": "avatar6.png",
                    "Team": "R&D",
                    "Role": "Sr. Researcher",
                    "StartDate": "12/12/16",
                    "EndDate": "11/16/16",
                    "TotalHours": "43",
                    "Status": "waiting",
                    "Location" : "NA"
            }]
            */


            var parsedResponse = oTimecardList;
            arrayRequests = [];

            for (var i = 0; i < parsedResponse.length; i++) {
                if (parsedResponse[i].Status === status) {
                    arrayRequests.push(parsedResponse[i]);
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

module.exports = pgApprovalWorklistTimecards;
