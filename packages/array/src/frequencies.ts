/**
 * Returns the frequency of each value in an array.
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
