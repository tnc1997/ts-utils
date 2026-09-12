---
"@ts-utils/array": patch
---

Enabled `noUncheckedIndexedAccess` in the shared `tsconfig.base.json` to catch unsafe array/tuple indexing at compile time. `array`'s `median`, `range`, and `mapAsync` were reviewed and confirmed safe, with `range` simplified to use `Math.max`/`Math.min` instead of sorting and indexing.
