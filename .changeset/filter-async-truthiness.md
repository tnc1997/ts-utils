---
"@ts-utils/array": patch
---

Widened the `filterAsync` callback's return type from `Promise<boolean>` to `Promise<unknown>`, matching `Array.prototype.filter`: values are kept when the callback resolves to a truthy value.
