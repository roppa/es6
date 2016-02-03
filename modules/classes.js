'use strict';

exports = module.exports = {};

/**
 * Example of class using a Tree structure.
 */
class Tree {

  constructor (value) {
    this.value = value;
    this.children = [];
  }

  addChild (child) {
    child instanceof Tree ? this.children.push(child) : this.children.push(new Tree(child));
  }

  getValue () {
    return this.value;
  }

  getChildren () {
    return this.children;
  }

  flatten () {
    var result = [];
    var traverse = (child) => {
      result.push(child.getValue());
      child.getChildren().forEach(function (c) {
        traverse(c);
      });
    };
    traverse(this);
    return result;
  }

}

exports.Tree = Tree;

///////////////////////////////////////////////////////////////////////////
// Example with inheritance
///////////////////////////////////////////////////////////////////////////

/*
* Animal super class
*/
class Animal {

  constructor (type, food, position) {
    this.type = type;
    this.food = food;
    this.position = position || {
      x: 0,
      y: 0,
      z: 0
    };

  }

  move (position) {
    this.position = position;
  }

  eat (food) {
    return 'I just ate ' + this.food;
  }

  communicate (noise) {
    return noise;
  }

  get name () {
    return this._name;
  }

  set name (name) {
    this._name = name;
  }

}

exports.Animal = Animal;

/*
* Dog class
*/
class Dog extends Animal {

  constructor (name, food, position) {
    super('Dog', food, position);
    this.name = name;
  }

  bark () {
    return this.communicate('woof woof');
  }

}

exports.Dog = Dog;

/*
* Cat class
*/
class Cat extends Animal {

  constructor (name, food, position) {
    super('Cat', food, position);
    this.name = name;
  }

  meow () {
    return this.communicate('Meeooowww');
  }

}

exports.Cat = Cat;
