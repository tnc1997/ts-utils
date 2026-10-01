import { InsufficientValuesError } from "./errors";

/**
 * Returns the minimum value of an array.
 *
 * Like `Math.min`, the result is `NaN` if the array contains `NaN` (or an
 * empty slot), and `-0` is considered to be less than `0`.
 * @param array - the array to get the minimum of
 * @returns the minimum value
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * min([1, 5, 3]); // 1
 * ```
 */
export function min(array: number[]): number {
  if (array.length === 0) {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the minimum.",
    );
  }

  let result = Infinity;

  // An index loop is used instead of `Math.min(...array)`, which throws a
  // `RangeError` for arrays too large to spread into function arguments.
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (value === undefined || Number.isNaN(value)) {
      return NaN;
    }

    if (value < result || (value === result && Object.is(value, -0))) {
      result = value;
    }
  }

  return result;
}
