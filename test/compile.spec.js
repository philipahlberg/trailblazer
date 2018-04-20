import { compile } from '../dist/index.js';

describe('compile', () => {
  describe('loose', () => {
    it('matches a simple path', () => {
      const pattern = compile('/abc');
      expect(pattern.test('/abc')).to.be.true;
      expect(pattern.test('/def')).to.be.false;
      expect(pattern.test('/abc/def')).to.be.true;
    });

    it('matches parameters', () => {
      const pattern = compile('/:a/:b/:c');
      expect(pattern.test('/1/2/3/4')).to.be.true;
      expect(pattern.test('/1/2/3')).to.be.true;
      expect(pattern.test('/1/2')).to.be.false;
      expect(pattern.test('/1')).to.be.false;
    });

    it('ignores query', () => {
      const pattern = compile('/abc');
      expect(pattern.test('/abc?q=123')).to.be.true;
      expect(pattern.test('/def?q=123')).to.be.false;
      expect(pattern.test('/abc/def?q=123')).to.be.true;
    });
  
    it('ignores hash', () => {
      const pattern = compile('/abc');
      expect(pattern.test('/abc#hash')).to.be.true;
      expect(pattern.test('/def#hash')).to.be.false;
      expect(pattern.test('/abc/def#hash')).to.be.true;
    });
  
    it('ignores query and hash', () => {
      const pattern = compile('/abc');
      expect(pattern.test('/abc?q=123#hash')).to.be.true;
      expect(pattern.test('/def?q=123#hash')).to.be.false;
      expect(pattern.test('/abc/def?q=123#hash')).to.be.true;
    });
  });

  describe('exact', () => {
    it('matches a simple path', () => {
      const pattern = compile('/abc', true);
      expect(pattern.test('/abc')).to.be.true;
      expect(pattern.test('/def')).to.be.false;
      expect(pattern.test('/abc/def')).to.be.false;
    });

    it('matches parameters', () => {
      const pattern = compile('/:a/:b/:c', true);
      expect(pattern.test('/1/2/3/4')).to.be.false;
      expect(pattern.test('/1/2/3')).to.be.true;
      expect(pattern.test('/1/2')).to.be.false;
      expect(pattern.test('/1')).to.be.false;
    });

    it('does not ignore query', () => {
      const pattern = compile('/abc', true);
      expect(pattern.test('/abc?q=123')).to.be.false;
      expect(pattern.test('/def?q=123')).to.be.false;
      expect(pattern.test('/abc/def?q=123')).to.be.false;
    });
  
    it('does not ignore hash', () => {
      const pattern = compile('/abc', true);
      expect(pattern.test('/abc#hash')).to.be.false;
      expect(pattern.test('/def#hash')).to.be.false;
      expect(pattern.test('/abc/def#hash')).to.be.false;
    });
  
    it('does not ignore query and hash', () => {
      const pattern = compile('/abc', true);
      expect(pattern.test('/abc?q=123#hash')).to.be.false;
      expect(pattern.test('/def?q=123#hash')).to.be.false;
      expect(pattern.test('/abc/def?q=123#hash')).to.be.false;
    });
  });
});