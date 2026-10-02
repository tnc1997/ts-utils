---
"@ts-utils/map": major
---

pr: #119

The package now declares `"engines": { "node": ">=18.0.0" }` and is compiled for Node.js 18. It no longer runs on Node.js 6 or earlier, and package managers that enforce `engines` (such as Yarn 1, or npm with `engine-strict`) will refuse to install it on Node.js versions older than 18. To migrate from 1.x, use Node.js 18 or later.

The builds now use ES2020 syntax, so they no longer run in browsers without ES2020 support, such as Internet Explorer 11. To support older browsers, transpile the package in your bundler, or stay on 1.x.
