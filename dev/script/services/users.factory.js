(() => {
  "use strict";
  /**@ngInject*/

  app.factory('UsersFactory', () => [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
        skill: 'Javascript',
        level: 1
      },
      {
        id: 2,
        name: 'John Doe',
        age: 31,
        skill: 'Python',
        level: 2
      },
      {
        id: 3,
        name: 'John Doe',
        age: 19,
        skill: 'Javascript',
        level: 3
      },
      {
        id: 4,
        name: 'John Doe',
        age: 40,
        skill: 'C++',
        level: 1
      },
      {
        id: 5,
        name: 'John Doe',
        age: 31,
        skill: 'Java',
        level: 2
      }
    ]
  );

})();