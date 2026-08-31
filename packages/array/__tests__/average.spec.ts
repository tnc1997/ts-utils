import { mean, median, mode, range } from "../src";

describe("average", () => {
  it("should not mutate the input array when calculating the median", () => {
    const array = [5, 3, 1, 4, 2];

    median(array);

    expect(array).toEqual([5, 3, 1, 4, 2]);
  });

  it("should not mutate the input array when calculating the range", () => {
    const array = [5, 3, 1, 4, 2];

    range(array);

    expect(array).toEqual([5, 3, 1, 4, 2]);
  });

  it("should return the mean of the values of an array", () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);

    expect(mean([-1, -2, -3, -4, -5])).toEqual(-3);
  });

  it("should return the median of the values of an array", () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([1, 2, 3, 4])).toEqual(2.5);

    expect(median([-1, -2, -3, -4, -5])).toEqual(-3);
    expect(median([-1, -2, -3, -4])).toEqual(-2.5);

    expect(median([2, 10, 33, 4])).toEqual(7);

    expect(median([1])).toEqual(1);

    expect(() => median([])).toThrow(
      "The array does not contain enough values to calculate the median."
    );
  });

  it("should return the mode of the values of an array", () => {
    expect(mode([1, 2, 2, 3, 4])).toEqual(2);

    expect(mode([-1, -2, -2, -3, -4])).toEqual(-2);
  });

  it("should return the range of the values of an array", () => {
    expect(range([1, 2, 3, 4, 5])).toEqual(4);

    expect(range([-1, -2, -3, -4, -5])).toEqual(4);

    expect(range([2, 10, 33, 4])).toEqual(31);

    expect(range([1])).toEqual(0);

    expect(() => range([])).toThrow(
      "The array does not contain enough values to calculate the range."
    );
  });
});
