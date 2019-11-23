import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";
import debug from './rollup.debug.js';

export default [
  debug,
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.min.mjs',
        format: 'es'
      }
    ],
    plugins: [
      typescript(),
      terser({
        toplevel: true
      })
    ]
  }
];
