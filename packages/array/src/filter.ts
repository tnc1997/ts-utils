import { mapAsync } from "./map";

/**
 * Filters the values in an array asynchronously. Like
 * `Array.prototype.filter`, a value is kept when the callback resolves to a
 * truthy value.
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
  const results: unknown[] = await mapAsync(array, callback, concurrency);

  return array.filter((value, index) => results[index]);
}
