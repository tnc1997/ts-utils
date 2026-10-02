---
"@ts-utils/array": major
---

pr: #109

This release changes how the package is built and resolved. To migrate from 2.x:

- The built files have been renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/array.d.ts` to `dist/array.cjs`, `dist/array.mjs`, `dist/array.umd.js`, and `dist/array.d.cts`/`dist/array.d.mts`.
- The UMD build (`dist/array.umd.js`) now registers the `tsUtils.array` global instead of `array`, so that it is less likely to clash with other scripts on the page. Use `tsUtils.array.max(...)` instead of `array.max(...)`.
- The package now has an `exports` map, so only the package root and `package.json` can be imported. Deep imports into `dist`, such as `@ts-utils/array/dist/index.js`, no longer resolve.
- Source maps (`dist/*.js.map`) are no longer included in the package. The built files are not minified, so they are readable without them.
