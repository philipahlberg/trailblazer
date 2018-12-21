import { strict as assert } from 'assert';
import { compile, execute } from '../dist/index.js';

const loose = (path, str) => execute(compile(path, false), str);
const exact = (path, str) => execute(compile(path, true), str);

describe('execute', () => {
  describe('loose', () => {
    it('returns an empty array if no parameters are encoded', () => {
      const values = loose('/abc', '/abc');
      assert.deepEqual(values, []);
    });
  
    it('returns an empty array if it does not match', () => {
      const values = loose('/abc', '/ab');
      assert.deepEqual(values, []);
    });
  
    it('returns a single parameter if it does match', () => {
      const values = loose('/:a', '/b');
      assert.deepEqual(values, ['b']);
    });
  
    it('returns multiple parameters if it does match', () => {
      const values = loose('/:a/:b/:c', '/1/2/3');
      assert.deepEqual(values, ['1', '2', '3']);
    });

    it('returns no parameters if it does not match (subset)', () => {
      const values = loose('/:a/:b/:c', '/1/2');
      assert.deepEqual(values, []);
    });

    it('returns multiple parameters if it does match (superset)', () => {
      const values = loose('/:a/:b/:c', '/1/2/3/4');
      assert.deepEqual(values, ['1', '2', '3']);
    });
  });

  describe('exact', () => {
    it('returns an empty array if no parameters are encoded', () => {
      const values = exact('/abc', '/abc');
      assert.deepEqual(values, []);
    });
  
    it('returns an empty array if it does not match', () => {
      const values = exact('/abc', '/ab');
      assert.deepEqual(values, []);
    });
  
    it('returns a single parameter if it does match', () => {
      const values = exact('/:a', '/1');
      assert.deepEqual(values, ['1']);
    });
  
    it('returns multiple parameters if it does match', () => {
      const values = exact('/:a/:b/:c', '/1/2/3');
      assert.deepEqual(values, ['1', '2', '3']);
    });

    it('returns no parameters if it does not match (subset)', () => {
      const values = exact('/:a/:b/:c', '/1/2');
      assert.deepEqual(values, []);
    });

    it('returns no parameters if it does not match (superset)', () => {
      const values = exact('/:a/:b/:c', '/1/2/3/4');
      assert.deepEqual(values, []);
    });
  });
});