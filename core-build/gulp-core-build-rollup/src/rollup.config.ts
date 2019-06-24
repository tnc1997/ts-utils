import {join} from 'path';
import {RollupOptions} from 'rollup';

import {RollupTask} from './RollupTask';

const rollupTask: RollupTask = require('@ts-utils/gulp-core-build-rollup').rollup;

const packageJSON: { name: string } = require('./package.json');

const inDir: string = join(__dirname, rollupTask.buildConfig.libFolder);
const outDir: string = join(__dirname, rollupTask.buildConfig.distFolder);

const rollupConfiguration: RollupOptions = {
  input: join(inDir, 'index.js'),
  output: {
    name: packageJSON.name,
    file: join(outDir, packageJSON.name),
    format: 'umd',
    sourcemap: true
  }
};

exports = rollupConfiguration;
