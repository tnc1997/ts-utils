---
"@ts-utils/map": patch
---

Changed `containsKey` to compare keys like `Map.prototype.has`, and `containsValue` to compare values like `Array.prototype.includes`, so they now find `NaN`: `containsKey(new Map([[NaN, 1]]), NaN)` and `containsValue(new Map([["a", NaN]]), NaN)` returned `false` in 1.x and now return `true`. `-0` and `0` are still considered equal. `containsKey` also no longer copies the map's keys into an array, so it takes constant time rather than time proportional to the size of the map.
