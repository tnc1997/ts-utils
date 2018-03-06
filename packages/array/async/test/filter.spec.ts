import { timer } from 'rxjs/observable/timer';
import { map } from 'rxjs/operators';

import { filter } from '../src/filter';

describe('array-async-filter', () => {
  it('should asynchronously filter an array', (done) => {
    filter(
        [ 1, 2, 3, 4, 5 ],
        (value: number) => timer(1000).pipe(map(() => value % 2 !== 0)),
    ).subscribe((array: number[]) => {
      expect(array).toEqual([ 1, 3, 5 ]);

      done();
    });
  }, 60000);
});
