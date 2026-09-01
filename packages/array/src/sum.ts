/**
 * Returns the sum of the values of a numerical array.
 * @param array - the array to get the sum of
 * @returns the sum of the values
 */
export function sum(array: number[]): number {
  if (array.length === 0) {
    throw new Error(
      "The array does not contain enough values to calculate the sum.",
    );
  }

  return array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );
}
