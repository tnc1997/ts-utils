"use strict";

const {apiDocumenter} = require("@gulp-utils/gulp-core-build-api-documenter");
const {rollup} = require("@gulp-utils/gulp-core-build-rollup");
const {initialize, jest, parallel, serial, task} = require("@microsoft/gulp-core-build");
const {tscCmd, tslintCmd, apiExtractor} = require("@microsoft/gulp-core-build-typescript");

task("default", serial(parallel(tscCmd, tslintCmd), apiExtractor, apiDocumenter, rollup, jest));

initialize(require("gulp"));
