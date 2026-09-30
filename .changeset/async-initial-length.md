---
"@ts-utils/array": patch
---

Changed `mapAsync` and `filterAsync` to only visit the indexes below the array's initial length, like `Array.prototype.map` and `Array.prototype.filter`, so values appended to the array by the callback are no longer processed. `filterAsync` now also keeps the values passed to the callback, rather than reading them from the array after all callbacks have settled.
