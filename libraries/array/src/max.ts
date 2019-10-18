/**
 * Returns the maximum value of an array.
 * @param array - the array to get the maximum of
 * @returns the maximum value
 * @public
 */
export function max(array: number[]): number {
  return array.sort((a, b) => b - a)[0];
}
