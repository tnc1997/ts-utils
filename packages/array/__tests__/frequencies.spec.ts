import { frequencies } from "../src";

describe("frequencies", () => {
  it("should return an empty map for an empty array", () => {
    expect(frequencies([])).toEqual(new Map());
  });

  it("should return the frequencies of the values of an array", () => {
    expect(frequencies([1, 2, 2, 3, 4])).toEqual(
      new Map([
        [1, 1],
        [2, 2],
        [3, 1],
        [4, 1],
      ]),
    );
  });
});
