import { contains } from "./index";

describe("contains", () => {
  const object = { a: 1 };

  it.each<[unknown[], unknown]>([
    [[1, 2, 3, 4, 5], 5],
    [["a", "b", "c", "d", "e"], "a"],
    [[1, 2, 3, 4, 5], 10],
    [["a", "b", "c", "d", "e"], "j"],
    [[1, NaN, 3], NaN],
    [[-0], 0],
    [[0], -0],
    // eslint-disable-next-line no-sparse-arrays
    [[1, , 3], undefined],
    [[], 1],
    [[], undefined],
    [[], NaN],
    [new Array(2), undefined],
    [[null], undefined],
    [[undefined], null],
    [[{ a: 1 }], { a: 1 }],
    [[object], object],
    [["1"], 1],
    [[1], "1"],
  ])("should match Array.prototype.includes for %p and %p", (array, value) => {
    expect(contains(array, value)).toBe(array.includes(value));
  });

  it("should check if an array does contain NaN", () => {
    expect(contains([1, NaN, 3], NaN)).toBe(true);
  });

  it("should check if an array does contain a specified value", () => {
    expect(contains([1, 2, 3, 4, 5], 5)).toBe(true);

    expect(contains(["a", "b", "c", "d", "e"], "a")).toBe(true);
  });

  it("should check if an array does not contain a specified value", () => {
    expect(contains([1, 2, 3, 4, 5], 10)).toBe(false);

    expect(contains(["a", "b", "c", "d", "e"], "j")).toBe(false);
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(contains([-0], 0)).toBe(true);

    expect(contains([0], -0)).toBe(true);
  });

  it("should read empty slots in sparse arrays as undefined", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(contains([1, , 3], undefined)).toBe(true);
  });

  it("should read an array of only empty slots as containing undefined", () => {
    expect(contains(new Array(2), undefined)).toBe(true);
  });

  it("should not find any value in an empty array", () => {
    expect(contains([], 1)).toBe(false);

    expect(contains([], undefined)).toBe(false);

    expect(contains([], NaN)).toBe(false);
  });

  it("should not consider null and undefined to be equal", () => {
    expect(contains<unknown>([null], undefined)).toBe(false);

    expect(contains<unknown>([undefined], null)).toBe(false);
  });

  it("should compare objects by reference", () => {
    expect(contains([{ a: 1 }], { a: 1 })).toBe(false);

    expect(contains([object], object)).toBe(true);
  });

  it("should not coerce types", () => {
    expect(contains<unknown>(["1"], 1)).toBe(false);

    expect(contains<unknown>([1], "1")).toBe(false);
  });
});
