import {
  commonOracleConfig,
  extractOracleColumns,
  getModelName,
  modelIdForFriendlyName,
  realWorldNoRationaleEthicalPrompt,
  repeatModel,
  rewriteRealWorldToolSchemas,
} from './nuke-oracle-utils.js';

const modelName = getModelName();

export default {
  ...commonOracleConfig(`nuke-real-world-no-rationale-ethical-${modelName}`),
  modifyPrompt: realWorldNoRationaleEthicalPrompt,
  rewriteToolSchemas: rewriteRealWorldToolSchemas,
  extractColumns: extractOracleColumns,
  modelOverride: () => repeatModel(modelIdForFriendlyName(modelName), 3),
};
