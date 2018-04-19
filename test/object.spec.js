import { object } from '../dist/index.js';

const keys = o => Object.keys(o);
const values = o => Object.values(o);

describe('object', () => {
  it('creates an object from two empty arrays', () => {
    const o = object([], []);
    expect(o).to.be.empty;
  });

  it('creates an object from two equal size arrays', () => {
    const o = object(['one', 'two'], ['three', 'four']);
    expect(keys(o))
      .to.have.members(['one', 'two']);
    expect(values(o))
      .to.have.members(['three', 'four']);
  });

  it('creates an object from two different size arrays', () => {
    const o = object(['one', 'two'], ['three']);
    expect(keys(o))
      .to.have.members(['one', 'two']);
    expect(values(o))
      .to.have.members(['three', undefined]);
  });
});