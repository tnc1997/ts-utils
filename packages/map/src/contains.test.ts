import { containsKey, containsValue } from "./index";

describe("containsKey", () => {
  it("should check if a map does contain NaN as a key", () => {
    const map = new Map([[NaN, 1]]);

    expect(containsKey(map, NaN)).toBe(true);
  });

  it("should check if a map does contain a specified key", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, "a")).toBe(true);
  });

  it("should check if a map does contain an object key by reference", () => {
    const object = { a: 1 };
    const map = new Map([[object, 1]]);

    expect(containsKey(map, object)).toBe(true);
  });

  it("should check if a map does contain undefined as a key", () => {
    const map = new Map([[undefined, 1]]);

    expect(containsKey(map, undefined)).toBe(true);
  });

  it("should check if a map does not contain a specified key", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsKey<string, number>(map, "d")).toBe(false);
  });

  it("should check if a map does not contain a structurally equal object key", () => {
    const map = new Map([[{ a: 1 }, 1]]);

    expect(containsKey(map, { a: 1 })).toBe(false);
  });

  it("should check if an empty map does not contain a specified key", () => {
    expect(containsKey(new Map<string, number>(), "a")).toBe(false);
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(containsKey(new Map([[-0, 1]]), 0)).toBe(true);

    expect(containsKey(new Map([[0, 1]]), -0)).toBe(true);
  });
});

describe("containsValue", () => {
  it("should check if a map does contain NaN as a value", () => {
    const map = new Map([
      ["a", 1],
      ["b", NaN],
    ]);

    expect(containsValue(map, NaN)).toBe(true);
  });

  it("should check if a map does contain a specified value", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 1)).toBe(true);
  });

  it("should check if a map does contain an object value by reference", () => {
    const object = { a: 1 };
    const map = new Map([["a", object]]);

    expect(containsValue(map, object)).toBe(true);
  });

  it("should check if a map does contain undefined as a value", () => {
    const map = new Map([["a", undefined]]);

    expect(containsValue(map, undefined)).toBe(true);
  });

  it("should check if a map does not contain a specified value", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(containsValue<string, number>(map, 4)).toBe(false);
  });

  it("should check if a map does not contain a structurally equal object value", () => {
    const map = new Map([["a", { a: 1 }]]);

    expect(containsValue(map, { a: 1 })).toBe(false);
  });

  it("should check if a map does not contain undefined as a value", () => {
    const map = new Map<string, number | undefined>([["a", 1]]);

    expect(containsValue(map, undefined)).toBe(false);
  });

  it("should check if a map does not contain undefined when it contains null", () => {
    const map = new Map<string, null | undefined>([["a", null]]);

    expect(containsValue(map, undefined)).toBe(false);
  });

  it("should check if an empty map does not contain a specified value", () => {
    expect(containsValue(new Map<string, number>(), 1)).toBe(false);
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(containsValue(new Map([["a", -0]]), 0)).toBe(true);

    expect(containsValue(new Map([["a", 0]]), -0)).toBe(true);
  });
});
