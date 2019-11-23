import { pathToRegexp } from 'path-to-regexp';

export default [
  ['[path-to-regexp] static', () => {
    const keys = [];
    pathToRegexp('/abc', keys);
  }],
  ['[path-to-regexp] parameter', () => {
    const keys = [];
    pathToRegexp('/:abc', keys);
  }],
  ['[path-to-regexp] optional', () => {
    const keys = [];
    pathToRegexp('/:abc?', keys);
  }],
  ['[path-to-regexp] mixed', () => {
    const keys = [];
    pathToRegexp('/abc/:def/:ghi?', keys);
  }]
];
