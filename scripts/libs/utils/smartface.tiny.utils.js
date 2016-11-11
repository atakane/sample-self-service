/* globals */
(function() {
    String.prototype.left = function(n) {
        return this.substring(0, n);
    }
})();

function getUnit(value) {
    if (typeof value === "object")
        return getUnit(value[Device.deviceOS]);
    if (Device.deviceOS === "Android")
        return value + "dp";
    else
        return value;
}

function createContainer(parent, name, left, top, width, height, fillColor, backgroundTransparent, onTouchEnded) {
    var cntTemp = new SMF.UI.Rectangle({
        name: name,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: height,
        fillColor: fillColor,
        backgroundTransparent: backgroundTransparent,
        onTouchEnded: onTouchEnded,
        touchEnabled: (onTouchEnded) ? true : false,
        borderWidth: 0,
        roundedEdge: 0
    });

    parent.add(cntTemp);
}

function createRectangle(parent, left, top, width, height, fillColor) {
    var recTemp = new SMF.UI.Rectangle({
        name: "recTemp",
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: height,
        fillColor: fillColor,
        borderWidth: 0,
        roundedEdge: 0
    });

    parent.add(recTemp);
}


function createImage(parent, name, image, left, top, width, height, imageFillType) {
    var imgTemp = new SMF.UI.Image({
        name: name,
        image: image,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: getUnit(height),
        imageFillType: (imageFillType) ? imageFillType : SMF.UI.ImageFillType.NORMAL
    });
    parent.add(imgTemp);
}

function createLabel(parent, name, text, left, top, width, height, textAlignment, multipleLine, fontSize, fontBold, fontColor) {
    var lblTemp = new SMF.UI.Label({
        name: name,
        text: text,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: getUnit(height),
        textAlignment: textAlignment,
        multipleLine: multipleLine,
        font: new SMF.UI.Font({
            size: fontSize,
            bold: fontBold
        }),
        fontColor: fontColor,
        borderWidth:0
    });

    parent.add(lblTemp);
}

function createTextButton(parent, name, text, left, top, width, height, textAlignment, fontSize, fontBold, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
    var btnTemp = new SMF.UI.TextButton({
        name: name,
        text: text,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: getUnit(height),
        textAlignment: textAlignment,
        font: new SMF.UI.Font({
            size: fontSize,
            bold: fontBold
        }),
        fillColor: fillColor,
        pressedFillColor: pressedFillColor,
        fontColor: fontColor,
        pressedFontColor: pressedFontColor,
        onPressed: onPressed,
        roundedEdge: 0
    });
    parent.add(btnTemp);
}

function createTextButtonWithCustomFont(parent, name, text, left, top, width, height, textAlignment, font, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
    var btnTemp = new SMF.UI.TextButton({
        name: name,
        text: text,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: getUnit(height),
        textAlignment: textAlignment,
        font: font,
        fillColor: fillColor,
        pressedFillColor: pressedFillColor,
        fontColor: fontColor,
        pressedFontColor: pressedFontColor,
        onPressed: onPressed,
        roundedEdge: 0
    });
    parent.add(btnTemp);
}


function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000; // or 1024 for binary
    var dm = decimals || 2;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function createDialogBox() {
    var dialogBox = new SMF.UI.Container({
        name: "LoadingDialog",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        fillColor: '#BBBBBB',
        backgroundTransparent: true,
        visible: false,

        onShow: function(e) {}
    });

    var rectBackground = new SMF.UI.Container({
        name: "mye",
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    });

    rectBackground.top = "0%";
    rectBackground.left = "0%";
    rectBackground.width = "100%";
    rectBackground.height = "100%";
    rectBackground.fillColor = "#222222";
    rectBackground.backgroundTransparent = false;
    rectBackground.alpha = "90%";
    rectBackground.borderWidth = 0;


    var ai = new SMF.UI.ActivityIndicator();
    ai.style = SMF.UI.ActivityIndicatorStyle.WHITE;
    var ai_top = Device.screenHeight / 2 - ai.height / 2;
    var ai_left = Device.screenWidth / 2 - ai.width / 2;
    ai.left = ai_left;
    ai.top = ai_top;

    dialogBox.add(rectBackground);
    dialogBox.add(ai);

    return dialogBox;
}

function showDialogBox(targetPage, onDialogShow) {
    console.log('showDialogBox')
    if (targetPage.hasDialogBox !== true) {
        console.log('showDialogBox 2')
        var myDialogBox = createDialogBox();
        myDialogBox.visible = true;
        myDialogBox.onShow = onDialogShow;
        // prototype
        targetPage.add(myDialogBox);
        targetPage.hasDialogBox = true;
        targetPage.dialogBox = myDialogBox;
    }
    else {
        console.log('showDialogBox 3')
        var myDialogBox = targetPage.dialogBox;
        if (myDialogBox) {
            console.log('showDialogBox 4')
            myDialogBox.visible = true;
            myDialogBox.onShow = onDialogShow;
        }
    }
}

function hideDialogToBox(targetPage, onDialogBoxHide) {
    if (targetPage.hasDialogBox) {
        var myDialogBox = targetPage.dialogBox;
        if (onDialogBoxHide)
            myDialogBox.onHide = onDialogBoxHide;
        myDialogBox.visible = false;
    }
}

/* Animations */
var animationPush = {
    motionEase: SMF.UI.MotionEase.ACCELERATING,
    transitionEffect: SMF.UI.TransitionEffect.RIGHTTOLEFT,
    transitionEffectType: SMF.UI.TransitionEffectType.PUSH,
    fade: false,
    reset: false
};
var animationReveal = {
    motionEase: SMF.UI.MotionEase.ACCELERATING,
    transitionEffect: SMF.UI.TransitionEffect.RIGHTTOLEFT,
    transitionEffectType: SMF.UI.TransitionEffectType.REVEAL,
    fade: false,
    reset: false
};
var animationCover = {
    motionEase: SMF.UI.MotionEase.ACCELERATING,
    transitionEffect: SMF.UI.TransitionEffect.RIGHTTOLEFT,
    transitionEffectType: SMF.UI.TransitionEffectType.COVER,
    fade: false,
    reset: false
};

var defaultPageAnimation = {
    motionEase: SMF.UI.MotionEase.ACCELERATEANDDECELERATE,
    transitionEffect: SMF.UI.TransitionEffect.RIGHTTOLEFT,
    transitionEffectType: SMF.UI.TransitionEffectType.PUSH,
    fade: true,
    reset: false,
    duration: 300 //Device.deviceOS === "iOS" ? 300 : 600
}

//http://stackoverflow.com/a/14638191
Date.prototype.format = function(format, utc) {
    return formatDate(this, format, utc);
};

function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};
