---
"@ts-utils/array": minor
---

Add an optional `concurrency` parameter to `mapAsync` (and thread it through `filterAsync`) to cap how many callback invocations run at once, using a worker-pool pattern. Defaults to `Infinity`, preserving the existing unlimited-concurrency behavior.
