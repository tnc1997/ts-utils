---
"@ts-utils/array": patch
---

Documented how `frequencies` compares values and orders its keys: values are compared using SameValueZero, like the keys of a `Map`, so `NaN` values are counted together and `-0` is counted under the key `0`, the keys are in the order that the values first appear, and empty slots in sparse arrays are skipped. The behaviour is unchanged.
