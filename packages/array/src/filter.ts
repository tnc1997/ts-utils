import { mapAsync } from "./map";

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
 * @param concurrency - the maximum number of callback invocations to run at once, which must be a positive integer or `Infinity`. Defaults to `Infinity`, i.e. all invocations run concurrently
 * @returns the filtered array
 * @throws {RangeError} if `concurrency` is not a positive integer or `Infinity`
 * @example
 * ```ts
 * await filterAsync([1, 2, 3, 4], async (value) => value % 2 === 0); // [2, 4]
 * ```
 */
export async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<unknown>,
  concurrency: number = Infinity,
): Promise<T[]> {
  // Keep the value passed to the callback rather than reading it from the
  // array afterwards, which the callback may have changed.
  const results = await mapAsync(
    array,
    async (value, index, array) =>
      [value, await callback(value, index, array)] as const,
    concurrency,
  );

  // `results` has holes wherever `array` did, which `filter` skips.
  return results.filter(([, keep]) => keep).map(([value]) => value);
}
