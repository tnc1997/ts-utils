import { InsufficientValuesError, sum } from "./index";

describe("sum", () => {
  it("should return the sum of the values of an array", () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
  });

  it("should return -0 for an array of -0", () => {
    expect(sum([-0])).toBe(-0);
    expect(sum([-0, -0])).toBe(-0);
    expect(sum([-0, 0])).toBe(0);
  });

  it.each([
    [[1, NaN, 3]],
    [[NaN, 1, 3]],
    [[1, 3, NaN]],
    [[1, NaN, 1]],
    [[NaN]],
  ])("should return NaN when %p contains NaN", (array) => {
    expect(sum(array)).toBeNaN();
  });

  it.each([
    // eslint-disable-next-line no-sparse-arrays
    ["a hole in the middle", [1, , 3] as number[]],
    // eslint-disable-next-line no-sparse-arrays
    ["a hole between equal values", [1, , 1] as number[]],
    // eslint-disable-next-line no-sparse-arrays
    ["a hole at the end", [1, 2, ,] as number[]],
    ["only holes", new Array<number>(3)],
  ])("should return NaN for a sparse array with %s", (_, array) => {
    expect(sum(array)).toBeNaN();
  });

  it("should throw an error when the array is empty", () => {
    expect(() => sum([])).toThrow(InsufficientValuesError);
    expect(() => sum([])).toThrow(
      "The array does not contain enough values to calculate the sum.",
    );
  });
});
