import { timer } from 'rxjs/observable/timer';
import { map as rxjsMap } from 'rxjs/operators';

import { map } from '../src/map';

describe('array-async-map', () => {
  it('should asynchronously map an array', (done) => {
    map(
        [ 1, 2, 3, 4, 5 ],
        (value: number) => timer(1000).pipe(rxjsMap(() => value * 2)),
    ).subscribe((array: number[]) => {
      expect(array).toEqual([ 2, 4, 6, 8, 10 ]);

      done();
    });
  }, 60000);
});
