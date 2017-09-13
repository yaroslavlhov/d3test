(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('PeopleCtrl', (UsersFactory, $scope) => {

      $scope.getUsers = getUsers;

      $scope.levels = [0,1,2];
      $scope.users = UsersFactory;

      function getUsers() {
        return $scope.users.filter((user)=>{
          if (!$scope.search) return true;
          for(let attr in user){
            let prop  = user[attr].toString().toLocaleLowerCase();
            if (prop.indexOf($scope.search) !== -1) return true
          }
          return false;
        });
      }

    });
})();