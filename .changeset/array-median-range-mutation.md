---
"@ts-utils/array": patch
---

pr: #110

Changed `median` and `range` to no longer mutate their input. They previously sorted the caller's array in place.
