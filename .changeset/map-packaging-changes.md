---
"@ts-utils/map": major
---

pr: #109

This release changes how the package is built and resolved. To migrate from 1.x:

- The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/map.d.ts` to `dist/map.cjs`, `dist/map.mjs`, `dist/map.umd.js`, and `dist/map.d.cts`/`dist/map.d.mts`.
- The package now has an `exports` map, so only the package root and `package.json` can be imported. Deep imports into `dist`, such as `@ts-utils/map/dist/index.js`, no longer resolve.
