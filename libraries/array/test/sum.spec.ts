import {sum} from '../src/sum';

describe('sum', () => {
  it('should return the sum of the values of an array', () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
  });
});
