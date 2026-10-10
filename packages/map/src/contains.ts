/**
 * Determines whether a map contains a specified key.
 *
 * Like `Map.prototype.has`, keys are compared using SameValueZero, so `NaN`
 * is found and `-0` is equal to `0`.
 * @param map - the map to search
 * @param key - the key to search for
 * @returns true if the map contains the key; otherwise, false
 * @example
 * ```ts
 * containsKey(new Map([["a", 1]]), "a"); // true
 * ```
 */
export function containsKey<T1, T2>(map: Map<T1, T2>, key: T1): boolean {
  return map.has(key);
}

/**
 * Determines whether a map contains a specified value.
 *
 * Values are compared using SameValueZero, with the same results as
 * `Array.prototype.includes`, so `NaN` is found and `-0` is equal to `0`.
 * @param map - the map to search
 * @param value - the value to search for
 * @returns true if the map contains the value; otherwise, false
 * @example
 * ```ts
 * containsValue(new Map([["a", 1]]), 1); // true
 * ```
 */
export function containsValue<T1, T2>(map: Map<T1, T2>, value: T2): boolean {
  for (const _value of map.values()) {
    // SameValueZero: like `===`, except that `NaN` is equal to itself.
    if (_value === value || (_value !== _value && value !== value)) {
      return true;
    }
  }

  return false;
}
