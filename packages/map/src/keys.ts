/**
 * Returns an array of the keys of a map.
 * @param map - the map to get the keys of
 * @returns an array of the keys of the map
 * @example
 * ```ts
 * keys(new Map([["a", 1], ["b", 2]])); // ["a", "b"]
 * ```
 */
export function keys<T1, T2>(map: Map<T1, T2>): T1[] {
  return Array.from(map.keys());
}
