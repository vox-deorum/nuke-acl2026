import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  ethicalPrompt,
  repeatModel,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-ethical-${modelName}`),
  modifyPrompt: ethicalPrompt,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
