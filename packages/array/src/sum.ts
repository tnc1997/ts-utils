/**
 * Returns the sum of the values of a numerical array.
 * @param array - the array to get the sum of
 * @returns the sum of the values
 */
export function sum(array: number[]): number {
  return array.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
}
