---
"@ts-utils/map": patch
---

Changed `max` and `min` to handle `NaN` like `Math.max` and `Math.min`: if the map contains `NaN`, the first entry whose value is `NaN` is returned. In 1.x a `NaN` value could make the result wrong even ignoring `NaN`, e.g. `min(new Map([["a", 3], ["b", NaN], ["c", 1]]))` returned `["a", 3]`. `max` and `min` also now treat `-0` as less than `0`, so the result no longer depends on insertion order. When multiple entries are tied for the maximum or minimum value, the entry that was inserted first is returned, as before.
