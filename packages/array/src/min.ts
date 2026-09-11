/**
 * Returns the minimum value of an array.
 * @param array - the array to get the minimum of
 * @returns the minimum value
 */
export function min(array: number[]): number {
  if (array.length === 0) {
    throw new Error(
      "The array does not contain enough values to calculate the minimum.",
    );
  }

  return array.reduce((a, b) => (b < a ? b : a));
}
