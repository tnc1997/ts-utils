---
"@ts-utils/array": patch
---

Add a runtime guard to `filterAsync` that throws a `TypeError` if the callback does not resolve to a boolean value, instead of relying solely on the type system.
