(() => {

  'use strict';
  /**@ngInject*/

  app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/people');

    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'pages/people.html',
        controller: 'PeopleCtrl'
      })
      .state('visuals', {
        url: '/visuals',
        templateUrl: 'pages/visuals.html',
        controller: 'VisualsCtrl'
      });

  });

})();