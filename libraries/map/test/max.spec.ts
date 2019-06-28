import {max} from '../src/max';

describe('map-max', () => {
  it('should return the entry with the maximum value of a map', () => {
    const array: Array<[string, number]> = [['a', 1], ['b', 3], ['c', 2]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(max(map)).toEqual(['b', 3]);
  });
});
