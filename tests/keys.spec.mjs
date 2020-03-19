import { assertEqual } from 'windtunnel';
import { compile } from '../dist/index.min.mjs';

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

export function keys() {
  for (const [path, expected] of tests) {
    const { keys } = compile(path, {
      sensitive: false,
      strict: false,
      start: false,
      end: false
    });

    assertEqual(keys, expected);
  }
}
