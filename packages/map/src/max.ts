import { entries } from "./entries";

/**
 * Returns the entry with the maximum value of a map.
 * @param map - map the map to get the maximum value of
 * @returns the entry with the maximum value
 */
export function max<T>(map: Map<T, number>): [T, number] {
  return entries(map).sort((a: [T, number], b: [T, number]) => b[1] - a[1])[0];
}
