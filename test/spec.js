var should = require("should");
var sinon = require("sinon");
var app = require("../index.js");

///////////////////////////////////////////////
// Let
///////////////////////////////////////////////

describe("let in a block", function () {

  it("should be block level scope", function () {
    app.variables.let().should.equal("undefined");
  });

});

describe("let in a for loop", function () {

  it("should be block level scope", function () {
    app.variables.loop().should.equal("undefined");
  });

});

///////////////////////////////////////////////
// Const
///////////////////////////////////////////////

describe("const", function () {

  it("changing value should throw an error ", function () {
    (function () { 
      app.variables.testConstValue();
    }).should.throw();
  });

});

///////////////////////////////////////////////
// Classes
///////////////////////////////////////////////

describe("class Tree", function () {

  var t;

  beforeEach(function () {
    t = new app.classes.Tree(5);
  });

  afterEach(function () {
    delete t;
  });

  it("should create a valid instance", function () {
    t.getValue().should.eql(5);
  });

  it("should add a child", function () {
    t.addChild(4);
    t.addChild(new app.classes.Tree(8));
  });

  it("should flatten the tree", function () {
    var t = new app.classes.Tree(5);
    var c = new app.classes.Tree(5);
    var d = new app.classes.Tree(6);
    c.addChild(d);
    t.addChild(c);
    t.flatten().should.eql([5,5,6]);
  });

});

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

///////////////////////////////////////////////
// Object
///////////////////////////////////////////////

describe('Object', function() {

  var Coordinates = function Coordinates (x, y) {
    this.x = x || 42;
    this.y = y || 42;
  };

  Coordinates.prototype.getPosition = function () {
    return { x: this.x, y: this.y};
  };

  it('should be able to change the prototype of an object', function() {

    var position = {};

    (position instanceof Object).should.be.ok();
    (position instanceof Coordinates).should.not.be.ok();

    app.objects.setPrototype(position, Coordinates.prototype);
    (position instanceof Coordinates).should.be.ok();
    (position.getPosition().x).should.eql(42);

  });
});
