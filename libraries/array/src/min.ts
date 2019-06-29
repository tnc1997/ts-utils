/**
 * Returns the minimum value of an array.
 * @param array - the array to get the minimum of
 * @returns the minimum value
 * @public
 */
export function min(array: number[]): number {
  return array.sort()[0];
}
