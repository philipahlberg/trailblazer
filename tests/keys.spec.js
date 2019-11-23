import { expect } from 'chai';
import { compile } from '../dist/index.js';

const tests = [
  ['/', []],
  ['/foo', []],
  ['/foo/bar', []],
  ['/:foo', ['foo']],
  ['/:foo/:bar', ['foo', 'bar']],
  ['/:foo/bar', ['foo']],
  ['/foo/:bar', ['bar']],
  ['/:foo?', ['foo']],
  ['/:foo/:bar?', ['foo', 'bar']],
  ['/:foo?/:bar/baz', ['foo', 'bar']],
  ['/foo/:bar/:baz?', ['bar', 'baz']]
];

describe('keys', () => {
  for (const [path, expected] of tests) {
    it(path, () => {
      const { keys } = compile(path, {
        sensitive: false,
        strict: false,
        start: false,
        end: false
      });
      expect(keys).to.deep.equal(expected);
    });
  }
});
