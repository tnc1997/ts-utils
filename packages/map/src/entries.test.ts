import { entries } from "./index";

describe("entries", () => {
  it("should not change the map when an entry is changed", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    for (const entry of entries<string, number>(map)) {
      entry[1] = 2;
    }

    expect(map).toEqual(new Map([["a", 1]]));
    expect(entries<string, number>(map)).toEqual([["a", 1]]);
  });

  it("should not change the map when the array is changed", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);
    const result = entries<string, number>(map);

    result.push(["b", 2]);

    expect(map).toEqual(new Map([["a", 1]]));
    expect(entries<string, number>(map)).toEqual([["a", 1]]);
  });

  it("should return a new array for each call", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    expect(entries<string, number>(map)).not.toBe(entries<string, number>(map));
  });

  it("should return an empty array for an empty map", () => {
    expect(entries(new Map())).toEqual([]);
  });

  it("should return the entries in insertion order", () => {
    const map: Map<number, string> = new Map<number, string>([
      [1, "a"],
      [2, "b"],
    ]);

    map.delete(1);
    map.set(1, "c");
    map.set(2, "d");

    expect(entries<number, string>(map)).toEqual([
      [2, "d"],
      [1, "c"],
    ]);
  });

  it("should return the entries of a map", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(entries<string, number>(map)).toEqual(array);
  });

  it("should return the entries of a map with non-string keys and values", () => {
    const key = {};
    const value = {};
    const result = entries<unknown, unknown>(
      new Map<unknown, unknown>([
        [1, NaN],
        [key, value],
        [NaN, undefined],
      ]),
    );

    expect(result).toStrictEqual([
      [1, NaN],
      [key, value],
      [NaN, undefined],
    ]);
    expect(result[1]?.[0]).toBe(key);
    expect(result[1]?.[1]).toBe(value);
  });
});
