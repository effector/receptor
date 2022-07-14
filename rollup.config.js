const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const Package = require('./package.json')

const plugins = [
  nodeResolve({ jsnext: true, skip: ['effector'], extensions: ['.js', '.mjs'] }),
  commonjs({ extensions: ['.js', '.mjs'] }),
  terser({}),
];

const external = Object.keys(Package.peerDependencies)

const input = 'src/index.ts';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input,
    external,
    plugins,
    output: {
      file: Package.module,
      format: 'es',
      sourcemap: true,
      externalLiveBindings: false,
    },
  },
  {
    input,
    external,
    plugins,
    output: {
      file: Package.main,
      format: 'cjs',
      freeze: false,
      exports: 'named',
      sourcemap: true,
      externalLiveBindings: false,
    },
  },
  {
    input,
    external,
    plugins,
    output: {
      name: 'effectorReceptor',
      file: Package.browser,
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      freeze: false,
      globals: {
        effector: 'effector',
      },
    },
  },
];
