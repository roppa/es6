'use strict';

require('should');
let app = require('../../index.js');

///////////////////////////////////////////////
// Promise
///////////////////////////////////////////////

describe('Promise', function() {

  it('Should resolve and trigger then', function (done) {
    app.promise.later()
      .then(function (result) {
        result.should.eql('later');
        done();
      });
  });

  /**
   * Example showing chained then
   */
  it('Should chain "then"', function (done) {
    app.promise.later()
      .then(function (result) {
        return result + ', chained once';
      })
      .then(function (result) {
        return result + ', chained twice';
      })
      .then(function (result) {
        return result + ', chained thrice';
      })
      .then(function (result) {
        result.should.eql('later, chained once, chained twice, chained thrice');
        done();
      });
  });

  /**
   * Example showing reject
   */
  it('Should catch', function (done) {
    app.promise.owch()
      .then((result) => {
        //Should not be called
      })
      .catch((reason) => {
        reason.should.eql('owch');
        done();
      });
  });

  /**
   * Example of Promise.all
   */
  it('Should wait for all promises to resolve', function (done) {
    Promise.all([app.promise.later(), app.promise.later(), app.promise.later()])
      .then((values) => {
        values.should.eql(['later', 'later', 'later']);
        done();
      });
  });

  /**
   * Example of Promise.all with reject and catch
   */
  it('Should reject if one of the promises rejects', function (done) {
    Promise.all([app.promise.later(), app.promise.owch(), app.promise.later()])
      .then((values) => {
        //Should not be called
      })
      .catch((reason) => {
        reason.should.eql('owch');
        done();
      });
  });

  /**
   * Example of Promise.race
   */
  it('Should get the fastest', function (done) {
    Promise.race([app.promise.slow(), app.promise.medium(), app.promise.fast()])
      .then((result) => {
        result.should.eql('fast!');
        done();
      });
  });

});
