"use strict";

exports = module.exports = {};

/**
 * Example of class using a Tree structure.
 */
exports.Tree = class Tree {

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

};

