---
"@ts-utils/map": major
---

pr: #109

This release changes how the package is built and resolved. To migrate from 1.x:

- The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/map.d.ts` to `dist/map.cjs`, `dist/map.mjs`, `dist/map.umd.js`, and `dist/map.d.cts`/`dist/map.d.mts`.
- The UMD build (`dist/map.umd.js`) now registers the `tsUtils.map` global instead of `array`. The 1.x build registered the `array` global by mistake, overwriting `@ts-utils/array` if both were loaded. Use `tsUtils.map.max(...)` instead of `array.max(...)`.
- The package now has an `exports` map, so only the package root and `package.json` can be imported. Deep imports into `dist`, such as `@ts-utils/map/dist/index.js`, no longer resolve.
- Source maps (`dist/*.js.map`) are no longer included in the package. The built files are not minified, so they are readable without them.
