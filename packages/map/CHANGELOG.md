# @ts-utils/map

## 2.0.0

### Major Changes

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `max` and `min` when the input map is empty instead of returning `undefined`, so callers can distinguish these errors from other thrown errors without string-matching the message.

- [#177](https://github.com/tnc1997/ts-utils/pull/177) [`7e603af`](https://github.com/tnc1997/ts-utils/commit/7e603af903e4a503866022f5918479e47be9e668) Thanks [@tnc1997](https://github.com/tnc1997)! - This release changes how the package is built and resolved. To migrate from 1.x:

  - The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/map.d.ts` to `dist/map.cjs`, `dist/map.mjs`, `dist/map.umd.js`, and `dist/map.d.cts`/`dist/map.d.mts`.
  - The package now has an `exports` map, so only the package root can be imported. Deep imports such as `@ts-utils/map/dist/index.js` and `@ts-utils/map/package.json` no longer resolve.
  - The package now declares `"engines": { "node": ">=18.0.0" }`.

### Patch Changes

- [#146](https://github.com/tnc1997/ts-utils/pull/146) [`f99249b`](https://github.com/tnc1997/ts-utils/commit/f99249b39674350056336a0b30bf5869e9791eb2) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `@example` usage snippets to the JSDoc of every exported function.

## 1.1.1

Wed, 03 Jul 2019 10:45:19 GMT

### Patches

- Fix missing npm package types file.

## 1.1.0

Sat, 29 Jun 2019 19:33:18 GMT

### Minor changes

- Add containsKey and containsValue functions.
