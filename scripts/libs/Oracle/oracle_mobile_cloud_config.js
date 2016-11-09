/* globals mcs */
var mcs_config = {
  "logLevel": mcs.logLevelInfo,
  "mobileBackends": {
    "smartfaceOracleMCS": {
      "default": true,
      "baseUrl": "https://smartfacemobileenv-mobiledom.mobileenv.em2.oraclecloud.com:443",
      "applicationKey": Device.deviceOS === "Android" ? "84b8c28f-abc5-4d48-b9c8-695dfa33bc4f" : "a27a33ba-5c04-42ca-ab08-3e1ebf862aa4",
      "authorization": {
        "basicAuth": {
          "backendId": "d7e30d53-1f93-46ff-af95-7f3ea8f44cbf",
          "anonymousToken": "TU9CSUxFRE9NX1NNQVJURkFDRU1PQklMRUVOVl9NT0JJTEVfQU5PTllNT1VTX0FQUElEOllhX3c3cmhkbmNzaTV6"
        },
        "oAuth": {
          "clientId": "42040289-ad58-42f1-ada1-afbdd6ae4f3e",
          "clientSecret": "YUgIwvaMWlqgSpVkXfj3",
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
