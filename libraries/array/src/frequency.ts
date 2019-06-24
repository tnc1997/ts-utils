import {countBy} from './count';

export function frequency<T>(array: T[], value: T): number;
export function frequency<T>(array: T[], value?: T): Map<T, number>;
export function frequency<T>(array: T[], value?: T): number | Map<T, number> {
  if (value) {
    return array.filter((value1: T) => value1 === value).length;
  } else {
    return countBy(array, (value1: T) => value1);
  }
}
