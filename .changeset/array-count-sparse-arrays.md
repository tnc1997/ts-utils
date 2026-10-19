---
"@ts-utils/array": patch
---

Changed `count` to skip empty slots in sparse arrays when called without a callback, consistent with calling it with one, which uses `Array.prototype.filter`. In 2.x, `count` without a callback returned `array.length`, so `count([1, , 3])` returned `3` while `count([1, , 3], () => true)` returned `2`. Both now return `2`, and `count(new Array(3))` returns `0`.
