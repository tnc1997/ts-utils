import { min } from '../src/min';

describe('map-min', () => {
  it('should return the entry with the minimum value of a map', () => {
    const ENTRIES: Array<[ string, number ]> = [
      [ 'a', 3 ],
      [ 'b', 1 ],
      [ 'c', 2 ],
    ];

    expect(min(new Map<string, number>(ENTRIES))).toEqual([ 'b', 1 ]);
  });
});
