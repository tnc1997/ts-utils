/* eslint-disable @typescript-eslint/no-require-imports */

const { check } = require("../../compatibility.base.js");

const double = async (value) => value * 2;
const isEven = async (value) => value % 2 === 0;

check(__dirname, "array", [
  {
    name: "contains",
    run: ({ contains }) => [contains([1, 2, 3], 2), contains([1, 2, 3], 4)],
    expected: [true, false],
  },
  {
    name: "count",
    run: ({ count }) => [
      count([1, 2, 3, 4, 5]),
      count([1, 2, 3, 4, 5], (value) => value % 2 === 0),
    ],
    expected: [5, 2],
  },
  {
    name: "filterAsync",
    run: async ({ filterAsync }) => [
      await filterAsync([1, 2, 3, 4, 5], isEven),
      await filterAsync([1, 2, 3, 4, 5], isEven, 2),
      await filterAsync([0, 1, "", "a", null], async (value) => value),
    ],
    expected: [
      [2, 4],
      [2, 4],
      [1, "a"],
    ],
  },
  {
    name: "frequencies",
    run: ({ frequencies }) => frequencies(["a", "b", "a"]),
    expected: new Map([
      ["a", 2],
      ["b", 1],
    ]),
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
    run: async ({ mapAsync }) => [
      await mapAsync([1, 2, 3], double),
      await mapAsync([1, 2, 3], double, 2),
    ],
    expected: [
      [2, 4, 6],
      [2, 4, 6],
    ],
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
    run: ({ median }) => [median([10, 9, 1]), median([1, 3, 2, 4])],
    expected: [9, 2.5],
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
  {
    name: "sum",
    run: ({ sum }) => sum([]),
    throws: "InsufficientValuesError",
  },
]);
