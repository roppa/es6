'use strict';

let should = require('should');
let app = require('../../index.js');

///////////////////////////////////////////////
// Params
///////////////////////////////////////////////

describe('Params', function() {

  it('should handle multiple parameters', done => {
    app.params.add(1,2,3,4,5,6,7,8,9,10).should.eql(55);
    done();
  });

});
