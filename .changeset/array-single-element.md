---
"@ts-utils/array": patch
---

pr: #113

Changed `median` and `range` to support single-element arrays. `median([5])` and `range([5])` previously threw an `Error`, and now return `5` and `0` respectively.
