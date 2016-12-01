/* globals mcs */
var mcs_config = {
  "logLevel": mcs.logLevelInfo,
  "mobileBackends": {
    "smartfaceOracleMCS": {
      "default": true,
      "baseUrl": "https://smartfacemobileenv-mobiledom.mobileenv.em2.oraclecloud.com:443",
      "applicationKey": Device.deviceOS === "Android" ? "981a4721-d0fe-4475-8a9e-06171eea6630" : "0f7cf14e-941b-4234-9542-7e6afbc3334c",
      "authorization": {
        "basicAuth": {
          "backendId": "94ff5160-6662-453e-b93f-ce1c30811734",
          "anonymousToken": "TU9CSUxFRE9NX1NNQVJURkFDRU1PQklMRUVOVl9NT0JJTEVfQU5PTllNT1VTX0FQUElEOllhX3c3cmhkbmNzaTV6"
        },
        "oAuth": {
          "clientId": "2667ba30-55d5-4f56-aae3-03b79e7216c3",
          "clientSecret": "TbRieZwCygTCdfbiKQs1",
          "tokenEndpoint": "https://mobiledom.identity.europe.oraclecloud.com/oam/oauth2/tokens"
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
