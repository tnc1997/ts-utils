---
"@ts-utils/array": major
---

Added `InsufficientValuesError`, thrown by `max`, `mean`, `median`, `min`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message. This is a breaking change for `max`, `min`, and `mode`: `max([])` and `min([])` previously returned `undefined`, and `mode([])` previously returned `-1`, and all three now throw. `sum([])` and `mean([])` previously threw a native `TypeError` ("Reduce of empty array with no initial value"), and `median` and `range` previously threw a bare `Error`.
