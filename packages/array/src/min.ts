/**
 * Return the minimum value of an array.
 * @param {number[]} array the array to get the minimum for
 * @return {number} the minimum value
 */
export function min(array: number[]): number {
  return array.sort()[ 0 ];
}
