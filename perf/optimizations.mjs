import { GetOptimizationStatus } from './v8.mjs';
import { parse, compile, execute, expressionist, toObject, toMap } from '../dist/index.mjs';

GetOptimizationStatus(compile);

for (let i = 0; i < 10e3; i++) {
  compile('/:foo');
}

GetOptimizationStatus(compile);