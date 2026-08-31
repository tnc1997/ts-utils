/**
 * Returns the minimum value of an array.
 * @param array - the array to get the minimum of
 * @returns the minimum value
 */
export function min(array: number[]): number {
  return array.reduce((a, b) => (b < a ? b : a));
}
