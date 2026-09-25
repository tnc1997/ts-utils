/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

/**
 * Converts a value into a string that can be compared across realms, since
 * values returned by the UMD build are created in a separate `vm` context
 * and so have different prototypes to values created here.
 */
function serialize(value) {
  return JSON.stringify(value, (key, value) =>
    Object.prototype.toString.call(value) === "[object Map]"
      ? { Map: [...value] }
      : value,
  );
}

/**
 * Loads the CJS (`main`), ESM (`module`), and UMD (`browser`) builds of the
 * package in `directory`, and checks the result of every case against each
 * of them.
 *
 * Every export of the package must have at least one case, so that every
 * function is run on each Node version. A case either returns a value (or a
 * promise of a value) that is compared with `expected`, or is expected to
 * throw an instance of the exported error class named by `throws`.
 *
 * @param {string} directory - the directory of the package
 * @param {string} name - the global name of the UMD build
 * @param {{ name: string, run: (exports: object) => unknown, expected?: unknown, throws?: string }[]} cases - the cases to check
 */
async function check(directory, name, cases) {
  const { main: mainPath, module: modulePath, browser: browserPath } = require(
    path.join(directory, "package.json"),
  );

  const context = {};

  vm.createContext(context);

  vm.runInContext(
    fs.readFileSync(path.join(directory, browserPath), "utf8"),
    context,
  );

  const builds = {
    cjs: require(path.join(directory, mainPath)),
    esm: await import(path.join(directory, modulePath)),
    umd: context[name],
  };

  const failures = [];

  for (const [build, exports] of Object.entries(builds)) {
    for (const key of Object.keys(exports)) {
      if (!cases.some((_case) => _case.name === key)) {
        failures.push(`${build}: ${key} is exported but has no case`);
      }
    }

    for (const _case of cases) {
      const label = `${build}: ${_case.name}`;

      if (typeof exports[_case.name] !== "function") {
        failures.push(`${label} is not exported`);

        continue;
      }

      try {
        const result = await _case.run(exports);

        if (_case.throws) {
          failures.push(
            `${label} returned ${serialize(result)}, expected it to throw ${_case.throws}`,
          );
        } else if (serialize(result) !== serialize(_case.expected)) {
          failures.push(
            `${label} returned ${serialize(result)}, expected ${serialize(_case.expected)}`,
          );
        }
      } catch (error) {
        if (!_case.throws || !(error instanceof exports[_case.throws])) {
          failures.push(`${label} threw ${error}`);
        }
      }
    }
  }

  if (failures.length > 0) {
    console.error(failures.join("\n"));

    process.exitCode = 1;
  } else {
    console.log(
      `${name}: ${cases.length} cases passed for cjs, esm, and umd on Node ${process.version}`,
    );
  }
}

module.exports = { check };
