/* globals */
const getUnit = require('./getUnit.js');

exports.createContainer = function createContainer(parent, name, left, top, width, height, fillColor, backgroundTransparent, onTouchEnded, alpha) {
    var newComponent = new SMF.UI.Rectangle({
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
    if (alpha) newComponent.alpha = alpha;

    parent.add(newComponent);
}

exports.createRectangle = function createRectangle(parent, left, top, width, height, fillColor) {
    var newComponent = new SMF.UI.Rectangle({
        name: "recTemp",
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: height,
        fillColor: fillColor,
        borderWidth: 0,
        roundedEdge: 0
    });

    parent.add(newComponent);
}

exports.createImage = function createImage(parent, name, image, left, top, width, height, imageFillType) {
    var newComponent = new SMF.UI.Image({
        name: name,
        image: image,
        left: getUnit(left),
        top: getUnit(top),
        width: getUnit(width),
        height: getUnit(height),
        imageFillType: (imageFillType) ? imageFillType : SMF.UI.ImageFillType.NORMAL
    });
    
    parent[name] = newComponent;
    parent.add(newComponent);
}

exports.createLabel = function createLabel(parent, name, text, left, top, width, height, textAlignment, multipleLine, fontSize, fontBold, fontColor, onTouchEnded) {
    var newComponent = new SMF.UI.Label({
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
        newComponent.touchEnabled = true;
        newComponent.onTouchEnded = onTouchEnded;
    }

    parent[name] = newComponent;
    parent.add(newComponent);
}

exports.createAwesomeLabel = function createAwesomeLabel(parent, name, text, left, top, width, height, textAlignment, multipleLine, fontSize, fontBold, fontColor, onTouchEnded) {
    var newComponent = new SMF.UI.Label({
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
        newComponent.touchEnabled = true;
        newComponent.onTouchEnded = onTouchEnded;
    }

    parent[name] = newComponent;
    parent.add(newComponent);
}

exports.createTextButton = function createTextButton(parent, name, text, left, top, width, height, textAlignment, fontSize, fontBold, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
    var newComponent = new SMF.UI.TextButton({
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
    
    parent[name] = newComponent;
    parent.add(newComponent);
}

exports.createTextButtonWithCustomFont = function createTextButtonWithCustomFont(parent, name, text, left, top, width, height, textAlignment, font, fillColor, pressedFillColor, fontColor, pressedFontColor, onPressed) {
    var newComponent = new SMF.UI.TextButton({
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
    
    parent[name] = newComponent;
    parent.add(newComponent);
}
