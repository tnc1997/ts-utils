import { keys } from "../src";

describe("keys", () => {
  it("should return the keys of a map", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(keys<string, number>(map)).toEqual(["a", "b", "c"]);
  });
});
