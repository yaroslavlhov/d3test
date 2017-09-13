(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('UserInfoCtrl', (user, $scope, $uibModalInstance, UsersFactory, SKILLS) => {

      $scope.close = close;
      $scope.getArray = getArray;
      $scope.saveUser = saveUser;

      $scope.user = angular.copy(user);
      $scope.skills = SKILLS;

      function close() {
        $uibModalInstance.close();
      }

      function saveUser() {
        let users = UsersFactory;
        if (!$scope.user.id) {
          if (users.length) {
            $scope.user.id = users[users.length - 1].id + 1;
          } else {
            $scope.user.id = 1;
          }
          users.push($scope.user);
        } else {
          let index = users.findIndex((user) => user.id == $scope.user.id);
          if (index >= 0) {
            users[index] = $scope.user;
          }
        }
        close();
      }

      function getArray(count, inc) {
        let array = new Array(count);
        array.fill(1);
        array.forEach((item, index) => {
          array[index] = index + inc;
        });
        return array;
      }

    });
})();