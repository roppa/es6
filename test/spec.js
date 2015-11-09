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
