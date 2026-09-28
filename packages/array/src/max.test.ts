import { InsufficientValuesError, max } from "./index";

describe("max", () => {
  it("should not mutate the input array", () => {
    const array = [3, 1, 2];

    max(array);

    expect(array).toEqual([3, 1, 2]);
  });

  it("should return the maximum value of an array", () => {
    expect(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(10);
  });

  it.each([
    [[1, NaN, 3]],
    [[NaN, 1, 3]],
    [[1, 3, NaN]],
    [[NaN]],
    [[-0, 0]],
    [[0, -0]],
    [[-0]],
    [[-Infinity, Infinity]],
  ])("should match Math.max for %j", (array) => {
    expect(max(array)).toBe(Math.max(...array));
  });

  it("should return NaN for a sparse array, like Math.max", () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3] as number[];

    expect(max(array)).toBe(Math.max(...array));
    expect(max(array)).toBeNaN();
  });

  it("should return the maximum value of a large array", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    expect(max(array)).toEqual(199_999);
  });

  it("should throw an error when the array is empty", () => {
    expect(() => max([])).toThrow(InsufficientValuesError);
    expect(() => max([])).toThrow(
      "The array does not contain enough values to calculate the maximum.",
    );
  });
});
