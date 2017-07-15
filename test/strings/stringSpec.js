require('should');

const app = require('../../index.js');

///////////////////////////////////////////////
// String Object additions
///////////////////////////////////////////////

describe('String Object additions', () => {
  //uses startsWith and endsWith
  it('Both ends testing, should return true for correct value', () => {
    app.strings.bothEnds('The cat sat on the mat.', 'The cat').should.be.ok();
    app.strings.bothEnds('The cat sat on the mat.', 'THe cat').should.not.be.ok();
    app.strings.bothEnds('The cat sat on the mat.', 'mat.').should.be.ok();
    app.strings.bothEnds('The cat sat on the mat.', 'ma.').should.not.be.ok();

    //should be case sensitive
    app.strings.bothEnds('The cat sat on the mat.', 'The').should.be.ok();
    app.strings.bothEnds('The cat sat on the mat.', 'Mat').should.not.be.ok();
  });

  //includes function
  it('Should return true if a sub-string is included', () => {
    'The cat sat on the mat.'.includes(' cat').should.be.ok();
    'The cat sat on the mat.'.includes(' bat').should.not.be.ok();
    'The cat sat on the mat.'.includes('The').should.be.ok(); //should be case sensitive
    'The cat sat on the mat.'.includes('Sat').should.not.be.ok(); //should be case sensitive
  });

  //includes function with index
  it('Should return true if a sub-string is included at index (starts at 0)', () => {
    'The cat sat on the mat.'.includes(' cat', 3).should.be.ok();
    'The cat sat on the mat.'.includes(' cat', 9).should.not.be.ok();
  });

  //repeat
  it('Should repeat a string the specified times', () => {
    app.strings.lorem(3).length.should.eql(652 * 3);
    app.strings.lorem(-1).length.should.eql(0);
  });
});

describe('String template', () => {
  const name = 'Bob Johnson';
  const welcome = 'Hello';
  const message = 'Great to see you again.';

  //template strings - literals wrapped in back ticks `xxx` allowing embedded expressions like PHP
  ////https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
  it('Should correctly process a string template', () => {
    `${welcome} ${name}. ${message} Thanks!`
      .should.eql('Hello Bob Johnson. Great to see you again. Thanks!');
  });
});
