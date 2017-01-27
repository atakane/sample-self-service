/* globals oProfile oTimecardList fontAwesome dayWorkHoursStart dayWorkHoursEnd */

const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");

const Dialog = require('smf-dialog');
const tinyUtils = require('js-tinyutils/tinyUtils.js');
const merge = require('deepmerge');
const colors = require('./style/colors.js');

// Actionbar
const headerBarOptions = require("./headerbar/generic.headerbar.back.js");
const HeaderBarWrapper = require("js-base/component/header-bar.js");

// styler
const componentStyler = require("js-base/core/styler").componentStyler();

// Router
const router = require('js-base/core/router');

const pgTimecardDetailDayAddEdit = extend(Page)(
    // Page Constructor
    function(_super) {
        _super(this, {
                name: 'pgTimecardDetailDayAddEdit',
                onKeyPress: pgTimecardDetailDayAddEdit_onKeyPress,
                onShow: pgTimecardDetailDayAddEdit_onShow,
                fillColor: colors.GrayLighter
            },
            "", {
                targetTimecardID: 0,
                oRequest: [],
                targetDate: null
            });
        var self = this;
        var arrayRequests = [];

        var headerBarWrapper = HeaderBarWrapper(this._view, headerBarOptions.options);

        // Creating a repeatbox to show our requests
        // styling the repeater
        // We used a different way here beacause of the by-design nature of repeater component
        var rptDefault = {
            name: 'rptTimecardDetailDays',
            onSelectedItem: function(e) {
                // router.go('pgTimecardDetailDayAddEdit', arrayRequests[e.rowIndex]);
            },
            enableScroll: false,
            // touchEnabled: false
        };
        var rptParams = {};
        componentStyler(".Generic.repeater .pgNewTimeCard.repeater .Generic.itemTemplate5items")(rptParams);
        rptParams = merge.all([rptParams, rptDefault]);

        var rptTimecardDetailDays = new SMF.UI.RepeatBox(rptParams);

        // styling repeater item templates
        var paramItemTemplate = {};
        componentStyler(".Generic.itemTemplate5items")(paramItemTemplate);

        rptTimecardDetailDays.itemTemplate.fillColor = paramItemTemplate.fillColor;
        rptTimecardDetailDays.itemTemplate.height = paramItemTemplate.height;

        var paramActiveItemTemplate = {};
        componentStyler(".Generic.activeItemTemplate")(paramActiveItemTemplate);

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

        var lblStartEndDate = new SMF.UI.Label({
            name: 'lblStartEndDate',
            text: ''
        });
        componentStyler(".textRight .10pt .pgNewTimeCard.lblStartEndDate")(lblStartEndDate);
        this.add(lblStartEndDate);

        var lblWeekTotalHours = new SMF.UI.Label({
            name: 'lblWeekTotalHours',
            text: ''
        });
        componentStyler(".textRight .16pt .pgNewTimeCard.lblWeekTotalHours")(lblWeekTotalHours);
        this.add(lblWeekTotalHours);


        var myRectangle1 = new SMF.UI.Rectangle({});
        componentStyler(".pgApproveLeaveRequest.horizontalRectangle .Generic.horizontalLine .pgApproveLeaveRequest.myRectangle1Top")(myRectangle1);
        this.add(myRectangle1);
        rptTimecardDetailDays.top = myRectangle1.top + 1;

        // item 
        rptTimecardDetailDays.activeItemTemplate.fillColor = paramActiveItemTemplate.fillColor;
        rptTimecardDetailDays.activeItemTemplate.height = paramActiveItemTemplate.height;

        var lblDayofWeek = new SMF.UI.Label({
            name: 'lblDayofWeek',
            text: '-',
        });
        componentStyler(".textLeft .12pt .pgNewTimeCard.lblDayofWeek")(lblDayofWeek);

        var recHorizontalLine = new SMF.UI.Rectangle({
            name: 'recHorizontalLine'
        });
        componentStyler(".Generic.horizontalLine5items")(recHorizontalLine);

        rptTimecardDetailDays.itemTemplate.add(lblDayofWeek);

        // we'll not use styler for "days", it is a little bit of design issue
        var hourWidth = 14;
        var hourGap = 1;
        var lastPos = 8;

        var unitType = (Device.deviceOS === 'Android') ? 'dp' : 'pt';


        var touchedHours = [];

        for (var i = 0; i < 24; i++) {
            var cntHour = new SMF.UI.Rectangle({
                name: 'cntHour' + i,
                left: lastPos + unitType,
                top: '48%',
                width: hourWidth + unitType,
                height: '35%',
                borderWidth: 1,
                fillColor: SMF.UI.Color.WHITE,
                backgroundTransparent: false,
                roundedEdge: 0,
                borderColor: colors.GrayLight,
                hourSelected: false,
                onTouchEnded: function(e) {
                    touchHour(this);
                }
            });
            var lblHour = new SMF.UI.Label({
                name: 'lblHour' + i,
                left: lastPos + unitType,
                top: '87%',
                width: hourWidth + unitType,
                height: '10%',
                text: i
            });
            componentStyler(".textLeft .5pt")(lblHour);


            rptTimecardDetailDays.itemTemplate.add(cntHour);
            rptTimecardDetailDays.itemTemplate.add(lblHour);
            lastPos = lastPos + hourGap + hourWidth;
        }

        function touchHour(parent) {
            var selectedHour = parseInt(parent.name.replace('cntHour', ''));
            var removeHour;

            var isRemoved = false;

            for (var i = 0; i < touchedHours.length; i++) {
                if (touchedHours[i] === selectedHour) {
                    parent.fillColor = SMF.UI.Color.WHITE;
                    touchedHours = touchedHours.remove(i)
                    isRemoved = true;
                    // break;
                }
            }

            if (!isRemoved) {
                parent.hourSelected = true;
                touchedHours.push(selectedHour);
                txtWorkLog.text = JSON.stringify(touchedHours);
                parent.fillColor = colors.BlueMedium;
            }

            txtWorkLog.text = JSON.stringify(touchedHours);

            // //sorting
            // touchedHours = touchedHours.sort(function(a, b) {
            //     return parseFloat(a) - parseFloat(b);
            // });

        }
        // https://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
        Array.prototype.remove = function() {
  
            var what, a = arguments,
                L = a.length,
                ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            console.log(JSON.stringify(this));
            return this;
        };

        // rptTimecardDetailDays.itemTemplate.add(recHorizontalLine);

        // rptTimecardDetailDays.pullDownItem.height = '8%';

        // onRowRender will work for each item bound
        // row.controls[0] -> Day of week
        // row.controls[1] -> Hour 0 box
        // row.controls[2] -> Hour 0 text
        // row.controls[3] -> Hour 1 box
        // row.controls[4] -> Hour 1 text
        // row.controls[(i*2)+1] -> Hour i box

        rptTimecardDetailDays.onRowRender = function(e) {
            // {
            //  "date": "1/3/17",
            //  "hours": [],
            //  "location" : ""
            // }
            var myDaysArray = arrayRequests[e.rowIndex];
            var tmpDate = new Date(myDaysArray.date);

            this.controls[0].text = tmpDate.format('dddd');

            for (var i = 0; i < 24; i++) {
                this.controls[(i * 2) + 1].fillColor = SMF.UI.Color.WHITE;

                if (myDaysArray.hours.indexOf(i) !== -1) {
                    var fillColor = ((i < dayWorkHoursStart) || (i > dayWorkHoursEnd - 1)) ? colors.GrayLight : colors.GrayLighter;
                    this.controls[(i * 2) + 1].fillColor = fillColor;
                }
            }
        };



        // adding repeatbox to the page
        this.add(rptTimecardDetailDays);

        // adding label for no-data
        this.lblNoData = new SMF.UI.Label({
            name: 'lblNoData',
            text: lang['pgMyLeaveRequests.lblNoData.text']
        });
        componentStyler(".allArea .textCenter .7pt .Generic.lblNoData")(this.lblNoData);
        this.add(this.lblNoData);

        // WorkLog area
        // work logs container
        var cntWorkLog = new SMF.UI.Container({
            name: 'cntWorkLog'
        })
        componentStyler(".pgNewTimeCard.cntWorkLog")(cntWorkLog);

        this.add(cntWorkLog);

        var lblLocation = new SMF.UI.Label({
            name: 'lblWorkLog',
            text: 'Location'
        });
        componentStyler(".textLeft .bold .10pt .pgNewTimeCard.lblDayofWeek .pgNewTimeCard.lblWorkLog")(lblLocation);
        cntWorkLog.add(lblLocation);

        var txtLocation = new SMF.UI.TextBox({
            name: 'txtLocation',
            placeHolder: 'Work location',
            text: ''
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage .pgNewTimeCard.txtLocation")(txtLocation);
        cntWorkLog.add(txtLocation);
        //

        var lblCustomer = new SMF.UI.Label({
            name: 'lblCustomer',
            text: 'Customer'
        });
        componentStyler(".textLeft .bold .10pt .pgNewTimeCard.lblDayofWeek .pgNewTimeCard.lblCustomer")(lblCustomer);
        cntWorkLog.add(lblCustomer);

        var txtCustomer = new SMF.UI.TextBox({
            name: 'txtCustomer',
            placeHolder: 'Who was the customer?',
            text: ''
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage .pgNewTimeCard.txtLocation .pgNewTimeCard.txtCustomer")(txtCustomer);
        cntWorkLog.add(txtCustomer);

        var lblWorklog = new SMF.UI.Label({
            name: 'lblWorklog',
            text: 'Work log'
        });
        componentStyler(".textLeft .bold .10pt .pgNewTimeCard.lblDayofWeek .pgNewTimeCard.lblWorklog")(lblWorklog);
        cntWorkLog.add(lblWorklog);

        var txtWorkLog = new SMF.UI.TextBox({
            name: 'txtWorkLog',
            placeHolder: 'What were you working on?',
            text: ''
        });
        componentStyler(".7pt .pgOutOfOffice.txtOutOfOfficeMessage .pgNewTimeCard.txtLocation .pgNewTimeCard.txtCustomer .pgNewTimeCard.txtWorkLog")(txtWorkLog);
        cntWorkLog.add(txtWorkLog);

        // Save button
        // FontAwesome 'check icon' UTF8 code: uf00c
        // TODO: height will be moved to style file after styler-fix
        var btnSave = new SMF.UI.TextButton({
            name: 'btnSave',
            font: fontAwesome,
            height: '9.5952%',
            onPressed: function(e) {
                alert({
                    title: 'Warning!',
                    message: 'Do you want to add this work log?',
                    firstButtonText: 'Add',
                    secondButtonText: 'Cancel',
                    onFirstButtonPressed: function() {

                        // finding related item and setting status
                        for (var i = 0; i < oTimecardList.length; i++) {
                            if (oTimecardList[i].ID === self.getState().targetTimecardID) {
                                oTimecardList[i].Status = 'pending';
                               
                               /*
                                {
                                    "date": "1/6/17",
                                    "hours": [10, 11, 13, 14, 15, 16],
                                    "logs": [{
                                        "hours": [10, 11, 13, 14, 15, 16],
                                        "location": txtLocation.text,
                                        "log": txtWorkLog.text
                                    }]
                                }
                               */
                            }
                        }

                        alert({
                            title: 'Work log added',
                            message: 'Your work log added to related Timecard. Now it is pending for manager approval.',
                            firstButtonText: 'OK',
                            onFirstButtonPressed: function() {
                                router.back();
                            }
                        });

                    },
                    onSecondButtonPressed: function() {}
                });
            }
        });
        componentStyler(".12pt .pgOutOfOffice.btnSave")(btnSave);
        this.add(btnSave);


        /**
         * Creates action(s) that are run when the user press the key of the devices.
         * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
         * @this Pages.pgLogin
         */
        function pgTimecardDetailDayAddEdit_onKeyPress(e) {
            if (e.keyCode === 4) {
                router.back();
            }
        }

        /**
         * Creates action(s) that are run when the page is appeared
         * @param {EventArguments} e Returns some attributes about the specified functions
         * @this Pages.pgLogin
         */
        function pgTimecardDetailDayAddEdit_onShow() {
            // Hiding 'wait' dialog
            Dialog.removeWait();

            // Adding header bar (actionbar for Android, navigationbar for iOS)
            headerBarOptions.setTitle('New Work Log');
            headerBarWrapper.reload();

            headerBarOptions.eventCallback(function(e) {
                if (e.type == "back") {
                    router.back();
                }
            });

            // Oracle MCS Analytics logging 
            smfOracle.logAndFlushAnalytics('pgTimecardDetailDayAddEdit_onShow');
            tinyUtils.fixOverlayBug();

            ///
            var oReq = new XMLHttpRequest();
            oReq.onload = function(e) {
                /*
                {
                    "ip" : "8.8.8.8"
                    "city" : "Mountain View"
                    "region" : "California"
                    "country" : "US"
                    "postal" : "94040"
                    "latitude" : 37.3845
                    "longitude" : -122.0881
                    "timezone" : "America/Los_Angeles"
                    }
                */

                if (this.responseText) {
                    var parsedResponse = JSON.parse(this.responseText);
                    txtLocation.text = parsedResponse.city;
                }
            };
            oReq.open("GET", "https://ipapi.co/json/", true);
            oReq.send();
        }

        // Parsing storage objects 
        this.displayData = function(oRequest, targetDate) {
            //resetting repeatboxes
            rptTimecardDetailDays.dataSource = [];
            rptTimecardDetailDays.refresh();

            // binding objects to an array
            arrayRequests = [];

            for (var i = 0; i < oRequest.days.length; i++) {
                if (oRequest.days[i].date === self.getState().targetDate) {
                    arrayRequests.push(oRequest.days[i]);
                }
            }

            // Updating Day details
            var cardDate = new Date(targetDate);
            lblStartEndDate.text = cardDate.format('MMM. d, yyyy');

            lblWeekTotalHours.text = (arrayRequests[0].hours.length > 0) ? arrayRequests[0].hours.length + ' hours' : '';

            imgAvatar.image = oRequest.Avatar;
            lblFullName.text = oRequest.FullName;
            lblTeamRole.text = oRequest.Role + ' / ' + oRequest.Team;

            // Preparing 1st repeater will show only selected day
            rptTimecardDetailDays.closePullItems();
            rptTimecardDetailDays.dataSource = arrayRequests;
            rptTimecardDetailDays.refresh();

            Dialog.removeWait();

            this.lblNoData.visible = (oRequest.length == 0);
            rptTimecardDetailDays.visible = !(oRequest.length == 0);
        }
    },
    // Page Public Methods
    function(_proto) {
        // for injection of routing data
        _proto.setRouteParams = function(params) {
            // inherited from UIComponent
            if (params) {
                this._changeState({
                    targetTimecardID: params.id,
                    oRequest: params.request,
                    targetDate: params.date
                });
            }
        };
        _proto.stateChangedHandler = function(state) {
            this.displayData(state.oRequest, state.targetDate);
        };
    });

module.exports = pgTimecardDetailDayAddEdit;
