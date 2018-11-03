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

  it('ignores query', () => {
    const keys = parse('/:a/:b/:c?q=123');
    assert.deepEqual(keys, ['a', 'b', 'c']);
  });

  it('ignores hash', () => {
    const keys = parse('/:a/:b/:c#hash');
    assert.deepEqual(keys, ['a', 'b', 'c']);
  });

  it('ignores query and hash', () => {
    const keys = parse('/:a/:b/:c?q=123#hash');
    assert.deepEqual(keys, ['a', 'b', 'c']);
  });
});