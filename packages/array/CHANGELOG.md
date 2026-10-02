# @ts-utils/array

## 3.0.0

### Major Changes

- [#119](https://github.com/tnc1997/ts-utils/pull/119) [`9cc7925`](https://github.com/tnc1997/ts-utils/commit/9cc7925394f1ab93b696f4d686b5b71296f75730) Thanks [@tnc1997](https://github.com/tnc1997)! - The package now declares `"engines": { "node": ">=18.0.0" }` and is compiled for Node.js 18. It no longer runs on Node.js 6 or earlier, and package managers that enforce `engines` (such as Yarn 1, or npm with `engine-strict`) will refuse to install it on Node.js versions older than 18. To migrate from 2.x, use Node.js 18 or later.

  The builds now use ES2020 syntax, so they no longer run in browsers without ES2020 support, such as Internet Explorer 11. To support older browsers, transpile the package in your bundler, or stay on 2.x. `mapAsync` and `filterAsync` with `stopOnError: false` also require `AggregateError` (ES2021).

- [#109](https://github.com/tnc1997/ts-utils/pull/109) [`8f5e7d1`](https://github.com/tnc1997/ts-utils/commit/8f5e7d16df3d20ab51261807771eed12954fd286) Thanks [@tnc1997](https://github.com/tnc1997)! - This release changes how the package is built and resolved. To migrate from 2.x:

  - The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/array.d.ts` to `dist/array.cjs`, `dist/array.mjs`, `dist/array.umd.js`, and `dist/array.d.cts`/`dist/array.d.mts`.
  - The UMD build (`dist/array.umd.js`) now registers the `tsUtils.array` global instead of `array`, so that it is less likely to clash with other scripts on the page. Use `tsUtils.array.max(...)` instead of `array.max(...)`.
  - The package now has an `exports` map, so only the package root and `package.json` can be imported. Deep imports into `dist`, such as `@ts-utils/array/dist/index.js`, no longer resolve.
  - Source maps (`dist/*.js.map`) are no longer included in the package. The built files are not minified, so they are readable without them.

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `max`, `mean`, `median`, `min`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message. This is a breaking change for `max`, `min`, and `mode`: `max([])` and `min([])` previously returned `undefined`, and `mode([])` previously returned `-1`, and all three now throw. `sum([])` and `mean([])` previously threw a native `TypeError` ("Reduce of empty array with no initial value"), and `median` and `range` previously threw a bare `Error`.

### Minor Changes

- [#137](https://github.com/tnc1997/ts-utils/pull/137) [`7d8ade6`](https://github.com/tnc1997/ts-utils/commit/7d8ade642483dfd585592e5743c9a5fcba3c7bd1) Thanks [@tnc1997](https://github.com/tnc1997)! - Added an optional `options` object to `mapAsync` and `filterAsync`, with two options:

  - `concurrency` caps how many callback invocations run at once. It defaults to `Infinity`, preserving the existing unlimited-concurrency behavior. The value must be a positive integer or `Infinity`; any other value (such as `NaN`, `0`, a negative number, or a fraction) throws a `RangeError`.
  - `stopOnError` controls what happens when a callback rejects. By default (`true`), the returned promise rejects with the first rejection reason as soon as it happens, and no further callbacks are started; callbacks that are already running are not cancelled. When `false`, every callback is invoked, and the returned promise then rejects with an `AggregateError` containing every rejection reason.

  For example, `mapAsync(array, callback, { concurrency: 2 })` runs at most two callbacks at once.

  The options types are exported as `MapAsyncOptions` and `FilterAsyncOptions`.

### Patch Changes

- [#146](https://github.com/tnc1997/ts-utils/pull/146) [`f99249b`](https://github.com/tnc1997/ts-utils/commit/f99249b39674350056336a0b30bf5869e9791eb2) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `@example` usage snippets to the JSDoc of every exported function, and `@throws` tags to the functions that throw `InsufficientValuesError`, so that the error appears in editor tooltips. The JSDoc of `InsufficientValuesError` also notes that `instanceof` can fail if more than one copy of the package is loaded, and that `error.name` can be checked instead.

- [#210](https://github.com/tnc1997/ts-utils/pull/210) [`5640a70`](https://github.com/tnc1997/ts-utils/commit/5640a708b2b9bef3ac8ebbd560caddb7713199d1) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `contains` to compare values like `Array.prototype.includes`, so it now finds `NaN`: `contains([NaN], NaN)` returned `false` in 2.x and now returns `true`. Like `includes`, empty slots in sparse arrays are now read as `undefined`, so `contains([1, , 3], undefined)` also returns `true` instead of `false`. `-0` and `0` are still considered equal.

- [#117](https://github.com/tnc1997/ts-utils/pull/117) [`9bc0801`](https://github.com/tnc1997/ts-utils/commit/9bc0801ff2f1f1227896858a84992d407362cc5b) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `max` and `min` to no longer mutate their input. They previously sorted the caller's array in place.

- [#187](https://github.com/tnc1997/ts-utils/pull/187) [`0dc5ed5`](https://github.com/tnc1997/ts-utils/commit/0dc5ed56d6494b39ab7f2e98c0cfba639c8592c3) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `max`, `min`, and `range` to handle `NaN` like `Math.max` and `Math.min`: the result is now `NaN` whenever the array contains `NaN` (or an empty slot). In 2.x the result depended on where `NaN` appeared, e.g. `max([1, NaN, 3])` returned `1` but `max([NaN, 1, 3])` returned `NaN`. `max` and `min` also now treat `-0` as less than `0`, so `max([-0, 0])` returns `0` and `min([0, -0])` returns `-0`.

- [#190](https://github.com/tnc1997/ts-utils/pull/190) [`3b441a1`](https://github.com/tnc1997/ts-utils/commit/3b441a11dcb71ed7be6fad13a073cd860650871e) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `median` to return `NaN` whenever the array contains `NaN` (or an empty slot), consistent with `max`, `min`, and `range`. In 2.x, `NaN` values and empty slots were sorted to the end of the array and the middle value was taken from what remained, e.g. `median([1, NaN, 3])` and `median([1, , 3])` both returned `3`.

- [#110](https://github.com/tnc1997/ts-utils/pull/110) [`23fcc1e`](https://github.com/tnc1997/ts-utils/commit/23fcc1e37d14b56086450c3664b6c479cb6d8a9f) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `median` and `range` to no longer mutate their input. They previously sorted the caller's array in place.

- [#111](https://github.com/tnc1997/ts-utils/pull/111) [`37e3308`](https://github.com/tnc1997/ts-utils/commit/37e3308dad48a8fea3db744ee41cc050d41b5e74) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `median` and `range` to sort numerically. They previously sorted values as strings, so `median([10, 9, 1])` returned `10` instead of `9`, and `range([10, 9, 1])` returned `8` instead of `9`.

- [#187](https://github.com/tnc1997/ts-utils/pull/187) [`0dc5ed5`](https://github.com/tnc1997/ts-utils/commit/0dc5ed56d6494b39ab7f2e98c0cfba639c8592c3) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `range` to return `0` when all of the values in the array are equal, including when they are infinite. In 2.x, `range([Infinity, Infinity])` returned `NaN`, because `Infinity - Infinity` is `NaN`. Arrays containing `NaN` still return `NaN`.

- [#113](https://github.com/tnc1997/ts-utils/pull/113) [`2b765e9`](https://github.com/tnc1997/ts-utils/commit/2b765e9c394b4ae5b0fd9aefbb6115259ddfd9d1) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `median` and `range` to support single-element arrays. `median([5])` and `range([5])` previously threw an `Error`, and now return `5` and `0` respectively.

- [#193](https://github.com/tnc1997/ts-utils/pull/193) [`af127ab`](https://github.com/tnc1997/ts-utils/commit/af127ab9868f97f2b807e0a37ce0120cf7f1878e) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `mapAsync` and `filterAsync` to only visit the indexes below the array's initial length, like `Array.prototype.map` and `Array.prototype.filter`, so values appended to the array by the callback are no longer processed. `filterAsync` now also keeps the values passed to the callback, rather than reading them from the array after all callbacks have settled.

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
