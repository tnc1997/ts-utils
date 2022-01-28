import { keys } from "./keys";
import { values } from "./values";

/**
 * Determines whether a map contains a specified key.
 * @param map - the map to search
 * @param key - the key to search for
 * @returns true if the map contains the key; otherwise, false
 */
export function containsKey<T1, T2>(map: Map<T1, T2>, key: T1): boolean {
  return keys(map).indexOf(key) >= 0;
}

/**
 * Determines whether a map contains a specified value.
 * @param map - the map to search
 * @param value - the value to search for
 * @returns true if the map contains the value; otherwise, false
 */
export function containsValue<T1, T2>(map: Map<T1, T2>, value: T2): boolean {
  return values(map).indexOf(value) >= 0;
}
