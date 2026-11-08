/** @type {import('jest').Config} */
module.exports = {
  collectCoverageFrom: ["packages/*/src/**/*.ts", "!**/*.test.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.base.json" }],
  },
};
