'use strict';

exports = module.exports;

/**
 * Just an example of declaring a arrows function with no parameters
 * @return {string} "Hello world"
 */
exports.noParams = () => {
  return 'Hello world';
};

/**
 * Example with one parameter. If a function needs to provide an iterator when the
 * user does not pass one in, this will be handy
 *
 * @param  {any} identity
 * @return {any} returns parameter
 */
exports.identity = identity => identity;

/**
 * Return an array of the first n elements of an array. If n is undefined, return just the first element.
 * @param  {array} array
 * @param  {number} n number of items to slice
 * @return {element or array} returns first element or slice of an array
 */
exports.first = (array, n) => n === undefined ? array[0] : array.slice(0, n);

/**
 * Similar to coffeescript the => arrow is a function expression. Arrow functions are anonymous.
 * Format: (param1, param2, paramN) => expression, from dev.mozilla
 * @return {}
 */
exports.reduce = (...params) => {
  return params.reduce((a, b) => a + b, 0);
};

/**
 * Another example of the fat arrow along with parameters ...args.
 * @param {...args} a collection of elements or arrays
 * @return {array} flattened collections
 */
exports.flatten = (...args) => {
  let result = [];
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      arg.forEach(element => {
        if (Array.isArray(element)) {
          result = result.concat(this.flatten(element));
        } else {
          result.push(element);
        }
      });
    } else {
      result.push(arg);
    }
  });
  return result;
};

/**
 * Delay calling a function. Arrow functions do not have their own "this", instead it
 * is inherited from the surrounding scope.
 * Remember, the main things the parameter "this" refer to is global context, function
 * context (global), method i.e. this refers to the thing to the left of the dot, call, apply, and also bind.
 *
 * @param  {function} func is the function to execute. Pass in any parameters after wait.
 * @param  {number} wait in miliseconds i.e. 1000 is approx a second
 */
exports.delay = (func, wait, ...args) => {
  setTimeout(() => func.apply(func, args), wait);
};
