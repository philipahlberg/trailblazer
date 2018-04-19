import { parse } from '../dist/index.js';

describe('parse', () => {
  it('is empty', () => {
    const keys = parse('/');
    expect(keys).to.be.an('array');
    expect(keys).to.be.empty;
  });

  it('contains a key', () => {
    const keys = parse('/:param');
    expect(keys).to.deep.equal(['param']);
  });

  it('contains multiple keys', () => {
    const keys = parse('/:a/:b/:c');
    expect(keys).to.deep.equal(['a', 'b', 'c']);
  });

  it('ignores query', () => {
    const keys = parse('/:a/:b/:c?q=123');
    expect(keys).to.deep.equal(['a', 'b', 'c']);
  });

  it('ignores hash', () => {
    const keys = parse('/:a/:b/:c#hash');
    expect(keys).to.deep.equal(['a', 'b', 'c']);
  });

  it('ignores query and hash', () => {
    const keys = parse('/:a/:b/:c?q=123#hash');
    expect(keys).to.deep.equal(['a', 'b', 'c']);
  });
});