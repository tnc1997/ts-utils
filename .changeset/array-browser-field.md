---
"@ts-utils/array": major
---

Replaced the `browser` field in `package.json` with the `unpkg` and `jsdelivr` fields. In 2.x, bundlers that read `browser` but not `exports`, such as webpack 4 and Browserify, resolved the package to the UMD build, which can't be tree-shaken. They now resolve it to the ES module build (`module`) or the CommonJS build (`main`). Bundlers that support `exports` are unaffected. The `unpkg` and `jsdelivr` fields point at the UMD build, so the CDNs still serve it for a URL without a file path, e.g. `https://cdn.jsdelivr.net/npm/@ts-utils/array@3`.
