import GetOptimizationStatus from './v8.mjs';
import { parse, compile } from '../dist/index.mjs';

const isOptimized = fn => {
  return GetOptimizationStatus(fn).Optimized;
}

for (let i = 0; i < 10e3; i++) {
  parse('/:foo');
}

console.log(isOptimized(parse));

for (let i = 0; i < 10e3; i++) {
  compile('/:foo');
}

console.log(isOptimized(parse));