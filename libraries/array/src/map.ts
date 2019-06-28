import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';

/**
 * Asynchronously map the values in an array.
 * @param {T1[]} array the array to map
 * @param {function(value: T1, index: number, array: T1[]): Observable<T2>} callback the asynchronous map function
 * to be performed on every value in the array
 * @return {Observable<T2[]>} the mapped array
 * @public
 */
export function map<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Observable<T2>
): Observable<T2[]> {
  return forkJoin(array.map(callback));
}
