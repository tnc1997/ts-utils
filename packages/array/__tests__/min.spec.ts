import { min } from "../src";

describe("min", () => {
  it("should not mutate the input array", () => {
    const array = [3, 1, 2];

    min(array);

    expect(array).toEqual([3, 1, 2]);
  });

  it("should return the minimum value of an array", () => {
    expect(min([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(1);
  });
});
