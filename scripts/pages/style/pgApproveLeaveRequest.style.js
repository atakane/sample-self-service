const colors = require('./colors.js');

module.exports = {
    ".pgApproveLeaveRequest": {
        ".horizontalRectangle": {
            left: 0,
            width: '100%',
            height: 1,
            fillColor: colors.GrayLighter,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".lblLeaveTypeText": {
            left: '4.5333%',
            width: '40%',
            fontColor: colors.BlueMedium
        },
        ".lblTimeUnitText": {
            left: '60.4667%',
            width: '35%',
            fontColor: colors.BlueMedium
        },
        ".lblLeaveType": {
            left: '4.5333%',
            width: '40%',
            fontColor: colors.Gray29
        },
        ".lblTimeUnit": {
            left: '60.4667%',
            width: '35%',
            fontColor: colors.Gray29
        },
        ".lblStart": {
            left: '4.5333%',
            top: '17%',
            width: '100%',
            fontColor: colors.BlueMedium
        },
        ".lblStartDate": {
            left: '4.5333%',
            width: '37.3333%',
            fontColor: colors.Gray29
        },
        ".lblStartTime": {
            left: '4.5333%',
            top: '29.2%',
            fontColor: colors.Gray29
        }, 
        ".lblEnd": {
            left: '80.4667%',
            width: '15%',
            fontColor: colors.BlueMedium
        }, 
        ".lblEndDate": {
            left: '60.4667%',
            width: '35%',
            fontColor: colors.Gray29
        },
        ".lblEndTime": {
            left: '60.4667%',
            width: '35%',
            fontColor: colors.Gray29
        },
        ".cntBlueBox": {
            left: '40%',
            width: '20%',
            height: '14.9925%',
            borderWidth: 0,
            fillColor: colors.BlueMedium,
            backgroundTransparent: false
        },
        ".btnDelete": {
            // FontAwesome 'delete icon' UTF8 code: 'uf08b'
            text:JSON.parse('""'),
            left: 0,
            top: '90.4048%',
            width: '100%',
            // height: '9.5952%',
            fillColor: colors.RedDark,
            pressedFillColor: colors.RedDarker,
            fontColor: SMF.UI.Color.WHITE,
            pressedFontColor: SMF.UI.Color.WHITESMOKE,
            roundedEdge: 0,
            textAlignment: SMF.UI.TextAlignment.CENTER,
        },
        ".btnReject": {
            // FontAwesome 'close icon' UTF8 code: uf00d
            text:JSON.parse('""'),
            left: 0,
            top: '90.4048%',
            width: '50%',
            // height: '9.5952%',
            fillColor: colors.RedDark,
            pressedFillColor: colors.RedDarker,
            fontColor: SMF.UI.Color.WHITE,
            pressedFontColor: SMF.UI.Color.WHITESMOKE,
            roundedEdge: 0,
            textAlignment: SMF.UI.TextAlignment.CENTER,
        },
        ".btnSave": {
            // FontAwesome 'check icon' UTF8 code: uf00c
            text:JSON.parse('""'),
            left: '50%',
            top: '90.4048%',
            width: '50%',
            // height: '9.5952%',
            fillColor: colors.Green,
            pressedFillColor: colors.GreenDarker,
            fontColor: SMF.UI.Color.WHITE,
            pressedFontColor: SMF.UI.Color.WHITESMOKE,
            roundedEdge: 0,
            textAlignment: SMF.UI.TextAlignment.CENTER,
        }
    }
};
