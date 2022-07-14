const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { default: dts } = require('rollup-plugin-dts');
const Package = require('./package.json');

const extensions = ['.js', '.mjs', '.ts', '.tsx', '.cjs'];

const resolver = nodeResolve({ jsnext: true, skip: ['effector'], extensions });

const plugins = [
  babel({ extensions, babelHelpers: 'bundled' }),
  resolver,
  commonjs({ extensions }),
  terser({}),
];

const external = Object.keys(Package.peerDependencies);

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
  {
    input,
    external,
    plugins: [resolver, dts()],
    output: {
      file: Package.types,
      format: 'es',
    },
  },
];
