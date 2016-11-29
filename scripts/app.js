/* globals lang defaultPageAnimation Dialog*/
include('i18n/i18n.js');
include('libs/utils/smartface.tiny.utils.js');

Application.onStart = Application_OnStart;
Application.onUnhandledError = Application_OnError;
Application.onMaximize = Application_onMaximize;

var smfOracle;
var oProfile;
var oTimeTable;
var oRequestList;
var templateOutOfOfficeText = "Hello,\n\nI'm currently out of the office but I will return on {EndDate}. I will respond to your inquiry as soon as possible.\n\nBest\n{FullName}\n{Role}/{Team}";
var lunchBreakDuration = 1;
var urlMockServicePath = "https://raw.githubusercontent.com/smartface/sample-self-service/master/_self-service-mock/"

var isSliderDrawerOpen = false;

/**
 * Triggered when application is started.
 * @param {EventArguments} e Returns some attributes about the specified functions
 * @this Application
 */
function Application_OnStart(e) {
	SMF.UI.statusBar.visible = true;
	include('pages/index.js');

	// Creating a new Oracle MCS instance 
	smfOracle = new SMF.Oracle.MobileCloudService('smartfaceOracleMCS');

	//Update check for RaU
	if (Device.deviceOS == "Android") {
		global.checkPermission("WRITE_EXTERNAL_STORAGE", function(err) {
			if (!err) checkforUpdate();
		});
	}
	else {
		setTimeout(function() {
			checkforUpdate();
		}, 3000);
	}

	Pages.pgLogin.show(defaultPageAnimation);
}

function Application_onMaximize(e) {
	//do nothing	
}

function Application_OnError(e) {
	switch (e.type) {
		case "Server Error":
			//TODO log error
		case "Size Overflow":
			//TODO log error
			alert(lang.networkError);
			break;
		default:
			//TODO log error
			//change the following code for desired generic error messsage
			alert({
				title: lang.applicationError,
				message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
			});
			break;
	}
}

// Checking for Remote App Update 
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
