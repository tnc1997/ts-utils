---
"@ts-utils/array": patch
---

Changed `mode` to keep the sign of `-0`, consistent with `max`, `mean`, `median`, `min`, and `sum`. `-0` and `0` are still counted as the same value, and the result is now the one that appears first in the array: `mode([-0])` and `mode([-0, 0])` return `-0`, and `mode([0, -0])` returns `0`. Previously `mode` always returned `0` for a modal value of `-0`, because it counted values as `Map` keys, which normalise `-0` to `0`.
