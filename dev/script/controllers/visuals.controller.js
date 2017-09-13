(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('VisualsCtrl', ($scope, UsersFactory) => {

      $scope.levelData = [
        {
          name: "Blue",
          value: getPropertyLength('level', 1),
          color: "#235d9b"
        },
        {
          name: "Green",
          value: getPropertyLength('level', 2),
          color: "#4b90d7"
        },
        {
          name: "Orange",
          value: getPropertyLength('level', 3),
          color: '#7ec0ff'
        }
      ];

      function getPropertyLength(prop, value) {
        return UsersFactory.filter((user) => user[prop] == value).length;
      }

    });
})();