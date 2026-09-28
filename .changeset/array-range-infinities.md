---
"@ts-utils/array": patch
---

Changed `range` to return `0` when all of the values in the array are equal, including when they are infinite. In 2.x, `range([Infinity, Infinity])` returned `NaN`, because `Infinity - Infinity` is `NaN`. Arrays containing `NaN` still return `NaN`.
