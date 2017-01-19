const colors = require('./colors.js');

module.exports = {
    ".pgNewTimeCard": {
        ".lblTimeCardDate": {
            left: '50%',
            top: 0,
            width: '45.4667%',
            height: '35%',
            fontColor: colors.Gray29
        },
        ".lblDayofWeek": {
            left: '4.5333%',
            top: '13%',
            width: '40%',
            height: '35%',
            fontColor: colors.Gray29
        },
        ".lblDate": {
            left: '70%',
            top: '13%',
            width: '25.4667%',
            height: '30%',
            fontColor: colors.Gray29
        },
        ".repeater": {
            left: '0%',
            top:'30%',
            width: '100%',
            height: '100%',
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
        }
    }
};
