var should = require("should");
var sinon = require("sinon");
var app = require("../../index.js");

///////////////////////////////////////////////
// Arrow functions
///////////////////////////////////////////////

describe("arrows", function () {

  describe("identity", function () {

    it("should return itself", function () {
      app.arrows.identity("string").should.equal("string");
    });
  
  });

  it("no parameters should return test", function () {
    app.arrows.noParams().should.equal("Hello world");
  });

  describe("reduce", function () {

    it("should add all values of varying arity", function () {
      app.arrows.reduce(1,2,3,4).should.equal(10);
    });

  });

  describe("first", function () {

    it("should return first element when no second param", function () {
      app.arrows.first([1,2,3,4]).should.equal(1);
    });

    it("should slice 2 elements from beginning", function () {
      app.arrows.first([1,2,3,4], 2).should.eql([1,2]);
    });

  });

  describe("delay", function () {

    var clock;
    var callback;

    before(function () { clock = sinon.useFakeTimers(); });
    after(function () { clock.restore(); });

    beforeEach(function () {
      callback = sinon.spy();
    });

    it("should only execute the function after the specified wait time", function (done) {
      app.arrows.delay(callback, 100);
      clock.tick(99);
      should(callback.notCalled).be.ok();
      clock.tick(1);
      should(callback.calledOnce).be.ok();
      done();
    });

    it("should have successfully passed function arguments in", function(done) {
      app.arrows.delay(callback, 100, 1, 2);
      clock.tick(100);
      callback.calledWith(1, 2).should.be.ok();
      done();
    });

    it("should keep reference to object when called as a method", function (done) {
      var result;
      var Car = function (make) {
        this.make = make;
      };
      var ford = new Car("Ford");

      Car.prototype.getMake = function () {
        return this.make;
      };

      app.arrows.delay(() => result = ford.getMake(), 100);
      clock.tick(100);
      result.should.eql("Ford");
      done();

    });

  });

});