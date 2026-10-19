/**
 * Returns the number of values in an array that optionally satisfy a condition.
 *
 * Like `Array.prototype.filter`, empty slots in sparse arrays are skipped: they
 * are not counted, and the callback is not called for them.
 * @param array - the array to count the values of
 * @param callback - the function to test each value for a condition
 * @returns the number of values in the array that optionally satisfy the condition
 * @example
 * ```ts
 * count([1, 2, 3, 4]); // 4
 * count([1, 2, 3, 4], (value) => value % 2 === 0); // 2
 * count([1, , 3]); // 2
 * ```
 */
export function count<T>(array: T[], callback?: (value: T) => boolean): number {
  if (!callback) {
    let _count: number = 0;

    for (let index: number = 0; index < array.length; index++) {
      if (index in array) {
        _count++;
      }
    }

    return _count;
  } else {
    return array.filter(callback).length;
  }
}
