import { compile, execute } from '../dist/index.js';

describe('execute', () => {
  it('returns an empty object', () => {
    const p = execute(compile('/abc'), '/abc');
    expect(p).to.deep.equal({});
  });

  it('returns an empty object if it does not match', () => {
    const p = execute(compile('/abc'), '/ab');
    expect(p).to.deep.equal({});
  });

  it('returns a single parameter', () => {
    const p = execute(compile('/:a'), '/b');
    expect(p).to.deep.equal({ a: 'b' });
  });

  it('returns multiple parameters', () => {
    const p = execute(compile('/:a/:b/:c'), '/1/2/3');
    expect(p).to.deep.equal({ a: '1', b: '2', c: '3' });
  });
});