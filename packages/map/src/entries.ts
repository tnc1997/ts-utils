/**
 * Return a two dimensional array of entries from a map.
 * @param {Map<T1, T2>} map the map to get the entries for
 * @return {Array<[T1, T2]>} an array containing the map's entries
 */
export function entries<T1, T2>(map: Map<T1, T2>): Array<[ T1, T2 ]> {
  return Array.from(map.entries());
}
