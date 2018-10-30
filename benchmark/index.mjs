import Benchmark from 'benchmark';
import {
  parse,
  compile,
  execute,
  program,
  object,
  map
} from '../dist/index.mjs';

const suite = new Benchmark.Suite();
const pattern = compile('/:abc/:def');
const fn = program('/:abc/:def');

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
  .add('execute', () => {
    execute(pattern, '/abc/def');
  })
  .add('program [compilation]', () => {
    program('/:abc/:def');
  })
  .add('program (exact) [compilation]', () => {
    program('/:abc/:def', true);
  })
  .add('program (map) [execution]', () => {
    fn('/abc/def');
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();