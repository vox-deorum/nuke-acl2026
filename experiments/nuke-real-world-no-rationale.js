import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  realWorldNoRationalePrompt,
  repeatModel,
  rewriteRealWorldToolSchemas,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-real-world-no-rationale-${modelName}`),
  modifyPrompt: realWorldNoRationalePrompt,
  rewriteToolSchemas: rewriteRealWorldToolSchemas,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
