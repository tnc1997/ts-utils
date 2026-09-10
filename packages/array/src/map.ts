/**
 * Maps the values in an array asynchronously.
 * @param array - the array to map
 * @param callback - the asynchronous map function
 * @param concurrency - the maximum number of callback invocations to run at once. Defaults to `Infinity`, i.e. all invocations run concurrently
 * @returns the mapped array
 */
export async function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
  concurrency: number = Infinity,
): Promise<T2[]> {
  if (!Number.isFinite(concurrency) || concurrency >= array.length) {
    return Promise.all(array.map(callback));
  }

  const results: T2[] = new Array(array.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < array.length) {
      const index = nextIndex++;
      results[index] = await callback(array[index], index, array);
    }
  }

  const workerCount = Math.max(1, Math.floor(concurrency));

  await Promise.all(Array.from({ length: workerCount }, worker));

  return results;
}
