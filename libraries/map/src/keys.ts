/**
 * Returns an array of the keys of a map.
 * @param map - the map to get the keys of
 * @returns an array of the keys of the map
 * @public
 */
export function keys<T1, T2>(map: Map<T1, T2>): T1[] {
  return Array.from(map.keys());
}
