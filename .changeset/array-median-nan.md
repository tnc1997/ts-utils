---
"@ts-utils/array": patch
---

Changed `median` to return `NaN` whenever the array contains `NaN` (or an empty slot), consistent with `max`, `min`, and `range`. In 2.x, `NaN` values and empty slots were sorted to the end of the array and the middle value was taken from what remained, e.g. `median([1, NaN, 3])` and `median([1, , 3])` both returned `3`.
