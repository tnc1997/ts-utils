import {Observable} from 'rxjs/Observable';
import {map as rxjsMap} from 'rxjs/operators';

import {map} from './map';

/**
 * Asynchronously filter the values in an array.
 * @param {T[]} array the array to filter
 * @param {function(value: T, index: number, array: T[]): Observable<boolean>} callback the asynchronous filter
 * function to be performed on every value in the array
 * @return {Observable<T[]>} the filtered array
 * @public
 */
export function filter<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Observable<boolean>
): Observable<T[]> {
  return map(array, callback).pipe(
    rxjsMap((booleans: boolean[]) =>
      array.filter((value: T, index: number) => booleans[index])
    )
  );
}
