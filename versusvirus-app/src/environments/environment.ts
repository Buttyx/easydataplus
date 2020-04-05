// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from "firebase"

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "xxx",
    authDomain: "versusvirus-273113.firebaseapp.com",
    databaseURL: "https://versusvirus-273113.firebaseio.com",
    projectId: "versusvirus-273113",
    storageBucket: "gs://versusvirus-ocr-input",
    messagingSenderId: "xxx",
    appId: "xxx"
  },

};

firebase.initializeApp(environment.firebaseConfig);


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
