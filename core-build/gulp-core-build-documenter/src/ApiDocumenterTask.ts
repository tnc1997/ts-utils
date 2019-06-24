import {ApiDocumenterCommandLine} from '@microsoft/api-documenter/lib/cli/ApiDocumenterCommandLine';
import {GulpTask, IBuildConfig} from '@microsoft/gulp-core-build';

/**
 * @public
 */
export interface IApiDocumenterTaskConfig {
  format: Format;

  inputFolder?: string;

  outputFolder?: string;
}

/**
 * @public
 */
export type Format = 'markdown' | 'yaml';

/**
 * @public
 */
export class ApiDocumenterTask extends GulpTask<IApiDocumenterTaskConfig> {
  constructor() {
    super(
      'apiDocumenter',
      {
        inputFolder: './temp',
        outputFolder: './docs'
      }
    );
  }

  public executeTask(): Promise<boolean> {
    const args: string[] = [this.taskConfig.format];

    if (!!this.taskConfig.inputFolder) {
      args.push('--input-folder', this.taskConfig.inputFolder);
    }

    if (!!this.taskConfig.outputFolder) {
      args.push('--output-folder', this.taskConfig.outputFolder);
    }

    return new ApiDocumenterCommandLine().execute(args);
  }

  public isEnabled(buildConfig: IBuildConfig): boolean {
    return super.isEnabled(buildConfig) && !!this.taskConfig.format;
  }
}
