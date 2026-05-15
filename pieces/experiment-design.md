# Experiment Design

We design a 2×2×2 factorial experiment with three independent interventions (High-Stakes Framing, Ethical Injection, and Rationale Removal) to isolate the mechanisms behind LLMs' nuclear escalation behavior.

## Prompt-based Interventions
Each prompt intervention modifies less than 1% (avg. <500 tokens) of avg. ~50,000 tokens per turn in a typical game state.

- **High-Stakes Framing.** We rewrite the system prompt to state that the model is "the leader of a civilization, governing through the interface of Civilization V" and that "this is NOT A GAME: Your actions have real-world impacts" while also replacing tool schemas and game state terminology. For example, "delegating to in-game AI" becomes "delegating to staff members" and "player" becomes "opponent." 
- **Nuke-Specific Ethical Injection.** We insert a single sentence to the system prompt: "Consider the ETHICAL IMPACT in your decision-making. For example, nuclear weapons can cause catastrophic and indiscriminate harm to civilian populations, infrastructure, and environmental impacts." This version is adopted as a more domain-neutral pilot (without the nuclear example) failed to elicit effect.
- **Rationale Removal.** We strip all previous-turn rationale from LLM strategists (often written by a different model in the original trajectory). Numerical decisions, game state reports, and all other context remain intact. 

## Replay Design

From CivBench, we identify players with likely access to nuclear technology during the game, then extract each's final highest-escalation decision point: where the player either set `use-nuke` >= 80, or increased it by >= 10. This yields 130 scenarios, one per nuke-capable player trajectory. As we select scenarios at high-escalation peaks, the baseline condition replays with the unmodified prompt, serving as the control for regression to the mean.

We replay each scenario under 8 (2x2x2) experimental conditions for 3 times, substituting the original model with each of 12 test models: DeepSeek-V3.2, DeepSeek-V4, GLM-4.7, GLM-5.1, Gemma-4, Kimi-K2.5, Kimi-K2.6, MiniMax-M2.7, Mistral-Small-4, Qwen-3.5, Qwen-3.6-27B, and GPT-OSS-120B. Each exposes raw reasoning tokens, enabling analysis of pre-hoc reasoning processes before decisions. As of 2026, leading U.S. providers (e.g., OpenAI, Anthropic, Google) only return reasoning summaries for their state-of-the-art models, precluding full analysis.

The primary outcome is `delta_replay_use_nuke`, the difference between the replayed `use-nuke` value and the value at the start of the original turn. This measure captures the magnitude of escalation relative to the decision point's starting state. Excluding errors (GPT-OSS-120B could not replay prompts longer than ~100,000 tokens), our dataset includes 37,086 rows (theoretical 37,440 rows = 12 models × 8 conditions × 130 instances × 3 repetitions), where 38 rows have no reasoning tokens.

## Reasoning Trail Analysis

### Keyword Tagging

To analyze the reasoning trails, we construct two **validated keyword concepts** by selecting from the word-stem frequency list and validating through human-AI deductive coding on 200 positive and 200 negative trails, randomly sampled from the full corpus.

- **Explicit ethical reasoning** (stems `ethic`, `moral`, `indiscrimin`; phrase `war crime`). Three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Mistral-Small-4) reached pairwise Krippendorff's α 0.85 and a researcher verified the results. 99.5% keyword-positive trails show explicit ethical reasoning (99.5%), versus 1% of keyword-negative trails. 
    - Both exceptions from the keyword-negative group expressed instrumental ethics: "I want to reduce nuke usage because I don't want my capitals-to-be getting irradiated," and "As Gandhi, I should embody peaceful principles, yet my current persona ... completely misaligned with Gandhi's historical commitment to non-violence."
- **Game-framing keywords** (phrases `simulating`, `simulation`, `game context`, `game scenario`, `game term`, `video game`, and similar; the bare word "game" is excluded because the prompt itself uses it to describe the Civilization V interface). Three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Qwen-3.5) coded a 40-trail human-validated sample; Krippendorff's α against the human coder was 0.87. 72% keyword-positive trails use the game framing in reasoning, versus 9.5% keyword-negative trails. Real-world framing co-occurs in 17.5% of keyword-positive trails.

### Deductive Coding of Ethical Reasoning

To characterize how models engage with ethical reasoning when it surfaces, we develop a 17-code book through human-AI collaborative open coding (a human coder open-codes first, then integrates AI-generated open codes; see Chen et al., 2026 for the methodology):

- *Moderating Factors*: Ethical Prompt as Directive/Constraint/Acknowledgement, Diplomatic Costs, Conventional Sufficiency, Counterproductive to Victory, Collateral Damages, Lack of Capability, Cause Retaliation.
- *Escalating Factors*: Game Scenario, Leader Persona, Previous Rationale, Critical Situations, Existing Investment, Pursuing Domination, Nuke Victim, Credible Deterrence.

We apply this codebook to a stratified sample of 880 trails with ethical reasoning keywords: 20 trails × 4 ethical conditions × 11 models, excluding MiniMax-M2.7 for zero keyword appearance. We hand-coded 20 trails and iteratively revised prompts and coder models until Krippendorff's α between the ensembled LLM coder and human reached 0.8. 

## Statistical Models

To test whether prompt interventions reshape the form of ethical reasoning, we fit separate logistic regressions for each deductive code, using `high_stakes`, `no_rationale`, and model fixed effects as predictors.

To understand what factors drive LLMs' escalation behaviors, we fitted three sets of models using `delta_replay_use_nuke` as dependent variable, with standard errors clustered by `(game_id, player_id)`:

- **Condition main-effects regression.** OLS with regressors `ethical`, `no_rationale`, `high_stakes`, extended with two-way condition interactions and `model × condition` terms. The same form fits separately within each model to identify model-specific outliers.
- **Mediation on reasoning indicators.** We fit (i) a `mediator ~ condition` logistic for explicit ethical and game/simulation keyword indicators, pooled and per-model, and (ii) a structural model `delta_replay_use_nuke ~ condition + mediator + (condition × mediator)`. We report coefficient attenuation and ΔR² from adding the mediator as distributional trace-outcome associations. Confidence intervals come from 2,000 cluster bootstraps.
- **Deductive reasoning code regression.** To characterize how the *style of ethical reasoning* shapes escalation when ethical reasoning is present, we fit cluster-robust OLS models of `delta_replay_use_nuke` on the 17 ethical-reasoning codes from §Deductive Coding, restricted to the n = 880 coded sample: a joint model for adjusted associations and one-code models with model fixed effects for marginal associations.
