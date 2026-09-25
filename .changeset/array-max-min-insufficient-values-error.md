---
"@ts-utils/array": patch
---

Changed `max` and `min` to throw `InsufficientValuesError` when the input array is empty, instead of returning `undefined`, matching `mean`, `median`, `mode`, `range`, and `sum`.
