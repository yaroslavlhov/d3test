(() => {
  "use strict";
  /**@ngInject*/

  app
    .config(($stateProvider) => {

      $stateProvider
      // Main URS
        .state('app', {
          abstract: true,
          url: '/app'
        })
        .state("otherwise", {url: '/app'});
    });
})();