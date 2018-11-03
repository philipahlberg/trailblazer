import Benchmark from 'benchmark';
import pathToRegexp from 'path-to-regexp';
import { parse, compile } from '../dist/index.mjs';

const suite = new Benchmark.Suite();

suite
  .add('parse', () => {
    parse('/:a/:b/:c');
  })
  .add('compile', () => {
    compile('/:abc/:def');
  })
  .add('compile (exact)', () => {
    compile('/:abc/:def', true);
  })
  .add('pathToRegexp', () => {
    pathToRegexp('/:abc/:def')
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();