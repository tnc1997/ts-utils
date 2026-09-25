# @ts-utils/array

## 3.0.0

### Major Changes

- [#153](https://github.com/tnc1997/ts-utils/pull/153) [`abecdd9`](https://github.com/tnc1997/ts-utils/commit/abecdd959b49df4b16428ce62e2d65cda6ad977c) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `max` and `min` to throw `InsufficientValuesError` when the input array is empty, instead of returning `undefined`, matching `mean`, `median`, `mode`, `range`, and `sum`.

- [#177](https://github.com/tnc1997/ts-utils/pull/177) [`7e603af`](https://github.com/tnc1997/ts-utils/commit/7e603af903e4a503866022f5918479e47be9e668) Thanks [@tnc1997](https://github.com/tnc1997)! - This release changes how the package is built and resolved. To migrate from 2.x:

  - The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/array.d.ts` to `dist/array.cjs`, `dist/array.mjs`, `dist/array.umd.js`, and `dist/array.d.cts`/`dist/array.d.mts`.
  - The package now has an `exports` map, so only the package root can be imported. Deep imports such as `@ts-utils/array/dist/index.js` and `@ts-utils/array/package.json` no longer resolve.
  - The package now declares `"engines": { "node": ">=18.0.0" }`.

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `mean`, `median`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message. `mode([])` previously returned `-1` and now throws, which is a breaking change. `sum([])` and `mean([])` previously threw a native `TypeError` ("Reduce of empty array with no initial value"), and `median` and `range` previously threw a bare `Error`.

### Minor Changes

- [#137](https://github.com/tnc1997/ts-utils/pull/137) [`7d8ade6`](https://github.com/tnc1997/ts-utils/commit/7d8ade642483dfd585592e5743c9a5fcba3c7bd1) Thanks [@tnc1997](https://github.com/tnc1997)! - Add an optional `concurrency` parameter to `mapAsync` (and thread it through `filterAsync`) to cap how many callback invocations run at once, using a worker-pool pattern. Defaults to `Infinity`, preserving the existing unlimited-concurrency behavior. The value must be a positive integer or `Infinity`; any other value (such as `NaN`, `0`, a negative number, or a fraction) throws a `RangeError`.

### Patch Changes

- [#146](https://github.com/tnc1997/ts-utils/pull/146) [`f99249b`](https://github.com/tnc1997/ts-utils/commit/f99249b39674350056336a0b30bf5869e9791eb2) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `@example` usage snippets to the JSDoc of every exported function.

- [#176](https://github.com/tnc1997/ts-utils/pull/176) [`620b8f7`](https://github.com/tnc1997/ts-utils/commit/620b8f75bacb7d84434b4c757b9efa6e817a62d8) Thanks [@tnc1997](https://github.com/tnc1997)! - Fixed several bugs in the array calculations, which change the results of some calls:

  - `median` and `range` now sort numerically. They previously sorted values as strings, so `median([10, 9, 1])` returned `10` instead of `9`, and `range([10, 9, 1])` returned `8` instead of `9`.
  - `max`, `min`, `median`, and `range` no longer mutate their input. They previously sorted the caller's array in place.
  - `median` and `range` now support single-element arrays. `median([5])` and `range([5])` previously threw an `Error`, and now return `5` and `0` respectively.

- [#166](https://github.com/tnc1997/ts-utils/pull/166) [`bae62ab`](https://github.com/tnc1997/ts-utils/commit/bae62ab687773087d0ccb30b8654cae4674c4487) Thanks [@tnc1997](https://github.com/tnc1997)! - Widened the `filterAsync` callback's return type from `Promise<boolean>` to `Promise<unknown>`, matching `Array.prototype.filter`: values are kept when the callback resolves to a truthy value.

- [#171](https://github.com/tnc1997/ts-utils/pull/171) [`b02f468`](https://github.com/tnc1997/ts-utils/commit/b02f4682e93912a71466b9fe1a6d92ac76dfb099) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `mapAsync` to preserve holes in sparse arrays, like `Array.prototype.map`: the callback is not called for empty slots, which remain empty in the result instead of being filled with `undefined`. This now applies with or without a `concurrency` limit.

## 2.0.2

Fri, 18 Oct 2019 19:19:27 GMT

### Patches

- Fix the max and min functions.

## 2.0.1

Wed, 03 Jul 2019 10:45:19 GMT

### Patches

- Fix missing npm package types file.

## 2.0.0

Sat, 29 Jun 2019 19:33:18 GMT

### Breaking changes

- Refactor the package and replace `Observable` with `Promise`.
