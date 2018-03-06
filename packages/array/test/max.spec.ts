import { max } from '../src/max';

describe('array-max', () => {
  it('should return the maximum value of an array', () => {
    expect(max([ 1, 2, 3, 4, 5 ])).toEqual(5);
  });
});
