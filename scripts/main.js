require('babel-polyfill/dist/polyfill.js');
require('js-extended-prototypes/extendPrototype.js');

const permissions = require('js-base/utils/permissions');

// Pages
const pgLogin = require('./pages/pgLogin.js');
const pgStatus = require('./pages/pgStatus.js');
const pgOutOfOffice = require('./pages/pgOutOfOffice.js');
const pgAbout = require('./pages/pgAbout.js');
const pgNewLeaveRequest = require('./pages/pgNewLeaveRequest.js');
const pgApprovalWorklist = require('./pages/pgApprovalWorklist.js');
const pgApproveLeaveRequest = require('./pages/pgApproveLeaveRequest.js');
const pgMyRequests = require('./pages/pgMyRequests.js');
const pgMyRequestDetail = require('./pages/pgMyRequestDetail.js');

//Styler
const merge = require('deepmerge');
const styler = require("js-base/core/styler").styler;

//Style files
const styleGeneric = require('./pages/style/generic.style.js');
const styleSliderDrawer = require('./pages/style/sliderDrawer.style.js');
const stylePgLogin = require('./pages/style/pgLogin.style.js');
const stylePgStatus = require('./pages/style/pgStatus.style.js');
const stylePgOutOfOffice = require('./pages/style/pgOutOfOffice.style.js');
const stylePgAbout = require('./pages/style/pgAbout.style.js');
const stylePgMyRequests = require('./pages/style/pgMyRequests.style.js');
const stylePgNewLeaveRequest = require('./pages/style/pgNewLeaveRequest.style.js');
const stylePgApproveLeaveRequest = require('./pages/style/pgApproveLeaveRequest.style.js');
const styleOSSpecific = (Device.deviceOS === 'iOS') ? require('./pages/style/ios.style.js') : require('./pages/style/android.style.js');

// merging styles to simplify style usage
// by that way  we can use same object hieararchy within style files.
var mergedStyle = merge.all([styleGeneric, styleSliderDrawer, stylePgLogin, stylePgStatus, stylePgOutOfOffice, stylePgAbout, stylePgMyRequests, stylePgNewLeaveRequest, stylePgApproveLeaveRequest, styleOSSpecific]);

// passing style object to styler
styler(mergedStyle);

// Router
const router = require('js-base/core/router');


// Check for permissions & RAU updates
if (Device.deviceOS == "Android") {
	permissions.checkPermission("WRITE_EXTERNAL_STORAGE", function(err) {
		if (!err) checkforUpdate();
	});
}
else {
	setTimeout(function() {
		checkforUpdate();
	}, 3000);
}

/* Default Animations */
var defaultPageAnimation = function(page) {
	return [
		Device.deviceOS === "iOS" ? SMF.UI.MotionEase.NONE : SMF.UI.MotionEase.NONE,
		Device.deviceOS === "iOS" ? SMF.UI.TransitionEffect.RIGHTTOLEFT : SMF.UI.TransitionEffect.NONE,
		Device.deviceOS === "iOS" ? SMF.UI.TransitionEffectType.PUSH : SMF.UI.TransitionEffectType.NONE,
		Device.deviceOS === "iOS" ? false : true,
		false
	];
}

var reverseDefaultPageAnimation = function() {
	return [
		Device.deviceOS === "iOS" ? SMF.UI.MotionEase.ACCELERATEANDDECELERATE : SMF.UI.MotionEase.NONE,
		Device.deviceOS === "iOS" ? SMF.UI.TransitionEffect.RIGHTTOLEFT : SMF.UI.TransitionEffect.NONE,
		Device.deviceOS === "iOS" ? SMF.UI.TransitionEffectType.PUSH : SMF.UI.TransitionEffectType.NONE,
		Device.deviceOS === "iOS" ? false : true,
		false
	];
}

// Adding routes
router.add('pgLogin', pgLogin, defaultPageAnimation);
router.add('pgStatus', pgStatus, defaultPageAnimation);
router.add('pgOutOfOffice', pgOutOfOffice, defaultPageAnimation);
router.add('pgAbout', pgAbout, defaultPageAnimation);
router.add('pgNewLeaveRequest', pgNewLeaveRequest, defaultPageAnimation);
router.add('pgApprovalWorklist', pgApprovalWorklist, defaultPageAnimation);
router.add('pgApproveLeaveRequest', pgApproveLeaveRequest, defaultPageAnimation);
router.add('pgMyRequests', pgMyRequests, defaultPageAnimation);
router.add('pgMyRequestDetail', pgMyRequestDetail, defaultPageAnimation);

// Routing to the starting page of the application
router.go('pgLogin');


// Remote App Update update check function
function checkforUpdate() {
	//Checks if there is a valid update. If yes returns result object.     
	Application.checkUpdate(function(err, result) {
		if (err) {
			//Checking for update is failed
			//TODO log error
			// smfOracle.logAnalytics("Error [checkUpdate] " + err)
		}
		else {
			//Update is successful. We can show the meta info to inform our app user.
			if (result.meta) {
				var isMandatory = (result.meta.isMandatory && result.meta.isMandatory === true) ? true : false;

				var updateTitle = (result.meta.title) ? result.meta.title : 'A new update is ready!';

				var updateMessage = "Version " + result.newVersion + " is ready to install.\n\n" +
					"What's new?:\n" + JSON.stringify(result.meta.update) +
					"\n\n"

				//adding mandatory status message.
				updateMessage += (isMandatory) ? "This update is mandatory!" : "Do you want to update?";

				//Function will run on users' approve
				function onFirstButtonPressed() {
					if (result.meta.redirectURL && result.meta.redirectURL.length != 0) {
						//RaU wants us to open a URL, most probably core/player updated and binary changed. 
						SMF.Net.browseOut(result.meta.redirectURL);
					}
					else {
						Dialog.showWait();
						//There is an update waiting to be downloaded. Let's download it.
						result.download(function(err, result) {
							if (err) {
								//Download failed
								Dialog.removeWait();
								alert("Autoupdate download failed: " + err);
							}
							else {
								//All files are received, we'll trigger an update.
								result.updateAll(function(err) {
									if (err) {
										//Updating the app with downloaded files failed
										Dialog.removeWait();
										alert("Autoupdate update failed: " + err);
									}
									else {
										//After that the app will be restarted automatically to apply the new updates
										Application.restart();
									}
								});
							}
						});
					}
				}

				//We will do nothing on cancel for the timebeing.
				function onSecondButtonPressed() {
					//do nothing
				}

				//if Update is mandatory we will show only Update now button.
				if (isMandatory) {
					alert({
						title: updateTitle,
						message: updateMessage,
						firstButtonText: "Update now",
						onFirstButtonPressed: onFirstButtonPressed
					});
				}
				else {
					alert({
						title: updateTitle,
						message: updateMessage,
						firstButtonText: "Update now",
						secondButtonText: "Later",
						onFirstButtonPressed: onFirstButtonPressed,
						onSecondButtonPressed: onSecondButtonPressed

					});
				}
			}

		}
	});
}
