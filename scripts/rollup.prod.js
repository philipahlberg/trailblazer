import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

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
      typescript()
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
      typescript(),
      terser({
        module: true,
        ecma: 8
      })
    ]
  }
]
