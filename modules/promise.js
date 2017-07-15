module.exports = exports = {};

exports.later = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('later');
  }, 100);
});

exports.owch = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject('owch');
  }, 100);
});

exports.fast = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('fast!');
  }, 100);
});

exports.medium = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('medium');
  }, 200);
});

exports.slow = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('s l o w');
  }, 300);
});
