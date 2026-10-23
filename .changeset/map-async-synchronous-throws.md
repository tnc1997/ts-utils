---
"@ts-utils/array": patch
---

Changed `mapAsync` to treat a callback that throws synchronously like one that rejects, so the callbacks for the other values are still invoked as documented for `stopOnError`. Previously, with unlimited concurrency or a `concurrency` above `1`, a synchronous throw stopped the other callbacks from being invoked. The rejection reason is unchanged, and `filterAsync` was not affected.
