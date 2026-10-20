---
"@ts-utils/array": patch
---

Changed `median` to avoid overflow when averaging the two middle values of an even-length array, e.g. `median([Number.MAX_VALUE, Number.MAX_VALUE])` now returns `Number.MAX_VALUE` instead of `Infinity`. Results that did not overflow are unchanged. Also documented that `mean` may return `±Infinity` if the sum of the values overflows, and that `mean` and `median` return `NaN` when `Infinity` and `-Infinity` cancel out.
