import {mapAsync} from './map';

/**
 * Filters the values in an array asynchronously.
 * @param array - the array to filter
 * @param callback - the asynchronous filter function
 * @returns the filtered array
 * @public
 */
export async function filterAsync<T>( // tslint:disable-line:export-name
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const booleans: boolean[] = await mapAsync(array, callback);

  return array.filter((value, index) => booleans[index]);
}
