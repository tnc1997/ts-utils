module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [
          "TS151001"
        ]
      },
      packageJson: "./package.json"
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
