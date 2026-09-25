---
"@ts-utils/array": minor
---

Add an optional `concurrency` parameter to `mapAsync` (and thread it through `filterAsync`) to cap how many callback invocations run at once, using a worker-pool pattern. Defaults to `Infinity`, preserving the existing unlimited-concurrency behavior. The value must be a positive integer or `Infinity`; any other value (such as `NaN`, `0`, a negative number, or a fraction) throws a `RangeError`.
