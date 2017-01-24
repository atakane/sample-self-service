const colors = require('./colors.js');

module.exports = {
    ".pgNewTimeCard": {
        ".lblStartEndDate": {
            left: '50%',
            width: '45.4667%',
            height: '4.7376%',
            fontColor: colors.GrayDark
        },
        ".lblWeekTotalHours": {
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
            left: '70%',
            top: '10%',
            width: '25.4667%',
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
            allowDeletingItem: false,
            fillColor: SMF.UI.Color.RED
        }
    }
};
