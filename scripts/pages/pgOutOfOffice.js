/* globals smfOracle oProfile templateOutOfOfficeText*/

/*
TODO:
- use Router options to pass oRequest
*/
const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const SMFcomponents = require('./component/SMFcomponents.js');
const SMFSliderDrawer = require('./component/SMFSliderDrawer.js');
const Dialog = require('smf-dialog');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

const tinyUtils = require('./component/tinyUtils.js');
const getUnit = require('./component/getUnit.js');

// Router
const router = require('js-base/core/router');

const pgOutOfOffice = extend(Page)(
    //Page Constructor
    function(_super) {
        _super(this, { 
            name: 'pgOutOfOffice',
            onKeyPress: pgOutOfOffice_onKeyPress,
            onShow: pgOutOfOffice_onShow
        });
    
        headerBarOptions.setTitle('Out of Office');
        const headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);
        
        // Creating Slider Drawer
        SMFSliderDrawer.createSliderDrawer(this, 'sdSelfService');
    
        var selectedStartDate;
        var selectedEndDate;
        
        //Lines
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'29.5352%%',Android:'31.5352%'}), '100%', 1, '#e7e7e7');
        SMFcomponents.createRectangle(this, 0, getUnit({iOS:'44.5277%%',Android:'46.5277%'}), '100%', 1, '#e7e7e7');
        SMFcomponents.createRectangle(this, '49.90%', getUnit({iOS:'29.5352%%',Android:'31.5352%'}), 1, '14.9925%', '#e7e7e7');
    
        //Profile
        SMFcomponents.createImage(this, 'imgAvatar', '', '5.3333%', getUnit({iOS:'11.5442%',Android:'14.5%'}), '14.4%', '8.0959%', SMF.UI.ImageFillType.ASPECTFIT);
        SMFcomponents.createLabel(this, 'lblFullName', '', '4.5333%', getUnit({iOS:'20%',Android:'22%'}), '53.3333%', '4.7376%', SMF.UI.TextAlignment.LEFT, false, '12pt', false, '#27bc66');
        SMFcomponents.createLabel(this, 'lblTeamRole', '', '4.5333%', getUnit({iOS:'24.7376%',Android:'26.7376%'}), '53.3333%', '3.4482%', SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#444444');
    
        //Out of Office switch
        var swtOutOfOffice = new SMF.UI.SwitchButton({
            name: 'swtOutOfOffice',
            left: getUnit('76.5333%'),
            top: getUnit({iOS:'13.6431%',Android:'15.6431%'}),
            checked: false,
            onTintColor: '#248afd',
            tintColor: '#248afd',
            onChange: function(e) {
                Pages.currentPage.lblOOOStatusText.text = this.checked == true ? 'Mode On' : 'Mode Off';
                Pages.currentPage.lblOOOStatusText.fontColor = this.checked == true ? '#27bc66' : '#37404a'
                Pages.currentPage.cntOverlay.visible = !this.checked;
            }
        });
        this.add(swtOutOfOffice);
    
        SMFcomponents.createLabel(this, 'lblOOOStatusTitle', 'Out Of Office', '67.2%', getUnit({iOS:'21.2893%',Android:'23.2893%'}), '32.8%', '2.9985%', SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#a0a0a0');
        SMFcomponents.createLabel(this, 'lblOOOStatusText', 'Mode Off', '67.2%', getUnit({iOS:'24.2878%',Android:'26.2878%'}), '32.8%', '2.9985%', SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#37404a');
    
        // Start Date
        SMFcomponents.createLabel(this, 'lblStart', 'STARTS', '4.5333%', getUnit({iOS:'31.1844%',Android:'33.1844%'}), '17%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(this, 'lblDown1', JSON.parse('""'), '21.5%', getUnit({iOS:'31.1844%',Android:'33.1844%'}), '10%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(this, 'lblStartDate', '-', '4.5333%', getUnit({iOS:'35.9820%',Android:'37.9820%'}), '37.3333%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.LEFT, false, '12pt', false, '#4a4a4a');
    
        // Adding a container layer on top of the date to be touchable as a single object
        SMFcomponents.createContainer(this, 'cntSelectStartDate', '4.5333%', getUnit({iOS:'35.9820%',Android:'37.9820%'}), '37.3333%', '6.5967%', SMF.UI.Color.WHITE, true, function() {
            showDateTimePicker(true);
        });
    
        // End Date
        SMFcomponents.createLabel(this, 'lblEnd', 'ENDS', '75.4667%', getUnit({iOS:'31.1844%',Android:'33.1844%'}), '15%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
        SMFcomponents.createAwesomeLabel(this, 'lblDown2', JSON.parse('""'), '90%', getUnit({iOS:'31.1844%',Android:'33.1844%'}), '5%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '7pt', false, '#248afd');
    
        SMFcomponents.createLabel(this, 'lblEndDate', '-', '60.4667%', getUnit({iOS:'35.9820%',Android:'37.9820%'}), '35%', getUnit({iOS:'2.9985%', Android:'5%'}), SMF.UI.TextAlignment.RIGHT, false, '12pt', false, '#4a4a4a');
    
        // Adding a container layer on top of the date to be touchable as a single object
        SMFcomponents.createContainer(this, 'cntSelectEndDate', '67%', getUnit({iOS:'35.9820%',Android:'37.9820%'}), '37.3333%', '6.5967%', SMF.UI.Color.WHITE, true, function() {
            showDateTimePicker(false);
        });
    
        //Day Count Box
        var cntBlueBox = new SMF.UI.Container({
            name: 'cntBlueBox',
            left: '40%',
            width: '20%',
            top: getUnit({iOS:'29.5352%%',Android:'31.5352%%'}),
            height: getUnit('14.9925%'),
            borderWidth: 0,
            fillColor: '#248afd',
            backgroundTransparent: false
        });
        
        this.add(cntBlueBox);
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCount', '-', '0', getUnit({iOS:'28%',Android:'20%'}), '100%', getUnit({iOS:'30%', Android:'40%'}), SMF.UI.TextAlignment.CENTER, false, '16pt', true, '#ffffff');
        SMFcomponents.createLabel(cntBlueBox, 'lblSelectedDaysCountText', 'day', '0', getUnit({iOS:'60%',Android:'60%'}), '100%', getUnit({iOS:'20%', Android:'20%'}), SMF.UI.TextAlignment.CENTER, false, '7pt', false, '#ffffff');
    
        SMFcomponents.createLabel(this, 'lblOutOfOfficeMessage', 'OUT OF OFFICE MESSAGE', '4.4%', getUnit({iOS:'47.1514%',Android:'49.1514%'}), '55%', getUnit({iOS:'3%', Android:'6%'}), SMF.UI.TextAlignment.LEFT, false, '7pt', false, '#248afd');
    
        // Textbox for Out of Office Message
        var txtOutOfOfficeMessage = new SMF.UI.TextBox({
            name: 'txtOutOfOfficeMessage',
            text: '',
            left: getUnit('4.5333%'),
            top: getUnit({iOS:'51.57421%',Android:'56.1514%'}),
            width: getUnit('90.9334%'),
            height: getUnit('35.982%'),
            multipleLine: true,
            textAlignment: SMF.UI.TextAlignment.TOP,
            borderWidth: 0,
            roundedEdge: 0,
            font: new SMF.UI.Font({
                size: '7pt'
            }),
            fontColor: '#37404a'
        })
        this.add(txtOutOfOfficeMessage);
    
        // Custom icon font
        var myFont = new SMF.UI.Font({
            name: 'FontAwesome',
            size: '12pt',
            bold: false
        });
    
        // Save Button
        // FontAwesome 'check icon' UTF8 code:uf00c
       SMFcomponents.createTextButtonWithCustomFont(this,
            'btnSave',
            JSON.parse('""'),
            0, '90.4048%', '100%', '9.5952%',
            SMF.UI.TextAlignment.CENTER,
            myFont,
            '#7ed321', '#5b9918',
            SMF.UI.Color.WHITE, SMF.UI.Color.WHITESMOKE,
            function(e) {
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
    
            });
    
    
        SMFcomponents.createContainer(this, 'cntOverlay', 0, getUnit({iOS:'29.5352%',Android:'31.5352%'}), '100%', getUnit({iOS:'60.8696%', Android:'58.8696%'}), '#e7e7e7', false, function() {}, 0.8);
    
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
            //We are going w/ dark mode. Our navbar is white.
            SMF.UI.statusBar.style = SMF.UI.StatusBarStyle.DEFAULT;
    
            // Hiding 'wait' dialog
            Dialog.removeWait();
    
            // Adding header bar (actionbar for Android, navigationbar for iOS)
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
                    //alert('Picker cancelled!');
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
    //Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function() {};
        _proto.stateChangedHandler = function(state) {};
    });

module.exports = pgOutOfOffice;
