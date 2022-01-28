/**
 * Returns the minimum value of an array.
 * @param array - the array to get the minimum of
 * @returns the minimum value
 */
export function min(array: number[]): number {
  return array.sort((a, b) => a - b)[0];
}
