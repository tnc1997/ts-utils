/**
 * Returns the number of values in an array that optionally satisfy a condition.
 * @param array - the array to count the values of
 * @param callback - the function to test each value for a condition
 * @returns the number of values in the array that optionally satisfy the condition
 */
export function count<T>(array: T[], callback?: (value: T) => boolean): number {
  if (!callback) {
    return array.length;
  } else {
    return array.map(callback).filter((value) => value).length;
  }
}
