---
"@ts-utils/array": patch
---

Changed `max`, `min`, and `range` to handle `NaN` like `Math.max` and `Math.min`: the result is now `NaN` whenever the array contains `NaN` (or an empty slot). In 2.x the result depended on where `NaN` appeared, e.g. `max([1, NaN, 3])` returned `1` but `max([NaN, 1, 3])` returned `NaN`. `max` and `min` also now treat `-0` as less than `0`, so `max([-0, 0])` returns `0` and `min([0, -0])` returns `-0`.
