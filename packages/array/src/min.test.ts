import { InsufficientValuesError, min } from "./index";

describe("min", () => {
  it("should not mutate the input array", () => {
    const array = [3, 1, 2];

    min(array);

    expect(array).toEqual([3, 1, 2]);
  });

  it("should return the minimum value of an array", () => {
    expect(min([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(1);
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
  ])("should match Math.min for %j", (array) => {
    expect(min(array)).toBe(Math.min(...array));
  });

  it("should return NaN for a sparse array, like Math.min", () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3] as number[];

    expect(min(array)).toBe(Math.min(...array));
    expect(min(array)).toBeNaN();
  });

  it("should return the minimum value of a large array", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    expect(min(array)).toEqual(0);
  });

  it("should throw an error when the array is empty", () => {
    expect(() => min([])).toThrow(InsufficientValuesError);
    expect(() => min([])).toThrow(
      "The array does not contain enough values to calculate the minimum.",
    );
  });
});
