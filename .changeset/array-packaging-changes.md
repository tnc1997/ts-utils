---
"@ts-utils/array": major
---

This release changes how the package is built and resolved. To migrate from 2.x:

- The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/array.d.ts` to `dist/array.cjs`, `dist/array.mjs`, `dist/array.umd.js`, and `dist/array.d.cts`/`dist/array.d.mts`.
- The package now has an `exports` map, so only the package root can be imported. Deep imports such as `@ts-utils/array/dist/index.js` and `@ts-utils/array/package.json` no longer resolve.
- The package now declares `"engines": { "node": ">=18.0.0" }`.
