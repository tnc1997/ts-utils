import { mapAsync } from "../src";

describe("mapAsync", () => {
  it("should map the values in an array asynchronously", async () => {
    function callback(value: number): Promise<number> {
      function executor(resolve: (value: number) => void): void {
        function handler(): void {
          resolve(value * value);
        }

        setTimeout(handler, 5);
      }

      return new Promise<number>(executor);
    }

    expect(await mapAsync([1, 2, 3, 4], callback)).toEqual([1, 4, 9, 16]);
  });

  it("should never run more callbacks concurrently than the given concurrency limit", async () => {
    let active = 0;
    let maxActive = 0;

    async function callback(value: number): Promise<number> {
      active++;
      maxActive = Math.max(maxActive, active);

      await new Promise((resolve) => setTimeout(resolve, 5));

      active--;

      return value * value;
    }

    const array = [1, 2, 3, 4, 5, 6, 7, 8];

    expect(await mapAsync(array, callback, 3)).toEqual([
      1, 4, 9, 16, 25, 36, 49, 64,
    ]);
    expect(maxActive).toBeLessThanOrEqual(3);
    expect(maxActive).toEqual(3);
  });

  it("should return the mapped values in their original order regardless of concurrency", async () => {
    function callback(value: number): Promise<number> {
      const delay = (5 - value) * 5;

      function executor(resolve: (value: number) => void): void {
        function handler(): void {
          resolve(value * value);
        }

        setTimeout(handler, delay);
      }

      return new Promise<number>(executor);
    }

    const array = [1, 2, 3, 4, 5];
    const expected = [1, 4, 9, 16, 25];

    expect(await mapAsync(array, callback, 1)).toEqual(expected);
    expect(await mapAsync(array, callback, 2)).toEqual(expected);
    expect(await mapAsync(array, callback, Infinity)).toEqual(expected);
  });

  it("should run all callbacks concurrently by default", async () => {
    let active = 0;
    let maxActive = 0;

    async function callback(value: number): Promise<number> {
      active++;
      maxActive = Math.max(maxActive, active);

      await new Promise((resolve) => setTimeout(resolve, 5));

      active--;

      return value * value;
    }

    const array = [1, 2, 3, 4, 5];

    expect(await mapAsync(array, callback)).toEqual([1, 4, 9, 16, 25]);
    expect(maxActive).toEqual(array.length);
  });
});
