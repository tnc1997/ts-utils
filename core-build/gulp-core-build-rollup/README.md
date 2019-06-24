# @ts-utils/gulp-core-build-rollup

`gulp-core-build-rollup` is a `gulp-core-build` subtask which introduces the ability to bundle various source files into a set of bundles, using rollup.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Fgulp-core-build-rollup.svg)](https://badge.fury.io/js/%40ts-utils%2Fgulp-core-build-rollup)
[![Dependencies](https://david-dm.org/tnc1997/ts-utils%3Fpath%3Dcore-build%2Fgulp-core-build-rollup.svg)](https://david-dm.org/tnc1997/ts-utils%3Fpath%3Dcore-build%2Fgulp-core-build-rollup)

# Tasks

## RollupTask

### Description
This task invokes rollup using a consumer-specified `rollup.config.js` on a package.

### Command Line Options
If the `--initrollup` flag is passed to the command line, this task will initialize a `rollup.config.js` which bundles `lib/index.js` into `dist/{packagename}.js as a UMD module.

### Config
```typescript
interface IRollupConfig {
    configPath: string;
    config?: RollupOptions;
    suppressWarnings?: (string | RegExp)[];
    rollup?: typeof Rollup;
    printStats?: boolean;
}
```

Usage:
```typescript
build.rollup.setConfig({
  configPath: './rollup.config.js'
});
```
