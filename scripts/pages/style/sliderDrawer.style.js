const colors = require('./colors.js');

module.exports = {
    ".sliderDrawer": {
        ".self": {
            width: '89.6%',
            height: "100%",
            horizontalGap: 0,
            verticalGap: 0,
            left: 0,
            top: 0,
            position: 'left',
        },
        ".cntTop": {
            left: 0,
            width: '100%',
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".cntGeneral": {
            left: 0,
            width: '100%',
            top: 0,
            height: '100%',
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".imgSliderProfileBackground": {
            image: 'slider_rectangle.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".imgSliderAvatar": {
            image: '',
            left: '37.797%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".lblSliderFullName": {
            left: 0,
            top: 0,
            width: '100%',
            fontColor: colors.BlueMedium
        },
        ".btnMenuTemplate": {
            left: '4.9333%',
            width: '55%',
            height: '6.4057%',
            fillColor: SMF.UI.Color.WHITE,
            pressedFillColor: SMF.UI.Color.WHITE,
            fontColor: colors.BlueMedium,
            pressedFontColor: colors.BlueNavy,
            roundedEdge: 0
        },
        ".btnSubMenuTemplate": {
            left: '18.2666%',
            width: '55%',
            height: '6.4057%',
            fillColor: SMF.UI.Color.WHITE,
            pressedFillColor: SMF.UI.Color.WHITE,
            fontColor: colors.GrayDark,
            pressedFontColor: colors.GrayLight,
            roundedEdge: 0
        },
        ".underlineTemplate": {
            left: '4.4940%',
            width: '95.506%',
            height: 1,
            borderWidth: 0,
            roundedEdge: 0,
            fillColor: colors.GrayLighter
        },
        ".lblLeaveManagement": {
            left: '4.9333%',
            top: '37.5562%',
            width: '55%',
            fontColor: colors.BlueMedium
        },
        ".imgSliderMenuStatus": {
            image: 'icon_status.png',
            left: '5.4666%',
            // top: '44.4527%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
        ".imgSliderMenuRequest": {
            image: 'icon_request.png',
            left: '5.8666%',
            // top: '51.4992%',
            imageFillType: SMF.UI.ImageFillType.ASPECTFIT
        },
       
        ".recUnderlineLogout": {
            top: '90%'
        },
        ".btnLogout": {
            top: '93%',
            fontColor: colors.Pink,
            pressedFontColor: colors.PinkDark
        },
    }
};
