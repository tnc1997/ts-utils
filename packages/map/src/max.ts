import { entries } from "./entries";
import { InsufficientValuesError } from "./errors";

/**
 * Returns the entry with the maximum value of a map.
 * @param map - map the map to get the maximum value of
 * @returns the entry with the maximum value
 */
export function max<T>(map: Map<T, number>): [T, number] {
  if (map.size === 0) {
    throw new InsufficientValuesError(
      "The map does not contain enough values to calculate the maximum.",
    );
  }

  return entries(map).sort((a: [T, number], b: [T, number]) => b[1] - a[1])[0];
}
