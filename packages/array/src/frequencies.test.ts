import { frequencies } from "./index";

describe("frequencies", () => {
  it("should not mutate the array", () => {
    const array: number[] = [3, 1, 3, 2, 1];

    frequencies(array);

    expect(array).toEqual([3, 1, 3, 2, 1]);
  });

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

  it("should return the frequencies of the values of an array of strings", () => {
    expect(frequencies(["a", "b", "a"])).toEqual(
      new Map([
        ["a", 2],
        ["b", 1],
      ]),
    );
  });

  it("should return the keys in order of first appearance", () => {
    expect([...frequencies([3, 1, 3, 2, 1]).keys()]).toEqual([3, 1, 2]);
  });

  describe("equality", () => {
    it("should count -0 and 0 under a single key", () => {
      expect(frequencies([-0, 0])).toEqual(new Map([[0, 2]]));
    });

    it("should count NaN values under a single key", () => {
      expect(frequencies([NaN, NaN])).toEqual(new Map([[NaN, 2]]));
    });

    it("should count distinct objects under separate keys", () => {
      const a = {};
      const b = {};

      expect(frequencies([a, b, b])).toEqual(
        new Map([
          [a, 1],
          [b, 2],
        ]),
      );
    });

    it("should count the same object under a single key", () => {
      const object = {};

      expect(frequencies([object, object])).toEqual(new Map([[object, 2]]));
    });

    it("should use +0 as the key for -0", () => {
      const [key] = frequencies([-0]).keys();

      expect(key).toBe(0);
    });
  });

  describe("sparse arrays", () => {
    it("should return an empty map for an array of only empty slots", () => {
      expect(frequencies(new Array<number>(3))).toEqual(new Map());
    });

    it("should skip empty slots", () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(frequencies([1, , 1])).toEqual(new Map([[1, 2]]));
    });
  });
});
