---
"@ts-utils/array": patch
---

Changed `sum`, `mean`, and `mode` to return `NaN` whenever the array contains `NaN` (or an empty slot), consistent with `max`, `min`, `median`, and `range`. In 2.x, empty slots were skipped by `sum` but still counted by `mean`, e.g. `sum([1, , 3])` returned `4` and `mean([1, , 3])` returned `1.333…`, and `sum` and `mean` threw a native `TypeError` for an array containing only empty slots, such as `new Array(3)`, for which `mode` returned `undefined`. `mode` also ignored `NaN` unless it was the most frequent value, e.g. `mode([1, NaN, 1])` returned `1`. Unlike lodash, empty slots are not skipped (`_.sum` skips them, and `_.mean` skips them in the sum but still counts them in the length, as 2.x did), since they usually indicate a bug in the code that created the array.
