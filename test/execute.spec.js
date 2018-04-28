import { compile, execute } from '../dist/index.js';

const loose = (path, str) => execute(compile(path), str);
const exact = (path, str) => execute(compile(path, true), str);

describe('execute', () => {
  describe('loose', () => {
    it('returns an empty array if no parameters are encoded', () => {
      const values = loose('/abc', '/abc');
      expect(values).to.be.empty;
    });
  
    it('returns an empty array if it does not match', () => {
      const values = loose('/abc', '/ab');
      expect(values).to.be.empty;
    });
  
    it('returns a single parameter if it does match', () => {
      const values = loose('/:a', '/b');
      expect(values).to.deep.equal(['b']);
    });
  
    it('returns multiple parameters if it does match', () => {
      const values = loose('/:a/:b/:c', '/1/2/3');
      expect(values).to.deep.equal(['1', '2', '3']);
    });

    it('returns no parameters if it does not match (subset)', () => {
      const values = loose('/:a/:b/:c', '/1/2');
      expect(values).to.be.empty;
    });

    it('returns multiple parameters if it does match (superset)', () => {
      const values = loose('/:a/:b/:c', '/1/2/3/4');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  
    it('ignores query', () => {
      const values = loose('/:a/:b/:c', '/1/2/3?q=123');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  
    it('ignores hash', () => {
      const values = loose('/:a/:b/:c', '/1/2/3#hash');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  
    it('ignores query and hash', () => {
      const values = loose('/:a/:b/:c', '/1/2/3?q=123#hash');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  });

  describe('exact', () => {
    it('returns an empty array if no parameters are encoded', () => {
      const values = exact('/abc', '/abc');
      expect(values).to.be.empty;
    });
  
    it('returns an empty array if it does not match', () => {
      const values = exact('/abc', '/ab');
      expect(values).to.be.empty;
    });
  
    it('returns a single parameter if it does match', () => {
      const values = exact('/:a', '/1');
      expect(values).to.deep.equal(['1']);
    });
  
    it('returns multiple parameters if it does match', () => {
      const values = exact('/:a/:b/:c', '/1/2/3');
      expect(values).to.deep.equal(['1', '2', '3']);
    });

    it('returns no parameters if it does not match (subset)', () => {
      const values = exact('/:a/:b/:c', '/1/2');
      expect(values).to.be.empty;
    });

    it('returns no parameters if it does not match (superset)', () => {
      const values = exact('/:a/:b/:c', '/1/2/3/4');
      expect(values).to.be.empty;
    });
  
    it('ignores query', () => {
      const values = exact('/:a/:b/:c', '/1/2/3?q=123');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  
    it('ignores hash', () => {
      const values = exact('/:a/:b/:c', '/1/2/3#hash');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  
    it('ignores query and hash', () => {
      const values = exact('/:a/:b/:c', '/1/2/3?q=123#hash');
      expect(values).to.deep.equal(['1', '2', '3']);
    });
  });
});