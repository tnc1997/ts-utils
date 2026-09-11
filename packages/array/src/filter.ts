import { mapAsync } from "./map";

/**
 * Filters the values in an array asynchronously.
 * @param array - the array to filter
 * @param callback - the asynchronous filter function
 * @param concurrency - the maximum number of callback invocations to run at once. Defaults to `Infinity`, i.e. all invocations run concurrently
 * @returns the filtered array
 */
export async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>,
  concurrency: number = Infinity,
): Promise<T[]> {
  const booleans: boolean[] = await mapAsync(array, callback, concurrency);

  for (const boolean of booleans) {
    if (typeof boolean !== "boolean") {
      throw new TypeError("The callback did not resolve to a boolean value.");
    }
  }

  return array.filter((value, index) => booleans[index]);
}
