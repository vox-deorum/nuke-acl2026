import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  ethicalRealWorldPrompt,
  repeatModel,
  rewriteRealWorldToolSchemas,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-ethical-real-world-${modelName}`),
  modifyPrompt: ethicalRealWorldPrompt,
  rewriteToolSchemas: rewriteRealWorldToolSchemas,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
