(() => {

  'use strict';
  /**@ngInject*/

  app
    .controller('VisualsCtrl', ($scope, UsersFactory, SKILLS) => {

      $scope.levelData = [
        {
          value: getPropertyLength('level', 3),
          color: "#235d9b"
        },
        {
          value: getPropertyLength('level', 2),
          color: "#4b90d7"
        },
        {
          value: getPropertyLength('level', 1),
          color: '#7ec0ff'
        }
      ];

      $scope.ageData = [
        {
          value: getAgeLength(33, 100),
          color: "#235d9b"
        },
        {
          value: getAgeLength(26, 32),
          color: "#4b90d7"
        },
        {
          value: getAgeLength(18, 25),
          color: '#7ec0ff'
        }
      ];

      $scope.skillData = SKILLS.map((skill)=>{
        return{
          value: getPropertyLength('skill', skill.name),
          color: skill.color
        }
      });

      function getPropertyLength(prop, value) {
        return UsersFactory.filter((user) => user[prop] == value).length;
      }

      function getAgeLength(min, max) {
        return UsersFactory.filter((user) => user.age >= min && user.age <= max).length;
      }

    });
})();