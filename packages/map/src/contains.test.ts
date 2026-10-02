import { containsKey, containsValue } from "./index";

describe("containsKey", () => {
  it("should check if a map does contain a specified key", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, "a")).toBeTruthy();
  });

  it("should check if a map does contain NaN as a key", () => {
    const map = new Map([[NaN, 1]]);

    expect(containsKey(map, NaN)).toBe(true);
  });

  it("should check if a map does not contain a specified key", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, "d")).toBeFalsy();
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(containsKey(new Map([[-0, 1]]), 0)).toBe(true);

    expect(containsKey(new Map([[0, 1]]), -0)).toBe(true);
  });
});

describe("containsValue", () => {
  it("should check if a map does contain a specified value", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 1)).toBeTruthy();
  });

  it("should check if a map does contain NaN as a value", () => {
    const map = new Map([
      ["a", 1],
      ["b", NaN],
    ]);

    expect(containsValue(map, NaN)).toBe(true);
  });

  it("should check if a map does not contain a specified value", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 4)).toBeFalsy();
  });

  it("should check if an empty map does not contain a specified value", () => {
    expect(containsValue(new Map<string, number>(), 1)).toBe(false);
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(containsValue(new Map([["a", -0]]), 0)).toBe(true);

    expect(containsValue(new Map([["a", 0]]), -0)).toBe(true);
  });
});
