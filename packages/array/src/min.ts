import { InsufficientValuesError } from "./errors";

/**
 * Returns the minimum value of an array.
 * @param array - the array to get the minimum of
 * @returns the minimum value
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

  return array.reduce((a, b) => (b < a ? b : a));
}
