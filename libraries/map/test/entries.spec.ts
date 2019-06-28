import {entries} from '../src/entries';

describe('map-entries', () => {
  it('should return the entries of a map', () => {
    const array: Array<[string, number]> = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(entries(map)).toEqual(array);
  });
});
