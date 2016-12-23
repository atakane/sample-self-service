/* globals*/

/*
TODO:
- use Router for pages.back
*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');
const getUnit = require('./component/getUnit.js');


const merge = require('deepmerge');
const colors = require('./style/colors.js');
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgMyRequests = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgMyRequests',
            onKeyPress: pgMyRequests_onKeyPress,
            onShow: pgMyRequests_onShow,
            backgroundImage: 'stripe.png'
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var arrayRequests;


        // Creating a repeatbox to show our requests
        //styling the repeater
        //We used a different way here beacause of the by-design nature of repeater component
        var rptDefault = {
            name: 'rptApprovalList',
            onSelectedItem: function(e) {
                router.go('pgMyRequestDetail', arrayRequests[e.rowIndex]);
            }
        };
        var rptParams = {};
        componentStyler(".Generic.repeater")(rptParams);
        rptParams = merge.all([rptDefault, rptParams]);

        var rptApprovalList = new SMF.UI.RepeatBox(rptParams);

        //styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate")(paramItemTemplate);

        rptApprovalList.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptApprovalList.itemTemplate.height = paramItemTemplate.height;

        var paramActiveItemTemplate = {};
        componentStyler(".Generic.activeItemTemplate")(paramActiveItemTemplate);
        rptApprovalList.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptApprovalList.activeItemTemplate.height = paramActiveItemTemplate.height;

        var imgStatusCircle = new SMF.UI.Image({
            name: 'imgStatusCircle',
        });
        componentStyler(".Generic.imgCircle")(imgStatusCircle);

        var lblStatusLetter = new SMF.UI.Label({
            name: 'lblStatusLetter',
            text: 'W'

        });
        componentStyler(".textCenter .12pt .pgMyRequests.lblStatusLetter")(lblStatusLetter);

        var recVerticalLine = new SMF.UI.Rectangle({
            name: 'recVerticalLine',
        });
        componentStyler(".Generic.verticalLine")(recVerticalLine);

        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName',
            text: '-',
        });
        componentStyler(".textLeft .11pt .Generic.lblTopLine")(lblFullName);


        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole',
            text: '-',
        });
        componentStyler(".textLeft .7pt .Generic.lblMiddleLine")(lblTeamRole);

        var lblLeaveDetails = new SMF.UI.Label({
            name: 'lblLeaveDetails',
            text: '-',
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

        rptApprovalList.itemTemplate.add(imgStatusCircle);
        rptApprovalList.itemTemplate.add(lblStatusLetter);
        rptApprovalList.itemTemplate.add(recVerticalLine);
        rptApprovalList.itemTemplate.add(lblFullName);
        rptApprovalList.itemTemplate.add(lblTeamRole);
        rptApprovalList.itemTemplate.add(lblLeaveDetails);
        rptApprovalList.itemTemplate.add(imgDetail);
        rptApprovalList.itemTemplate.add(recHorizontalLine);

        //activeItemTemplate
        var imgStatusCircle2 = imgStatusCircle.clone();
        var lblStatusLetter2 = lblStatusLetter.clone();
        var recVerticalLine2 = recVerticalLine.clone();
        var lblFullName2 = lblFullName.clone();
        var lblTeamRole2 = lblTeamRole.clone();
        var lblLeaveDetails2 = lblLeaveDetails.clone();
        var imgDetail2 = imgDetail.clone();
        var recHorizontalLine2 = recHorizontalLine.clone();

        rptApprovalList.activeItemTemplate.add(imgStatusCircle2);
        rptApprovalList.activeItemTemplate.add(lblStatusLetter2);
        rptApprovalList.activeItemTemplate.add(recVerticalLine2);
        rptApprovalList.activeItemTemplate.add(lblFullName2);
        rptApprovalList.activeItemTemplate.add(lblTeamRole2);
        rptApprovalList.activeItemTemplate.add(lblLeaveDetails2);
        rptApprovalList.activeItemTemplate.add(imgDetail2);
        rptApprovalList.activeItemTemplate.add(recHorizontalLine2);

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

            var startDate = (new Date(arrayRequests[e.rowIndex].StartDate));
            var endDate = (new Date(arrayRequests[e.rowIndex].EndDate));

            var leaveDetails
            if (arrayRequests[e.rowIndex].TimeUnit === 'DAY') {
                startDate = startDate.format('MM/dd/yyyy');
                endDate = endDate.format('MM/dd/yyyy');

                var days = tinyUtils.daysBetween(startDate, endDate);
                leaveDetails = days + ' ' + ((days > 1) ? 'days' : 'day');
            }
            else {
                var hours = tinyUtils.daysBetween(startDate, endDate, true) - ((endDate.format('HH') < 13) ? 0 : lunchBreakDuration);
                leaveDetails = hours + ' ' + ((hours > 1) ? 'hours' : 'hour');

                startDate = startDate.format('MM/dd/yyyy HH:mm');
                endDate = endDate.format('MM/dd/yyyy HH:mm');
            }


            getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[1]);
            this.controls[3].text = arrayRequests[e.rowIndex].LeaveType;
            this.controls[4].text = startDate + ' - ' + endDate;
            this.controls[5].text = leaveDetails

            getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[9]);
            this.controls[11].text = arrayRequests[e.rowIndex].LeaveType;
            this.controls[12].text = startDate + ' - ' + endDate;
            this.controls[13].text = leaveDetails
        };

        function getStatusLetter(status, statusObject) {
            // for mock system status may be used as string, 
            // this switch written here to prevent further problems. 
            // if your EBS installation's status type are different, you may just change below lines to fit your configuration.
            switch (status.toUpperCase()) {
                case 'WAITING':
                    statusObject.text = 'W';
                    statusObject.fontColor = colors.BlueMedium;
                    break;
                case 'APPROVED':
                    statusObject.text = 'A';
                    statusObject.fontColor = colors.GreenDarker;
                    break;
                case 'REJECTED':
                    statusObject.text = 'R';
                    statusObject.fontColor = colors.RedDark;
                    break;
            }
        }

        //adding repeatbox to the page
        this.add(rptApprovalList);

        // If you want, you can add some legend here
        // createLabel(pgMyRequests, 'lblLegend', 'W: Waiting\nA: Approved\nR: Rejected', '5%', '0%', '90%', '10%', SMF.UI.TextAlignment.LEFT, true, '5pt', false, colors.Gray);

        //adding label for no-data
        var lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: 'You dont have any "Leave Request" yet.'
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(lblNoData);
        this.add(lblNoData);
        
        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgMyRequests_onKeyPress(e) {
            if (e.keyCode === 4) {
                Pages.back(reverseDefaultPageAnimation);
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgMyRequests_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('My Leave Requests');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu")
                    Pages.currentPage.sdSelfService.show();
            });

            // Updating logged in user's info on the this page's slider drawer
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            displayApprovalRequests.call(this);

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgMyRequests_onShow');
            tinyUtils.fixOverlayBug();
        }


        //Parsing storage objects 
        function displayApprovalRequests() {

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

            for (var i = 0; i < parsedResponse.length; i++) {
                var objRequestObject = {};

                if (parsedResponse[i].EmployeeID === oProfile.EmployeeID) {
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
                }
            }


            //binding objects array
            rptApprovalList.closePullItems();
            rptApprovalList.dataSource = arrayRequests;
            rptApprovalList.refresh();
            Dialog.removeWait();

            this.lblNoData.visible = (arrayRequests.length == 0);
            rptApprovalList.visible = !(arrayRequests.length == 0);
        }
    },
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgMyRequests;
