---
"@ts-utils/array": patch
---

Changed `sum`, `mean`, and `mode` to return `NaN` whenever the array contains `NaN` (or an empty slot), consistent with `max`, `min`, `median`, and `range`. In 2.x, `sum` skipped empty slots, e.g. `sum([1, , 3])` returned `4`. `mean` skipped them in the sum but still counted them in the length, e.g. `mean([1, , 3])` returned `1.333…`. Both threw a native `TypeError` for an array containing only empty slots, such as `new Array(3)`, and `mode` returned `undefined` for one. `mode` also ignored `NaN` unless it was the most frequent value, e.g. `mode([1, NaN, 1])` returned `1`. Unlike lodash, empty slots are not skipped, since they usually indicate a bug in the code that created the array.
