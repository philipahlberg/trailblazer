import minify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';
import transpiler from 'typescript';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'es'
    },
    plugins: [
      typescript({
        typescript: transpiler
      })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.mjs',
      format: 'es'
    },
    plugins: [
      typescript({
        typescript: transpiler
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
        typescript: transpiler
      }),
      minify()
    ]
  }
]