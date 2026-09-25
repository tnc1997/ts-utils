---
"@ts-utils/array": patch
---

Changed `mapAsync` to preserve holes in sparse arrays, like `Array.prototype.map`: the callback is not called for empty slots, which remain empty in the result instead of being filled with `undefined`. This now applies with or without a `concurrency` limit.
