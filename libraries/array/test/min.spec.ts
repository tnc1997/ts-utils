import {min} from '../src/min';

describe('min', () => {
  it('should return the minimum value of an array', () => {
    expect(min([1, 2, 3, 4, 5])).toEqual(1);
  });
});
