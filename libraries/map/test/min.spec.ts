import {min} from '../src/min';

describe('min', () => {
  it('should return the entry with the minimum value of a map', () => {
    const array: [string, number][] = [['a', 3], ['b', 1], ['c', 2]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(min<string>(map)).toEqual(['b', 1]);
  });
});
