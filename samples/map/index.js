/* eslint-disable @typescript-eslint/no-var-requires */

const {
  containsKey,
  containsValue,
  entries,
  keys,
  max,
  min,
  values,
} = require("@ts-utils/map");

console.log(
  containsKey(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]),
    "a"
  )
);

console.log(
  containsValue(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]),
    1
  )
);

console.log(
  entries(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ])
  )
);

console.log(
  keys(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ])
  )
);

console.log(
  max(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ])
  )
);

console.log(
  min(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ])
  )
);

console.log(
  values(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ])
  )
);
