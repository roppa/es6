'use strict';

module.exports = exports = {};

exports.later = () => {

  return new Promise(function (resolve, reject) {

    setTimeout(() => {
      resolve('later');
    }, 100);

  });

};

exports.owch = () => {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject('owch');
    }, 100);
  });

};

exports.fast = () => {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('fast!');
    }, 100);
  });

};

exports.medium = () => {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('medium');
    }, 200);
  });

};

exports.slow = () => {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('s l o w');
    }, 300);
  });

};
