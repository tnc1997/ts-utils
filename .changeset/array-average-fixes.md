---
"@ts-utils/array": patch
---

Fixed several bugs in the array calculations, which change the results of some calls:

- `median` and `range` now sort numerically. They previously sorted values as strings, so `median([10, 9, 1])` returned `10` instead of `9`, and `range([10, 9, 1])` returned `8` instead of `9`.
- `max`, `min`, `median`, and `range` no longer mutate their input. They previously sorted the caller's array in place.
- `median` and `range` now support single-element arrays. `median([5])` and `range([5])` previously threw an `Error`, and now return `5` and `0` respectively.
