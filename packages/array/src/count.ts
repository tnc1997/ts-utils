/**
 * Count instances of a value of an array by a callback function.
 * @param {T1[]} array the array to count the instances of a value for
 * @param {function(
 * value: T1
 * ): T2} callback the function to be performed on every value returning
 * the criteria for the count
 * @return {Map<T2, number>} a map with the criteria from the callback as the
 * keys and the count as the values
 */
export function countBy<T1, T2>(
    array: T1[],
    callback: (value: T1) => T2,
): Map<T2, number> {
  const COUNT: Map<T2, number> = new Map<T2, number>();

  array.forEach((value: T1) => {
    const KEY: T2 = callback(value);

    COUNT.set(KEY, COUNT.has(KEY) ? COUNT.get(KEY) + 1 : 1);
  });

  return COUNT;
}
