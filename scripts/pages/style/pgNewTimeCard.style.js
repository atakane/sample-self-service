const colors = require('./colors.js');

module.exports = {
    ".pgNewTimeCard": {
        ".lblStartEndDate": {
            left: '40%',
            width: '55.4667%',
            height: '4.7376%',
            fontColor: colors.GrayDark
        },
        ".lblWeekTotalHours": {
            left: '50%',
            width: '45.4667%',
            height: '4.7376%',
            fontColor: colors.BlueMedium
        },
        ".lblStatus": {
            left: '50%',
            width: '45.4667%',
            height: '4.7376%',
            fontColor: colors.BlueMedium
        },
        ".lblDayofWeek": {
            left: '4.5333%',
            top: '10%',
            width: '40%',
            height: '40%',
            fontColor: colors.GrayDark,
            textAlignment: SMF.UI.TextAlignment.TOP
        },
        ".lblDate": {
            left: '60%',
            top: '10%',
            width: '35.4667%',
            height: '15%',
            fontColor: colors.GrayDark
        },
        ".lblDayTotalHours": {
            left: '70%',
            top: '25%',
            width: '25.4667%',
            height: '15%',
            fontColor: colors.BlueMedium
        },
        ".repeater": {
            left: '0%',
            top: '30%',
            width: '100%',
            height: '71%',
            borderWidth: 0,
            showScrollbar: true,
            autoSize: false,
            touchEnabled: true,
            enableScroll: true,
            backgroundTransparent: false,
            enablePullUpToRefresh: false,
            enablePullDownToRefresh: false,
            useActiveItem: false,
            allowDeletingItem: false
        },
        ".cntWorkLog": {
            left: '0%',
            width: '100%'
        },
        ".rptWorkLogItem": {
            fillColor: colors.GrayLighter,
            height: '50%'
        },
        ".rptWorkLogItemHorizontalLine": {
            top: '99%',
            height: 1
        },
        ".lblWorkLogTotalHour": {
            left: '4.5333%',
            top: '4.5333%',
            width: '40%',
            height: '20%',
            fontColor: colors.BlueMedium,
            textAlignment: SMF.UI.TextAlignment.TOP
        },
        ".lblWorkLogLocation": {
            left: '4.5333%',
            top: '23%',
            width: '80%',
            height: '10%',
            fontColor: colors.GrayDark
        },
        ".txtWorkLog": {
            top: '30%',
            height: '66%'
        },
        ".lblWorkLogStartEndHours": {
            left: '50%',
            top: '4.5333%',
            width: '45.4667%',
            height: '10%',
            fontColor: colors.GrayDark
        },
        ".txtLocation": {
            borderWidth: 1,
            textAlignment: SMF.UI.TextAlignment.LEFT
        },
        ".txtWorkLog": {
            multipleLine: true,
            textAlignment: SMF.UI.TextAlignment.TOP
        }
    }
};
