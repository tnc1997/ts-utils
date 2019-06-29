import {frequencies} from './frequencies';
import {sum} from './sum';

/**
 * Returns the mean of an array of numerical values.
 * @param array - the array to calculate the mean of
 * @returns the mean of the array
 * @public
 */
export function mean(array: number[]): number {
  return sum(array) / array.length;
}

/**
 * Returns the median of an array of numerical values.
 * @param array - the array to calculate the median of
 * @returns the median of the array
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
 * Returns the mode of an array of numerical values.
 * @param array - the array to calculate the mode of
 * @returns the mode of the array
 * @public
 */
export function mode(array: number[]): number {
  const _frequencies: Map<number, number> = frequencies(array);

  let _max: number = -1;
  let _mode: number = -1;

  _frequencies.forEach((value, key) => {
    if (_max < value) {
      _max = value;
      _mode = key;
    }
  });

  return _mode;
}

/**
 * Returns the range of an array of numerical values.
 * @param array - the array to calculate the range of
 * @returns the range of the array
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
