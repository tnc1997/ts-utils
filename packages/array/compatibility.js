/* eslint-disable @typescript-eslint/no-require-imports */

const { check } = require("../../compatibility.base.js");

check(__dirname, "tsUtils.array", [
  {
    name: "contains",
    run: ({ contains }) => contains([1, 2, 3], 2),
    expected: true,
  },
  {
    name: "count",
    run: ({ count }) => count([1, 2, 3, 4, 5]),
    expected: 5,
  },
  {
    name: "filterAsync",
    run: ({ filterAsync }) =>
      filterAsync([1, 2, 3, 4, 5], async (value) => value % 2 === 0),
    expected: [2, 4],
  },
  {
    name: "frequencies",
    run: ({ frequencies }) => [...frequencies(["a", "b", "a"])],
    expected: [
      ["a", 2],
      ["b", 1],
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
    name: "mapAsync",
    run: ({ mapAsync }) => mapAsync([1, 2, 3], async (value) => value * 2),
    expected: [2, 4, 6],
  },
  {
    name: "max",
    run: ({ max }) => max([1, 5, 3]),
    expected: 5,
  },
  {
    name: "max",
    run: ({ max }) => max([]),
    throws: "InsufficientValuesError",
  },
  {
    name: "mean",
    run: ({ mean }) => mean([1, 2, 3, 4]),
    expected: 2.5,
  },
  {
    name: "median",
    run: ({ median }) => median([10, 9, 1]),
    expected: 9,
  },
  {
    name: "min",
    run: ({ min }) => min([5, 1, 3]),
    expected: 1,
  },
  {
    name: "mode",
    run: ({ mode }) => mode([1, 2, 2, 3]),
    expected: 2,
  },
  {
    name: "range",
    run: ({ range }) => range([10, 9, 1]),
    expected: 9,
  },
  {
    name: "sum",
    run: ({ sum }) => sum([1, 2, 3]),
    expected: 6,
  },
]);
