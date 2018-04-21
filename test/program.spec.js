import { program, map, object } from '../dist/index.js';

describe('program', () => {
  it('applies object reducer', () => {
    const fn = program('/:a/:b/:c', object);
    const entries = fn('/1/2/3');
    expect(entries).to.deep.equal({ a: '1', b: '2', c: '3' });
  });

  it('applies map reducer', () => {
    const fn = program('/:a/:b/:c', map);
    const entries = fn('/1/2/3');
    expect(entries).to.be.a('map');
    expect(entries).to.have.keys('a', 'b', 'c');
    expect(entries).to.include('1', '2', '3');
  });
});