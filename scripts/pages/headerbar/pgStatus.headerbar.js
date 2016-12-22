const ActionWrapper = require("js-base/component/header-bar");
var eventCallback;

const options = {
  visible: true,
  backgroundImage: null,
  backgroundColor: "#ffffff",
  enabled: true
};


if(Device.deviceOS == "iOS") {
  options.ios = {
    rightBarButtonItems: [],
    leftBarButtonItems: [new SMF.UI.iOS.BarButtonItem({
      image : "menu.png",
      onSelected: function(){
        eventCallback({type: "menu"});
      }
    })],
    translucent: true,
    titleView: {        
      type: SMF.UI.TitleViewType.IMAGE,
      frame: (Device.brandModel.toLowerCase().includes('plus')) ? [100, 15, 120, 24] : [84, 15, 120, 24],
      image: "self_service.png"
    }
  };
} else {
  options.android = {
    hideOnContentScroll: false,
    titleView: {
      type: SMF.UI.TitleViewType.TEXT,
      text: 'Self Service',
      textColor: colors.BlueMedium,
      textSize: 20,
      alignment: SMF.UI.Alignment.CENTER
    },
    overlay: true,
    homeAsUpIndicator: "back.png",
    onHomeIconItemSelected: function(){
      eventCallback({type: "menu"});
    },
    displayShowHomeEnabled: true,
    alpha: 1,
    displayHomeAsUpEnabled: true,
    menuItems: []
  };
}

module.exports = {
    eventCallback: function(cb){
      console.log("event"+cb);
      eventCallback = cb;
    },
    options
};