"use strict";
var should = require("should");
var sinon = require("sinon");
var app = require("../../index.js");

///////////////////////////////////////////////
// String Object additions
///////////////////////////////////////////////

describe("String Object additions", function () {

  //uses startsWith and endsWith
  it("Both ends testing, should return true for correct value", () => {
    app.strings.bothEnds("The cat sat on the mat.", "The cat").should.be.ok();
    app.strings.bothEnds("The cat sat on the mat.", "THe cat").should.not.be.ok();
    app.strings.bothEnds("The cat sat on the mat.", "mat.").should.be.ok();
    app.strings.bothEnds("The cat sat on the mat.", "ma.").should.not.be.ok();
    //should be case sensitive
    app.strings.bothEnds("The cat sat on the mat.", "The").should.be.ok();
    app.strings.bothEnds("The cat sat on the mat.", "Mat").should.not.be.ok();
  });

  //includes function
  it("Should return true if a sub-string is included", () => {
    "The cat sat on the mat.".includes(" cat").should.be.ok();
    "The cat sat on the mat.".includes(" bat").should.not.be.ok();
    "The cat sat on the mat.".includes("The").should.be.ok(); //should be case sensitive
    "The cat sat on the mat.".includes("Sat").should.not.be.ok(); //should be case sensitive
  });

  //includes function with index
  it("Should return true if a sub-string is included at index (starts at 0)", () => {
    "The cat sat on the mat.".includes(" cat", 3).should.be.ok();
    "The cat sat on the mat.".includes(" cat", 9).should.not.be.ok();
  });

  //repeat
  it("Should repeat a string the specified times", () => {
    app.strings.lorem(3).length.should.eql(645 * 3);
    app.strings.lorem(-1).length.should.eql(0);
  });

});