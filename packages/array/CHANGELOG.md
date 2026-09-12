# @ts-utils/array

## 2.1.0

### Minor Changes

- [#137](https://github.com/tnc1997/ts-utils/pull/137) [`7d8ade6`](https://github.com/tnc1997/ts-utils/commit/7d8ade642483dfd585592e5743c9a5fcba3c7bd1) Thanks [@tnc1997](https://github.com/tnc1997)! - Add an optional `concurrency` parameter to `mapAsync` (and thread it through `filterAsync`) to cap how many callback invocations run at once, using a worker-pool pattern. Defaults to `Infinity`, preserving the existing unlimited-concurrency behavior.

### Patch Changes

- [#139](https://github.com/tnc1997/ts-utils/pull/139) [`09e5671`](https://github.com/tnc1997/ts-utils/commit/09e5671007538982aef02af06efb2f4f00246016) Thanks [@tnc1997](https://github.com/tnc1997)! - Enabled `noUncheckedIndexedAccess` in the shared `tsconfig.base.json` to catch unsafe array/tuple indexing at compile time. `array`'s `median`, `range`, and `mapAsync` were reviewed and confirmed safe, with `range` simplified to use `Math.max`/`Math.min` instead of sorting and indexing.

- [#134](https://github.com/tnc1997/ts-utils/pull/134) [`120519b`](https://github.com/tnc1997/ts-utils/commit/120519bce8ac2593b6ac68847fe51dec34db74fb) Thanks [@tnc1997](https://github.com/tnc1997)! - Fixed `max` and `min` throwing an undocumented native `TypeError` for empty arrays by making them throw a documented `Error` instead, matching the behavior of `median`, `mode`, `range`, and `sum`.

- [#138](https://github.com/tnc1997/ts-utils/pull/138) [`dbc3a5a`](https://github.com/tnc1997/ts-utils/commit/dbc3a5a961a4d2fa69de59ff4b09fc65ae90e0c7) Thanks [@tnc1997](https://github.com/tnc1997)! - Add a runtime guard to `filterAsync` that throws a `TypeError` if the callback does not resolve to a boolean value, instead of relying solely on the type system.

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `mean`, `median`, `mode`, `range`, and `sum` when the input array does not contain enough values, so callers can distinguish these errors from other thrown errors without string-matching the message.

## 2.0.2

Fri, 18 Oct 2019 19:19:27 GMT

### Patches

- Fix the max and min functions.

## 2.0.1

Wed, 03 Jul 2019 10:45:19 GMT

### Patches

- Fix missing npm package types file.

## 2.0.0

Sat, 29 Jun 2019 19:33:18 GMT

### Breaking changes

- Refactor the package and replace `Observable` with `Promise`.
