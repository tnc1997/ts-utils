import { keys } from "./index";

describe("keys", () => {
  it("should not change the map when the array is changed", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    keys<string, number>(map).push("b");

    expect(map).toEqual(new Map([["a", 1]]));
  });

  it("should return a new array for each call", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    expect(keys<string, number>(map)).not.toBe(keys<string, number>(map));
  });

  it("should return an empty array for an empty map", () => {
    expect(keys(new Map())).toEqual([]);
  });

  it("should return the keys in insertion order", () => {
    const map: Map<number, string> = new Map<number, string>([
      [1, "a"],
      [2, "b"],
    ]);

    map.delete(1);
    map.set(1, "c");

    expect(keys<number, string>(map)).toEqual([2, 1]);
  });

  it("should return the keys of a map", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(keys<string, number>(map)).toEqual(["a", "b", "c"]);
  });

  it("should return the keys of a map with non-string keys", () => {
    const key = {};
    const result = keys<unknown, number>(
      new Map<unknown, number>([
        [1, 1],
        [key, 2],
        [NaN, 3],
        [undefined, 4],
      ]),
    );

    expect(result).toEqual([1, key, NaN, undefined]);
    expect(result[1]).toBe(key);
  });

  it("should return +0 for a -0 key", () => {
    const [key] = keys<number, number>(new Map<number, number>([[-0, 1]]));

    expect(Object.is(key, 0)).toBe(true);
  });
});
