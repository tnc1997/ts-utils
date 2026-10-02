---
"@ts-utils/array": patch
---

pr: #117

Changed `max` and `min` to no longer mutate their input. They previously sorted the caller's array in place.
