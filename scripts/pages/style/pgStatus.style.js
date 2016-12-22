const colors = require('./colors.js');

module.exports = {
    ".pgStatus": {
        ".imgHome": {
            left: 0,
            image: 'home_back.png',
            left: 0,
            top: 0,
            width: '100%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".cntProgressBar": {
            left: 0,
            width: '100%',
            top: '41.82908%',
            height: '8.2458%',
            borderWidth: 0
        },
        ".imgProgressBackground": {
            image: 'slider_stripe.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".recProgress": {
            left: 0,
            top: 0,
            width: '0',
            height: '100%',
            fillColor: colors.PinkDark,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".imgAvatar": {
            left: '39.4666%',
            top: '14.2428%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".lblFullName": {
            left: 0,
            width: '100%',
            text: '',
            fontColor: SMF.UI.Color.WHITE
        },
        ".lblTeamRole": {
            left: 0,
            top: '33.4332%',
            width: '100%',
            height: '2.9985%',
            text: '',
            fontColor: SMF.UI.Color.WHITE
        },
        ".boxDaysText1": {
            left: 0,
            top: 0,
            width: '100%',
            height: '73%',
            text: ''
        },
        ".boxDaysText2": {
            left: 0,
            top: 73,
            width: '100%',
            height: '20%'
        },
        ".boxTotalDays": {
            left: '4%',
            top: '56.6716%',
            width: '28%',
            height: '15.5922%',
            borderWidth: 1,
            borderColor: colors.Gray,
            roundedEdge: 0
        },
        ".lblTotalDays": {
            fontColor: colors.Gray
        },
        ".boxUsed": {
            left: '36%',
            top: '56.6716%',
            width: '28%',
            height: '15.5922%',
            borderWidth: 1,
            borderColor: colors.PinkDarker,
            roundedEdge: 0
        },
        ".lblUsedDays": {
            fontColor: colors.PinkDarker
        },
        ".boxRemaining": {
            left: '68%',
            top: '56.6716%',
            width: '28%',
            height: '15.5922%',
            borderWidth: 0,
            roundedEdge: 0
        },
        ".imgRemaining": {
            image: 'square_stripe.png',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".lblRemainingDays": {
            fontColor: colors.BlueDark
        },
        ".cntOutOfOfficeBar": {
            left: 0,
            width: '100%',
            top: '75.1874%',
            height: '9.5952%',
            borderWidth: 0,
            fillColor: colors.GrayLighter,
            backgroundTransparent: false,
            ".lblOOOStatusTitle": {
                left: '4.53333%',
                top: '21.875%',
                width: '60%',
                height: '29%',
                fontColor: colors.PinkDarker
            },
            ".lblOOOStatusTitle2": {
                left: '4.53333%',
                top: '53.9062%',
                width: '27%',
                height: '29%',
                fontColor: colors.GrayLight
            },
            ".lblOOOStatusText": {
                left: '31%',
                top: '53.9062%',
                width: '30%',
                height: '29%',
                fontColor: colors.BlueDark
            }
        },
        ".imgOutOfOfficeShadowLine": {
            image: 'shadow_line.png',
            left: '0',
            top: '74.8875%',
            width: '100%',
            height: 6,
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".imgDetail": {
            image: 'right_arrow.png',
            left: '90.66666%',
            top: '40.625%',
            width: 12,
            height: 20,
            imageFillType: SMF.UI.ImageFillType.NORMAL
        },
        ".lblNewRequestText": {
            left: '4.53333%',
            top: '88.5%',
            width: '65%',
            height: '10%',
            multipleLine: true,
            fontColor: colors.GrayLight
        },
        ".lblNewRequestTextDate": {
            width: '30%',
            height: '10%',
            fontColor: colors.BlueDark
        },
        ".imgAdd": {
            image: 'btn_plus.png',
            top: '88.9805%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT,
        }
    }
};
