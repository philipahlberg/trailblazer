import { map } from '../dist/index.js';

const keys = m => [...m.keys()];
const values = m => [...m.values()];

describe('map', () => {
  it('creates a map from two empty arrays', () => {
    const m = map([], []);
    expect(m).to.be.empty;
  });

  it('creates a map from two equal size arrays', () => {
    const m = map(['one', 'two'], ['three', 'four']);
    expect(keys(m))
      .to.have.members(['one', 'two']);
    expect(values(m))
      .to.have.members(['three', 'four']);
  });

  it('creates a map from two different size arrays', () => {
    const m = map(['one', 'two'], ['three']);
    expect(keys(m))
      .to.have.members(['one', 'two']);
    expect(values(m))
      .to.have.members(['three', undefined]);
  });
});