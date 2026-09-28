import { InsufficientValuesError } from "./errors";

/**
 * Returns the entry with the minimum value of a map.
 *
 * Like `Math.min`, the first entry whose value is `NaN` is returned if the
 * map contains `NaN`, and `-0` is considered to be less than `0`. When
 * multiple entries are tied for the minimum value, the entry that was
 * inserted first is returned.
 * @param map - map the map to get the minimum value of
 * @returns the entry with the minimum value
 * @example
 * ```ts
 * min(new Map([["a", 1], ["b", 5], ["c", 3]])); // ["a", 1]
 * ```
 */
export function min<T>(map: Map<T, number>): [T, number] {
  if (map.size === 0) {
    throw new InsufficientValuesError(
      "The map does not contain enough values to calculate the minimum.",
    );
  }

  let result: [T, number] | undefined;

  for (const [key, value] of map) {
    if (Number.isNaN(value)) {
      return [key, value];
    }

    if (
      result === undefined ||
      value < result[1] ||
      (Object.is(result[1], 0) && Object.is(value, -0))
    ) {
      result = [key, value];
    }
  }

  // `map` is checked to be non-empty above, so `result` is always assigned.
  return result!;
}
