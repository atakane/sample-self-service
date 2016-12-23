const colors = require('./colors.js');

module.exports = {
    ".pgOutOfOffice": {
        ".horizontalRectangle": {
            left: 0,
            width: '100%',
            height: 1,
            fillColor: colors.GrayLighter,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".imgAvatar": {
            image: '',
            left: '5.3333%',
            top: 0,
            width: '14.4%',
            height: '8.0959%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".lblFullName": {
            left: '4.5333%',
            top: 0,
            width: '53.3333%',
            height: '4.7376%',
            fontColor: colors.GreenDark
        },
        ".lblTeamRole": {
            left: '4.5333%',
            top: 0,
            width: '53.3333%',
            height: '3.4482%',
            fontColor: colors.GrayDark
        },
        ".swtOutOfOffice": {
            left: '76.5333%',
            checked: false,
            onTintColor: colors.BlueMedium,
            tintColor: colors.BlueMedium
        },
        ".lblOOOStatusTitle": {
            left: '67.2%',
            top: 0,
            width: '32.8%',
            height: '2.9985%',
            fontColor: colors.GrayLight
        },
        ".lblOOOStatusText": {
            left: '67.2%',
            top: 0,
            width: '32.8%',
            height: '2.9985%',
            fontColor: colors.BlueDark
        },
        ".lblStart": {
            left: '4.5333%',
            width: '17%',
            fontColor: colors.BlueMedium
        },
        ".lblStartDate": {
            left: '4.5333%',
            width: '37.3333%',
            fontColor: colors.Gray29
        },
        ".cntSelectStartDate": {
            left: '4.5333%',
            width: '37.3333%',
            height: '6.5967%',
            backgroundTransparent: true,
            touchEnabled: true,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".lblEnd": {
            left: '75.4667%',
            width: '17%',
            fontColor: colors.BlueMedium
        },
        ".lblEndDate": {
            left: '60.4667%',
            width: '37.3333%',
            fontColor: colors.Gray29
        },
        ".cntSelectEndDate": {
            left: '67%',
            width: '37.3333%',
            height: '6.5967%',
            backgroundTransparent: true,
            touchEnabled: true,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".cntBlueBox": {
            left: '40%',
            width: '20%',
            height: '14.9925%',
            borderWidth: 0,
            fillColor: colors.BlueMedium,
            backgroundTransparent: false
        },
        ".lblSelectedDaysCount": {
            left: 0,
            width: '100%',
            fontColor: colors.White
        },
        ".lblSelectedDaysCountText": {
            left: 0,
            top: '60%',
            width: '100%',
            height: '20%',
            fontColor: colors.White
        },
        ".lblOutOfOfficeMessage": {
            left: '4.4%',
            width: '55%',
            fontColor: colors.BlueMedium
        },
        ".txtOutOfOfficeMessage": {
            left: '4.5333%',
            width: '90.9334%',
            height: '35.982%',
            multipleLine: true,
            textAlignment: SMF.UI.TextAlignment.TOP,
            borderWidth: 0,
            roundedEdge: 0,
            fontColor: colors.BlueDark
        },
        ".btnSave": {
            left: 0,
            top: '90.4048%',
            width: '100%',
            height: '9.5952%',
            fillColor: colors.Green,
            pressedFillColor: colors.GreenDarker,
            fontColor: SMF.UI.Color.WHITE,
            pressedFontColor: SMF.UI.Color.WHITESMOKE,
            roundedEdge: 0,
            textAlignment: SMF.UI.TextAlignment.CENTER,
        },
        ".recOverlay": {
            left: 0,
            width: '100%',
            fillColor: colors.GrayLighter,
            backgroundTransparent: false,
            alpha: 0.8,
            borderWidth: 0,
            roundedEdge: 0
        }
    }
};
