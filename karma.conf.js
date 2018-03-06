module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine', 'karma-typescript' ],
    exclude: [
      'packages/**/node_modules/**/*.ts',
      'packages/**/scripts/**/*.ts'
    ],
    files: [
      'packages/**/*.ts'
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    htmlReporter: {
      outputDir: 'test/report'
    },
    reporters: [ 'progress', 'karma-typescript', 'html', 'kjhtml' ],
    browsers: [ 'Chrome' ],
    karmaTypescriptConfig: {
      bundlerOptions: {
        entryPoints: /\.spec\.ts$/i,
        transforms: [
          require('karma-typescript-es6-transform')()
        ]
      },
      coverageOptions: {
        exclude: [
          /\.spec\.ts$/i,
          /index\.ts$/i,
          /public-api\.ts$/i
        ]
      },
      reports: {
        "html": "test/coverage",
        "text-summary": ""
      },
      tsconfig: './tsconfig.spec.json'
    }
  });
};
