import expressionist from '../dist/index.js';

describe('expressionist', () => {
  it('returns a function', () => {
    expect(expressionist('/')).to.be.a('function');
  });

  it('creates a map', () => {
    const fn = expressionist('/:a/:b/:c');
    const entries = fn('/1/2/3');
    expect(entries).to.be.a('map');
    expect(entries).to.have.keys('a', 'b', 'c');
    expect(entries).to.include('1', '2', '3');
  });
});