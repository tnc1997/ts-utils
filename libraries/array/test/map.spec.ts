import {mapAsync} from '../src/map';

describe('mapAsync', () => {
  it('should map the values in an array asynchronously', async () => {
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
});
