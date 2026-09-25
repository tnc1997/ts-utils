import { InsufficientValuesError } from "./errors";
import { frequencies } from "./frequencies";
import { sum } from "./sum";

/**
 * Returns the mean of an array of numerical values.
 * @param array - the array to calculate the mean of
 * @returns the mean of the array
 * @example
 * ```ts
 * mean([1, 2, 3, 4]); // 2.5
 * ```
 */
export function mean(array: number[]): number {
  return sum(array) / array.length;
}

/**
 * Returns the median of an array of numerical values.
 * @param array - the array to calculate the median of
 * @returns the median of the array
 * @example
 * ```ts
 * median([1, 3, 2, 4]); // 2.5
 * ```
 */
export function median(array: number[]): number {
  if (array.length > 0) {
    const sorted = [...array].sort((a, b) => a - b);

    const middle = Math.floor(sorted.length / 2);

    // `sorted` has the same length as `array`, which is checked to be
    // non-empty above, so `middle` and `middle - 1` are always valid indexes.
    return sorted.length % 2 === 0
      ? (sorted[middle - 1]! + sorted[middle]!) / 2
      : sorted[middle]!;
  } else {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the median.",
    );
  }
}

/**
 * Returns the mode of an array of numerical values. When multiple values
 * are tied for the highest frequency, the tied value that appears first in
 * the array is returned.
 * @param array - the array to calculate the mode of
 * @returns the mode of the array
 * @example
 * ```ts
 * mode([1, 2, 2, 3]); // 2
 * ```
 */
export function mode(array: number[]): number {
  if (array.length === 0) {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the mode.",
    );
  }

  const _frequencies: Map<number, number> = frequencies(array);

  let _max = 0;
  let _mode!: number;

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
 * @example
 * ```ts
 * range([1, 5, 3, 9]); // 8
 * ```
 */
export function range(array: number[]): number {
  if (array.length > 0) {
    return Math.max(...array) - Math.min(...array);
  } else {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the range.",
    );
  }
}
