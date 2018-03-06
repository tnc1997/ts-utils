import { countBy } from '../src/count';

describe('array-count', () => {
  it('should count instances of a value of an array', () => {
    expect(countBy(
        [ 1, 1, 2, 3, 3 ],
        (value: number) => value,
    )).toEqual(new Map<number, number>([
      [ 1, 2 ],
      [ 2, 1 ],
      [ 3, 2 ],
    ]));
  });

  it('should count instances of a value of an array by parity', () => {
    expect(countBy(
        [ 1, 2, 3, 4, 5 ],
        (value: number) => value % 2 === 0 ? 'even' : 'odd',
    )).toEqual(new Map<'even' | 'odd', number>([
      [ 'even', 2 ],
      [ 'odd', 3 ],
    ]));
  });
});
