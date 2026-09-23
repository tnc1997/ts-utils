---
"@ts-utils/array": patch
---

Changed `max` and `min` to throw `InsufficientValuesError` instead of a bare `Error` when the input array is empty, matching `mean`, `median`, `mode`, `range`, and `sum`.
