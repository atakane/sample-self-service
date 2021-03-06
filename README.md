<h3 align="center">
  <img height=75 src="https://github.com/smartface/sample-self-service/blob/master/temp/smartface_logo.png" alt="smartface Logo" />
</h3>

# Self Service from Smartface
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/smartface/sample-self-service/blob/master/LICENSE)

A sample app to demonstrate Smartface and Oracle EBS/Fusion integration.

<img width=250 src="https://github.com/smartface/sample-self-service/blob/master/temp/sc1.png">
<img width=250 src="https://github.com/smartface/sample-self-service/blob/master/temp/sc2.png" hspace="30">
<img width=250 src="https://github.com/smartface/sample-self-service/blob/master/temp/sc3.png">


## Installation
This repository depends on [smartface.io](https://smartface.io) runtime.
You need to clone this repository inside a [**Smartface Cloud IDE Workspace**](https://cloud.smartface.io/Home/Index)

## How to config
This version works with mock-ebs services. To use all functionality in this app, please follow these steps;
* Change the [mock services](https://github.com/smartface/sample-self-service/tree/master/_self-service-mock/) to match-up with your Real services.
* If you dont have, setup an account on [Oracle Cloud](https://cloud.oracle.com).
* Create a new mobile backend for your project
* Create separate mobile backend clients for your target platforms (Android and iOS)
* Get tokens and keys for that backend from Oracle MCS dashboard
* Write your backend name into app.js
* Write your tokens and keys into [`libs/Oracle/oracle_mobile_cloud_config.js`](https://github.com/smartface/sample-self-service/blob/master/scripts/libs/Oracle/oracle_mobile_cloud_config.js)
* If you want to use Push Notifications, update `googleCloudMessaging` value in [`config/project.json`] (https://github.com/smartface/sample-self-service/blob/master/config/project.json). You need to get your Sender ID from your Google GCM / Firebase account. It is recommended to read our detailed [Push Notification Services Guide](https://smartface.atlassian.net/wiki/display/GUIDE/Push+Notification+Services)
* To use Remote App Update feature update your [`config/project.rau.json`](https://github.com/smartface/sample-self-service/blob/master/config/project.rau.json) You can unleash your app's power by reading [Remote App Update Guides](https://smartface.atlassian.net/wiki/display/GUIDE/Remote+App+Update+Guides)
* Integrate your EBS rest services to MCS custom connectors, and relay from there.

## Styling
You can change application theme with editing style files under [`pages/style`](https://github.com/smartface/sample-self-service/tree/master/scripts/pages/style) folder.

## See Also
- [Smartface Core Workspace](https://github.com/smartface/smartface-core-workspace)
- [Js-Base](https://github.com/smartface/js-base)
- [ReactJS - Redux](https://github.com/reactjs/redux)

## Need Help?

Please [submit an issue](https://github.com/smartface/sample-self-service/issues) on GitHub and provide information about your problem.

## Support & Documentation & Useful Links
- [Guides](https://www.smartface.io/guides)
- [API Docs](https://docs.smartface.io)
- [Smartface Cloud Dashboard](https://cloud.smartface.io)
- [Download Smartface App](https://smf.to/app) (Works only from your device)

## Code of Conduct
We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.
Please read and follow our [Code of Conduct](https://github.com/smartface/sample-self-service/blob/master/CODE_OF_CONDUCT.md).

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
