import typescript from 'rollup-plugin-typescript';
import transpiler from 'typescript';

export default {
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
}