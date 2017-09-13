(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('PeopleCtrl', (UsersFactory, $scope, $uibModal) => {

      $scope.getUsers = getUsers;
      $scope.openModal = openModal;
      $scope.deleteUser = deleteUser;

      $scope.levels = [0,1,2];
      $scope.users = UsersFactory;
      $scope.newuser = {
        name: '',
        age: 18,
        skill: '',
        level: 1
      };

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

      function deleteUser(id) {
        let index = $scope.users.findIndex((user)=> user.id == id);
        if (index){
          $scope.users.splice(index,1);
        }
      }
      
      function openModal(user) {
        $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'pages/user-info.html',
          controller: 'UserInfoCtrl',
          size: 'md',
          resolve: {
            user: () => user,
          }
        }).result.then((res) => {
        }, () => {
        })
      }

    });
})();