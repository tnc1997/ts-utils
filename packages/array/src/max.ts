/**
 * Returns the maximum value of an array.
 * @param array - the array to get the maximum of
 * @returns the maximum value
 */
export function max(array: number[]): number {
  if (array.length === 0) {
    throw new Error(
      "The array does not contain enough values to calculate the maximum.",
    );
  }

  return array.reduce((a, b) => (b > a ? b : a));
}
