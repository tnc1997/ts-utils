import { filterAsync } from "../src";

describe("filterAsync", () => {
  it("should filter the values in an array asynchronously", async () => {
    function callback(value: number): Promise<boolean> {
      function executor(resolve: (value: boolean) => void): void {
        function handler(): void {
          resolve(value % 2 === 0);
        }

        setTimeout(handler, 5);
      }

      return new Promise<boolean>(executor);
    }

    expect(await filterAsync([1, 2, 3, 4], callback)).toEqual([2, 4]);
  });

  it("should never run more callbacks concurrently than the given concurrency limit", async () => {
    let active = 0;
    let maxActive = 0;

    async function callback(value: number): Promise<boolean> {
      active++;
      maxActive = Math.max(maxActive, active);

      await new Promise((resolve) => setTimeout(resolve, 5));

      active--;

      return value % 2 === 0;
    }

    const array = [1, 2, 3, 4, 5, 6, 7, 8];

    expect(await filterAsync(array, callback, 3)).toEqual([2, 4, 6, 8]);
    expect(maxActive).toBeLessThanOrEqual(3);
    expect(maxActive).toEqual(3);
  });

  it("should return the filtered values in their original order regardless of concurrency", async () => {
    function callback(value: number): Promise<boolean> {
      const delay = (6 - value) * 5;

      function executor(resolve: (value: boolean) => void): void {
        function handler(): void {
          resolve(value % 2 === 0);
        }

        setTimeout(handler, delay);
      }

      return new Promise<boolean>(executor);
    }

    const array = [1, 2, 3, 4, 5, 6];
    const expected = [2, 4, 6];

    expect(await filterAsync(array, callback, 1)).toEqual(expected);
    expect(await filterAsync(array, callback, 2)).toEqual(expected);
    expect(await filterAsync(array, callback, Infinity)).toEqual(expected);
  });

  it("should run all callbacks concurrently by default", async () => {
    let active = 0;
    let maxActive = 0;

    async function callback(value: number): Promise<boolean> {
      active++;
      maxActive = Math.max(maxActive, active);

      await new Promise((resolve) => setTimeout(resolve, 5));

      active--;

      return value % 2 === 0;
    }

    const array = [1, 2, 3, 4, 5, 6];

    expect(await filterAsync(array, callback)).toEqual([2, 4, 6]);
    expect(maxActive).toEqual(array.length);
  });
});
