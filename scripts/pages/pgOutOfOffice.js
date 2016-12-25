/* globals smfOracle oProfile templateOutOfOfficeText fontAwesome*/

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');
const tinyUtils = require('./component/tinyUtils.js');
const colors = require('pages/style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgOutOfOffice = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
            name: 'pgOutOfOffice',
            onKeyPress: pgOutOfOffice_onKeyPress,
            onShow: pgOutOfOffice_onShow
        });

        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');

        var selectedStartDate;
        var selectedEndDate;

        // Lines
        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgOutOfOffice.horizontalRectangle .pgOutOfOffice.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);

        var myRectangle2 = new SMF.UI.Rectangle({});
        componentStyler(".pgOutOfOffice.horizontalRectangle .pgOutOfOffice.myRectangle2Top")(myRectangle2);
        this.add(myRectangle2);

        // var myRectangle3 = new SMF.UI.Rectangle({});
        // componentStyler(".pgOutOfOffice.verticalRectangle .pgOutOfOffice.myRectangle1Top")(myRectangle3);
        // this.add(myRectangle3);

        // Profile Section
        // Profile Image
        var imgAvatar = new SMF.UI.Image({
            name: 'imgAvatar',
        });
        componentStyler(".pgOutOfOffice.imgAvatar")(imgAvatar);
        this.add(imgAvatar);

        // FullName & Role
        var lblFullName = new SMF.UI.Label({
            name: 'lblFullName'
        });
        componentStyler(".textLeft .12pt .pgOutOfOffice.lblFullName")(lblFullName);
        this.add(lblFullName);

        var lblTeamRole = new SMF.UI.Label({
            name: 'lblTeamRole'
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblTeamRole")(lblTeamRole);
        this.add(lblTeamRole);

        // Out of Office switch
        var swtOutOfOffice = new SMF.UI.SwitchButton({
            name: 'swtOutOfOffice',
            onChange: function(e) {
                Pages.currentPage.lblOOOStatusText.text = this.checked == true ? 'Mode On' : 'Mode Off';
                Pages.currentPage.lblOOOStatusText.fontColor = this.checked == true ? colors.GreenDark : colors.BlueDark
                Pages.currentPage.recOverlay.visible = !this.checked;
            }
        });
        componentStyler(".pgOutOfOffice.swtOutOfOffice")(swtOutOfOffice);
        this.add(swtOutOfOffice);

        // Status Texts
        var lblOOOStatusTitle = new SMF.UI.Label({
            name: 'lblOOOStatusTitle',
            text: 'Out Of Office'
        });
        componentStyler(".textCenter .7pt .pgOutOfOffice.lblOOOStatusTitle")(lblOOOStatusTitle);
        this.add(lblOOOStatusTitle);

        var lblOOOStatusText = new SMF.UI.Label({
            name: 'lblOOOStatusText',
            text: 'Mode Off'
        });
        componentStyler(".textCenter .7pt .pgOutOfOffice.lblOOOStatusText")(lblOOOStatusText);
        this.add(lblOOOStatusText);

        // Start Date
        var lblStart = new SMF.UI.Label({
            name: 'lblStart',
            text: 'STARTS'
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblStart .pgOutOfOffice.level1Top")(lblStart);
        this.add(lblStart);

        var lblDown1 = new SMF.UI.Label({
            text: JSON.parse('""'),
            font: fontAwesome
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblStartDown .pgOutOfOffice.level1Top")(lblDown1);
        this.add(lblDown1);

        var lblStartDate = new SMF.UI.Label({
            name: 'lblStartDate',
            text: '-'
        });
        componentStyler(".textLeft .12pt .pgOutOfOffice.lblStartDate .pgOutOfOffice.level2Top")(lblStartDate);
        this.add(lblStartDate);

        // Adding a container layer on top of the date to be touchable as a single object
        var cntSelectStartDate = new SMF.UI.Rectangle({
            name: 'cntSelectStartDate',

            onTouchEnded: function() {
                showDateTimePicker(true);
            }
        });
        componentStyler(".pgOutOfOffice.level2Top  .pgOutOfOffice.cntSelectStartDate")(cntSelectStartDate);
        this.add(cntSelectStartDate);

        // End Date
        var lblEnd = new SMF.UI.Label({
            name: 'lblEnd',
            text: 'ENDS'
        });
        componentStyler(".textRight .7pt .pgOutOfOffice.lblEnd .pgOutOfOffice.level1Top")(lblEnd);
        this.add(lblEnd);

        var lblDown2 = lblDown1.clone();
        componentStyler(".textRight .7pt .pgOutOfOffice.lblEndDown .pgOutOfOffice.level1Top")(lblDown2);
        this.add(lblDown2);

        var lblEndDate = new SMF.UI.Label({
            name: 'lblEndDate',
            text: '-'
        });
        componentStyler(".textRight .12pt .pgOutOfOffice.lblEndDate .pgOutOfOffice.level2Top")(lblEndDate);
        this.add(lblEndDate);

        // Adding a container layer on top of the date to be touchable as a single object
        var cntSelectEndDate = new SMF.UI.Rectangle({
            name: 'cntSelectEndDate',

            onTouchEnded: function() {
                showDateTimePicker(false);
            }
        });
        componentStyler(".pgOutOfOffice.level2Top .pgOutOfOffice.cntSelectEndDate")(cntSelectEndDate);
        this.add(cntSelectEndDate);

        // Day Count Box
        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox'
        });
        componentStyler(".pgOutOfOffice.cntBlueBox")(cntBlueBox);
        this.add(cntBlueBox);

        var lblSelectedDaysCount = new SMF.UI.Label({
            name: 'lblSelectedDaysCount',
            text: '-'
        });
        componentStyler(".textCenter .16pt .bold .pgOutOfOffice.lblSelectedDaysCount")(lblSelectedDaysCount);
        cntBlueBox.add(lblSelectedDaysCount);

        var lblSelectedDaysCountText = new SMF.UI.Label({
            name: 'lblSelectedDaysCountText',
            text: 'day'
        });
        componentStyler(".textCenter .7pt .pgOutOfOffice.lblSelectedDaysCountText")(lblSelectedDaysCountText);
        cntBlueBox.add(lblSelectedDaysCountText);


        // Out Off Office Message Section        
        var lblOutOfOfficeMessage = new SMF.UI.Label({
            name: 'lblOutOfOfficeMessage',
            text: 'OUT OF OFFICE MESSAGE'
        });
        componentStyler(".textLeft .7pt .pgOutOfOffice.lblOutOfOfficeMessage")(lblOutOfOfficeMessage);
        this.add(lblOutOfOfficeMessage);


        // Textbox for Out of Office Message      
        var txtOutOfOfficeMessage = new SMF.UI.Label({
            name: 'txtOutOfOfficeMessage',
            text: ''
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage")(txtOutOfOfficeMessage);
        this.add(txtOutOfOfficeMessage);

        // Save Button
        // FontAwesome 'check icon' UTF8 code:uf00c
        // TODO: height will be moved to style file after styler-fix
        var btnSave = new SMF.UI.TextButton({
            name: 'btnSave',
            font: fontAwesome,
            height: '9.5952%',
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to update your "Out of Office" status?',
                    firstButtonText: 'Update',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {
                        oProfile.OutOfOffice = Pages.currentPage.swtOutOfOffice.checked;
                        oProfile.OutOfOfficeMessage = Pages.currentPage.txtOutOfOfficeMessage.text;

                        oProfile.OutOfOfficeStart = selectedStartDate;
                        oProfile.OutOfOfficeEnd = selectedEndDate;

                        alert('Your "Out of Office" status has been updated.');
                    },
                    onSecondButtonPressed: function() {}
                });
            }
        });
        componentStyler(".12pt .pgOutOfOffice.btnSave")(btnSave);
        this.add(btnSave);

        var recOverlay = new SMF.UI.Rectangle({
            name: 'recOverlay',
        });
        componentStyler(".pgOutOfOffice.recOverlay")(recOverlay);
        this.add(recOverlay);


        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgOutOfOffice
         */
        function pgOutOfOffice_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgOutOfOffice
         */
        function pgOutOfOffice_onShow() {
            // We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;
            console.log(JSON.prune(Pages.currentPage.btnSave, 1));

            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('Out of Office');
            headerBarWrapper.reload();
            headerBarOptions.eventCallback(function(e) {
                if (e.type == "menu")
                    Pages.currentPage.sdSelfService.show();
            });

            // resetting every time
            this.imgAvatar.image = this.sdSelfService.cntGeneral.cntTop.imgSliderAvatar.image = oProfile.Avatar;
            this.lblFullName.text = this.sdSelfService.cntGeneral.cntTop.lblSliderFullName.text = oProfile.FullName;
            this.lblTeamRole.text = this.sdSelfService.cntGeneral.cntTop.lblSliderTeamRole.text = oProfile.Role + ' / ' + oProfile.Team;

            swtOutOfOffice.checked = oProfile.OutOfOffice;

            // dates
            selectedStartDate = (tinyUtils.isDate(oProfile.OutOfOfficeStart)) ? new Date(oProfile.OutOfOfficeStart) : new Date(Date.now());
            selectedEndDate = (tinyUtils.isDate(oProfile.OutOfOfficeEnd)) ? new Date(oProfile.OutOfOfficeEnd) : new Date(Date.now()).addDays(7);

            setDateLabels(selectedStartDate, true);
            setDateLabels(selectedEndDate, false);

            // Calculating the day-count according to given Start and End dates
            calculateDaysBetween();

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgOutOfOffice_onShow');
            tinyUtils.fixOverlayBug();
        }

        // Setting initial Out Of Office message as a template if app is opened first time
        function setInitialOutOfficeText() {
            var oooText;

            if ((oProfile.OutOfOfficeMessage) && (oProfile.OutOfOfficeMessage.length > 0)) {
                oooText = oProfile.OutOfOfficeMessage
            }
            else {
                oooText = templateOutOfOfficeText.replace('{FullName}', oProfile.FullName).replace('{Role}', oProfile.Role).replace('{Team}', oProfile.Team).replace('{EndDate}', selectedEndDate.format('dddd, MMMM d, y'));
            }

            Pages.currentPage.txtOutOfOfficeMessage.text = oooText;
        }

        // Showing Date Picker
        function showDateTimePicker(isStartDate) {
            var currentDate = (isStartDate) ? selectedStartDate : selectedEndDate;

            var minDate = (isStartDate) ? new Date() : new Date(selectedStartDate);

            var maxDate = (isStartDate) ? (new Date(selectedEndDate)).addDays(-1) : (new Date(selectedStartDate)).addDays(365);

            SMF.UI.showDatePicker({
                currentDate: currentDate,
                mask: 'dd-MM-yyyy',
                minDate: minDate,
                maxDate: maxDate,
                showWorkingDate: true,
                onSelect: function(e) {
                    var sDate = new Date(e.date);
                    setDateLabels(sDate, isStartDate);
                },
                onCancel: function(e) {
                    // alert('Picker cancelled!');
                }
            });
        }

        // Setting the date labels according to their relations between each other
        function setDateLabels(date, isStartDate) {
            var _day = ('00' + date.getDate()).right(2);
            var _month = ('00' + (date.getMonth() + 1)).right(2);
            var _year = date.getFullYear().toString().right(2);

            if (isStartDate) {
                if (date < selectedEndDate) {
                    Pages.currentPage.lblStartDate.text = _month + '.' + _day + '.' + _year;
                    selectedStartDate = date;
                }
                else {
                    alert('"Start Date" should be prior to "End Date"');
                }
            }
            else {
                if (date > selectedStartDate) {
                    Pages.currentPage.lblEndDate.text = _month + '.' + _day + '.' + _year;
                    selectedEndDate = date;
                    setInitialOutOfficeText();
                }
                else {
                    alert('"End Date" should be after "Start Date"');
                }

            }
            calculateDaysBetween();
        }

        // Calculates the day-count between Start and End Dates
        function calculateDaysBetween() {
            var days = tinyUtils.daysBetween(selectedStartDate, selectedEndDate).toFixed(0);
            cntBlueBox.lblSelectedDaysCount.text = days;
            cntBlueBox.lblSelectedDaysCountText.text = (days == 1) ? 'day' : 'days';
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgOutOfOffice;
