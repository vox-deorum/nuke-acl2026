import ItemLevelCoderSimple from "../../../src/coding/deductive/item-level-simple.js";
import { QAJob, type QAJobConfig } from "../../../src/job.js";
import { LoadJsonStep } from "../../../src/loading/load-json-step.js";
import { CodeStep } from "../../../src/steps/code-step.js";
import { EnsembleCodeStep } from "../../../src/steps/ensemble-code-step.js";
import { ConsolidateStep } from "../../../src/steps/consolidate-step.js";
import { ReliabilityStep } from "../../../src/steps/reliability-step.js";
import { logger } from "../../../src/utils/core/logger.js";

const load = new LoadJsonStep({
    path: "./workspaces/nuke-2026/game-existence",
});

const coderhuman = new CodeStep({
    agent: "Human",
    coders: ["human"]
});

const coder1 = new CodeStep({
    agent: "AI",
    strategy: ItemLevelCoderSimple,
    model: ["local-gpt-oss-120b"],
    codebook: "./workspaces/nuke-2026/game-existence/codebook.json",
    parameters: {
        temperature: 0.5
    },
});

const coder2 = new CodeStep({
    agent: "AI",
    strategy: ItemLevelCoderSimple,
    model: ["local-minimax-m2.7"],
    codebook: "./workspaces/nuke-2026/game-existence/codebook.json",
    parameters: {
        temperature: 0.5
    },
});

const coder3 = new CodeStep({
    agent: "AI",
    strategy: ItemLevelCoderSimple,
    model: ["local-qwen-3.5"],
    codebook: "./workspaces/nuke-2026/game-existence/codebook.json",
    parameters: {
        temperature: 0.5
    },
});

const ensemble = new EnsembleCodeStep({
    coders: [coder1, coder2, coder3],
    voteThreshold: 0.5,
});
 
const consolidate = new ConsolidateStep({
    coder: [coderhuman, coder1, coder2, coder3, ensemble],
    builderConfig: {
        consolidators: [],
    },
});

const reliability = new ReliabilityStep({
    consolidator: consolidate,
    skipCodes: (label) => label === "NA",
    comparisonLevels: ["chunk"]
});

const config: QAJobConfig = {
    steps: [load, coderhuman, coder1, coder2, coder3, ensemble, consolidate, reliability],
    parallel: true,
};

try {
    const job = new QAJob(config);
    await job.execute();
} catch (error) {
    logger.error(error, true);
    process.exit(1);
}
