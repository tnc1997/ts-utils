---
"@ts-utils/array": patch
"@ts-utils/map": patch
---

Enabled `noUncheckedIndexedAccess` in the shared `tsconfig.base.json` to catch unsafe array/tuple indexing at compile time. This surfaced two runtime-safety issues: `map`'s `max` and `min` return `[T, number] | undefined` now, correctly reflecting that they return `undefined` for an empty map instead of lying about always returning an entry; and `array`'s `median` and `range` were reviewed and confirmed safe, with `range` simplified to use `Math.max`/`Math.min` instead of sorting and indexing.
