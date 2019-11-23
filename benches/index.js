import Benchmark from 'benchmark';
import trailblazer from './trailblazer.js';
import pathToRegexp from './path-to-regexp.js';
import regexparam from './regexparam.js';

const benchmark = new Benchmark.Suite();

const suites = [
  trailblazer,
  pathToRegexp,
  regexparam
];

for (const suite of suites) {
  for (const [name, fn] of suite) {
    benchmark.add(name, fn);
  }
}

benchmark.on('cycle', event => {
  console.log(String(event.target));
});

benchmark.run();
