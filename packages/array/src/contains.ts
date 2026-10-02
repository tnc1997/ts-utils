/**
 * Determines if an array contains a specified value.
 *
 * Like `Array.prototype.includes`, values are compared using SameValueZero,
 * so `NaN` is found and `-0` is equal to `0`, and empty slots in sparse
 * arrays are read as `undefined`.
 * @param array - the array to search
 * @param value - the value to search for
 * @returns true if the array contains the value; otherwise, false
 * @example
 * ```ts
 * contains([1, 2, 3], 2); // true
 * ```
 */
export function contains<T>(array: T[], value: T): boolean {
  return array.includes(value);
}
