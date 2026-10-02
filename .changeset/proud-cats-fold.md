---
"@ts-utils/array": minor
---

Added an optional `options` object to `mapAsync` and `filterAsync`, with two options:

- `concurrency` caps how many callback invocations run at once. It defaults to `Infinity`, preserving the existing unlimited-concurrency behavior. The value must be a positive integer or `Infinity`; any other value (such as `NaN`, `0`, a negative number, or a fraction) throws a `RangeError`.
- `stopOnError` controls what happens when a callback rejects. By default (`true`), the returned promise rejects with the first rejection reason as soon as it happens, and no further callbacks are started; callbacks that are already running are not cancelled. When `false`, every callback is invoked, and the returned promise then rejects with an `AggregateError` containing every rejection reason.

For example, `mapAsync(array, callback, { concurrency: 2 })` runs at most two callbacks at once.

The options types are exported as `MapAsyncOptions` and `FilterAsyncOptions`.
