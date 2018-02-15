import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  // Browser-friendly UMD build.
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['es-cookie', 'invariant'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
]
