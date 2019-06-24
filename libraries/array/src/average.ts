import {max} from '@ts-utils/map';

import {frequency} from './frequency';
import {sum} from './sum';

/**
 * Return the mean of an array of numerical values.
 * @param {number[]} array the array to calculate the mean for
 * @return {number} the mean of the array
 * @public
 */
export function mean(array: number[]): number {
  return sum(array) / array.length;
}

/**
 * Return the median of an array of numerical values.
 * @param {number[]} array the array to calculate the median for
 * @return {number} the median of the array
 * @public
 */
export function median(array: number[]): number {
  if (array.length > 1) {
    array = array.sort();

    return (array.length + 1) % 2 === 0 ?
      array[((array.length + 1) / 2) - 1] :
      (
        array[Math.floor((array.length + 1) / 2) - 1] +
        array[Math.ceil((array.length + 1) / 2) - 1]
      ) / 2;
  } else {
    throw new Error('The array does not contain enough values to calculate the median.');
  }
}

/**
 * Return the mode of an array of numerical values.
 * @param {number[]} array the array to calculate the mode for
 * @return {number} the mode of the array
 * @public
 */
export function mode(array: number[]): number {
  return max(frequency(array))[0];
}

/**
 * Return the range of an array of numerical values.
 * @param {number[]} array the array to calculate the range for
 * @return {number} the range of the array
 * @public
 */
export function range(array: number[]): number {
  if (array.length > 1) {
    array = array.sort();

    return array[array.length - 1] - array[0];
  } else {
    throw new Error('The array does not contain enough values to calculate the range.');
  }
}
