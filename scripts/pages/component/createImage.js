function getUnit(value) {
    if (typeof value === "object")
        return getUnit(value[Device.deviceOS]);
    if (value.toString().right(1) === "%")
        return value;
    if (Device.deviceOS === "Android")
        return value + "dp";
    else
        return value;
}
exports.getUnit = getUnit;

exports.createImage = function createImage(parent, name, left, top, width, height, fillColor, backgroundTransparent, onTouchEnded, alpha) {

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
