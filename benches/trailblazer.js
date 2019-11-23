import trailblazer from '../dist/index.js';

export default [
  ['[trailblazer] static', () => {
    trailblazer('/abc', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] parameter', () => {
    trailblazer('/:abc', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] optional', () => {
    trailblazer('/:abc?', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }],
  ['[trailblazer] mixed', () => {
    trailblazer('/abc/:def/:ghi?', {
      sensitive: false,
      strict: false,
      start: true,
      end: true
    });
  }]
];
