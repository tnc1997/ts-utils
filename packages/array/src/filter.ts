import { mapAsync } from "./map";

/**
 * Filters the values in an array asynchronously.
 * @param array - the array to filter
 * @param callback - the asynchronous filter function
 * @returns the filtered array
 */
export async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const booleans: boolean[] = await mapAsync(array, callback);

  return array.filter((value, index) => booleans[index]);
}
