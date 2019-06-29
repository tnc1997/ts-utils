/**
 * Returns an array of the values of a map.
 * @param map - the map to get the values of
 * @returns an array of the values of the map
 * @public
 */
export function values<T1, T2>(map: Map<T1, T2>): T2[] {
  return Array.from(map.values());
}
