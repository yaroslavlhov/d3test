(() => {
  "use strict";
  /**@ngInject*/

  app.factory('UsersFactory', () => [
      {
        name: 'John Doe',
        age: 25,
        skill: 'Javascript',
        level: 1
      },
    {
      name: 'John Doe',
      age: 31,
      skill: 'Python',
      level: 2
    },
    {
      name: 'John Doe',
      age: 19,
      skill: 'Javascript',
      level: 3
    },
    {
      name: 'John Doe',
      age: 40,
      skill: 'C++',
      level: 1
    },
    {
      name: 'John Doe',
      age: 31,
      skill: 'Java',
      level: 2
    }
    ]
  );

})();