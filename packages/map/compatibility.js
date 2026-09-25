/* eslint-disable @typescript-eslint/no-require-imports */

const { check } = require("../../compatibility.base.js");

const map = new Map([
  ["a", 1],
  ["b", 3],
  ["c", 2],
]);

check(__dirname, "map", [
  {
    name: "containsKey",
    run: ({ containsKey }) => [containsKey(map, "b"), containsKey(map, "d")],
    expected: [true, false],
  },
  {
    name: "containsValue",
    run: ({ containsValue }) => [containsValue(map, 3), containsValue(map, 4)],
    expected: [true, false],
  },
  {
    name: "entries",
    run: ({ entries }) => entries(map),
    expected: [
      ["a", 1],
      ["b", 3],
      ["c", 2],
    ],
  },
  {
    name: "InsufficientValuesError",
    run: ({ InsufficientValuesError }) => {
      const error = new InsufficientValuesError("message");

      return [Object.prototype.toString.call(error), error.name, error.message];
    },
    expected: ["[object Error]", "InsufficientValuesError", "message"],
  },
  {
    name: "keys",
    run: ({ keys }) => keys(map),
    expected: ["a", "b", "c"],
  },
  {
    name: "max",
    run: ({ max }) => max(map),
    expected: ["b", 3],
  },
  {
    name: "max",
    run: ({ max }) => max(new Map()),
    throws: "InsufficientValuesError",
  },
  {
    name: "min",
    run: ({ min }) => min(map),
    expected: ["a", 1],
  },
  {
    name: "min",
    run: ({ min }) => min(new Map()),
    throws: "InsufficientValuesError",
  },
  {
    name: "values",
    run: ({ values }) => values(map),
    expected: [1, 3, 2],
  },
]);
