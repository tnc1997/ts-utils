# @ts-utils/array

`array` is a package that introduces utilities for the `Array` type.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Farray.svg)](https://badge.fury.io/js/%40ts-utils%2Farray)

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

```ts
import { mapAsync } from "@ts-utils/array";

console.log(await mapAsync([1, 2, 3], async (value) => value * 2));
// [ 2, 4, 6 ]

// Run at most two callbacks at once, e.g. to avoid overwhelming an API.
console.log(await mapAsync([1, 2, 3], async (value) => value * 2, 2));
// [ 2, 4, 6 ]
```

### `max(array: number[]): number`

Returns the maximum value of an array.

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

Returns the median of an array of numerical values.

```ts
import { median } from "@ts-utils/array";

console.log(median([5, 3, 1, 4, 2]));
// 3

console.log(median([1, 2, 3, 4]));
// 2.5
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the array is empty.

### `min(array: number[]): number`

Returns the minimum value of an array.

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

Returns the range of an array of numerical values.

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
