const colors = require('pages/style/colors.js');
const ActionWrapper = require("js-base/component/header-bar");
var eventCallback;

const options = {
  visible: true,
  backgroundImage: null,
  backgroundColor: "#ffffff",
  enabled: true
};

var _textColor = colors.BlueMedium;
var _fontSize = 20;

if (Device.deviceOS == "iOS") {
  options.ios = {
    rightBarButtonItems: [new SMF.UI.iOS.BarButtonItem({
      title: "Add",
      onSelected: function(){
        eventCallback({type: "add"});
      }
    })],
    leftBarButtonItems: [new SMF.UI.iOS.BarButtonItem({
      image: "menu.png",
      onSelected: function() {
        eventCallback({
          type: "menu"
        });
      }
    })],
    translucent: true,
    titleView: {
      type: SMF.UI.TitleViewType.TEXT,
      frame: [0, 0, 240, 44],
      // text: _titleText,
      textColor: _textColor,
      fontSize: _fontSize,

      alignment: SMF.UI.TextAlignment.CENTER
    }
  };
}
else {
  options.android = {
    hideOnContentScroll: false,
    titleView: {
      type: SMF.UI.TitleViewType.TEXT,
      // text: _titleText,
      textColor: _textColor,
      textSize: _fontSize,
      alignment: SMF.UI.Alignment.CENTER
    },
    overlay: true,
    homeAsUpIndicator: "menu.png",
    onHomeIconItemSelected: function() {
      eventCallback({
        type: "menu"
      });
    },
    displayShowHomeEnabled: true,
    alpha: 1,
    displayHomeAsUpEnabled: true,
    menuItems: [new SMF.UI.Android.MenuItem({
        id: "1",
        icon: "filter.png",
        showAsAction: SMF.UI.Android.ShowAsAction.ALWAYS,
        onSelected: function(e) {
            eventCallback({type: "filter"});
        }
    })]
  };
}


module.exports = {
  eventCallback: function(cb) {
    eventCallback = cb;
  },
  setTitle: function(title) {
    (Device.deviceOS == "iOS") ? options.ios.titleView.text = title: options.android.titleView.text = title;
  },
  options
};
