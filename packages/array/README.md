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

## Functions

### `contains<T>(array: T[], value: T): boolean`

Determines if an array contains a specified value.

```ts
import { contains } from "@ts-utils/array";

console.log(contains([1, 2, 3], 2));
// true
```

### `count<T>(array: T[], callback?: (value: T) => boolean): number`

Returns the number of values in an array that optionally satisfy a condition.

```ts
import { count } from "@ts-utils/array";

console.log(count([1, 2, 3, 4, 5], (value) => value % 2 === 0));
// 2
```

### `filterAsync<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<unknown>, concurrency: number = Infinity): Promise<T[]>`

Filters the values in an array asynchronously. Like `Array.prototype.filter`, a value is kept when the callback resolves to a truthy value. The optional `concurrency` limits how many callback invocations run at once; by default, they all run concurrently.

Like `Array.prototype.filter`, only the indexes below the array's initial length are visited, holes in sparse arrays are skipped, and the value kept is the one passed to the callback, even if the array is changed afterwards. Unlike `Array.prototype.filter`, callbacks run concurrently, so a change made to the array by a callback after it has awaited may not be seen by callbacks for later indexes that have already been invoked.

```ts
import { filterAsync } from "@ts-utils/array";

console.log(await filterAsync([1, 2, 3, 4, 5], async (value) => value % 2 === 0));
// [ 2, 4 ]

// Run at most two callbacks at once.
console.log(await filterAsync([1, 2, 3, 4, 5], async (value) => value % 2 === 0, 2));
// [ 2, 4 ]
```

### `frequencies<T>(array: T[]): Map<T, number>`

Returns the frequency of each value in an array.

```ts
import { frequencies } from "@ts-utils/array";

console.log(frequencies(["a", "b", "a", "c", "b", "a"]));
// Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }
```

### `mapAsync<T1, T2>(array: T1[], callback: (value: T1, index: number, array: T1[]) => Promise<T2>, concurrency: number = Infinity): Promise<T2[]>`

Maps the values in an array asynchronously. The optional `concurrency` limits how many callback invocations run at once; by default, they all run concurrently. The results are returned in the same order as the input regardless of the concurrency.

Like `Array.prototype.map`, only the indexes below the array's initial length are visited, holes in sparse arrays are skipped, and each value is read when its callback is invoked. Unlike `Array.prototype.map`, callbacks run concurrently, so a change made to the array by a callback after it has awaited may not be seen by callbacks for later indexes that have already been invoked.

```ts
import { mapAsync } from "@ts-utils/array";

console.log(await mapAsync([1, 2, 3], async (value) => value * 2));
// [ 2, 4, 6 ]

// Run at most two callbacks at once, e.g. to avoid overwhelming an API.
console.log(await mapAsync([1, 2, 3], async (value) => value * 2, 2));
// [ 2, 4, 6 ]
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

Returns the mean of an array of numerical values.

```ts
import { mean } from "@ts-utils/array";

console.log(mean([1, 2, 3, 4, 5]));
// 3
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `median(array: number[]): number`

Returns the median of an array of numerical values. The result is `NaN` if the array contains `NaN` (or an empty slot), as for [`max`](#maxarray-number-number) and [`min`](#minarray-number-number).

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

Returns the mode of an array of numerical values. When multiple values are tied for the highest frequency, the tied value that appears first in the array is returned.

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

Returns the sum of the values of a numerical array.

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
