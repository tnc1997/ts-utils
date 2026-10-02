---
"@ts-utils/array": patch
---

Changed `contains` to compare values like `Array.prototype.includes`, so it now finds `NaN`: `contains([NaN], NaN)` returned `false` in 2.x and now returns `true`. Like `includes`, empty slots in sparse arrays are now read as `undefined`, so `contains([1, , 3], undefined)` also returns `true` instead of `false`. `-0` and `0` are still considered equal.
