"use strict";

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.js.org/docs/en/hooks.html
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY
 * TO INVALIDATE ANY CACHED DEPENDENCY ANALYSIS.  We recommend to run "rush update --full"
 * after any modification to pnpmfile.js.
 *
 */
module.exports = {
  hooks: {
    readPackage
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */
function readPackage(packageJson, context) {
  // // The karma types have a missing dependency on typings from the log4js package.
  // if (packageJson.name === '@types/karma') {
  //  packageJson.dependencies['log4js'] = '0.6.38';
  //  context.log('Fixed up dependencies for @types/karma');
  // }

  // https://github.com/Microsoft/web-build-tools/issues/1197.
  // https://github.com/Microsoft/web-build-tools/blob/master/core-build/gulp-core-build/package.json.
  if (packageJson.name === "@types/gulp") {
    packageJson.dependencies["@types/node"] = "8.5.8";
    packageJson.dependencies["@types/orchestrator"] = "0.0.30";
    packageJson.dependencies["@types/vinyl"] = "1.2.30";
    context.log("Fixed up dependencies for @types/gulp");
  }

  // https://github.com/Microsoft/web-build-tools/issues/1197.
  // https://github.com/Microsoft/web-build-tools/blob/master/core-build/gulp-core-build/package.json.
  if (packageJson.name === "@types/vinyl") {
    packageJson.dependencies["@types/node"] = "8.5.8";
    context.log("Fixed up dependencies for @types/vinyl");
  }

  return packageJson;
}