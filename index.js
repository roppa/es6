"use strict";

var es6 = {};

///////////////////////////////////////////////////////////////
// let and const
///////////////////////////////////////////////////////////////

es6.variables = {};

/**
 * Let is like var except it is block level scope, rather than function scope. It is ideal in for loops or "flag" variables.
 * @return {string} Return type using typeof
 */
es6.variables.let = function () {
  {
    let test = "blockScope";
  }
  return typeof test; //undefined
};

es6.variables.loop = function () {
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
es6.testConstValue = function () {

  const constantValue = "unchangeable";
  constantValue = "changed"; //should throw an error
  return constantValue;

};

///////////////////////////////////////////////////////////////
// arrow functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
///////////////////////////////////////////////////////////////

es6.arrows = {};

/**
 * Just an example of declaring a arrows function with no parameters
 * @return {string} "Hello world"
 */
es6.arrows.noParams = () => { return "Hello world" };

/**
 * Example with one parameter. If a function needs to provide an iterator when the user does not pass one in, this will be handy
 * @param  {any} identity
 * @return {any} returns parameter
 */
es6.arrows.identity = identity => identity;

/**
 * Return an array of the first n elements of an array. If n is undefined, return just the first element.
 * @param  {array]} array
 * @param  {number} n number of items to slice
 * @return {element or array} returns first element or slice of an array
 */
es6.arrows.first = (array, n) => { 
  return n === undefined ? array[0] : array.slice(0, n);
};

/**
 * Similar to coffeescript the => arrow is a function expression. Arrow functions are anonymous.
 * Format: (param1, param2, paramN) => expression, from dev.mozilla
 * @return {}  
 */
es6.arrows.reduce = function () {
  var params = Array.prototype.slice.call(arguments);
  return params.reduce((a, b) => a + b, 0);
};

///////////////////////////////////////////////////////////////
// Exports
///////////////////////////////////////////////////////////////

module.exports = exports = es6;
