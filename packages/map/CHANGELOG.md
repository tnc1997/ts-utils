# @ts-utils/map

## 1.1.2

### Patch Changes

- [#136](https://github.com/tnc1997/ts-utils/pull/136) [`6df80d4`](https://github.com/tnc1997/ts-utils/commit/6df80d405f72f7be35ea7d218a1ee7b6ebb74aeb) Thanks [@tnc1997](https://github.com/tnc1997)! - Added `InsufficientValuesError`, thrown by `max` and `min` when the input map is empty instead of returning `undefined`, so callers can distinguish these errors from other thrown errors without string-matching the message.

## 1.1.1

Wed, 03 Jul 2019 10:45:19 GMT

### Patches

- Fix missing npm package types file.

## 1.1.0

Sat, 29 Jun 2019 19:33:18 GMT

### Minor changes

- Add containsKey and containsValue functions.
