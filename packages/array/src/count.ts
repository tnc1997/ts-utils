/**
 * Returns the number of values in an array that optionally satisfy a condition.
 * @param array - the array to count the values of
 * @param callback - the function to test each value for a condition
 * @returns the number of values in the array that optionally satisfy the condition
 * @example
 * ```ts
 * count([1, 2, 3, 4]); // 4
 * count([1, 2, 3, 4], (value) => value % 2 === 0); // 2
 * ```
 */
export function count<T>(array: T[], callback?: (value: T) => boolean): number {
  if (!callback) {
    return array.length;
  } else {
    return array.filter(callback).length;
  }
}
