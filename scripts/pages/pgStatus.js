/* globals smfOracle oTimeTable oProfile*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFcomponents = require('./component/SMFcomponents.js');
const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');

const headerBarOptions = require("./headerbar/pgStatus.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');

const colors = require('pages/style/colors.js');
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgStatus = extend(Page)(
    //Page Constructor
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
            name: 'imgHome',
            image: 'home_back.png',
            left: 0,
            top: 0,
            width: '100%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        });

        componentStyler(".pgStatus.imgHome")(imgHome);

        // Progress bar (Earned & Used days ratio)
        var cntProgressBar = new SMF.UI.Container({
            name: 'cntProgressBar',
            left: 0,
            width: '100%',
            top: '41.82908%',
            height: '8.2458%',
            borderWidth: 0
        });

        var imgProgressBackground = new SMF.UI.Image({
            image: 'slider_stripe.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        })
        var recProgress = new SMF.UI.Rectangle({
            name: 'recProgress',
            left: 0,
            top: 0,
            width: '0',
            height: '100%',
            fillColor: '#ebc0d3',
            borderWidth: 0,
            roundedEdge: 0
        })

        cntProgressBar.add(imgProgressBackground);
        cntProgressBar.add(recProgress);

        this.add(cntProgressBar);
        this.add(imgHome);

        // Profile
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
            image: '',
            left: '39.4666%',
            top: '14.2428%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        });
        componentStyler(".pgStatus.imgAvatar")(imgAvatar);
        this.add(imgAvatar);

        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName',
            left: 0,
            width: '100%',
            text: '',
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: '12pt',
                bold: false
            }),
            multipleLine: false,
            fontColor: SMF.UI.Color.WHITE
        });
        componentStyler(".pgStatus.lblFullName")(lblFullName);
        this.add(lblFullName);

        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole',
            left: 0,
            top: '33.4332%',
            width: '100%',
            height: '2.9985%',
            text: '',
            textAlignment: SMF.UI.TextAlignment.CENTER,
            font: new SMF.UI.Font({
                size: '7pt',
                bold: false
            }),
            multipleLine: false,
            fontColor: SMF.UI.Color.WHITE
        });
        this.add(lblTeamRole);

        // Vacation metrics
        createVacationBoxes.call(this);

        // Out Of Office Status
        var cntOutOfOfficeBar = new SMF.UI.Container({
            name: 'cntOutOfOfficeBar',
            left: 0,
            width: '100%',
            top: '75.1874%',
            height: '9.5952%',
            borderWidth: 0,
            fillColor: colors.GrayLighter,
            backgroundTransparent: false,
            onTouchEnded: function(e) {
                router.go('pgOutOfOffice');
            }
        });
        var swtOutOfOffice = new SMF.UI.SwitchButton({
            name: 'swtOutOfOffice',
            left: '5.73333%',
            top: '30.4687%',
            checked: false,
            onTintColor: colors.BlueMedium,
            tintColor: colors.BlueMedium,
            touchEnabled: false,
            visible: false
        });
        cntOutOfOfficeBar.add(swtOutOfOffice);

        var lblOOOStatusTitle = new SMF.UI.Label({
            name: 'lblOOOStatusTitle',
            left: '4.53333%',
            top: '21.875%',
            width: '60%',
            height: '29%',
            text: 'OUT OF OFFICE STATUS',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: '#cca2b5'
        });
        cntOutOfOfficeBar.add(lblOOOStatusTitle);

        var lblOOOStatusTitle2 = new SMF.UI.Label({
            name: 'lblOOOStatusTitle2',
            left: '4.53333%',
            top: '53.9062%',
            width: '27%',
            height: '29%',
            text: 'Out Of Office',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: colors.GrayLight
        });
        cntOutOfOfficeBar.add(lblOOOStatusTitle2);

        var lblOOOStatusText = new SMF.UI.Label({
            name: 'lblOOOStatusText',
            left: '31%',
            top: '53.9062%',
            width: '30%',
            height: '29%',
            text: 'Mode Off',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: colors.BlueDark
        });
        cntOutOfOfficeBar.add(lblOOOStatusText);

        var imgDetail = new SMF.UI.Image({
            image: 'right_arrow.png',
            left: '90.66666%',
            top: '40.625%',
            width: 12,
            height: 20,
            imageFillType: SMF.UI.ImageFillType.NORMAL
        });
        componentStyler(".pgStatus.imgDetail")(imgDetail);
        cntOutOfOfficeBar.add(imgDetail);

        this.add(cntOutOfOfficeBar);
        SMFcomponents.createImage(this, 'imgOutOfOfficeShadowLine', 'shadow_line.png', '0', '74.8875%', '100%', '6', SMF.UI.ImageFillType.STRETCH);

        // Latest Leave Request details
        var lblNewRequestText = new SMF.UI.Label({
            name: 'lblNewRequestText',
            left: '4.53333%',
            top: '88.5%',
            width: '65%',
            height: '10%',
            text: '',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            multipleLine: true,
            fontColor: colors.GrayLight
        });
        this.add(lblNewRequestText);

        var lblNewRequestTextDate = new SMF.UI.Label({
            name: 'lblNewRequestTextDate',
            width: '30%',
            height: '10%',
            text: '',
            textAlignment: SMF.UI.TextAlignment.LEFT,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: colors.BlueDark
        });
        componentStyler(".pgStatus.lblNewRequestTextDate")(lblNewRequestTextDate);
        this.add(lblNewRequestTextDate);

        // New Request button
        var imgAdd = new SMF.UI.Image({
            image: 'btn_plus.png',
            top: '88.9805%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT,
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
            //We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            // addHeaderBar();
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu")
                    Pages.currentPage.sdSelfService.show();
            });

            fillUsedDaysBar();

            fillVacationMetrics(oTimeTable.TotalDays, oTimeTable.Used, oTimeTable.Remaining);

            if ((oProfile.LeaveRequestCount) && !isNaN(oProfile.LeaveRequestCount) && (oProfile.LeaveRequestCount > 0)) {
                lblNewRequestText.text = 'You have ' + oProfile.LeaveRequestCount + ' request(s) in total. The last one is on';
                lblNewRequestTextDate.text = (new Date(oProfile.LastRequestStartDate)).format('MM/dd/yyyy');
                if (Device.deviceOS == 'Android') {
                    var tmp = lblNewRequestText.text;
                    var tmp2 = lblNewRequestTextDate.text;
                    lblNewRequestText.text = lblNewRequestTextDate.text = "";
                    lblNewRequestText.attributedText = tmp + "<b> " + tmp2 + "</b>";
                }

            }
            else {
                lblNewRequestText.text = 'You don\'t have any upcoming leave request.';
                lblNewRequestTextDate.text = '';
            }

            // resetting every time
            Pages.currentPage.imgAvatar.image = Pages.currentPage.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            Pages.currentPage.lblFullName.text = Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            Pages.currentPage.lblTeamRole.text = Pages.currentPage.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;
            Pages.currentPage.cntOutOfOfficeBar.swtOutOfOffice.checked = oProfile.OutOfOffice;
            Pages.currentPage.cntOutOfOfficeBar.lblOOOStatusText.text = (oProfile.OutOfOffice) ? 'Mode On' : 'Mode Off';
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
                    //do your action after finishing the animation
                }
            });
        }

        // Drawing day-boxes 
        function createVacationBoxes() {
            var boxTotalDays = new SMF.UI.Container({
                name: 'boxTotalDays',
                left: '4%',
                top: '56.6716%',
                width: '28%',
                height: '15.5922%',
                borderWidth: 1,
                borderColor: '#979797',
                roundedEdge: 0
            });

            SMFcomponents.createLabel(boxTotalDays, 'lblTotalDays', '-', '0', '0', '100%', '73%', SMF.UI.TextAlignment.CENTER, false, '23pt', true, '#979797');
            SMFcomponents.createLabel(boxTotalDays, 'lblTotalDaysText', 'Total', '0', '73', '100%', '20%', SMF.UI.TextAlignment.CENTER, false, '6pt', true, '#979797');


            var boxUsed = new SMF.UI.Container({
                name: 'boxUsed',
                left: '36%',
                top: '56.6716%',
                width: '28%',
                height: '15.5922%',
                borderWidth: 1,
                borderColor: '#cca2b5',
                roundedEdge: 0
            });

            SMFcomponents.createLabel(boxUsed, 'lblUsedDays', '-', '0', '0', '100%', '73%', SMF.UI.TextAlignment.CENTER, false, '24pt', true, '#cca2b5');
            SMFcomponents.createLabel(boxUsed, 'lblUsedDaysText', 'Used', '0', '73', '100%', '20%', SMF.UI.TextAlignment.CENTER, false, '6pt', true, '#cca2b5');


            var boxRemaining = new SMF.UI.Container({
                name: 'boxRemaining',
                left: '68%',
                top: '56.6716%',
                width: '28%',
                height: '15.5922%',
                borderWidth: 0,
                roundedEdge: 0
            });

            SMFcomponents.createImage(boxRemaining, 'imgRemaining', 'square_stripe.png', '0', '0', '100%', '100%', SMF.UI.ImageFillType.ASPECTFIT);
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDays', '-', '0', '0', '100%', '73%', SMF.UI.TextAlignment.CENTER, false, '25pt', true, colors.BlueDark);
            SMFcomponents.createLabel(boxRemaining, 'lblRemainingDaysText', 'Remaining', '0', '73', '100%', '20%', SMF.UI.TextAlignment.CENTER, false, '6pt', true, colors.BlueDark);


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
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgStatus;
