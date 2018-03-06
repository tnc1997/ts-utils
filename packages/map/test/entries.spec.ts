import { entries } from '../src/entries';

describe('map-entries', () => {
  it('should return the entries of a map', () => {
    const ENTRIES: Array<[ string, number ]> = [
      [ 'a', 1 ],
      [ 'b', 2 ],
      [ 'c', 3 ],
    ];

    expect(entries(new Map<string, number>(ENTRIES))).toEqual(ENTRIES);
  });
});
