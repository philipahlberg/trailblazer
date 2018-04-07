import Benchmark from 'benchmark';
import { compile, execute } from '../dist/index.mjs';

const suite = new Benchmark.Suite();

const compiled = compile('/:abc/:def');

suite
  .add('compile (string)', () => {
    compile('/:abc/:def');
  })
  .add('compile (string, boolean)', () => {
    compile('/:abc/:def', true);
  })
  .add('execute', () => {
    execute(compiled, '/abc/def');
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();