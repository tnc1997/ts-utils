/**
 * Determines if an array contains a specified value.
 * @param array - the array to search
 * @param value - the value to search for
 * @returns true if the array contains the value; otherwise, false
 */
export function contains<T>(array: T[], value: T): boolean {
  return array.indexOf(value) >= 0;
}
