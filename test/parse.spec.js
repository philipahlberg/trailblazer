import { strict as assert } from 'assert';
import { parse } from '../dist/index.js';

describe('parse', () => {
  it('returns an empty array if no parameters are encoded', () => {
    const keys = parse('/');
    assert.deepEqual(keys, []);
  });

  it('returns a single key', () => {
    const keys = parse('/:param');
    assert.deepEqual(keys, ['param']);
  });

  it('returns multiple keys', () => {
    const keys = parse('/:a/:b/:c');
    assert.deepEqual(keys, ['a', 'b', 'c']);
  });

  it('returns an optional key', () => {
    const keys = parse('/:a?');
    assert.deepEqual(keys, ['a']);
  });
});