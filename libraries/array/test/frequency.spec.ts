import {frequency} from '../src/frequency';

describe('array-frequency', () => {
  it('should return the frequencies of the values of an array', () => {
    expect(frequency([1, 2, 2, 3, 4])).toEqual(new Map([
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 1]
    ]));
  });

  it('should return the frequency of a value of an array', () => {
    expect(frequency([1, 2, 2, 3, 4], 2)).toEqual(2);
  });
});
