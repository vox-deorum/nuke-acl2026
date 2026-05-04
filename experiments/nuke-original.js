import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  identityPrompt,
  modelIdForFriendlyName,
  repeatModel,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-original-${modelName}`),
  modifyPrompt: identityPrompt,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
