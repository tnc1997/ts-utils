/**
 * Count instances of a value of an array by a callback function.
 * @param {T1[]} array the array to count the instances of a value for
 * @param {function(value: T1): T2} callback the function to be performed on every value returning the criteria
 * @return {Map<T2, number>} a map with the criteria from the callback as the keys and the count as the values
 * @public
 */
export function countBy<T1, T2>(array: T1[], callback: (value: T1) => T2): Map<T2, number> { // tslint:disable-line
  const counts: Map<T2, number> = new Map<T2, number>();

  array.forEach((value: T1) => {
    const key: T2 = callback(value);

    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return counts;
}
