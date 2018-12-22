import { strict as assert } from 'assert';
import { compile, execute } from '../dist/index.js';

const loose = (path, str) => execute(compile(path, false), str);
const exact = (path, str) => execute(compile(path, true), str);

describe('execute', () => {
  describe('loose', () => {
    it('returns no values for static matches', () => {
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

    it('returns a single parameter if it does match (optional)', () => {
      const values = loose('/:a?', '/b');
      assert.deepEqual(values, ['b']);
    });
  
    it('returns multiple parameters if it does match', () => {
      const values = loose('/:a/:b/:c', '/1/2/3');
      assert.deepEqual(values, ['1', '2', '3']);
    });

    it('returns no parameters if the input is a subset', () => {
      const values = loose('/:a/:b/:c', '/1/2');
      assert.deepEqual(values, []);
    });

    it('returns multiple parameters if the input is a superset', () => {
      const values = loose('/:a/:b/:c', '/1/2/3/4');
      assert.deepEqual(values, ['1', '2', '3']);
    });

    it('returns undefined for unmatched optional parameters', () => {
      const values = loose('/:a?', '/');
      assert.deepEqual(values, [undefined]);
    });
  });

  describe('exact', () => {
    it('returns no values for static matches', () => {
      const values = exact('/abc', '/abc');
      assert.deepEqual(values, []);
    });
  
    it('returns no values if it does not match', () => {
      const values = exact('/abc', '/ab');
      assert.deepEqual(values, []);
    });
  
    it('returns a single value in a single parameter match', () => {
      const values = exact('/:a', '/1');
      assert.deepEqual(values, ['1']);
    });

    it('returns a single value in a single optional parameter match', () => {
      const values = exact('/:a?', '/b');
      assert.deepEqual(values, ['b']);
    });
  
    it('returns multiple values in a multiple parameter match', () => {
      const values = exact('/:a/:b/:c', '/1/2/3');
      assert.deepEqual(values, ['1', '2', '3']);
    });

    it('returns no values if the input is a subset', () => {
      const values = exact('/:a/:b/:c', '/1/2');
      assert.deepEqual(values, []);
    });

    it('returns no values if the input is a superset', () => {
      const values = exact('/:a/:b/:c', '/1/2/3/4');
      assert.deepEqual(values, []);
    });

    it('returns undefined for unmatched optional parameters', () => {
      const values = exact('/:a?', '/');
      assert.deepEqual(values, [undefined]);
    });
  });
});