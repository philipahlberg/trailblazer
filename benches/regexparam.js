import { parse } from 'regexparam';

export default [
  ['[regexparam] static', () => {
    parse('/abc');
  }],
  ['[regexparam] parameter', () => {
    parse('/:abc');
  }],
  ['[regexparam] optional', () => {
    parse('/:abc?');
  }],
  ['[regexparam] mixed', () => {
    parse('/abc/:def/:ghi?');
  }]
];
