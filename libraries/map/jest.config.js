module.exports = {
  globals: {
    "ts-jest": {
      packageJson: "./package.json",
      tsConfig: "./tsconfig.spec.json"
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
