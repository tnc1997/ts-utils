/**
 * Returns the frequency of each value in an array.
 *
 * Values are compared using SameValueZero, like the keys of a `Map`, so `NaN`
 * values are counted together, `-0` and `0` are counted together under the key
 * `0`, and objects are compared by reference. The keys are in the order that
 * the values first appear, and empty slots in sparse arrays are skipped.
 * @param array - the array to get the frequencies of
 * @returns the frequency of each value in an array
 * @example
 * ```ts
 * frequencies([1, 2, 2, 3]); // Map(3) { 1 => 1, 2 => 2, 3 => 1 }
 * ```
 */
export function frequencies<T>(array: T[]): Map<T, number> {
  const _frequencies: Map<T, number> = new Map<T, number>();

  array.forEach((value: T) => {
    _frequencies.set(value, (_frequencies.get(value) || 0) + 1);
  });

  return _frequencies;
}
