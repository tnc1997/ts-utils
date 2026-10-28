import { InsufficientValuesError, sum } from "./index";

describe("sum", () => {
  it("should add the values from left to right without compensated summation", () => {
    expect(sum([0.1, 0.2, 0.3])).toBe(0.1 + 0.2 + 0.3);
  });

  it("should not mutate the input array", () => {
    const array = [2, 10, 1];

    sum(array);

    expect(array).toEqual([2, 10, 1]);
  });

  it("should return -0 for an array of -0", () => {
    expect(sum([-0])).toBe(-0);
    expect(sum([-0, -0])).toBe(-0);
  });

  it("should return 0 for an array of -0 and 0", () => {
    expect(sum([-0, 0])).toBe(0);
  });

  it("should return NaN for a large array with NaN at the end", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    array.push(NaN);

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
    [[1, Infinity], Infinity],
    [[-Infinity, 1], -Infinity],
    [[Infinity, -Infinity], NaN],
    [[Infinity, Infinity], Infinity],
    [[Number.MAX_VALUE, Number.MAX_VALUE], Infinity],
    [[-Number.MAX_VALUE, -Number.MAX_VALUE], -Infinity],
  ])("should return the sum of %p as %p", (array, expected) => {
    expect(sum(array)).toBe(expected);
  });

  it("should return the sum of a large array", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    expect(sum(array)).toEqual(19_999_900_000);
  });

  it("should return the sum of a single-element array", () => {
    expect(sum([1])).toEqual(1);
  });

  it("should return the sum of an array of negative numbers", () => {
    expect(sum([-1, -2, -3])).toEqual(-6);
  });

  it("should return the sum of the values of an array", () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
  });

  it("should throw an error when the array is empty", () => {
    expect(() => sum([])).toThrow(InsufficientValuesError);
    expect(() => sum([])).toThrow(
      "The array does not contain enough values to calculate the sum.",
    );
  });
});
