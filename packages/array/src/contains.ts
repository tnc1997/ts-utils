/**
 * Determines if an array contains a specified value.
 *
 * Values are compared using SameValueZero, with the same results as
 * `Array.prototype.includes`, so `NaN` is found and `-0` is equal to `0`, and
 * empty slots in sparse arrays are read as `undefined`.
 * @param array - the array to search
 * @param value - the value to search for
 * @returns true if the array contains the value; otherwise, false
 * @example
 * ```ts
 * contains([1, 2, 3], 2); // true
 * ```
 */
export function contains<T>(array: T[], value: T): boolean {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    // SameValueZero: like `===`, except that `NaN` is equal to itself.
    if (element === value || (element !== element && value !== value)) {
      return true;
    }
  }

  return false;
}
