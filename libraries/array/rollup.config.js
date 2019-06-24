const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");

const pkg = require("./package.json");

module.exports = [
  // CommonJS (for node) build and ES (for bundlers) build.
  {
    input: './lib/index.js',
    output: [
      {file: pkg.main, format: 'cjs', sourcemap: true},
      {file: pkg.module, format: 'es', sourcemap: true}
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'rxjs/observable/forkJoin',
      'rxjs/operators'
    ]
  },
  // UMD (for browsers) build.
  {
    input: './lib/index.js',
    output: {name: 'array', file: pkg.browser, format: 'umd', sourcemap: true},
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs({
        include: [
          /node_modules/,
          "../map/dist/index.umd.js"
        ],
        namedExports: {
          "../map/dist/index.umd.js": [
            "max"
          ]
        }
      })
    ]
  }
];
