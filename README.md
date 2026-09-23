# TypeScript Utilities

[![Compatibility](https://github.com/tnc1997/ts-utils/actions/workflows/compatibility.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/compatibility.yml)
[![Lint](https://github.com/tnc1997/ts-utils/actions/workflows/lint.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/lint.yml)
[![Publish](https://github.com/tnc1997/ts-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/publish.yml)
[![Test](https://github.com/tnc1997/ts-utils/actions/workflows/test.yml/badge.svg)](https://github.com/tnc1997/ts-utils/actions/workflows/test.yml)

## Packages

### [@ts-utils/array](./packages/array)

`array` is a package that introduces utilities for the `Array` type.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Farray.svg)](https://badge.fury.io/js/%40ts-utils%2Farray)

### [@ts-utils/map](./packages/map)

`map` is a package that introduces utilities for the `Map` type.

[![npm version](https://badge.fury.io/js/%40ts-utils%2Fmap.svg)](https://badge.fury.io/js/%40ts-utils%2Fmap)

## Installation

```sh
npm install @ts-utils/array
```

```sh
npm install @ts-utils/map
```

## Getting Started

### @ts-utils/array

```ts
import { mean, sum } from "@ts-utils/array";

sum([1, 2, 3]); // 6

mean([1, 2, 3]); // 2
```

### @ts-utils/map

```ts
import { entries, max } from "@ts-utils/map";

const map = new Map([
  ["a", 1],
  ["b", 2],
]);

entries(map); // [["a", 1], ["b", 2]]

max(map); // ["b", 2]
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to get started.
