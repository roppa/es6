'use strict';

require('should');

let app = require('../../index.js');

let Tree = app.classes.Tree;
let Animal = app.classes.Animal;
let Cat = app.classes.Cat;
let Dog = app.classes.Dog;

///////////////////////////////////////////////
// Classes
///////////////////////////////////////////////

describe('class Tree', function () {

  let t;

  beforeEach(function () {
    t = new Tree(5);
  });

  afterEach(() => {
    t = null;
  });

  it('should create a valid instance', function () {
    t.getValue().should.eql(5);
  });

  it('should add a child', function () {
    t.addChild(4);
    t.addChild(new Tree(8));
  });

  it('should flatten the tree', function () {
    let t = new Tree(5);
    let c = new Tree(5);
    let d = new Tree(6);
    c.addChild(d);
    t.addChild(c);
    t.flatten().should.eql([5,5,6]);
  });

});

describe('class Animal', function () {

  it('should have specific attributes', function () {
    let animal = new Animal('mamal', 'anything');
    animal.should.have.properties(['type', 'food', 'position', 'move', 'eat', 'communicate']);
  });

});

describe('class Dog', function () {

  let max;

  beforeEach(function () {
    max = new Dog('Max', 'Dog biscuits');
  });

  afterEach(function () {
    max = null;
  });

  it('should have specific attributes', function () {
    max.should.have.properties(['type', 'food', 'position', 'move', 'eat', 'communicate', 'bark']);
  });

  it('should bark', function () {
    max.bark().should.eql('woof woof');
  });

  it('should eat Dog biscuits', function () {
    max.eat().should.eql('I just ate Dog biscuits');
  });

  it('should get name', function () {
    max.name.should.eql('Max');
  });

  it('should set name', function () {
    max.name = 'Bob';
    max.name.should.eql('Bob');
  });

});

describe('class Cat', function () {

  let snoop;

  beforeEach(function () {
    snoop = new Cat('Snoop', 'Tuna');
  });

  afterEach(function () {
    snoop = null;
  });

  it('should have specific attributes', function () {
    snoop.should.have.properties(['type', 'food', 'position', 'move', 'eat', 'communicate', 'meow']);
  });

  it('should meow', function () {
    snoop.meow().should.eql('Meeooowww');
  });

  it('should eat Cat biscuits', function () {
    snoop.eat().should.eql('I just ate Tuna');
  });

});
