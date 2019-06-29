/**
 * Returns a two dimensional array of the entries of a map.
 * @param map - the map to get the entries of
 * @returns an array of the entries of the map
 * @public
 */
export function entries<T1, T2>(map: Map<T1, T2>): [T1, T2][] {
  return Array.from(map.entries());
}
