---
"@ts-utils/array": patch
---

Added `InsufficientValuesError`, thrown by `mean`, `median`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message.
