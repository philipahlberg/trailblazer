import { compile } from '../dist/index.js';

describe('compile', () => {
  describe('pattern', () => {
    it('matches a simple path', () => {
      const { pattern } = compile('/abc');
      expect(pattern.test('/abc')).to.be.true;
    });
  
    it('matches loosely', () => {
      const { pattern } = compile('/abc');
      expect(pattern.test('/abc')).to.be.true;
      expect(pattern.test('/abc/def')).to.be.true;
    });
  
    it('matches exactly', () => {
      const { pattern } = compile('/abc', true);
      expect(pattern.test('/abc')).to.be.true;
      expect(pattern.test('/abc/def')).to.be.false;
    });

    it('ignores query', () => {
      const { pattern } = compile('/abc');
      expect(pattern.test('/abc?q=123')).to.be.true;
    });

    it('ignores hash', () => {
      const { pattern } = compile('/abc');
      expect(pattern.test('/abc#hash')).to.be.true;
    });

    it('ignores both query and hash', () => {
      const { pattern } = compile('/abc');
      expect(pattern.test('/abc?q=123#hash'));
    });
  });

  describe('keys', () => {
    it('is empty', () => {
      const { keys } = compile('/');
      expect(keys).to.be.an('array');
      expect(keys).to.be.empty;
    });

    it('contains a key', () => {
      const { keys } = compile('/:param');
      expect(keys).to.deep.equal(['param']);
    });

    it('contains multiple keys', () => {
      const { keys } = compile('/:a/:b/:c');
      expect(keys).to.deep.equal(['a', 'b', 'c']);
    });
  });
});