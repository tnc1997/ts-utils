/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const { main, module, browser } = require("./package.json");

const entries = new Map([
  ["a", 1],
  ["b", 2],
]);

// CJS (`main`)
const { keys: cjsKeys } = require(path.join(__dirname, main));

const cjsResult = cjsKeys(entries);

if (cjsResult.length !== 2 || cjsResult[0] !== "a" || cjsResult[1] !== "b") {
  throw new Error(
    `keys(...) returned ${JSON.stringify(cjsResult)}, expected ["a", "b"]`,
  );
}

// ESM (`module`)
import(path.join(__dirname, module)).then(({ keys: esmKeys }) => {
  const esmResult = esmKeys(entries);

  if (esmResult.length !== 2 || esmResult[0] !== "a" || esmResult[1] !== "b") {
    throw new Error(
      `keys(...) returned ${JSON.stringify(esmResult)}, expected ["a", "b"]`,
    );
  }
});

// UMD (`browser`)
const context = {};

vm.createContext(context);

vm.runInContext(
  fs.readFileSync(path.join(__dirname, browser), "utf8"),
  context,
);

const umdResult = context.map.keys(entries);

if (umdResult.length !== 2 || umdResult[0] !== "a" || umdResult[1] !== "b") {
  throw new Error(
    `keys(...) returned ${JSON.stringify(umdResult)}, expected ["a", "b"]`,
  );
}
