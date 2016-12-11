const Page = require("js-base/component/page");
const extend = require("js-base/core/extend");
// const UIComponent      = require("js-base/component/ui-component");
const NavBar = require("./component/nav-bar");
const actionBarOptions = require("./actionbar/page2.actionbar");
const ActionWrapper = require("js-base/component/action-bar");
const SliderDrawer = require("./component/slider-drawer");

const Page2 = extend(Page)(
	//Page2 Constructor
	function(_super) {

		_super(this, {
			name: "page2",
			fillColor: "#EEEEEE",
			onShow: onShow
		});

		const wrapper = ActionWrapper(this._view, actionBarOptions.options);
		const title = new SMF.UI.Label({
			width: "80%",
			height: "50dp",
			left: "10%",
			top: "50px",
			text: "Swipe Me !!!"
		});

		const sliderDrawer = new SliderDrawer({
			width: '90%',
			height: "100%",
			horizontalGap: 0,
			verticalGap: 0,
			left: 0,
			top: 0,
			position: 'left',
			onHide: function() {}
		});

		const sliderDrawerTitle = new SMF.UI.Label({
			width: "80%",
			height: "50dp",
			left: "10%",
			top: "50dp",
			text: "SliderDrawer Menu"
		});

		sliderDrawer._view.add(sliderDrawerTitle);
		this.add(sliderDrawer._view);
		this.add(title);

		function onShow() {
			// subscribes actionbar events
			wrapper.reload();
			actionBarOptions.eventCallback(function(e) {
				if (e.type == "menu")
					sliderDrawer.toggle();
			});

		}

		function onClose() {
			// unsubsribes from actionbar events
			actionBarOptions.eventCallback(null);
		}

		var navBar = new NavBar();
		this.add(navBar);

		navBar.showPrev("page1");
	},
	//Page2 Public Methods
	function(_proto) {
		// for injection of routing data
		_proto.setRouteParams = function() {};
		_proto.changeStateHandlder = function(state) {};
	});

module.exports = Page2;
