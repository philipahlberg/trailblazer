import { strict as assert } from 'assert';
import { toObject } from '../dist/index.js';

describe('toObject', () => {
  it('creates an object from two empty arrays', () => {
    const o = toObject([], []);
    assert.deepEqual(o, {});
  });

  it('creates an object from two equal size arrays', () => {
    const o = toObject(['1', '2'], ['one', 'two']);
    assert.deepEqual(o, {
      '1': 'one',
      '2': 'two'
    });
  });

  it('creates an object from two different size arrays', () => {
    const o = toObject(['1', '2'], ['one']);
    assert.deepEqual(o, {
      '1': 'one',
      '2': undefined
    });
  });
});