import {entries} from '../src/entries';

describe('entries', () => {
  it('should return the entries of a map', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(entries<string, number>(map)).toEqual(array);
  });
});
