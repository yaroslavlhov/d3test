(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('UserInfoCtrl', (user, $scope) => {

      $scope.user = user;
      console.log(user);

    });
})();