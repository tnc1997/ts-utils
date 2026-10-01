---
"@ts-utils/array": patch
---

pr: #111

Changed `median` and `range` to sort numerically. They previously sorted values as strings, so `median([10, 9, 1])` returned `10` instead of `9`, and `range([10, 9, 1])` returned `8` instead of `9`.
