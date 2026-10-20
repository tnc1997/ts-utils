import { InsufficientValuesError } from "./errors";
import { max } from "./max";
import { min } from "./min";
import { sum } from "./sum";

/**
 * Returns the mean of an array of numerical values.
 *
 * The result is `NaN` if the array contains `NaN` (or an empty slot), as for
 * `max` and `min`, or if it contains both `Infinity` and `-Infinity`. The
 * result may be `±Infinity` if the sum of the values overflows, even if the
 * true mean is finite.
 * @param array - the array to calculate the mean of
 * @returns the mean of the array
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * mean([1, 2, 3, 4]); // 2.5
 * ```
 */
export function mean(array: number[]): number {
  if (array.length === 0) {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the mean.",
    );
  }

  return sum(array) / array.length;
}

/**
 * Returns the median of an array of numerical values.
 *
 * The result is `NaN` if the array contains `NaN` (or an empty slot), as for
 * `max` and `min`, or if the two middle values are `-Infinity` and
 * `Infinity`.
 * @param array - the array to calculate the median of
 * @returns the median of the array
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * median([1, 3, 2, 4]); // 2.5
 * ```
 */
export function median(array: number[]): number {
  if (array.length > 0) {
    // The comparator returns `NaN` for `NaN` values, which makes the sort
    // inconsistent, and empty slots are sorted to the end without being
    // compared, so either would otherwise give a result that depends on the
    // order of the values.
    for (let i = 0; i < array.length; i++) {
      const value = array[i];

      if (value === undefined || Number.isNaN(value)) {
        return NaN;
      }
    }

    const sorted = [...array].sort((a, b) => a - b);

    const middle = Math.floor(sorted.length / 2);

    // `sorted` has the same length as `array`, which is checked to be
    // non-empty above, so `middle` and `middle - 1` are always valid indexes.
    if (sorted.length % 2 === 0) {
      const a = sorted[middle - 1]!;
      const b = sorted[middle]!;

      const midpoint = (a + b) / 2;

      // The sum of two large finite values can overflow to `±Infinity` even
      // though their midpoint is finite, so halve them before adding instead.
      // Halving first would otherwise round subnormal values (e.g. `5e-324`)
      // to `0`, so it is only used when the sum overflows.
      return Number.isFinite(midpoint) ? midpoint : a / 2 + b / 2;
    } else {
      return sorted[middle]!;
    }
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
 *
 * `-0` and `0` are counted as the same value, and the result keeps the sign
 * of the one that appears first in the array.
 *
 * The result is `NaN` if the array contains `NaN` (or an empty slot), as for
 * `max` and `min`.
 * @param array - the array to calculate the mode of
 * @returns the mode of the array
 * @throws {InsufficientValuesError} if the array is empty
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

  // Each key keeps the first value counted under it, since `Map` normalises a
  // `-0` key to `0` and the result should keep the sign of the value as it
  // first appears in the array.
  const _frequencies = new Map<number, { count: number; value: number }>();

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    // Empty slots and `NaN` would otherwise be skipped or counted like any
    // other value, which would give a result that depends on how often the
    // other values appear.
    if (value === undefined || Number.isNaN(value)) {
      return NaN;
    }

    const frequency = _frequencies.get(value);

    if (frequency) {
      frequency.count++;
    } else {
      _frequencies.set(value, { count: 1, value });
    }
  }

  let _max = 0;
  let _mode!: number;

  // The keys are iterated in the order they were first counted, so the tied
  // value that appears first in the array wins.
  _frequencies.forEach(({ count, value }) => {
    if (_max < count) {
      _max = count;
      _mode = value;
    }
  });

  return _mode;
}

/**
 * Returns the range of an array of numerical values.
 *
 * The result is `0` if all of the values are equal, including when they are
 * infinite, and `NaN` if the array contains `NaN` (or an empty slot), as for
 * `max` and `min`.
 * @param array - the array to calculate the range of
 * @returns the range of the array
 * @throws {InsufficientValuesError} if the array is empty
 * @example
 * ```ts
 * range([1, 5, 3, 9]); // 8
 * ```
 */
export function range(array: number[]): number {
  if (array.length > 0) {
    const _max = max(array);
    const _min = min(array);

    // Subtracting equal infinities gives `NaN`, but an array whose values are
    // all equal has a range of `0`. `NaN` is never equal to itself, so arrays
    // containing `NaN` still fall through to the subtraction.
    return _max === _min ? 0 : _max - _min;
  } else {
    throw new InsufficientValuesError(
      "The array does not contain enough values to calculate the range.",
    );
  }
}
