---
"@ts-utils/map": patch
---

Added `InsufficientValuesError`, thrown by `max` and `min` when the input map is empty instead of returning `undefined`, so callers can distinguish these errors from other thrown errors without string-matching the message.
