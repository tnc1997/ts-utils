import { InsufficientValuesError } from "./errors";

/**
 * Returns the sum of the values of a numerical array.
 * @param array - the array to get the sum of
 * @returns the sum of the values
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

  return array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );
}
