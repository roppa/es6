"use strict";

exports = module.exports;

/**
 * Let is like var except it is block level scope, rather than function scope. It is ideal in for loops or "flag" variables.
 * @return {string} Return type using typeof
 */
exports.let = function () {
  {
    let test = "blockScope";
  }
  return typeof test; //undefined
};

exports.loop = function () {
  for (let i = 0; i < 1; i++) {
    let test = "blockScope";
  }
  return typeof test; //undefined
};

/**
 * Const is used to declare a constant value, so once defined a constant shouldn't change.
 * Same goes for redifining the constant value. Because a redeclartion is noops it essentially acts as if it were changing value.
 * @return {string}
 */
exports.testConstValue = function () {

  const constantValue = "unchangeable";
  constantValue = "changed"; //should throw an error
  return constantValue;

};
