const { keys } = require(__dirname);

const result = keys(
  new Map([
    ["a", 1],
    ["b", 2],
  ]),
);

if (result.length !== 2 || result[0] !== "a" || result[1] !== "b") {
  throw new Error(
    `keys(...) returned ${JSON.stringify(result)}, expected ["a", "b"]`,
  );
}
