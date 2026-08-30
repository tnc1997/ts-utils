import { max } from "../src";

describe("max", () => {
  it("should not mutate the input array", () => {
    const array = [3, 1, 2];

    max(array);

    expect(array).toEqual([3, 1, 2]);
  });

  it("should return the maximum value of an array", () => {
    expect(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(10);
  });
});
