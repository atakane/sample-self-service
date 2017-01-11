// Tiny utils for Smartface App Projects. 
// Most of them can be used for every javascript projects out there as well
// Some of them taken from Q&A sites, references added.

// Returns true if the expression is a valid date, time, or datetime value
exports.isDate = function isDate(n) {
    return (n instanceof Date && !isNaN(n.valueOf()));
}

// Returns formated size string for given number
exports.formatBytes = function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000; // or 1024 for binary
    var dm = decimals || 2;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Days between 2 dates calculation with UTC calculations
// Based on http:// stackoverflow.com/a/11252167/4371020
function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

exports.daysBetween = function daysBetween(startDate, endDate, calculateAsHours) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.round((treatAsUTC(endDate) - treatAsUTC(startDate)) / ((calculateAsHours) ? millisecondsPerDay / 24 : millisecondsPerDay));
}

exports.getDateString = function getDateString(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // January is 0!
    var yy = date.getFullYear().toString().right(2);

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return mm + '/' + dd + '/' + yy;;
}

// This filters help us to filter or filter out arrays by ID 
// based on https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
var _targetID;
exports.setTargetID = function(targetID){
    _targetID = targetID;
};

function filterByID(obj) {
    if (obj.ID !== undefined && typeof(obj.ID) === 'number' && !isNaN(obj.ID) && !isNaN(_targetID) && (obj.ID === _targetID)) {
        return true;
    }
    else {
        return false;
    }
}

exports.filterOutByID = function(obj) {
    if (obj.ID !== undefined && typeof(obj.ID) === 'number' && !isNaN(obj.ID) && !isNaN(_targetID) && (obj.ID === _targetID)) {
        return false;
    }
    else {
        return true;
    }
}

// Fixing Smartface Android overlay set true bug
exports.fixOverlayBug = function fixOverlayBug() {
    if (Device.deviceOS === 'Android') {
        var hiddenObject = new SMF.UI.Label({
            left: '99%',
            top: '99%',
            height: '1%',
            width: '1%',
            text: '',
            visible: false
        })
        Pages.currentPage.add(hiddenObject);
    }
}

