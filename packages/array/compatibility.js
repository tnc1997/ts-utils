/* eslint-disable @typescript-eslint/no-require-imports */

const { sum } = require(__dirname);

const result = sum([1, 2, 3]);

if (result !== 6) {
  throw new Error(`sum([1, 2, 3]) returned ${result}, expected 6`);
}
