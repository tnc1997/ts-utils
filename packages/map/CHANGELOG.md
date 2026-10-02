# @ts-utils/map

## 2.0.0

### Major Changes

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `max` and `min` when the input map is empty instead of returning `undefined`, so callers can distinguish these errors from other thrown errors without string-matching the message.

- [#119](https://github.com/tnc1997/ts-utils/pull/119) [`9cc7925`](https://github.com/tnc1997/ts-utils/commit/9cc7925394f1ab93b696f4d686b5b71296f75730) Thanks [@tnc1997](https://github.com/tnc1997)! - The package now declares `"engines": { "node": ">=18.0.0" }` and is compiled for Node.js 18. It no longer runs on Node.js 6 or earlier, and package managers that enforce `engines` (such as Yarn 1, or npm with `engine-strict`) will refuse to install it on Node.js versions older than 18. To migrate from 1.x, use Node.js 18 or later.

  The builds now use ES2020 syntax, so they no longer run in browsers without ES2020 support, such as Internet Explorer 11. To support older browsers, transpile the package in your bundler, or stay on 1.x.

- [#109](https://github.com/tnc1997/ts-utils/pull/109) [`8f5e7d1`](https://github.com/tnc1997/ts-utils/commit/8f5e7d16df3d20ab51261807771eed12954fd286) Thanks [@tnc1997](https://github.com/tnc1997)! - This release changes how the package is built and resolved. To migrate from 1.x:

  - The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/map.d.ts` to `dist/map.cjs`, `dist/map.mjs`, `dist/map.umd.js`, and `dist/map.d.cts`/`dist/map.d.mts`.
  - The UMD build (`dist/map.umd.js`) now registers the `tsUtils.map` global instead of `array`. The 1.x build registered the `array` global by mistake, overwriting `@ts-utils/array` if both were loaded. Use `tsUtils.map.max(...)` instead of `array.max(...)`.
  - The package now has an `exports` map, so only the package root and `package.json` can be imported. Deep imports into `dist`, such as `@ts-utils/map/dist/index.js`, no longer resolve.
  - Source maps (`dist/*.js.map`) are no longer included in the package. The built files are not minified, so they are readable without them.

### Patch Changes

- [#146](https://github.com/tnc1997/ts-utils/pull/146) [`f99249b`](https://github.com/tnc1997/ts-utils/commit/f99249b39674350056336a0b30bf5869e9791eb2) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `@example` usage snippets to the JSDoc of every exported function, and `@throws` tags to the functions that throw `InsufficientValuesError`, so that the error appears in editor tooltips. The JSDoc of `InsufficientValuesError` also notes that `instanceof` can fail if more than one copy of the package is loaded, and that `error.name` can be checked instead.

- [#210](https://github.com/tnc1997/ts-utils/pull/210) [`5640a70`](https://github.com/tnc1997/ts-utils/commit/5640a708b2b9bef3ac8ebbd560caddb7713199d1) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `containsKey` to compare keys like `Map.prototype.has`, and `containsValue` to compare values like `Array.prototype.includes`, so they now find `NaN`: `containsKey(new Map([[NaN, 1]]), NaN)` and `containsValue(new Map([["a", NaN]]), NaN)` returned `false` in 1.x and now return `true`. `-0` and `0` are still considered equal. `containsKey` also no longer copies the map's keys into an array, so it takes constant time rather than time proportional to the size of the map.

- [#188](https://github.com/tnc1997/ts-utils/pull/188) [`9ab02f8`](https://github.com/tnc1997/ts-utils/commit/9ab02f87165b1da5759b79171b3fc6d843174f18) Thanks [@tnc1997](https://github.com/tnc1997)! - Changed `max` and `min` to handle `NaN` like `Math.max` and `Math.min`: if the map contains `NaN`, the first entry whose value is `NaN` is returned. In 1.x a `NaN` value could make the result wrong even ignoring `NaN`, e.g. `min(new Map([["a", 3], ["b", NaN], ["c", 1]]))` returned `["a", 3]`. `max` and `min` also now treat `-0` as less than `0`, so the result no longer depends on insertion order. When multiple entries are tied for the maximum or minimum value, the entry that was inserted first is returned, as before.

## 1.1.1

Wed, 03 Jul 2019 10:45:19 GMT

### Patches

- Fix missing npm package types file.

## 1.1.0

Sat, 29 Jun 2019 19:33:18 GMT

### Minor changes

- Add containsKey and containsValue functions.
