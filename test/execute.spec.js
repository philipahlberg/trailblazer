import { compile, execute } from '../dist/index.js';

const run = (path, str) => execute(compile(path), str); 

describe('execute', () => {
  it('returns an empty array if no parameters are encoded', () => {
    const values = run('/abc', '/abc');
    expect(values).to.be.empty;
  });

  it('returns an empty array if it does not match', () => {
    const values = run('/abc', '/ab');
    expect(values).to.be.empty;
  });

  it('returns a single parameter', () => {
    const values = run('/:a', '/b');
    expect(values).to.deep.equal(['b']);
  });

  it('returns multiple parameters', () => {
    const values = run('/:a/:b/:c', '/1/2/3');
    expect(values).to.deep.equal(['1', '2', '3']);
  });

  it('ignores query', () => {
    const values = run('/:a/:b/:c', '/1/2/3?q=123');
    expect(values).to.deep.equal(['1', '2', '3']);
  });

  it('ignores hash', () => {
    const values = run('/:a/:b/:c', '/1/2/3#hash');
    expect(values).to.deep.equal(['1', '2', '3']);
  });

  it('ignores query and hash', () => {
    const values = run('/:a/:b/:c', '/1/2/3?q=123#hash');
    expect(values).to.deep.equal(['1', '2', '3']);
  });
});