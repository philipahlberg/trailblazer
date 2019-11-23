import regexparam from 'regexparam';

export default [
  ['[regexparam] static', () => {
    regexparam('/abc');
  }],
  ['[regexparam] parameter', () => {
    regexparam('/:abc');
  }],
  ['[regexparam] optional', () => {
    regexparam('/:abc?');
  }],
  ['[regexparam] mixed', () => {
    regexparam('/abc/:def/:ghi?');
  }]
];
