'use strict';

module.exports = exports = {};

//Notes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
//Object.prototype.__proto__ is part of the es6 spec, but it is recommended not to use it.

/**
 * Example of the SetPrototypeOf static method.
 * @param  {object} obj   [description]
 * @param  {} proto [description]
 */
exports.setPrototype = (obj, proto) => {
  Object.setPrototypeOf(obj, proto);
  obj.constructor();
};

//Object.is(param1, param2) fixes JavaScripts quirky == and === operators.
//It doesn't do any coersion of values, and NaN does equal NaN.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

//Object.assign is like "extending" an object
//exports.extend = (obj)
