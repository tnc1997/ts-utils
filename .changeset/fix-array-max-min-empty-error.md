---
"@ts-utils/array": patch
---

Fixed `max` and `min` throwing an undocumented native `TypeError` for empty arrays by making them throw a documented `Error` instead, matching the behavior of `median`, `mode`, `range`, and `sum`.
