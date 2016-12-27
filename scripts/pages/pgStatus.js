/* globals smfOracle oTimeTable oProfile*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const colors = require('pages/style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/pgStatus.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// Styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgStatus = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgStatus',
            onShow: pgStatus_onShow
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        // Home Background
        var imgHome = new SMF.UI.Image({
            name: 'imgHome'
        });
        componentStyler(".Generic.imgHome")(imgHome);

        // Progress bar (Earned & Used days ratio)
        var cntProgressBar = new SMF.UI.Container({
            name: 'cntProgressBar'
        });
        componentStyler(".pgStatus.cntProgressBar")(cntProgressBar);

        var imgProgressBackground = new SMF.UI.Image({});
        componentStyler(".pgStatus.imgProgressBackground")(imgProgressBackground);

        var recProgress = new SMF.UI.Rectangle({
            name: 'recProgress'
        })
        componentStyler(".pgStatus.recProgress")(recProgress);

        cntProgressBar.add(imgProgressBackground);
        cntProgressBar.add(recProgress);

        this.add(cntProgressBar);
        this.add(imgHome);

        // Profile
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
            image: ''
        });
        componentStyler(".pgStatus.imgAvatar")(imgAvatar);
        this.add(imgAvatar);

        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName'
        });
        componentStyler(".textCenter .12pt .pgStatus.lblFullName")(lblFullName);
        this.add(lblFullName);

        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole'
        });
        componentStyler(".textCenter .7pt .pgStatus.lblTeamRole")(lblTeamRole);
        this.add(lblTeamRole);

        // Vacation metrics
        createVacationBoxes.call(this);

        // Out Of Office Status
        var cntOutOfOfficeBar = new SMF.UI.Container({
            name: 'cntOutOfOfficeBar',
            onTouchEnded: function(e) {
                router.go('pgOutOfOffice');
            }
        });
        componentStyler(".pgStatus.cntOutOfOfficeBar")(cntOutOfOfficeBar);

        var lblOOOStatusTitle = new SMF.UI.Label({
            name: 'lblOOOStatusTitle',
            text: lang['pgStatus.lblOOOStatusTitle.text'],
        });
        componentStyler(".textLeft .7pt .pgStatus.cntOutOfOfficeBar.lblOOOStatusTitle")(lblOOOStatusTitle);
        cntOutOfOfficeBar.add(lblOOOStatusTitle);

        var lblOOOStatusTitle2 = new SMF.UI.Label({
            name: 'lblOOOStatusTitle2',
            text: lang['pgStatus.lblOOOStatusTitle2.text'],
        });
        componentStyler(".textLeft .7pt .pgStatus.cntOutOfOfficeBar.lblOOOStatusTitle2")(lblOOOStatusTitle2);
        cntOutOfOfficeBar.add(lblOOOStatusTitle2);

        var lblOOOStatusText = new SMF.UI.Label({
            name: 'lblOOOStatusText',
            text: lang['pgOutOfOffice.lblOOOStatusText.off']
        });
        componentStyler(".textLeft .7pt .pgStatus.cntOutOfOfficeBar.lblOOOStatusText")(lblOOOStatusText);
        cntOutOfOfficeBar.add(lblOOOStatusText);

        var imgDetail = new SMF.UI.Image({});
        componentStyler(".pgStatus.imgDetail")(imgDetail);
        cntOutOfOfficeBar.add(imgDetail);

        this.add(cntOutOfOfficeBar);
        
        var imgOutOfOfficeShadowLine = new SMF.UI.Image({});
        componentStyler(".pgStatus.imgOutOfOfficeShadowLine")(imgOutOfOfficeShadowLine);
        this.add(imgOutOfOfficeShadowLine);
        
        // Latest Leave Request details
        var lblNewRequestText = new SMF.UI.Label({
            name: 'lblNewRequestText',
            text: ''
        });
        componentStyler(".textLeft .7pt .pgStatus.lblNewRequestText")(lblNewRequestText);
        this.add(lblNewRequestText);

        var lblNewRequestTextDate = new SMF.UI.Label({
            name: 'lblNewRequestTextDate',
            text: '',
        });
        componentStyler(".textLeft .7pt .pgStatus.lblNewRequestTextDate")(lblNewRequestTextDate);
        this.add(lblNewRequestTextDate);

        // New Request button
        var imgAdd = new SMF.UI.Image({
            onTouchEnded: function(e) {
                router.go('pgNewLeaveRequest');
            }
        });
        componentStyler(".pgStatus.imgAdd")(imgAdd);
        this.add(imgAdd);

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgStatus
         */
        function pgStatus_onShow() {
            // We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            // addHeaderBar();
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu")
                    Pages.currentPage.sdSelfService.show();
            });

            // Filling used days bar with a smooth animation
            fillUsedDaysBar();

            // Fillin Vacation Metrics
            fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);

            // Writing the user's last leave-request details 
            if ((oProfile.LeaveRequestCount) && !isNaN(oProfile.LeaveRequestCount) && (oProfile.LeaveRequestCount > 0)) {
                lblNewRequestText.text = lang['pgStatus.lblNewRequestText.text.part1'] + oProfile.LeaveRequestCount + lang['pgStatus.lblNewRequestText.text.part2'];
                lblNewRequestTextDate.text = (new Date(oProfile.LastRequestStartDate)).format('MM/dd/yyyy');
                if(Device.deviceOS=='Android'){
                var tmp1 = lblNewRequestText.text;
                var tmp2 = lblNewRequestTextDate.text;
                lblNewRequestText.text = lblNewRequestTextDate.text = "";
                lblNewRequestText.attributedText = tmp1 + "<b> " + tmp2 + "</b>";
                }
            }
            else {
                lblNewRequestText.text = lang['pgStatus.text1'];
                lblNewRequestTextDate.text = '';
            }

            // resetting every time
            Pages.currentPage.imgAvatar.image = Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.lblFullName.text = Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.lblTeamRole.text = Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;
            Pages.currentPage.cntOutOfOfficeBar.lblOOOStatusText.text = (oProfile.OutOfOffice) ? lang['pgOutOfOffice.lblOOOStatusText.on'] : lang['pgOutOfOffice.lblOOOStatusText.off'];
            Pages.currentPage.cntOutOfOfficeBar.lblOOOStatusText.fontColor = (oProfile.OutOfOffice) ? colors.GreenDark : colors.BlueDark;

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgStatus_onShow');

            tinyUtils.fixOverlayBug();
        }

        // Used days bar
        function fillUsedDaysBar() {
            recProgress.width = '0%';
            recProgress.animate({
                property: 'width',
                endValue: (100 * (oTimeTable.Used / oTimeTable.TotalDays)) + '%',
                motionEase: SMF.UI.MotionEase.DECELERATING,
                duration: 700,
                onFinish: function() {
                    // do your action after finishing the animation
                }
            });
        }

        // Drawing day-boxes 
        function createVacationBoxes() {
            var boxTotalDays = new SMF.UI.Container({
                name: 'boxTotalDays'
            });
            componentStyler(".pgStatus.boxTotalDays")(boxTotalDays);

            // Total Days
            var lblTotalDays = new SMF.UI.Label({
                name: 'lblTotalDays'
            });
            componentStyler(".textCenter .23pt .bold .pgStatus.boxDaysText1 .pgStatus.lblTotalDays")(lblTotalDays);
            boxTotalDays.add(lblTotalDays);

            var lblTotalDaysText = new SMF.UI.Label({
                name: 'lblTotalDaysText',
                text: lang[ 'pgStatus.boxTotal']
            });
            componentStyler(".textCenter .6pt .pgStatus.boxDaysText2 .pgStatus.lblTotalDays")(lblTotalDaysText);
            boxTotalDays.add(lblTotalDaysText);

            // Used Days
            var boxUsed = new SMF.UI.Container({
                name: 'boxUsed'
            });
            componentStyler(".pgStatus.boxUsed")(boxUsed);

            var lblUsedDays = new SMF.UI.Label({
                name: 'lblUsedDays'
            });
            componentStyler(".textCenter .23pt .bold .pgStatus.boxDaysText1 .pgStatus.lblUsedDays")(lblUsedDays);
            boxUsed.add(lblUsedDays);

            var lblUsedDaysText = new SMF.UI.Label({
                name: 'lblUsedDaysText',
                text: lang['pgStatus.boxUsed']
            });
            componentStyler(".textCenter .6pt .pgStatus.boxDaysText2 .pgStatus.lblUsedDays")(lblUsedDaysText);
            boxUsed.add(lblUsedDaysText);

            // Remaining Days
            var boxRemaining = new SMF.UI.Container({
                name: 'boxRemaining'
            });
            componentStyler(".pgStatus.boxRemaining")(boxRemaining);

            var imgRemaining = new SMF.UI.Image({
                name: 'imgRemaining'
            });
            componentStyler(".allArea .pgStatus.imgRemaining")(imgRemaining);
            boxRemaining.add(imgRemaining);

            var lblRemainingDays = new SMF.UI.Label({
                name: 'lblRemainingDays'
            });
            componentStyler(".textCenter .23pt .bold .pgStatus.boxDaysText1 .pgStatus.lblRemainingDays")(lblRemainingDays);
            boxRemaining.add(lblRemainingDays);

            var lblRemainingDaysText = new SMF.UI.Label({
                name: 'lblRemainingDaysText',
                text: lang['pgStatus.boxRemaining']
            });
            componentStyler(".textCenter .6pt .pgStatus.boxDaysText2 .pgStatus.lblRemainingDays")(lblRemainingDaysText);
            boxRemaining.add(lblRemainingDaysText);

            this.add(boxTotalDays);
            this.add(boxUsed);
            this.add(boxRemaining);
        }

        // We trigger this function when a new update occurs
        function fillVacationMetrics(TotalDays, Used, Remaining) {
            Pages.currentPage.boxTotalDays.lblTotalDays.text = TotalDays;
            Pages.currentPage.boxUsed.lblUsedDays.text = Used;
            Pages.currentPage.boxRemaining.lblRemainingDays.text = Remaining;
        }

    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgStatus;
