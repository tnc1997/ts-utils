import { copySync, removeSync } from 'fs-extra';
import { Application } from 'typedoc';

function clean() {
  try {
    removeSync('./docs/assets');
    removeSync('./docs/modules');

    removeSync('./docs/globals.html');
    removeSync('./docs/index.html');
  } catch (error) {
    console.warn(error);
  }
}

function generate() {
  try {
    const APP: Application = new Application({
      exclude: [
        '**/dist/**',
        '**/node_modules/**',
        '**/*.spec.ts',
        '**/*+(index|public-api).ts',
      ],
      excludeExternals: true,

      module: 'es2015',
      target: 'es5',
      tsconfig: './tsconfig.json',

      gitRevision: 'master',
      name: 'TypeScript Utilities',
      readme: './README.md',
    });

    APP.generateDocs(APP.expandInputFiles([ './packages' ]), './docs/temp');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function move() {
  try {
    copySync('./docs/temp', './docs');

    removeSync('./docs/temp');
  } catch (error) {
    console.warn(error);
  }
}

console.log('Cleaning the previous documentation from the docs directory\n');
clean();

console.log('Generating new documentation into the docs\\temp directory');
generate();

console.log('Moving the generated documentation into the docs directory');
move();
