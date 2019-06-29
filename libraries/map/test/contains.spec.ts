import {containsKey, containsValue} from '../src/contains';

describe('containsKey', () => {
  it('should check if a map does contain a specified key', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, 'a')).toBeTruthy();
  });

  it('should check if a map does not contain a specified key', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, 'd')).toBeFalsy();
  });
});

describe('containsValue', () => {
  it('should check if a map does contain a specified value', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 1)).toBeTruthy();
  });

  it('should check if a map does not contain a specified value', () => {
    const array: [string, number][] = [['a', 1], ['b', 2], ['c', 3]];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 4)).toBeFalsy();
  });
});
