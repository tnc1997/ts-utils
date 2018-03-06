/**
 * Return the sum of the values of a numerical array.
 * @param {number[]} array the array to get the sum for
 * @return {number} the sum of the values
 */
export function sum(array: number[]): number {
  return array.reduce((previousValue, currentValue) =>
      previousValue + currentValue,
  );
}
