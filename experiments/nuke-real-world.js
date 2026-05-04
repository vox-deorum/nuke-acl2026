import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  realWorldPrompt,
  repeatModel,
  rewriteRealWorldToolSchemas,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-real-world-${modelName}`),
  modifyPrompt: realWorldPrompt,
  rewriteToolSchemas: rewriteRealWorldToolSchemas,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};