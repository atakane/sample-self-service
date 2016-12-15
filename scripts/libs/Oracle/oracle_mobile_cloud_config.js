/* globals mcs */
var mcs_config = {
  "logLevel": mcs.logLevelInfo,
  "mobileBackends": {
    "smartfaceOracleMCS": {
      "default": true,
      "baseUrl": "https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443",
      "applicationKey": Device.deviceOS === "Android" ? "a286e7b4-a765-4895-a718-e1f9a57f1c5e" : "0e891fef-57d8-443a-9532-715106182720",
      "authorization": {
        "basicAuth": {
          "backendId": "4a3a3740-5071-4bfe-8821-267fd3d09f55",
          "anonymousToken": "TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw"
        },
        "oAuth": {
          "clientId": "16199e66-4f64-4fef-90c4-7d9231ff265a",
          "clientSecret": "sozSvQZSTOphhcljZFa0",
          "tokenEndpoint": "https://mobilebel.identity.europe.oraclecloud.com/oam/oauth2/tokens"
        },
        "facebookAuth": {
          "facebookAppId": "YOUR_FACEBOOK_APP_ID",
          "backendId": "YOUR_BACKEND_ID",
          "anonymousToken": "YOUR_BACKEND_ANONYMOUS_TOKEN"
        },
        "ssoAuth": {
          "clientId": "YOUR_CLIENT_ID",
          "clientSecret": "YOUR_ClIENT_SECRET",
          "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
        }
      }
    }
  }
};
