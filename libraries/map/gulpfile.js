"use strict";

const {getConfig, initialize, jest, parallel, serial, setConfig, task} = require("@microsoft/gulp-core-build");
const {tscCmd, tslintCmd, apiExtractor} = require("@microsoft/gulp-core-build-typescript");
const apiDocumenter = require("@ts-utils/gulp-core-build-documenter");
const rollup = require("@ts-utils/gulp-core-build-rollup");

setConfig({
  shouldWarningsFailBuild: getConfig().production
});

task("default", serial(parallel(tscCmd, tslintCmd), apiExtractor, apiDocumenter, rollup, jest));

initialize(require("gulp"));
