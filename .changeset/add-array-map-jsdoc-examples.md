---
"@ts-utils/array": patch
"@ts-utils/map": patch
---

Added `@example` usage snippets to the JSDoc of every exported function, and `@throws` tags to the functions that throw `InsufficientValuesError`, so that the error appears in editor tooltips. The JSDoc of `InsufficientValuesError` also notes that `instanceof` can fail if more than one copy of the package is loaded, and that `error.name` can be checked instead.
