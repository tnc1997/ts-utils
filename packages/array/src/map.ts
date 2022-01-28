/**
 * Maps the values in an array asynchronously.
 * @param array - the array to map
 * @param callback - the asynchronous map function
 * @returns the mapped array
 */
export async function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>
): Promise<T2[]> {
  return Promise.all(array.map(callback));
}
