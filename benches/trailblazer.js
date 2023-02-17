import { compile } from '../dist/index.mjs';

export default [
  ['[trailblazer] static', () => {
    compile('/abc', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] parameter', () => {
    compile('/:abc', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] optional', () => {
    compile('/:abc?', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] mixed', () => {
    compile('/abc/:def/:ghi?', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }]
];
