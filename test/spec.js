var should = require("should");
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
      app.testConstValue();
    }).should.throw();
  });

});

///////////////////////////////////////////////
// Arrows
///////////////////////////////////////////////

describe("arrows", function () {

  it("identity should return itself", function () {
    app.arrows.identity("string").should.equal("string");
  });

  it("no parameters should return test", function () {
    app.arrows.noParams().should.equal("Hello world");
  });

  it("should add all values of varying arity", function () {
    app.arrows.reduce(1,2,3,4).should.equal(10);
  });

  it("two parameters should return param1 + param2", function () {
    app.arrows.first([1,2,3,4]).should.equal(1);
    app.arrows.first([1,2,3,4], 2).should.eql([1,2]);
  });


});

