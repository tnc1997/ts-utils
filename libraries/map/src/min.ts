import {entries} from './entries';

/**
 * Returns the entry with the minimum value of a map.
 * @param map - map the map to get the minimum value of
 * @returns the entry with the minimum value
 * @public
 */
export function min<T>(map: Map<T, number>): [T, number] {
  return entries(map).sort((a: [T, number], b: [T, number]) => a[1] - b[1])[0];
}
