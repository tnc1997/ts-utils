import { filterAsync } from "./index";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

describe("filterAsync", () => {
  it("should filter the values by the truthiness of the resolved values", async () => {
    const array: unknown[] = [
      0,
      1,
      "",
      "a",
      null,
      {},
      undefined,
      NaN,
      [],
      false,
      true,
    ];

    async function callback(value: unknown): Promise<unknown> {
      return value;
    }

    const expected: unknown[] = [1, "a", {}, [], true];

    expect(await filterAsync(array, callback)).toEqual(expected);
    expect(await filterAsync(array, callback, { concurrency: 2 })).toEqual(
      expected,
    );
  });

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

    expect(await filterAsync(array, callback, { concurrency: 3 })).toEqual([
      2, 4, 6, 8,
    ]);
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

    expect(await filterAsync(array, callback, { concurrency: 1 })).toEqual(
      expected,
    );
    expect(await filterAsync(array, callback, { concurrency: 2 })).toEqual(
      expected,
    );
    expect(
      await filterAsync(array, callback, { concurrency: Infinity }),
    ).toEqual(expected);
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

  it("should not visit values appended to the array regardless of concurrency", async () => {
    for (const concurrency of [1, 2, Infinity]) {
      const array = [1, 2];

      const callback = jest.fn(
        async (value: number, index: number, array: number[]) => {
          if (array.length < 4) {
            array.push(4);
          }

          return value % 2 === 0;
        },
      );

      expect(await filterAsync(array, callback, { concurrency })).toEqual([2]);
      expect(callback).toHaveBeenCalledTimes(2);
      expect(array).toEqual([1, 2, 4, 4]);
    }
  });

  it("should keep the values passed to the callback even if the array is changed afterwards", async () => {
    for (const concurrency of [1, 2, Infinity]) {
      const array = [1, 2, 3, 4];

      const callback = jest.fn(
        async (value: number, index: number, array: number[]) => {
          if (index === 1) {
            array[1] = 5;
            array.length = 3;
          }

          return value % 2 === 0;
        },
      );

      // Like `Array.prototype.filter`, the changed value at index 1 is kept
      // as it was when visited, and the removed index 3 is not visited.
      expect(await filterAsync(array, callback, { concurrency })).toEqual([2]);
      expect(callback).toHaveBeenCalledTimes(3);
    }
  });

  it("should reject with an aggregate error of every rejection reason when stopOnError is false", async () => {
    const callback = jest.fn(async (value: number) => {
      await delay(value === 1 ? 20 : 5);

      if (value === 1 || value === 3) {
        throw new Error(`boom ${value}`);
      }

      return value % 2 === 0;
    });

    const promise = filterAsync([1, 2, 3, 4, 5, 6], callback, {
      concurrency: 2,
      stopOnError: false,
    });

    await expect(promise).rejects.toThrow(AggregateError);
    await expect(promise).rejects.toHaveProperty("errors", [
      new Error("boom 3"),
      new Error("boom 1"),
    ]);
    expect(callback).toHaveBeenCalledTimes(6);
  });

  it("should stop starting callbacks after the first rejection with a concurrency limit", async () => {
    const callback = jest.fn(async (value: number) => {
      await delay(value === 1 ? 5 : 10);

      if (value === 1) {
        throw new Error("boom");
      }

      return value % 2 === 0;
    });

    await expect(
      filterAsync([1, 2, 3, 4, 5, 6], callback, { concurrency: 2 }),
    ).rejects.toThrow("boom");

    await delay(30);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should throw a range error when the concurrency is invalid", async () => {
    async function callback(value: number): Promise<boolean> {
      return value % 2 === 0;
    }

    await expect(
      filterAsync([1, 2, 3], callback, { concurrency: NaN }),
    ).rejects.toThrow(RangeError);
  });
});
