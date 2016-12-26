const colors = require('./colors.js');

module.exports = {
    ".pgLogin": {
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
            placeHolder: lang['pgLogin.txtUserName.placeHolder'],
            text: 'test',
            horizontalGap: 15,
            roundedEdge: 0
        },
        '.txtPassword': {
            top: '60%',
            left: '10%',
            width: '80%',
            height: '8%',
            placeHolder: lang['pgLogin.txtPassword.placeHolder'],
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
            text: lang['pgLogin.btnLogin.text'],
            textAlignment: SMF.UI.TextAlignment.CENTER,
            roundedEdge: 1
        },
        ".lblInfoText": {
            left: '10%',
            top: '78%',
            width: '80%',
            height: '8%',
            fontColor: SMF.UI.Color.BLACK
        }
    }
};
