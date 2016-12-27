const colors = require('./colors.js');

module.exports = {
    ".pgNewLeaveRequest": {
        ".horizontalRectangle": {
            left: 0,
            width: '100%',
            height: 1,
            fillColor: colors.GrayLighter,
            borderWidth: 0,
            roundedEdge: 0
        },
        ".imgShadowLine":{
            image:'shadow_line.png',
            left:0,
            width:'100%',
            height:'6',
            imageFillType:SMF.UI.ImageFillType.STRETCH
        },
        ".lblLeaveTypeText": {
            left: '4.5333%', 
            width: '40%',
            fontColor: colors.BlueMedium
        },
        ".lblDown1":{
            left:'29%',
            width:'10%'
        },
        ".lblTimeUnitText": {
            left: '62%', 
            width: '30%',
            fontColor: colors.BlueMedium
        },
        ".lblDown2":{
            left:'90%',
            width:'5%'
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
        ".cntStarts": {
            left: '4.53%',
            height: '12%',
            width: '29%',
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".lblStart": {
            left: 0,
            top: 0,
            width: '100%',
            fontColor: colors.BlueMedium
        },
        ".lblDown3":{
            left:'60%',
            width:'50%'
        },
        ".lblStartDate": {
            left: 0,
            top: '30%',
            width: '100%',
            fontColor: colors.Gray29
        },
        ".lblStartTime": {
            left: 0,
            top: '70%',
            fontColor: colors.Gray29
        },
        ".cntEnds": {
            left: '65%',
            height: '12%',
            width: '30.6%',
            borderWidth: 0,
            backgroundTransparent: true
        },
        ".lblEnd": {
            left: 0,
            top: 0,
            width: '87%',
            fontColor: colors.BlueMedium
        },
        ".lblDown4":{
            width:'97%'
        },
        ".lblEndDate": {
            left: 0,
            top: '30%',
            width: '100%',
            fontColor: colors.Gray29
        },
        ".lblEndTime": {
            left: 0,
            top: '70%',
            width: '100%',
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
    }
};
