import { entries } from "./entries";
import { InsufficientValuesError } from "./errors";

/**
 * Returns the entry with the minimum value of a map.
 * @param map - map the map to get the minimum value of
 * @returns the entry with the minimum value
 */
export function min<T>(map: Map<T, number>): [T, number] {
  if (map.size === 0) {
    throw new InsufficientValuesError(
      "The map does not contain enough values to calculate the minimum.",
    );
  }

  // `map` is checked to be non-empty above, so the sorted entries always
  // contain at least one element.
  return entries(map).sort((a: [T, number], b: [T, number]) => a[1] - b[1])[0]!;
}
