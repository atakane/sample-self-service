/* globals */
const getUnit = require('./getUnit.js');

exports.createContainer = function createContainer(parent, name, left, top, width, height, fillColor, backgroundTransparent, onTouchEnded, alpha) {
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
    if (alpha) cntTemp.alpha = alpha;

    parent.add(cntTemp);
}

exports.createRectangle = function createRectangle(parent, left, top, width, height, fillColor) {
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

exports.createImage = function createImage(parent, name, image, left, top, width, height, imageFillType) {
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

exports.createLabel = function createLabel(parent, name, text, left, top, width, height, textAlignment, multipleLine, fontSize, fontBold, fontColor, onTouchEnded) {
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
        fontColor: fontColor
    });
    if (onTouchEnded) {
        lblTemp.touchEnabled = true;
        lblTemp.onTouchEnded = onTouchEnded;
    }

    parent.add(lblTemp);
}

exports.createAwesomeLabel = function createAwesomeLabel(parent, name, text, left, top, width, height, textAlignment, multipleLine, fontSize, fontBold, fontColor, onTouchEnded) {
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
            name: "FontAwesome",
            size: fontSize,
            bold: fontBold
        }),
        fontColor: fontColor,
        borderWidth: 0
    });
    if (onTouchEnded) {
        lblTemp.touchEnabled = true;
        lblTemp.onTouchEnded = onTouchEnded;
    }

    parent.add(lblTemp);
}

exports.createTextButton = function createTextButton(parent, name, text, left, top, width, height, textAlignment, fontSize, fontBold, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
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

exports.createTextButtonWithCustomFont = function createTextButtonWithCustomFont(parent, name, text, left, top, width, height, textAlignment, font, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
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
