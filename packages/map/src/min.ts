import { entries } from './entries';

/**
 * Return the entry with the minimum value of a map.
 * @param {Map<T, number>} map map the map to get the minimum for
 * @return {[T, number]} the entry containing the minimum value
 */
export function min<T>(map: Map<T, number>): [ T, number ] {
  return entries(map).sort(
      (a: [ T, number ], b: [ T, number ]) => a[ 1 ] - b[ 1 ],
  )[ 0 ];
}
