import { max } from '../src/max';

describe('map-max', () => {
  it('should return the entry with the maximum value of a map', () => {
    const ENTRIES: Array<[ string, number ]> = [
      [ 'a', 1 ],
      [ 'b', 3 ],
      [ 'c', 2 ],
    ];

    expect(max(new Map<string, number>(ENTRIES))).toEqual([ 'b', 3 ]);
  });
});
