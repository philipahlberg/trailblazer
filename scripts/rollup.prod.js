import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import tsc from 'typescript';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/index.js',
        format: 'es'
      },
      {
        file: './dist/index.mjs',
        format: 'es'
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
      sourcemap: true
    },
    plugins: [
      typescript({
        typescript: tsc
      }),
      terser({
        module: true,
        ecma: 8
      })
    ]
  }
]
