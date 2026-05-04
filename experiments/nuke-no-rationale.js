import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  noRationalePrompt,
  repeatModel,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-no-rationale-${modelName}`),
  modifyPrompt: noRationalePrompt,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
