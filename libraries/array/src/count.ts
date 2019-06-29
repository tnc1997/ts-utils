/**
 * Returns the number of values in an array.
 * @param array - the array to count the values of
 * @returns the number of values in the array
 * @public
 */
export function count<T>(array: T[]): number;
/**
 * Returns the number of values in an array that satisfy a condition.
 * @param array - the array to count the values of
 * @param callback - the function to test each value for a condition
 * @returns the number of values in the array that satisfy the condition
 * @public
 */
export function count<T>(array: T[], callback: (value: T) => boolean): number;
export function count<T>(array: T[], callback?: (value: T) => boolean): number {
  if (!callback) {
    return array.length;
  } else {
    return array.map(callback).filter(value => value).length;
  }
}
