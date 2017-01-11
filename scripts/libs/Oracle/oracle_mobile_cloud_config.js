/* globals mcs */
var mcs_config = {
  "logLevel": mcs.logLevelInfo,
  "mobileBackends": {
    "smartfaceOracleMCS": {
      "default": true,
      "baseUrl": "https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443",
      "applicationKey": Device.deviceOS === "Android" ? "8f04c58b-df4d-41ca-8781-028e672d5b14" : "96619cfa-bc73-4b21-b7f2-5c42ef9da109",
      "authorization": {
        "basicAuth": {
          "backendId": "e8a0764c-fc27-4a4a-96ec-ae2f5d87bd53",
          "anonymousToken": "TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw"
        },
        "oAuth": {
          "clientId": "38c536b8-2455-4312-b7c6-52dbc1bc74dd",
          "clientSecret": "VqySdjKwGRfTwwxRrbm7",
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
