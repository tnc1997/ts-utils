# @ts-utils/map

`map` is a package that introduces utilities for the `Map` type.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Fmap.svg)](https://badge.fury.io/js/%40ts-utils%2Fmap)

## Functions

### `containsKey<T1, T2>(map: Map<T1, T2>, key: T1): boolean`

Determines whether a map contains a specified key.

```ts
import { containsKey } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(containsKey(map, "b"));
// true
```

### `containsValue<T1, T2>(map: Map<T1, T2>, value: T2): boolean`

Determines whether a map contains a specified value.

```ts
import { containsValue } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(containsValue(map, 2));
// true
```

### `entries<T1, T2>(map: Map<T1, T2>): [T1, T2][]`

Returns a two dimensional array of the entries of a map.

```ts
import { entries } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(entries(map));
// [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```

### `keys<T1, T2>(map: Map<T1, T2>): T1[]`

Returns an array of the keys of a map.

```ts
import { keys } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(keys(map));
// [ 'a', 'b', 'c' ]
```

### `max<T>(map: Map<T, number>): [T, number]`

Returns the entry with the maximum value of a map.

```ts
import { max } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(max(map));
// [ 'c', 3 ]
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the map is empty.

### `min<T>(map: Map<T, number>): [T, number]`

Returns the entry with the minimum value of a map.

```ts
import { min } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(min(map));
// [ 'a', 1 ]
```

Throws an [`InsufficientValuesError`](#insufficientvalueserror) if the map is empty.

### `values<T1, T2>(map: Map<T1, T2>): T2[]`

Returns an array of the values of a map.

```ts
import { values } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

console.log(values(map));
// [ 1, 2, 3 ]
```

## Errors

### `InsufficientValuesError`

Thrown when a map does not contain enough values to perform the requested calculation, e.g. by `max` and `min` when the map is empty. It extends `Error`, so you can catch it with `instanceof` without matching the message.

```ts
import { InsufficientValuesError, max } from "@ts-utils/map";

try {
  max(new Map());
} catch (error) {
  if (error instanceof InsufficientValuesError) {
    console.log(error.message);
    // The map does not contain enough values to calculate the maximum.
  }
}
```
