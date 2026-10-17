# TypeScript Utilities

[![Compatibility](https://github.com/tnc1997/ts-utils/actions/workflows/compatibility.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/compatibility.yml)
[![Lint](https://github.com/tnc1997/ts-utils/actions/workflows/lint.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/lint.yml)
[![Size](https://github.com/tnc1997/ts-utils/actions/workflows/size.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/size.yml)
[![Test](https://github.com/tnc1997/ts-utils/actions/workflows/test.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/test.yml)

Small, focused utility packages for built-in JavaScript types, published to npm under the `@ts-utils` scope.

The packages have a few things in common:

- They're written in TypeScript, and the type declarations are included, so there's no separate `@types` package to install.
- They're marked `"sideEffects": false`, so bundlers using the ES module build can leave out any functions you don't use.
- Functions that need at least one value, such as `max` and `mean`, throw an `InsufficientValuesError` for empty input rather than returning `undefined` or a sentinel value.
- Numeric functions handle `NaN` the same way as [`Math.max`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max): if the input contains `NaN`, the result is `NaN` (or, for the `Map` functions `max` and `min`, the first entry whose value is `NaN`).

## Installation

```sh
npm install @ts-utils/array @ts-utils/map
```

Each package can also be installed on its own.

## Packages

### [@ts-utils/array](./packages/array)

Utilities for the `Array` type: statistics, counting, and concurrency-limited async mapping and filtering.

[![npm version](https://img.shields.io/npm/v/@ts-utils/array)](https://www.npmjs.com/package/@ts-utils/array)
[![npm license](https://img.shields.io/npm/l/@ts-utils/array)](./packages/array/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@ts-utils/array)](https://www.npmjs.com/package/@ts-utils/array)

| Export                                                                                                                                                      | Description                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`contains`](./packages/array/README.md#containstarray-t-value-t-boolean)                                                                                   | Determines if an array contains a specified value.                                |
| [`count`](./packages/array/README.md#counttarray-t-callback-value-t--boolean-number)                                                                        | Returns the number of values in an array that optionally satisfy a condition.     |
| [`filterAsync`](./packages/array/README.md#filterasynctarray-t-callback-value-t-index-number-array-t--promiseunknown-options-filterasyncoptions---promiset) | Filters the values in an array asynchronously, with optional limited concurrency. |
| [`frequencies`](./packages/array/README.md#frequenciestarray-t-mapt-number)                                                                                 | Returns the frequency of each value in an array.                                  |
| [`mapAsync`](./packages/array/README.md#mapasynct1-t2array-t1-callback-value-t1-index-number-array-t1--promiset2-options-mapasyncoptions---promiset2)       | Maps the values in an array asynchronously, with optional limited concurrency.    |
| [`max`](./packages/array/README.md#maxarray-number-number)                                                                                                  | Returns the maximum value of an array.                                            |
| [`mean`](./packages/array/README.md#meanarray-number-number)                                                                                                | Returns the mean of an array of numerical values.                                 |
| [`median`](./packages/array/README.md#medianarray-number-number)                                                                                            | Returns the median of an array of numerical values.                               |
| [`min`](./packages/array/README.md#minarray-number-number)                                                                                                  | Returns the minimum value of an array.                                            |
| [`mode`](./packages/array/README.md#modearray-number-number)                                                                                                | Returns the mode of an array of numerical values.                                 |
| [`range`](./packages/array/README.md#rangearray-number-number)                                                                                              | Returns the range of an array of numerical values.                                |
| [`sum`](./packages/array/README.md#sumarray-number-number)                                                                                                  | Returns the sum of the values of a numerical array.                               |
| [`InsufficientValuesError`](./packages/array/README.md#insufficientvalueserror)                                                                             | Thrown when an array does not contain enough values to perform a calculation.     |

```ts
import { mean, sum } from "@ts-utils/array";

sum([1, 2, 3]); // 6

mean([1, 2, 3]); // 2
```

### [@ts-utils/map](./packages/map)

Utilities for the `Map` type: lookups, conversion to arrays, and the entries with the maximum and minimum values.

[![npm version](https://img.shields.io/npm/v/@ts-utils/map)](https://www.npmjs.com/package/@ts-utils/map)
[![npm license](https://img.shields.io/npm/l/@ts-utils/map)](./packages/map/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@ts-utils/map)](https://www.npmjs.com/package/@ts-utils/map)

| Export                                                                                      | Description                                                                |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`containsKey`](./packages/map/README.md#containskeyt1-t2map-mapt1-t2-key-t1-boolean)       | Determines whether a map contains a specified key.                         |
| [`containsValue`](./packages/map/README.md#containsvaluet1-t2map-mapt1-t2-value-t2-boolean) | Determines whether a map contains a specified value.                       |
| [`entries`](./packages/map/README.md#entriest1-t2map-mapt1-t2-t1-t2)                        | Returns a two dimensional array of the entries of a map.                   |
| [`keys`](./packages/map/README.md#keyst1-t2map-mapt1-t2-t1)                                 | Returns an array of the keys of a map.                                     |
| [`max`](./packages/map/README.md#maxtmap-mapt-number-t-number)                              | Returns the entry with the maximum value of a map.                         |
| [`min`](./packages/map/README.md#mintmap-mapt-number-t-number)                              | Returns the entry with the minimum value of a map.                         |
| [`values`](./packages/map/README.md#valuest1-t2map-mapt1-t2-t2)                             | Returns an array of the values of a map.                                   |
| [`InsufficientValuesError`](./packages/map/README.md#insufficientvalueserror)               | Thrown when a map does not contain enough values to perform a calculation. |

```ts
import { entries, max } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
]);

entries(map); // [["a", 1], ["b", 2]]

max(map); // ["b", 2]
```

## Runtime support

The packages support Node.js 18 and later. The builds are compiled to ES2015 syntax, and built-in APIs newer than ES2015 aren't required, so they also run in browsers that support ES2015.

Each package ships three builds:

- a CommonJS build, used by `require`;
- an ES module build, used by `import` and by bundlers that support the `exports` field;
- a UMD build, which can be loaded with a `<script>` tag, e.g. from [jsDelivr](https://www.jsdelivr.com/), and registers the functions on the `tsUtils.array` and `tsUtils.map` globals.

For `<script>` tag examples, see the package READMEs: [`@ts-utils/array`](./packages/array/README.md#using-a-script-tag) and [`@ts-utils/map`](./packages/map/README.md#using-a-script-tag).

## Upgrading

Each package's README has an upgrading guide listing what callers need to change for each major version:

- [`@ts-utils/array`](./packages/array/README.md#upgrading)
- [`@ts-utils/map`](./packages/map/README.md#upgrading)

## Links

- [Contributing](./CONTRIBUTING.md): how to build, test, and change the packages, and how releases happen.
- Changelogs: [`@ts-utils/array`](./packages/array/CHANGELOG.md), [`@ts-utils/map`](./packages/map/CHANGELOG.md).
- [Licence](./LICENSE): the packages are released under the MIT licence.
