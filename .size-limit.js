/** @type {import('size-limit').SizeLimitConfig} */
module.exports = [
  {
    name: "@ts-utils/array",
    path: "packages/array/dist/array.mjs",
    limit: "2 KB",
  },
  {
    name: "@ts-utils/map",
    path: "packages/map/dist/map.mjs",
    limit: "1 KB",
  },
];
