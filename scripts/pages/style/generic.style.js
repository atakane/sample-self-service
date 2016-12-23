const colors = require('./colors.js');

module.exports = {
    ".textLeft": {
        textAlignment: SMF.UI.TextAlignment.LEFT,
        multipleLine: false
    },
    ".textRight": {
        textAlignment: SMF.UI.TextAlignment.RIGHT,
        multipleLine: false
    },
    ".textCenter": {
        textAlignment: SMF.UI.TextAlignment.CENTER,
        multipleLine: false
    },
    ".textTop": {
        textAlignment: SMF.UI.TextAlignment.TOP
    },
    ".23pt": {
        font: {
            size: '23pt',
            bold: false
        },
    },
    ".17pt": {
        font: {
            size: '17pt',
            bold: false
        },
    },
    ".16pt": {
        font: {
            size: '16pt',
            bold: false
        },
    },
    ".12pt": {
        font: {
            size: '12pt',
            bold: false
        },
    },
    ".11pt": {
        font: {
            size: '11pt',
            bold: false
        },
    },
    ".7pt": {
        font: {
            size: '7pt',
            bold: false
        },
    },
    ".6pt": {
        font: {
            size: '6pt',
            bold: false
        },
    },
    ".5pt": {
        font: {
            size: '5pt',
            bold: false
        },
    },
    ".4pt": {
        font: {
            size: '4pt',
            bold: false
        },
    },
    ".bold": {
        font: {
            bold: true
        },
    },
    ".allArea": {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    ".Generic": {
        ".imgHome": {
            left: 0,
            image: 'home_back.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '40%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".lblVersion": {
            left: '0',
            top: '97%',
            width: '99%',
            height: '3%',
            fontColor: SMF.UI.Color.BLACK
        },
        ".repeater": {
            left: '0%',
            width: '100%',
            height: '90%',
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
        ".itemTemplate": {
            fillColor: colors.GrayLighter
        },
        ".activeItemTemplate": {
            fillColor: colors.White
        },
        ".imgCircle": {
            image: 'white_circle.png',
            left: '3%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".verticalLine": {
            left: '22%',
            top: '17%',
            height: '71%',
            fillColor: colors.Gray,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".lblTopLine": {
            left: '25%',
            width: '60%',
            height: '40%',
            fontColor: colors.BlueMedium,
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".lblMiddleLine": {
            left: '25%',
            width: '75%',
            fontColor: colors.Gray29,
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".lblBottomLine": {
            top: '63%',
            height: '30%',
            backgroundTransparent: true
        },
        ".imgArrow": {
            image: 'right_arrow.png',
            left: '88%',
            top: '38%',
            width: '10%',
            height: '30%',
            imageFillType: SMF.UI.ImageFillType.NORMAL
        },
        ".horizontalLine": {
            left: 0,
            width: '100%',
            height: 1,
            fillColor: colors.White,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".lblNoData": {
            multipleLine: true,
            fontColor: colors.Gray29,
            borderWidth: 0,
            visible: false
        },
        ".cntLittleBoxes": {
            left: 0,
            width: '100%',
            height: '21.0644%',
            fillColor: SMF.UI.Color.WHITE,
            backgroundTransparent: false,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".cntLittleBoxesRight": {
            left: '48%'
        },
        ".boxTotalDays": {
            left: '3.76%',
            top: '55.87188%',
            width: '13.8933%',
            height: '37.0106%',
            borderWidth: 1,
            borderColor: colors.Gray,
            roundedEdge: 0
        },
        ".lblTotalDays": {
            left: 0,
            width: '100%',
            borderWidth: 0,
            fontColor: colors.Gray
        },
        '.boxUsed': {
            left: '19.41333%',
            top: '55.87188%',
            width: '13.8933%',
            height: '37.0106%',
            borderWidth: 1,
            borderColor: colors.PinkDarker,
            roundedEdge: 0
        },
        ".lblUsedDays": {
            fontColor: colors.PinkDarker
        },
        '.boxRemaining': {
            left: '35.2%',
            top: '55.87188%',
            width: '13.8933%',
            height: '37.0106%',
            borderWidth: 0,
            roundedEdge: 0
        },
        ".lblRemainingDays": {
            fontColor: colors.BlueDark
        },
    }
}


/* 
Application.homeBackgroundImage
Application.positiveColor
Application.negativeColor
*/
