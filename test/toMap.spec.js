import { strict as assert } from 'assert';
import { toMap } from '../dist/index.js';

describe('toMap', () => {
  it('creates a map from two empty arrays', () => {
    const m = toMap([], []);
    assert.deepEqual([...m.entries()], []);
  });

  it('creates a map from two equal size arrays', () => {
    const m = toMap(
      [1, 2],
      ['one', 'two']
    );

    assert.equal(m.get(1), 'one');
    assert.equal(m.get(2), 'two');
  });

  it('creates a map from two different size arrays', () => {
    const m = toMap(
      [1, 2],
      ['one']
    );

    assert.equal(m.get(1), 'one');
    assert.equal(m.get(2), undefined);
  });
});