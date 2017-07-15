const should = require('should');
const app = require('../../index.js');

describe('Params', () => {
  it('should handle multiple parameters', done => {
    app.params.add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).should.eql(55);
    done();
  });
});
