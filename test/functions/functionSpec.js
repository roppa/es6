let should = require('should');
let sinon = require('sinon');
let app = require('../../index.js');

///////////////////////////////////////////////
// Arrow functions
///////////////////////////////////////////////

describe('arrows', () => {

  describe('identity', () => {

    it('should return itself', () => {
      app.arrows.identity('string').should.equal('string');
    });

  });

  it('no parameters should return test', () => {
    app.arrows.noParams().should.equal('Hello world');
  });

  describe('reduce', () => {

    it('should add all values of varying arity', () => {
      app.arrows.reduce(1,2,3,4).should.equal(10);
    });

  });

  describe('flatten', () => {

    it('should reduce nested arrays', () => {
      app.arrows.flatten(1,2,[3,4]).should.eql([1,2,3,4]);
      app.arrows.flatten(1,2,[3,4],[5,6]).should.eql([1,2,3,4,5,6]);
      app.arrows.flatten(1,2,[3,4],[5,6,[7,8]]).should.eql([1,2,3,4,5,6,7,8]);
      app.arrows.flatten(1,[2,[3,4]],[5,[6,[7,8]]]).should.eql([1,2,3,4,5,6,7,8]);
    });

  });

  describe('first', () => {

    it('should return first element when no second param', () => {
      app.arrows.first([1,2,3,4]).should.equal(1);
    });

    it('should slice 2 elements from beginning', () => {
      app.arrows.first([1,2,3,4], 2).should.eql([1,2]);
    });

  });

  describe('delay', () => {

    let clock;
    let callback;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    beforeEach(() => {
      callback = sinon.spy();
    });

    it('should only execute the function after the specified wait time', done => {
      app.arrows.delay(callback, 100);
      clock.tick(99);
      should(callback.notCalled).be.ok();
      clock.tick(1);
      should(callback.calledOnce).be.ok();
      done();
    });

    it('should have successfully passed function arguments in', function(done) {
      app.arrows.delay(callback, 100, 1, 2);
      clock.tick(100);
      callback.calledWith(1, 2).should.be.ok();
      done();
    });

    it('should keep reference to object when called as a method', done => {
      let result;
      let Car = function (make) {
        this.make = make;
      };
      let ford = new Car('Ford');

      Car.prototype.getMake = function () {
        return this.make;
      };

      app.arrows.delay(() => result = ford.getMake(), 100);
      clock.tick(100);
      result.should.eql('Ford');
      done();

    });

  });

});
