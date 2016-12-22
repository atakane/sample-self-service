const colors = require('./colors.js');

module.exports = {
    ".pgLogin": {
        ".imgHome": {
            left: 0,
            image: 'home_back.png',
            left: 0,
            top: 0,
            width: '100%',
            height: '40%',
            imageFillType: SMF.UI.ImageFillType.STRETCH
        },
        ".lblWelcome": {
            left: '9.5%',
            top: '15%',
            width: '80%',
            height: '15%',
            textAlignment: SMF.UI.TextAlignment.TOP,
            multipleLine: true,
            fontColor: SMF.UI.Color.WHITE
        },
        ".lblWelcome2": {
            left: '11%',
            top: '30%',
            width: '80%',
            height: '8%',
            textAlignment: SMF.UI.TextAlignment.TOP,
            multipleLine: false,
            fontColor: SMF.UI.Color.WHITE
        },
        '.txtUserName': {
            top: '51%',
            left: '10%',
            width: '80%',
            height: '8%',
            placeHolder: 'Username',
            text: 'test',
            horizontalGap: 15,
            roundedEdge: 0
        },
        '.txtPassword': {
            top: '60%',
            left: '10%',
            width: '80%',
            height: '8%',
            placeHolder: 'Password',
            text: 'Smartface1',
            isPassword: true,
            horizontalGap: 15,
            roundedEdge: 0
        },
        '.btnLogin': {
            top: '69%',
            left: '10%',
            width: '80%',
            height: '8%',
            text: 'Login',
            textAlignment: SMF.UI.TextAlignment.CENTER,
            roundedEdge: 1
        },
        ".lblInfoText": {
            left: '10%',
            top: '78%',
            width: '80%',
            height: '8%',
            fontColor: SMF.UI.Color.BLACK
        },
        ".lblVersion": {
            left: '0',
            top: '97%',
            width: '99%',
            height: '3%',
            fontColor: SMF.UI.Color.BLACK
        }
    }
};
