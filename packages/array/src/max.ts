/**
 * Return the maximum value of an array.
 * @param {number[]} array the array to get the maximum for
 * @return {number} the maximum value
 */
export function max(array: number[]): number {
  return array.sort()[ array.length - 1 ];
}
