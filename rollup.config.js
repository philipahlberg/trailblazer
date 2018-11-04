import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

const raw = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es'
    },
    {
      file: 'dist/index.mjs',
      format: 'es'
    }
  ],
  plugins: [
    typescript()
  ]
};

const min = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.min.js',
    format: 'es'
  },
  plugins: [
    typescript(),
    terser({ module: true })
  ]
};

export default flags => {
  if (flags.configTest) {
    return [raw];
  } else {
    return [raw, min];
  }
}