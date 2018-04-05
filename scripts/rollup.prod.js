import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-uglify';
import ts from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'es'
    },
    plugins: [
      ts({typescript}),
      resolve()
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
      ts({typescript}),
      resolve(),
      minify()
    ]
  }
]