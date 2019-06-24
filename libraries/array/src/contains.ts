/**
 * Check if an array contains a specified value.
 * @param {T[]} array the array to search
 * @param {T} value the value to search for
 * @return {boolean} true if the array contains the value, otherwise false
 * @public
 */
export function contains<T>(array: T[], value: T): boolean {
  return array.indexOf(value) >= 0;
}
