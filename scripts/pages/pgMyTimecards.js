/* globals oTimecardList oProfile*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const merge = require('deepmerge');
const colors = require('./style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/pgMyTimecards.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgMyTimecards = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgMyTimecards',
            onKeyPress: pgMyTimecards_onKeyPress,
            onShow: pgMyTimecards_onShow,
            backgroundImage: 'stripe.png'
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var arrayRequests;


        // Creating a repeatbox to show our requests
        // styling the repeater
        // We used a different way here beacause of the by-design nature of repeater component
        var rptDefault = {
            name: 'rptMyTimecards',
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

        var rptMyTimecards = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate")(paramItemTemplate);

        rptMyTimecards.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptMyTimecards.itemTemplate.height = paramItemTemplate.height;

        var paramActiveItemTemplate = {};
        componentStyler(".Generic.activeItemTemplate")(paramActiveItemTemplate);
        rptMyTimecards.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptMyTimecards.activeItemTemplate.height = paramActiveItemTemplate.height;

        var imgStatusCircle = new SMF.UI.Image({
            name: 'imgStatusCircle',
        });
        componentStyler(".Generic.imgCircle")(imgStatusCircle);

        var lblStatusLetter = new SMF.UI.Label({
            name: 'lblStatusLetter',
            text: 'W'

        });
        componentStyler(".textCenter .12pt .pgMyLeaveRequests.lblStatusLetter")(lblStatusLetter);

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

        rptMyTimecards.itemTemplate.add(imgStatusCircle);
        rptMyTimecards.itemTemplate.add(lblStatusLetter);
        rptMyTimecards.itemTemplate.add(recVerticalLine);
        rptMyTimecards.itemTemplate.add(lblFullName);
        rptMyTimecards.itemTemplate.add(lblTeamRole);
        rptMyTimecards.itemTemplate.add(lblLeaveDetails);
        rptMyTimecards.itemTemplate.add(imgDetail);
        rptMyTimecards.itemTemplate.add(recHorizontalLine);

        // activeItemTemplate
        var imgStatusCircle2 = imgStatusCircle.clone();
        var lblStatusLetter2 = lblStatusLetter.clone();
        var recVerticalLine2 = recVerticalLine.clone();
        var lblFullName2 = lblFullName.clone();
        var lblTeamRole2 = lblTeamRole.clone();
        var lblLeaveDetails2 = lblLeaveDetails.clone();
        var imgDetail2 = imgDetail.clone();
        var recHorizontalLine2 = recHorizontalLine.clone();

        rptMyTimecards.activeItemTemplate.add(imgStatusCircle2);
        rptMyTimecards.activeItemTemplate.add(lblStatusLetter2);
        rptMyTimecards.activeItemTemplate.add(recVerticalLine2);
        rptMyTimecards.activeItemTemplate.add(lblFullName2);
        rptMyTimecards.activeItemTemplate.add(lblTeamRole2);
        rptMyTimecards.activeItemTemplate.add(lblLeaveDetails2);
        rptMyTimecards.activeItemTemplate.add(imgDetail2);
        rptMyTimecards.activeItemTemplate.add(recHorizontalLine2);

        rptMyTimecards.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        rptMyTimecards.onRowRender = function(e) {
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
            // "Status": "pending",
            // "Location" : "NA"
            // }

            var startDate = new Date(arrayRequests[e.rowIndex].StartDate);
            var endDate = new Date(arrayRequests[e.rowIndex].EndDate);

            var textTimeDetail;
            textTimeDetail = ('{0} - {1}').format(startDate.format('MMM. d'), endDate.format('MMM. d, yyyy'));

            var textTotalHours = arrayRequests[e.rowIndex].TotalHours + ' ' + ((arrayRequests[e.rowIndex].TotalHours > 1) ? lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hours'] : lang['pgOutOfOffice.cntBlueBox.lblSelectedDaysCountText.hour']);

            getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[1]);
            this.controls[3].text = textTotalHours;
            this.controls[4].text = textTimeDetail;
            this.controls[5].text = arrayRequests[e.rowIndex].Location;

            getStatusLetter(arrayRequests[e.rowIndex].Status, this.controls[9]);
            this.controls[11].text = textTotalHours;
            this.controls[12].text = textTimeDetail;
            this.controls[13].text = arrayRequests[e.rowIndex].Location;
        };

        function getStatusLetter(status, statusObject) {
            // for mock system status may be used as string, 
            // this switch written here to prevent further problems. 
            // if your EBS installation's status type are different, you may just change below lines to fit your configuration.
            switch (status.toUpperCase()) {
                case 'PENDING':
                    statusObject.text = 'P';
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
                case 'NEW':
                    statusObject.text = 'N';
                    statusObject.fontColor = SMF.UI.Color.RED
                    break;
            }
        }

        // adding repeatbox to the page
        this.add(rptMyTimecards);

        // If you want, you can add some legend here
        // createLabel(pgMyLeaveRequests, 'lblLegend', 'P: Pending\nA: Approved\nR: Rejected', '5%', '0%', '90%', '10%', SMF.UI.TextAlignment.LEFT, true, '5pt', false, colors.Gray);

        // adding label for no-data
        var lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: lang['pgMyLeaveRequests.lblNoData.text']
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(lblNoData);
        this.add(lblNoData);

        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgMyTimecards_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgMyTimecards_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('My Timecards');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu") {
                    Pages.currentPage.sdSelfService.show();
                }
                if (e.type == "add") {
                    createWeekPicker();
                }
            });

            // Updating logged in user's info on the this page's slider drawer
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            displayApprovalRequests.call(this);

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgMyTimecards_onShow');
            tinyUtils.fixOverlayBug();
        }

        function createWeekPicker() {
            //https://stackoverflow.com/questions/17302555/get-the-dates-of-all-the-mondays-between-two-dates-in-javascript
            var start_week_date = new Date(2017, 0, 1); // no queries exist before this
            var end_date = new Date(2017, 11, 31);

            // array to hold week commencing dates
            var arrayMondays = new Array();
            var arrayMondaysForDisplay = new Array();

            var week_number = 0;

            while (start_week_date < end_date) {
                var next_date = start_week_date.setDate(start_week_date.getDate() + 1);

                var next_days_date = new Date(next_date);
                day_index = next_days_date.getDay();
                if (day_index == 1) {
                    week_number++;
                    arrayMondays.push(next_days_date);
                    arrayMondaysForDisplay.push(next_days_date.format("ddd d MMM yyyy") + ' / week' + week_number);
                }
                // increment the date
                start_week_date = new Date(next_date);
            }

            var selectedIndex = 0;
            pick(
                arrayMondaysForDisplay,
                selectedIndex,
                function(e) {
                    selectedIndex = e.index;
                    createNewWeekTimeCard(arrayMondays[e.index]);
                },
                function() {}
            );

        }

        function createNewWeekTimeCard(weekStartDate) {
            // thus we're using mock services, ne need to get latest ID to increment it for a new record.
            // sorting our oTimeCardList array to get latest ID 

            var sortedTimeCardList = oTimecardList.sort(function(a, b) {
                return parseFloat(b.ID) - parseFloat(a.ID);
            });

            var latestID = sortedTimeCardList[0].ID;
            var startDate = weekStartDate;
            var endDate = (new Date(startDate)).addDays(4);

            var tempTimeCard = {
                    "ID": latestID + 1,
                    "EmployeeID": oProfile.EmployeeID,
                    "FullName": oProfile.FullName,
                    "Email": oProfile.Email,
                    "Avatar": oProfile.Avatar,
                    "Team": oProfile.Team,
                    "Role": oProfile.Role,
                    "StartDate": startDate.format("M/d/yy"),
                    "EndDate": endDate.format("M/d/yy"),
                    "TotalHours": "0",
                    "Status": "new",
                    "Location": "NA",
                    "days": [{
                        "date": startDate.format("M/d/yy"),
                        "hours": []
                    }, {
                        "date": startDate.addDays(1).format("M/d/yy"),
                        "hours": []
                    }, {
                        "date": startDate.addDays(1).format("M/d/yy"),
                        "hours": []
                    }, {
                        "date": startDate.addDays(1).format("M/d/yy"),
                        "hours": []
                    }, {
                        "date": startDate.addDays(1).format("M/d/yy"),
                        "hours": []
                    }]
                }
                // console.log(JSON.stringify(tempTimeCard));
            oTimecardList.push(tempTimeCard);
            router.go('pgTimecardDetail', {
                'id': tempTimeCard.ID,
                'request': tempTimeCard
            });

        }

        // Parsing storage objects 
        function displayApprovalRequests() {

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
                    "EndDate": "12/16/16",
                    "TotalHours": "43",
                    "Status": "pending",
                    "Location" : "NA",
                    "days" : []
            }]
            */

            var parsedResponse = oTimecardList;
            arrayRequests = [];

            for (var i = 0; i < parsedResponse.length; i++) {
                if (parsedResponse[i].EmployeeID === oProfile.EmployeeID) {
                    arrayRequests.push(parsedResponse[i]);
                }
            }

            // binding objects array
            rptMyTimecards.closePullItems();
            rptMyTimecards.dataSource = arrayRequests;
            rptMyTimecards.refresh();
            Dialog.removeWait();

            this.lblNoData.visible = (arrayRequests.length == 0);
            rptMyTimecards.visible = !(arrayRequests.length == 0);
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgMyTimecards;
