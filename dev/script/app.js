let app = angular.module('testapp', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
]).constant('SKILLS', [
  {name: 'Javascript', color: '#7ec0ff', id: '1'},
  {name: 'Java', color: '#4b90d7', id: '2'},
  {name: 'Python', color: '#235d9b', id: '3'},
  {name: 'C++', color: '#d2e9ff', id: '4'},
  ]);

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function (value) {

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    var start = arguments[1];
    var relativeStart = start >> 0;

    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    while (k < final) {
      O[k] = value;
      k++;
    }

    return O;
  };
}