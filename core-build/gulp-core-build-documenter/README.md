# @ts-utils/gulp-core-build-documenter

`gulp-core-build-documenter` is a `gulp-core-build` subtask which introduces the ability to generate documentation, using api-documenter.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Fgulp-core-build-documenter.svg)](https://badge.fury.io/js/%40ts-utils%2Fgulp-core-build-documenter)
[![Dependencies](https://david-dm.org/tnc1997/ts-utils%3Fpath%3Dcore-build%2Fgulp-core-build-documenter.svg)](https://david-dm.org/tnc1997/ts-utils%3Fpath%3Dcore-build%2Fgulp-core-build-documenter)

# Tasks

## ApiDocumenterTask

### Description
This task invokes api-documenter on a package.

### Config
```typescript
interface IApiDocumenterTaskConfig {
  format: Format;
  inputFolder?: string;
  outputFolder?: string;
}

type Format = 'markdown' | 'yaml';
```

Usage:
```typescript
build.apiDocumenter.setConfig({
  format: 'markdown'
});
```
