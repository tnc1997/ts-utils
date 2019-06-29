import {contains} from '../src/contains';

describe('contains', () => {
  it('should check if an array does contain a specified value', () => {
    expect(contains([1, 2, 3, 4, 5], 5)).toBeTruthy();

    expect(contains(['a', 'b', 'c', 'd', 'e'], 'a')).toBeTruthy();
  });

  it('should check if an array does not contain a specified value', () => {
    expect(contains([1, 2, 3, 4, 5], 10)).toBeFalsy();

    expect(contains(['a', 'b', 'c', 'd', 'e'], 'j')).toBeFalsy();
  });
});
