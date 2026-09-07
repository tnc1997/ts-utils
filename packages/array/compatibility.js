/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const {
  main: mainPath,
  module: modulePath,
  browser: browserPath,
} = require("./package.json");

// CJS (`main`)
const { sum: cjsSum } = require(path.join(__dirname, mainPath));

const cjsResult = cjsSum([1, 2, 3]);

if (cjsResult !== 6) {
  throw new Error(`sum([1, 2, 3]) returned ${cjsResult}, expected 6`);
}

// ESM (`module`)
import(path.join(__dirname, modulePath)).then(({ sum: esmSum }) => {
  const esmResult = esmSum([1, 2, 3]);

  if (esmResult !== 6) {
    throw new Error(`sum([1, 2, 3]) returned ${esmResult}, expected 6`);
  }
});

// UMD (`browser`)
const context = {};

vm.createContext(context);

vm.runInContext(
  fs.readFileSync(path.join(__dirname, browserPath), "utf8"),
  context,
);

const umdResult = context.array.sum([1, 2, 3]);

if (umdResult !== 6) {
  throw new Error(`sum([1, 2, 3]) returned ${umdResult}, expected 6`);
}
