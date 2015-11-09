var should = require("should");
var sinon = require("sinon");
var app = require("../../index.js");

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
