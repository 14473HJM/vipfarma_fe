// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userBaseUrl: "http://localhost:8080/user",
  customerBaseUrl: "http://localhost:8080/customers",
  healthInsuranceBaseUrl: "http://localhost:8080/healthInsurance",
  healthInsurancePlanBaseUrl: "http://localhost:8080/healthInsurancePlan/insurance/",
<<<<<<< Updated upstream
=======
  baseUrl: "http://localhost:8080",
>>>>>>> Stashed changes
  saleOrderBaseUrl: "http://localhost:8080/sale/orders",
  billBaseUrl: "http://localhost:8080/billing/order",
  stocksOffers: 'http://localhost:8080/stocks/offers',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
