import minify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';
import tsc from 'typescript';
import pkg from '../package.json';

const banner = `/*
  Expressionist v${pkg.version}
  https://github.com/philipahlberg/expressionist
  https://www.npmjs.com/package/@philipahlberg/expressionist
  Released under MIT License.
*/`;

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/index.js',
        format: 'es',
        // banner
      },
      {
        file: './dist/index.mjs',
        format: 'es',
        // banner
      }
    ],
    plugins: [
      typescript({
        typescript: tsc
      })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.min.js',
      format: 'es',
      sourcemap: true,
      banner
    },
    plugins: [
      typescript({
        typescript: tsc
      }),
      minify({
        toplevel: true
      })
    ]
  }
]
