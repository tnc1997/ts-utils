/* eslint-disable @typescript-eslint/no-var-requires */

const {
  contains,
  count,
  frequencies,
  mapAsync,
  max,
  mean,
  median,
  min,
  mode,
  range,
  sum,
} = require("@ts-utils/array");

console.log(mean([1, 2, 3, 4]));

console.log(median([1, 2, 3, 4]));

console.log(mode([1, 2, 2, 4]));

console.log(range([1, 2, 3, 4]));

console.log(contains([1, 2, 3, 4], 1));

console.log(count([1, 2, 3, 4]));

console.log(count([1, 2, 3, 4], (i) => i % 2 === 0));

console.log(frequencies([1, 2, 2, 4]));

mapAsync([1, 2, 3, 4], (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i * i);
    }, 1000);
  });
}).then((i) => console.log(i));

console.log(max([1, 2, 3, 4]));

console.log(min([1, 2, 3, 4]));

console.log(sum([1, 2, 3, 4]));
