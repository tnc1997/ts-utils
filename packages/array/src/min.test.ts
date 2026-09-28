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
    [[-Infinity]],
    [[Infinity]],
    [[-3, -1, -2]],
    [[1, 9, 3]],
    [[9, 1, 3]],
    [[3, 1, 9]],
    [[-0, -0]],
    [[0, 0]],
    [[0, -0, -0]],
    [[-0, 0, 0]],
    [[-0, 0, -0]],
    [[0, -0, 0]],
  ])("should match Math.min for %j", (array) => {
    expect(min(array)).toBe(Math.min(...array));
  });

  it.each([
    // eslint-disable-next-line no-sparse-arrays
    ["a hole in the middle", [1, , 3] as number[]],
    // eslint-disable-next-line no-sparse-arrays
    ["a hole at the end", [1, 2, ,] as number[]],
    ["only holes", new Array<number>(3)],
  ])(
    "should return NaN for a sparse array with %s, like Math.min",
    (_, array) => {
      expect(min(array)).toBe(Math.min(...array));
      expect(min(array)).toBeNaN();
    },
  );

  it("should return the minimum value of a large array", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    expect(min(array)).toEqual(0);
  });

  it("should return NaN for a large array with NaN at the end", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    array.push(NaN);

    expect(min(array)).toBeNaN();
  });

  it("should throw an error when the array is empty", () => {
    expect(() => min([])).toThrow(InsufficientValuesError);
    expect(() => min([])).toThrow(
      "The array does not contain enough values to calculate the minimum.",
    );
  });
});
