import { InsufficientValuesError } from "./errors";

/**
 * Returns the maximum value of an array.
 *
 * Like `Math.max`, the result is `NaN` if the array contains `NaN` (or an
 * empty slot), and `-0` is considered to be less than `0`.
 * @param array - the array to get the maximum of
 * @returns the maximum value
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * max([1, 5, 3]); // 5
 * ```
 */
export function max(array: number[]): number {
  if (array.length === 0) {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the maximum.",
    );
  }

  let result = -Infinity;

  // An index loop is used instead of `Math.max(...array)`, which throws a
  // `RangeError` for arrays too large to spread into function arguments.
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (value === undefined || Number.isNaN(value)) {
      return NaN;
    }

    if (value > result || (value === result && Object.is(result, -0))) {
      result = value;
    }
  }

  return result;
}
