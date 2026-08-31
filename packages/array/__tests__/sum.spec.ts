import { sum } from "../src";

describe("sum", () => {
  it("should return the sum of the values of an array", () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15);
  });

  it("should throw an error when the array is empty", () => {
    expect(() => sum([])).toThrow(
      "The array does not contain enough values to calculate the sum."
    );
  });
});
