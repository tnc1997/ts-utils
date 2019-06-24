import {ApiDocumenterTask} from './ApiDocumenterTask';

export {
  ApiDocumenterTask,
  Format,
  IApiDocumenterTaskConfig
} from './ApiDocumenterTask';

/**
 * @public
 */
export const apiDocumenter: ApiDocumenterTask = new ApiDocumenterTask(); // tslint:disable-line:export-name

export default apiDocumenter;
