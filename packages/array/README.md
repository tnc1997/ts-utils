# @ts-utils/array

`array` is a package that introduces utilities for the `Array` type.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Farray.svg)](https://badge.fury.io/js/%40ts-utils%2Farray)

## Using a `<script>` tag

The package includes a UMD build, which registers the functions on the `tsUtils.array` global when it is loaded with a `<script>` tag, e.g. from a CDN such as jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/@ts-utils/array@3/dist/array.umd.js"></script>
<script>
  console.log(tsUtils.array.max([1, 5, 3]));
  // 5
</script>
```

The UMD build requires a browser that supports ES2015.

## Functions

### `contains<T>(array: T[], value: T): boolean`

Determines if an array contains a specified value. Values are compared using SameValueZero, with the same results as [`Array.prototype.includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), so `NaN` is found and `-0` is equal to `0`, and empty slots in sparse arrays are read as `undefined`.

```ts
import { contains } from "@ts-utils/array";

console.log(contains([1, 2, 3], 2));
// true
```

### `count<T>(array: T[], callback?: (value: T) => boolean): number`

Returns the number of values in an array that optionally satisfy a condition. Like [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), empty slots in sparse arrays are skipped, with or without a callback: they aren't counted, and the callback isn't called for them.

```ts
import { count } from "@ts-utils/array";

console.log(count([1, 2, 3, 4, 5], (value) => value % 2 === 0));
// 2
```

### `filterAsync<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<unknown>, options: FilterAsyncOptions = {}): Promise<T[]>`

Filters the values in an array asynchronously. Like `Array.prototype.filter`, a value is kept when the callback resolves to a truthy value. The optional `options` are the same as for [`mapAsync`](#mapasynct1-t2array-t1-callback-value-t1-index-number-array-t1--promiset2-options-mapasyncoptions---promiset2): `concurrency` limits how many callback invocations run at once, and `stopOnError` controls what happens when a callback rejects.

Like `Array.prototype.filter`, only the indexes below the array's initial length are visited, holes in sparse arrays are skipped, and the value kept is the one passed to the callback, even if the array is changed afterwards. Unlike `Array.prototype.filter`, callbacks run concurrently, so a change made to the array by a callback after it has awaited may not be seen by callbacks for later indexes that have already been invoked.

```ts
import { filterAsync } from "@ts-utils/array";

console.log(await filterAsync([1, 2, 3, 4, 5], async (value) => value % 2 === 0));
// [ 2, 4 ]

// Run at most two callbacks at once.
console.log(await filterAsync([1, 2, 3, 4, 5], async (value) => value % 2 === 0, { concurrency: 2 }));
// [ 2, 4 ]
```

### `frequencies<T>(array: T[]): Map<T, number>`

Returns the frequency of each value in an array. Values are compared using SameValueZero, like the keys of a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality), so `NaN` values are counted together, `-0` and `0` are counted together under the key `0`, and objects are compared by reference. The keys are in the order that the values first appear, and empty slots in sparse arrays are skipped.

```ts
import { frequencies } from "@ts-utils/array";

console.log(frequencies(["a", "b", "a", "c", "b", "a"]));
// Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }
```

### `mapAsync<T1, T2>(array: T1[], callback: (value: T1, index: number, array: T1[]) => Promise<T2>, options: MapAsyncOptions = {}): Promise<T2[]>`

Maps the values in an array asynchronously. The results are returned in the same order as the input regardless of the concurrency. The optional `options` object accepts:

- `concurrency` (default `Infinity`): the maximum number of callback invocations to run at once, which must be a positive integer or `Infinity`. By default, they all run concurrently. Any other value throws a `RangeError`.
- `stopOnError` (default `true`): whether to stop starting new callback invocations once one has rejected. When `true`, the returned promise rejects with the first rejection reason as soon as it happens. Callbacks that are already running are not cancelled, and any later rejections are ignored. With unlimited concurrency, every callback has already been invoked before any can reject, so this only makes a difference when `concurrency` is set. When `false`, every callback is invoked, and once all of them have settled, the returned promise rejects with an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) whose `errors` are every rejection reason, in the order that the rejections happened. Where `AggregateError` isn't available, it rejects with an `Error` with the same `name`, `errors`, and message instead, so check `error.name === "AggregateError"` rather than using `instanceof`.

Like `Array.prototype.map`, only the indexes below the array's initial length are visited, holes in sparse arrays are skipped, and each value is read when its callback is invoked. Unlike `Array.prototype.map`, callbacks run concurrently, so a change made to the array by a callback after it has awaited may not be seen by callbacks for later indexes that have already been invoked.

```ts
import { mapAsync } from "@ts-utils/array";

console.log(await mapAsync([1, 2, 3], async (value) => value * 2));
// [ 2, 4, 6 ]

// Run at most two callbacks at once, e.g. to avoid overwhelming an API.
console.log(await mapAsync([1, 2, 3], async (value) => value * 2, { concurrency: 2 }));
// [ 2, 4, 6 ]

// Invoke every callback even if some reject, and collect the rejection reasons.
try {
  await mapAsync([1, 2, 3], async (value) => {
    if (value % 2 !== 0) {
      throw new Error(`Failed to process ${value}`);
    }

    return value * 2;
  }, { stopOnError: false });
} catch (error) {
  console.log(error.errors.map(({ message }) => message));
  // [ 'Failed to process 1', 'Failed to process 3' ]
}
```

### `max(array: number[]): number`

Returns the maximum value of an array. Like [`Math.max`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max), the result is `NaN` if the array contains `NaN` (or an empty slot), and `-0` is considered to be less than `0`.

```ts
import { max } from "@ts-utils/array";

console.log(max([1, 5, 3, 2]));
// 5
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `mean(array: number[]): number`

Returns the mean of an array of numerical values. The result is `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number), or if it contains both `Infinity` and `-Infinity`. The result may be `±Infinity` if the sum of the values overflows, even if the true mean is finite.

```ts
import { mean } from "@ts-utils/array";

console.log(mean([1, 2, 3, 4, 5]));
// 3
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `median(array: number[]): number`

Returns the median of an array of numerical values. The result is `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number), or if the two middle values are `-Infinity` and `Infinity`.

```ts
import { median } from "@ts-utils/array";

console.log(median([5, 3, 1, 4, 2]));
// 3

console.log(median([1, 2, 3, 4]));
// 2.5
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `min(array: number[]): number`

Returns the minimum value of an array. Like [`Math.min`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min), the result is `NaN` if the array contains `NaN` (or an empty slot), and `-0` is considered to be less than `0`.

```ts
import { min } from "@ts-utils/array";

console.log(min([1, 5, 3, 2]));
// 1
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `mode(array: number[]): number`

Returns the mode of an array of numerical values. When multiple values are tied for the highest frequency, the tied value that appears first in the array is returned. `-0` and `0` are counted as the same value, and the result keeps the sign of the one that appears first in the array. The result is `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number).

```ts
import { mode } from "@ts-utils/array";

console.log(mode([1, 2, 2, 3, 3, 3]));
// 3
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `range(array: number[]): number`

Returns the range of an array of numerical values. The result is `0` if all of the values are equal, including when they are infinite, and `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number).

```ts
import { range } from "@ts-utils/array";

console.log(range([4, 1, 7, 3]));
// 6
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `sum(array: number[]): number`

Returns the sum of the values of a numerical array. The result is `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number).

```ts
import { sum } from "@ts-utils/array";

console.log(sum([1, 2, 3, 4, 5]));
// 15
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

## Errors

### `InsufficientValuesError`

Thrown when an array does not contain enough values to perform the requested calculation, e.g. by `max`, `mean`, `median`, `min`, `mode`, `range`, and `sum` when the array is empty. It extends `Error`, so you can catch it with `instanceof` without matching the message.

```ts
import { InsufficientValuesError, max } from "@ts-utils/array";

try {
  max([]);
} catch (error) {
  if (error instanceof InsufficientValuesError) {
    console.log(error.message);
    // The array does not contain enough values to calculate the maximum.
  }
}
```

`instanceof` can fail if more than one copy of the package is loaded, for example when the same program `import`s and `require`s it (so both the ESM and CommonJS builds are used), when two versions are installed, or across realms such as iframes. In that case, check `error.name === "InsufficientValuesError"` instead.

## Upgrading

### Upgrading to 3.x

- Node.js 18 or later is required, and the builds use ES2015 syntax, so browsers without ES2015 support (e.g. Internet Explorer 11) need the package transpiled and polyfilled in your bundler, or should stay on 2.x.
- `max([])` and `min([])` now throw an [`InsufficientValuesError`](#insufficientvalueserror) instead of returning `undefined`, and `mode([])` throws instead of returning `-1`. `sum`, `mean`, `median`, and `range` throw an `InsufficientValuesError` instead of a `TypeError` or bare `Error` for an empty array. `median` and `range` no longer throw for a single-element array: `median([5])` returns `5` and `range([5])` returns `0`.
- The package has an `exports` map, so only the package root and `package.json` can be imported, and deep imports into `dist` (e.g. `@ts-utils/array/dist/index.js`) no longer resolve. The built files were renamed from `dist/index.js`, `dist/index.esm.js`, `dist/index.umd.js`, and `dist/array.d.ts` to `dist/array.cjs`, `dist/array.mjs`, `dist/array.umd.js`, and `dist/array.d.cts`/`dist/array.d.mts`, the UMD global changed from `array` to `tsUtils.array`, and source maps are no longer included.
- Behaviour changes worth checking, although they're fixes:
  - `NaN` and empty slots now give `NaN` from all of the numeric functions (`max`, `mean`, `median`, `min`, `mode`, `range`, and `sum`).
  - `range` returns `0` when all of the values are equal, including when they are infinite, e.g. `range([Infinity, Infinity])`.
  - `max` and `min` treat `-0` as less than `0`, so `max([-0, 0])` returns `0` and `min([0, -0])` returns `-0`.
  - `mode` keeps the sign of `-0`: `-0` and `0` are counted as the same value, and the result is the one that appears first, so `mode([-0])` returns `-0`.
  - `contains` finds `NaN`, and reads empty slots as `undefined`.
  - `max`, `min`, `median`, and `range` no longer sort the input in place, and `median` and `range` sort numerically rather than as strings.
  - `mapAsync` preserves empty slots instead of filling them with `undefined`.
  - `count` without a callback skips empty slots, as it already did with one, so `count([1, , 3])` returns `2` and `count(new Array(3))` returns `0`.
  - `filterAsync` keeps the values passed to the callback, rather than reading them from the array after all of the callbacks have settled, so changes a callback makes to the array no longer affect the result.

### Upgrading to 2.x

- The async functions moved from the `@ts-utils/array/async` entry point to the package root and were renamed: `map` → `mapAsync` and `filter` → `filterAsync`. Their callbacks return a `Promise` instead of an RxJS `Observable`, and they return a `Promise` instead of an `Observable`. The `rxjs` and `@ts-utils/map` peer dependencies were removed.
- `frequency(array)` was renamed to `frequencies(array)`. The `frequency(array, value)` overload, which returned the count of `value`, was removed; use `count(array, (v) => v === value)` instead.
- `countBy(array, callback)`, which returned a `Map` of counts by key, was removed. `count(array, predicate?)` returns a number instead; to count by key, use `frequencies(array.map(callback))`.
