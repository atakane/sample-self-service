/* globals lang defaultPageAnimation Dialog*/
include('i18n/i18n.js');
// include('libs/Smartface/permissions.js');
include('libs/utils/JSON.prune.js');
include("libs/Oracle/smartface.mcs.js");
// include("libs/utils/smartface.tiny.utils.js");
// include("libs/utils/dialog.js");
// include("libs/utils/headerbar.js");
// include('libs/Smartface/SMFAjax.js');

//Require
include("node_modules/js-base/utils/require.js");

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

	// Creating a new Oracle MCS instance 
	smfOracle = new SMF.Oracle.MobileCloudService('smartfaceOracleMCS');
	
	// logging in as anonymous user to log Analytics events
	// if you need you can auth user with .authenticate
	smfOracle.authAnonymous();
	
	// logging an event
	smfOracle.logAnalytics('Application_OnStart');

	initRequire("./main.js");
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
