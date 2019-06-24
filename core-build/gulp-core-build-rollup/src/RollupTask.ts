// @microsoft/gulp-core-build-webpack
//
// Copyright (c) Microsoft Corporation. All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {GulpTask, IBuildConfig} from '@microsoft/gulp-core-build';
import {Gulp} from 'gulp';
import {resolve} from 'path';
import * as Rollup from 'rollup';
import {RollupBuild, RollupOptions} from 'rollup';

/**
 * @public
 */
export interface IRollupTaskConfig {
  /**
   * Path to a rollup config. A path to a config takes precedence over the "config" option.
   */
  configPath: string;

  /**
   * Rollup config object. If a path is specified by "configPath," and it is valid, this option is ignored.
   */
  config?: RollupOptions | RollupOptions[];

  /**
   * An array of regular expressions or regular expression strings.
   */
  suppressWarnings?: (string | RegExp)[];

  /**
   * An instance of the rollup compiler object.
   */
  rollup?: typeof Rollup;

  /**
   * If true, a summary of the compilation will be printed after it completes. Defaults to true.
   */
  printStats?: boolean;
}

/**
 * @public
 */
export class RollupTask<TExtendedConfig = {}> extends GulpTask<IRollupTaskConfig & TExtendedConfig> {
  private static async forEachAsync<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => Promise<void>
  ): Promise<void> {
    for (let i: number = 0; i < array.length; i++) {
      await callback(array[i], i, array);
    }
  }

  constructor(extendedName: string = 'rollup', extendedConfig?: TExtendedConfig) {
    super(
      extendedName,
      {
        configPath: './rollup.config.js',
        suppressWarnings: [],
        printStats: true,
        ...(extendedConfig as {})
      } as any // tslint:disable-line:no-any
    );
  }

  public async executeTask(gulp: Gulp, completeCallback: (error?: string) => void): Promise<void> {
    const shouldInitRollup: boolean = process.argv.indexOf('--initrollup') > -1;

    if (shouldInitRollup) {
      this.log(
        'Initializing a rollup.config.js, which bundles lib/index.js ' +
        'into dist/packagename.js as a UMD module.'
      );

      this.copyFile(resolve(__dirname, 'rollup.config.js'));

      return;
    } else {
      let rollupOptions: RollupOptions[];

      if (this.taskConfig.configPath && this.fileExists(this.taskConfig.configPath)) {
        try {
          const path: string = this.resolvePath(this.taskConfig.configPath);
          const config: RollupOptions | RollupOptions[] = require(path);

          rollupOptions = config instanceof Array ? config : [config];
        } catch (err) {
          throw new Error(`Error parsing rollup config '${this.taskConfig.configPath}': ${err}`);
        }
      } else if (this.taskConfig.config) {
        const config: RollupOptions | RollupOptions[] = this.taskConfig.config;

        rollupOptions = config instanceof Array ? config : [config];
      } else {
        this.logWarning(
          'No rollup config has been provided. Run again using --initrollup to create a default config, ' +
          'or call rollup.setConfig({ configPath: null }) in your gulpfile.'
        );

        return;
      }

      const rollup: typeof Rollup = this.taskConfig.rollup || require('rollup');

      await RollupTask.forEachAsync(rollupOptions, async options => {
        const {input, output} = options;

        if (output instanceof Array) {
          for (const value of output) {
            this.log(`Bundling '${input}' into '${value.file}' as a '${value.format}' module.`);
          }

          const build: RollupBuild = await rollup.rollup(options);

          for (const value of output) {
            await build.write(value);
          }
        } else if (output !== undefined) {
          this.log(`Bundling '${input}' into '${output.file}' as a '${output.format}' module.`);

          const build: RollupBuild = await rollup.rollup(options);

          await build.write(output);
        } else {
          this.log(`Bundling '${input}' into 'dist/index.js' as a 'cjs' module.`);

          const build: RollupBuild = await rollup.rollup(options);

          await build.write({file: 'dist/index.js', format: 'cjs'});
        }
      });
    }
  }

  public isEnabled(buildConfig: IBuildConfig): boolean {
    return super.isEnabled(buildConfig) && !!this.taskConfig.configPath;
  }
}
