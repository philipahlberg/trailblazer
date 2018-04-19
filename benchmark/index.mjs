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
const readAsObject = program('/:abc/:def', object);
const readAsMap = program('/:abc/:def', map);

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
    program('/:abc/:def', object);
  })
  .add('program (object) [execution]', () => {
    readAsObject('/abc/def');
  })
  .add('program (map) [execution]', () => {
    readAsMap('/abc/def');
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();