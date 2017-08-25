let should = require('should');

describe('async function', assert => {

  function givemeten() {
    return 10;
  }

  function waitforten() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10);
      }, 10);
    });
  }

  async function givemetwenty() {
    const a = waitforten();
    const b = waitforten();
    return await a + await b;
  }

  it('should handle a returned value', async () => {
    const ten = await givemeten();
    ten.should.eql(10);
  });

  it('should handle a promise', async () => {
    const ten = await waitforten();
    ten.should.eql(10);
  });

  it('when a function depends on an async result, it itself must be prefixed with async', async () => {
    const twenty = await givemetwenty();
    twenty.should.eql(20);
  });
});
