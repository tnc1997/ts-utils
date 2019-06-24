import {RollupTask} from './RollupTask';

export {
  IRollupTaskConfig,
  RollupTask
} from './RollupTask';

/**
 * @public
 */
export const rollup: RollupTask = new RollupTask(); // tslint:disable-line:export-name

export default rollup;
