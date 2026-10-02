import { InsufficientValuesError } from "./errors";

/**
 * Returns the entry with the maximum value of a map.
 *
 * Like `Math.max`, the first entry whose value is `NaN` is returned if the
 * map contains `NaN`, and `-0` is considered to be less than `0`. When
 * multiple entries are tied for the maximum value, the entry that was
 * inserted first is returned.
 * @param map - the map to get the maximum value of
 * @returns the entry with the maximum value
 * @example
 * ```ts
 * max(new Map([["a", 1], ["b", 5], ["c", 3]])); // ["b", 5]
 * ```
 */
export function max<T>(map: Map<T, number>): [T, number] {
  if (map.size === 0) {
    throw new InsufficientValuesError(
      "The map does not contain enough values to calculate the maximum.",
    );
  }

  let result: [T, number] | undefined;

  for (const [key, value] of map) {
    if (Number.isNaN(value)) {
      return [key, value];
    }

    if (
      result === undefined ||
      value > result[1] ||
      (Object.is(value, 0) && Object.is(result[1], -0))
    ) {
      result = [key, value];
    }
  }

  // `map` is checked to be non-empty above, so `result` is always assigned.
  return result!;
}
