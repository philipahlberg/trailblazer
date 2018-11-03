import { strict as assert } from 'assert';
import { pipeline } from '../dist/index.js';

describe('pipeline', () => {
  it('returns a function', () => {
    const fn = pipeline('/');
    assert.equal(typeof fn, 'function');
  });

  it('creates a map', () => {
    const fn = pipeline('/:a/:b/:c');
    const map = fn('/1/2/3');
    assert.equal(map.get('a'), '1');
    assert.equal(map.get('b'), '2');
    assert.equal(map.get('c'), '3');
  });
});