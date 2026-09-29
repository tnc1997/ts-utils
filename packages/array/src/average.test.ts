import { InsufficientValuesError, mean, median, mode, range } from "./index";

describe("mean", () => {
  it("should not mutate the input array", () => {
    const array = [2, 10, 1];

    mean(array);

    expect(array).toEqual([2, 10, 1]);
  });

  it("should return the mean of a single-element array", () => {
    expect(mean([1])).toEqual(1);
  });

  it("should return the mean of an array of negative numbers", () => {
    expect(mean([-1, -2, -3, -4, -5])).toEqual(-3);
  });

  it("should return the mean of an array where lexicographic and numeric sort disagree", () => {
    expect(mean([2, 10, 1])).toEqual(13 / 3);
  });

  it("should return the mean of an array with duplicate values", () => {
    expect(mean([2, 2, 4])).toEqual(8 / 3);
  });

  it("should return the mean of an even-length array", () => {
    expect(mean([1, 2, 3, 4])).toEqual(2.5);
  });

  it("should return the mean of an odd-length array", () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);
  });

  it("should throw when the array is empty", () => {
    expect(() => mean([])).toThrow(InsufficientValuesError);
    expect(() => mean([])).toThrow(
      "The array does not contain enough values to calculate the mean.",
    );
  });
});

describe("median", () => {
  it("should not mutate the input array", () => {
    const array = [2, 10, 1];

    median(array);

    expect(array).toEqual([2, 10, 1]);
  });

  it("should return the median of a single-element array", () => {
    expect(median([1])).toEqual(1);
  });

  it("should return the median of an array of negative numbers", () => {
    expect(median([-1, -2, -3, -4, -5])).toEqual(-3);
    expect(median([-1, -2, -3, -4])).toEqual(-2.5);
  });

  it("should return the median of an array where lexicographic and numeric sort disagree", () => {
    expect(median([2, 10, 1])).toEqual(2);
    expect(median([2, 10, 33, 4])).toEqual(7);
  });

  it("should return the median of an array with duplicate values", () => {
    expect(median([1, 2, 2, 3])).toEqual(2);
  });

  it("should return the median of an even-length array", () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
  });

  it("should return the median of an odd-length array", () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
  });

  it.each([
    [[3, NaN, 1]],
    [[NaN, 1, 3]],
    [[1, 3, NaN]],
    [[1, 2, NaN, 3, 4]],
    [[NaN, 1, 2, 3]],
    [[1, 2, 3, NaN]],
    [[NaN]],
    [[NaN, NaN]],
  ])("should return NaN when %j contains NaN", (array) => {
    expect(median(array)).toBeNaN();
  });

  it.each([
    // eslint-disable-next-line no-sparse-arrays
    ["a hole in the middle", [1, , 3] as number[]],
    // eslint-disable-next-line no-sparse-arrays
    ["a hole at the end", [1, 2, ,] as number[]],
    ["only holes", new Array<number>(3)],
  ])("should return NaN for a sparse array with %s", (_, array) => {
    expect(median(array)).toBeNaN();
  });

  it("should throw when the array is empty", () => {
    expect(() => median([])).toThrow(InsufficientValuesError);
    expect(() => median([])).toThrow(
      "The array does not contain enough values to calculate the median.",
    );
  });
});

describe("mode", () => {
  it("should not mutate the input array", () => {
    const array = [2, 10, 1, 10];

    mode(array);

    expect(array).toEqual([2, 10, 1, 10]);
  });

  it("should return the tied value that appears first in the array when there is a tie", () => {
    expect(mode([1, 1, 2, 2])).toEqual(1);
    expect(mode([2, 2, 1, 1])).toEqual(2);
    expect(mode([1, 2, 2, 1])).toEqual(1);
  });

  it("should return the mode of a single-element array", () => {
    expect(mode([1])).toEqual(1);
  });

  it("should return the mode of an array of negative numbers", () => {
    expect(mode([-1, -2, -2, -3, -4])).toEqual(-2);
  });

  it("should return the mode of an array where lexicographic and numeric sort disagree", () => {
    expect(mode([2, 10, 10, 1])).toEqual(10);
  });

  it("should return the mode of an array with duplicate values", () => {
    expect(mode([-1, -1, -1, -1])).toEqual(-1);
  });

  it("should return the mode of an even-length array", () => {
    expect(mode([1, 2, 2, 3])).toEqual(2);
  });

  it("should return the mode of an odd-length array", () => {
    expect(mode([1, 2, 2, 3, 4])).toEqual(2);
  });

  it("should throw when the array is empty", () => {
    expect(() => mode([])).toThrow(InsufficientValuesError);
    expect(() => mode([])).toThrow(
      "The array does not contain enough values to calculate the mode.",
    );
  });
});

describe("range", () => {
  it("should not mutate the input array", () => {
    const array = [2, 10, 1];

    range(array);

    expect(array).toEqual([2, 10, 1]);
  });

  it("should return the range of a single-element array", () => {
    expect(range([1])).toEqual(0);
  });

  it("should return the range of an array of negative numbers", () => {
    expect(range([-1, -2, -3, -4, -5])).toEqual(4);
  });

  it("should return the range of an array where lexicographic and numeric sort disagree", () => {
    expect(range([2, 10, 1])).toEqual(9);
    expect(range([2, 10, 33, 4])).toEqual(31);
  });

  it("should return the range of an array with duplicate values", () => {
    expect(range([2, 2, 4])).toEqual(2);
  });

  it("should return the range of an even-length array", () => {
    expect(range([1, 2, 3, 4])).toEqual(3);
  });

  it("should return the range of an odd-length array", () => {
    expect(range([1, 2, 3, 4, 5])).toEqual(4);
  });

  it("should return the range of a large array", () => {
    const array = Array.from({ length: 200_000 }, (_, index) => index);

    expect(range(array)).toEqual(199_999);
  });

  it("should return NaN when the array contains NaN", () => {
    expect(range([1, NaN, 3])).toBeNaN();
    expect(range([NaN, 1, 3])).toBeNaN();
  });

  it.each([[[Infinity]], [[-Infinity, -Infinity]], [[5, 5, 5]]])(
    "should return 0 when all of the values in %j are equal",
    (array) => {
      expect(range(array)).toBe(0);
    },
  );

  it.each([[[-Infinity, Infinity]], [[1, Infinity]], [[-Infinity, 1]]])(
    "should return Infinity when %j contains an infinite extreme",
    (array) => {
      expect(range(array)).toBe(Infinity);
    },
  );

  it.each([[[-0]], [[-0, 0]], [[0, -0]]])(
    "should return 0 rather than -0 for %j",
    (array) => {
      expect(range(array)).toBe(0);
    },
  );

  it("should throw when the array is empty", () => {
    expect(() => range([])).toThrow(InsufficientValuesError);
    expect(() => range([])).toThrow(
      "The array does not contain enough values to calculate the range.",
    );
  });
});
