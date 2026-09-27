---
"@ts-utils/array": major
---

pr: #119

The package now declares `"engines": { "node": ">=18.0.0" }` and is compiled for Node.js 18. It no longer runs on Node.js 6 or earlier, and package managers that enforce `engines` (such as Yarn 1, or npm with `engine-strict`) will refuse to install it on Node.js versions older than 18. To migrate from 2.x, use Node.js 18 or later.
