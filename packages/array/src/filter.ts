import { type AsyncOptions, mapAsync } from "./map";

/**
 * Filters the values in an array asynchronously. Like
 * `Array.prototype.filter`, a value is kept when the callback resolves to a
 * truthy value.
 *
 * Like `Array.prototype.filter`, only the indexes below the array's initial
 * length are visited, holes in sparse arrays are skipped, and the value kept
 * is the one passed to the callback, even if the array is changed
 * afterwards. Unlike `Array.prototype.filter`, callbacks run concurrently, so
 * a change made to the array by a callback after it has awaited may not be
 * seen by callbacks for later indexes that have already been invoked.
 * @param array - the array to filter
 * @param callback - the asynchronous filter function
 * @param options - the maximum number of callback invocations to run at once (`concurrency`, defaulting to `Infinity`), and whether to stop starting new ones once one has rejected (`stopOnError`, defaulting to `true`), as for `mapAsync`
 * @returns the filtered array
 * @throws {RangeError} if `concurrency` is not a positive integer or `Infinity`
 * @throws {AggregateError} if `stopOnError` is `false` and any callback rejects, with every rejection reason in its `errors`
 * @example
 * ```ts
 * await filterAsync([1, 2, 3, 4], async (value) => value % 2 === 0); // [2, 4]
 *
 * // Run at most two callbacks at once.
 * await filterAsync([1, 2, 3, 4], async (value) => value % 2 === 0, { concurrency: 2 }); // [2, 4]
 * ```
 */
export async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<unknown>,
  options: AsyncOptions = {},
): Promise<T[]> {
  // Keep the value passed to the callback rather than reading it from the
  // array afterwards, which the callback may have changed.
  const results = await mapAsync(
    array,
    async (value, index, array) =>
      [value, await callback(value, index, array)] as const,
    options,
  );

  // `results` has holes wherever `array` did, which `filter` skips.
  return results.filter(([, keep]) => keep).map(([value]) => value);
}
