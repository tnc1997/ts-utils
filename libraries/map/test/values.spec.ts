import {values} from '../src/values';

describe('values', () => {
  it('should return the values of a map', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(values<string, number>(map)).toEqual([1, 2, 3]);
  });
});
