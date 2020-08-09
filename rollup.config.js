import module from 'module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].mjs',
  },
  plugins: [
    typescript(),
    resolve({
      preferBuiltins: true,
    }),
  ],
  external: module.builtinModules,
};
