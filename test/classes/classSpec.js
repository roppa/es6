var should = require("should");
var sinon = require("sinon");
var app = require("../../index.js");

var Tree = app.classes.Tree;

var Animal = app.classes.Animal;
var Cat = app.classes.Cat;
var Dog = app.classes.Dog;

///////////////////////////////////////////////
// Classes
///////////////////////////////////////////////

describe("class Tree", function () {

  var t;

  beforeEach(function () {
    t = new Tree(5);
  });

  afterEach(function () {
    delete t;
  });

  it("should create a valid instance", function () {
    t.getValue().should.eql(5);
  });

  it("should add a child", function () {
    t.addChild(4);
    t.addChild(new Tree(8));
  });

  it("should flatten the tree", function () {
    var t = new Tree(5);
    var c = new Tree(5);
    var d = new Tree(6);
    c.addChild(d);
    t.addChild(c);
    t.flatten().should.eql([5,5,6]);
  });

});

describe("class Animal", function () {

  it("should have specific attributes", function () {
    var animal = new Animal("mamal", "anything");
    animal.should.have.properties(["type", "food", "position", "move", "eat", "communicate"]);
  });

});

describe("class Dog", function () {

  var max;

  beforeEach(function () {
    max = new Dog("Max", "Dog biscuits");
  });

  afterEach(function () {
    delete max;
  });

  it("should have specific attributes", function () {
    max.should.have.properties(["type", "food", "position", "move", "eat", "communicate", "bark"]);
  });

  it("should bark", function () {
    max.bark().should.eql("woof woof");  
  });
  
  it("should eat Dog biscuits", function () {
    max.eat().should.eql("I just ate Dog biscuits");  
  });
  
});

describe("class Cat", function () {

  var snoop;

  beforeEach(function () {
    snoop = new Cat("Snoop", "Tuna");
  });

  afterEach(function () {
    delete snoop;
  });

  it("should have specific attributes", function () {
    snoop.should.have.properties(["type", "food", "position", "move", "eat", "communicate", "meow"]);
  });

  it("should meow", function () {
    snoop.meow().should.eql("Meeooowww");  
  });
  
  it("should eat Cat biscuits", function () {
    snoop.eat().should.eql("I just ate Tuna");  
  });
  
});
