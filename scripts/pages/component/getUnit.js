 var getUnit = function(value) {
    if (typeof value === "object")
        return getUnit(value[Device.deviceOS]);
    if (value.toString() === "%")
        return value;
    if (Device.deviceOS === "Android")
        return value + "dp";
    else
        return value;
}

module.exports = getUnit;
