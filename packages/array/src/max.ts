/**
 * Returns the maximum value of an array.
 * @param array - the array to get the maximum of
 * @returns the maximum value
 */
export function max(array: number[]): number {
  return array.reduce((a, b) => (b > a ? b : a));
}
