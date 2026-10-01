import { mapAsync } from "./index";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

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

    expect(await mapAsync(array, callback, { concurrency: 3 })).toEqual([
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

    expect(await mapAsync(array, callback, { concurrency: 1 })).toEqual(
      expected,
    );
    expect(await mapAsync(array, callback, { concurrency: 2 })).toEqual(
      expected,
    );
    expect(await mapAsync(array, callback, { concurrency: Infinity })).toEqual(
      expected,
    );
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

  it("should skip holes in sparse arrays regardless of concurrency", async () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3];

    for (const concurrency of [1, 2, Infinity]) {
      const callback = jest.fn(async (value: number | undefined) => value);

      const result = await mapAsync(array, callback, { concurrency });

      expect(callback).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(3);
      expect(1 in result).toBe(false);
      expect(result[0]).toEqual(1);
      expect(result[2]).toEqual(3);
    }
  });

  it("should not visit values appended to the array regardless of concurrency", async () => {
    for (const concurrency of [1, 2, Infinity]) {
      const array = [1, 2];

      const callback = jest.fn(
        async (value: number, index: number, array: number[]) => {
          if (array.length < 4) {
            array.push(9);
          }

          return value * value;
        },
      );

      const result = await mapAsync(array, callback, { concurrency });

      expect(callback).toHaveBeenCalledTimes(2);
      expect(result).toEqual([1, 4]);
      expect(array).toEqual([1, 2, 9, 9]);
    }
  });

  it("should not visit values removed from the array regardless of concurrency", async () => {
    for (const concurrency of [1, 2, Infinity]) {
      const array = [1, 2, 3];

      const callback = jest.fn(
        async (value: number, index: number, array: number[]) => {
          if (index === 0) {
            array.pop();
          }

          return value * value;
        },
      );

      const result = await mapAsync(array, callback, { concurrency });

      expect(callback).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(3);
      expect(2 in result).toBe(false);
      expect(result.slice(0, 2)).toEqual([1, 4]);
    }
  });

  it("should invoke every callback before rejecting without a concurrency limit", async () => {
    const callback = jest.fn(async (value: number) => {
      await delay(value === 1 ? 5 : 10);

      if (value === 1) {
        throw new Error("boom");
      }

      return value;
    });

    await expect(mapAsync([1, 2, 3, 4], callback)).rejects.toThrow("boom");
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it("should not count holes in sparse arrays in the aggregate error message", async () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3];

    const callback = jest.fn(async (value: number | undefined) => {
      throw new Error(`boom ${value}`);
    });

    await expect(
      mapAsync(array, callback, { stopOnError: false }),
    ).rejects.toThrow("2 of 2 callbacks rejected.");
  });

  it("should reject with an aggregate error of every rejection reason in the order they happened when stopOnError is false", async () => {
    for (const concurrency of [2, Infinity]) {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 20 : 5);

        if (value === 1 || value === 3) {
          throw new Error(`boom ${value}`);
        }

        return value;
      });

      const promise = mapAsync([1, 2, 3, 4, 5, 6], callback, {
        concurrency,
        stopOnError: false,
      });

      await expect(promise).rejects.toThrow(AggregateError);
      await expect(promise).rejects.toThrow("2 of 6 callbacks rejected.");
      await expect(promise).rejects.toHaveProperty("errors", [
        new Error("boom 3"),
        new Error("boom 1"),
      ]);
      expect(callback).toHaveBeenCalledTimes(6);
    }
  });

  it("should reject with the first rejection reason and ignore later rejections", async () => {
    const callback = jest.fn(async (value: number) => {
      await delay(value === 1 ? 10 : 5);

      throw new Error(`boom ${value}`);
    });

    await expect(
      mapAsync([1, 2, 3], callback, { concurrency: 2 }),
    ).rejects.toThrow("boom 2");

    // Wait for the callback for value 1, which was already running, to
    // reject too.
    await delay(20);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should resolve with the mapped values when stopOnError is false and no callback rejects", async () => {
    const callback = jest.fn(async (value: number) => value * value);

    expect(await mapAsync([1, 2, 3], callback, { stopOnError: false })).toEqual(
      [1, 4, 9],
    );
    expect(
      await mapAsync([1, 2, 3], callback, {
        concurrency: 2,
        stopOnError: false,
      }),
    ).toEqual([1, 4, 9]);
  });

  it("should skip holes in sparse arrays when stopOnError is false", async () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3];

    for (const concurrency of [1, Infinity]) {
      const callback = jest.fn(async (value: number | undefined) => value);

      const result = await mapAsync(array, callback, {
        concurrency,
        stopOnError: false,
      });

      expect(callback).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(3);
      expect(1 in result).toBe(false);
    }
  });

  it("should stop starting callbacks after the first rejection with a concurrency limit", async () => {
    const calls: number[] = [];
    const settled: number[] = [];

    async function callback(value: number): Promise<number> {
      calls.push(value);

      await delay(value === 1 ? 5 : 10);

      settled.push(value);

      if (value === 1) {
        throw new Error("boom");
      }

      return value;
    }

    await expect(
      mapAsync([1, 2, 3, 4, 5, 6], callback, { concurrency: 2 }),
    ).rejects.toThrow("boom");
    expect(calls).toEqual([1, 2]);

    // The callback for value 2 was already running, so it runs to
    // completion, but no further callbacks are started.
    await delay(30);

    expect(calls).toEqual([1, 2]);
    expect(settled).toEqual([1, 2]);
  });

  it.each([NaN, 0, -1, 1.5, -Infinity])(
    "should throw a range error when the concurrency is %p",
    async (concurrency) => {
      const callback = jest.fn(async (value: number) => value * value);

      await expect(
        mapAsync([1, 2, 3], callback, { concurrency }),
      ).rejects.toThrow(RangeError);
      await expect(mapAsync([], callback, { concurrency })).rejects.toThrow(
        "The concurrency must be a positive integer or Infinity.",
      );
      expect(callback).not.toHaveBeenCalled();
    },
  );
});
