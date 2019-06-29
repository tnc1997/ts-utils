import {frequencies} from '../src/frequencies';

describe('frequencies', () => {
  it('should return the frequencies of the values of an array', () => {
    expect(frequencies([1, 2, 2, 3, 4])).toEqual(new Map([
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 1]
    ]));
  });
});
