// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: '4f359bb66b5d6fa191ba2176fc5b11a4',
  API_URL: 'https://api.openweathermap.org/data/2.5/', //current weather API
  API_URL2: 'http://api.openweathermap.org/geo/1.0/', //geocoding API
  API_URL3: 'http://api.openweathermap.org/data/2.5/' //Forecast API
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
