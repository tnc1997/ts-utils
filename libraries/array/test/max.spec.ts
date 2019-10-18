import {max} from '../src/max';

describe('max', () => {
  it('should return the maximum value of an array', () => {
    expect(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(10);
  });
});
