"use strict";

module.exports = exports = {};

//Notes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
//Object.prototype.__proto__ is part of the es6 spec, but it is recommended not to use it. 

/**
 * Example of the SetPrototypeOf static method. 
 * @param  {object} obj   [description]
 * @param  {} proto [description]
 * @return {[type]}       [description]
 */
exports.setPrototype = (obj, proto) => {
  Object.setPrototypeOf(obj, proto);
  obj.constructor();
};


//Object.is()


