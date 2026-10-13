import { InsufficientValuesError } from "./errors";

/**
 * Returns the sum of the values of a numerical array.
 *
 * The result is `NaN` if the array contains `NaN` (or an empty slot), as for
 * `max` and `min`.
 * @param array - the array to get the sum of
 * @returns the sum of the values
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * sum([1, 2, 3, 4]); // 10
 * ```
 */
export function sum(array: number[]): number {
  if (array.length === 0) {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the sum.",
    );
  }

  // `-0` is the identity for addition, so `sum([-0])` is `-0`, as it would be
  // with `array.reduce`.
  let result = -0;

  // An index loop is used instead of `array.reduce`, which skips empty slots.
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (value === undefined || Number.isNaN(value)) {
      return NaN;
    }

    result += value;
  }

  return result;
}
