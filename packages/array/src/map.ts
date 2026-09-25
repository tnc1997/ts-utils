/**
 * Maps the values in an array asynchronously.
 * @param array - the array to map
 * @param callback - the asynchronous map function
 * @param concurrency - the maximum number of callback invocations to run at once, which must be a positive integer or `Infinity`. Defaults to `Infinity`, i.e. all invocations run concurrently
 * @returns the mapped array
 * @throws {RangeError} if `concurrency` is not a positive integer or `Infinity`
 * @example
 * ```ts
 * await mapAsync([1, 2, 3], async (value) => value * 2); // [2, 4, 6]
 * ```
 */
export async function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
  concurrency: number = Infinity,
): Promise<T2[]> {
  if (
    concurrency !== Infinity &&
    !(Number.isInteger(concurrency) && concurrency > 0)
  ) {
    throw new RangeError(
      "The concurrency must be a positive integer or Infinity.",
    );
  }

  const results: T2[] = new Array(array.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < array.length) {
      const index = nextIndex++;

      // Like `Array.prototype.map`, skip holes in sparse arrays, leaving the
      // corresponding slots in `results` empty.
      if (!(index in array)) {
        continue;
      }

      // `index` is an own index of `array` here, so `array[index]` is a
      // value of type `T1`.
      results[index] = await callback(array[index]!, index, array);
    }
  }

  // Unlimited concurrency is achieved by starting a worker per value, so
  // that every callback is invoked synchronously, in order, as with
  // `Array.prototype.map`, and holes are handled the same way either way.
  await Promise.all(
    Array.from({ length: Math.min(concurrency, array.length) }, worker),
  );

  return results;
}
