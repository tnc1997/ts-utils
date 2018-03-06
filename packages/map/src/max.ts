import { entries } from './entries';

/**
 * Return the entry with the maximum value of a map.
 * @param {Map<T, number>} map map the map to get the maximum for
 * @return {[T, number]} the entry containing the maximum value
 */
export function max<T>(map: Map<T, number>): [ T, number ] {
  return entries(map).sort(
      (a: [ T, number ], b: [ T, number ]) => b[ 1 ] - a[ 1 ],
  )[ 0 ];
}
