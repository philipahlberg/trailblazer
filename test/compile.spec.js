import { compile } from '../dist/index.js';

describe('compile', () => {
  it('matches a simple path', () => {
    const pattern = compile('/abc');
    expect(pattern.test('/abc')).to.be.true;
  });

  it('matches loosely', () => {
    const pattern = compile('/abc');
    expect(pattern.test('/abc')).to.be.true;
    expect(pattern.test('/abc/def')).to.be.true;
  });

  it('matches exactly', () => {
    const pattern = compile('/abc', true);
    expect(pattern.test('/abc')).to.be.true;
    expect(pattern.test('/abc/def')).to.be.false;
  });

  it('matches loosely with parameters', () => {
    const pattern = compile('/:a/:b/:c');
    expect(pattern.test('/1/2/3')).to.be.true;
  });

  it('matches exactly with parameters', () => {
    const pattern = compile('/:a/:b/:c', true);
    expect(pattern.test('/1/2/3')).to.be.true;
    expect(pattern.test('/1/2')).to.be.false;
    expect(pattern.test('/1')).to.be.false;
  });

  it('ignores query', () => {
    const pattern = compile('/abc');
    expect(pattern.test('/abc?q=123')).to.be.true;
  });

  it('ignores hash', () => {
    const pattern = compile('/abc');
    expect(pattern.test('/abc#hash')).to.be.true;
  });

  it('ignores query and hash', () => {
    const pattern = compile('/abc');
    expect(pattern.test('/abc?q=123#hash'));
  });
});