---
"@ts-utils/array": major
---

Added `InsufficientValuesError`, thrown by `mean`, `median`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message. `mode([])` previously returned `-1` and now throws, which is a breaking change.
