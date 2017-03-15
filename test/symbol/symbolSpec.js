'use strict';
require('should');

let app = require('../../index.js');

describe('Uing a symbol for a key', () => {

  const Animal = app.symbol;
  let bingo = new Animal('dog', 'mamal');

  it('should have properties', () => {
    bingo.name.should.eql('dog');
    bingo.type.should.eql('mamal');
  });

  it('should throw when trying to change private attribute', () => {
    (() => {
      bingo.type = 'wolf';
    }).should.throw();
  });

});
