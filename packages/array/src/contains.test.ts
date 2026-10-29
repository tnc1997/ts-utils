import { contains } from "./index";

describe("contains", () => {
  const object = { b: 2 };

  it.each<[unknown[], unknown, boolean]>([
    [[1, 2, 3, 4, 5], 5, true],
    [["a", "b", "c", "d", "e"], "a", true],
    [[1, 2, 3, 4, 5], 10, false],
    [["a", "b", "c", "d", "e"], "j", false],
    [[1, NaN, 3], NaN, true],
    [[1, 2, 3], NaN, false],
    [[NaN], 1, false],
    [[-0], 0, true],
    [[0], -0, true],
    // eslint-disable-next-line no-sparse-arrays
    [[1, , 3], undefined, true],
    [new Array(2), undefined, true],
    [[], 1, false],
    [[], undefined, false],
    [[], NaN, false],
    [[null], undefined, false],
    [[undefined], null, false],
    [[{ a: 1 }], { a: 1 }, false],
    [[object], object, true],
    [["1"], 1, false],
    [[1], "1", false],
  ])(
    "should return the same as Array.prototype.includes for %p and %p (%p)",
    (array, value, expected) => {
      expect(contains(array, value)).toBe(expected);
      expect(contains(array, value)).toBe(array.includes(value));
    },
  );
});
