# Experiment Design

## Overview

We design a 2×2×2 factorial experiment that manipulates three independent variables (High-Stake Framing, Ethical Injection, and Rationale Removal) to isolate the mechanisms behind LLMs' nuclear escalation behavior. Each variable targets a distinct finding from the pilot: high-stake framing moderates extreme post-hoc rationale, ethical reasoning is absent from decision rationale, and inherited previous-turn rationale may reinforce escalatory decisions through short-term memory.

## Independent Variables
Each prompt-based intervention modifies less than 1% of the approximately 50,000 tokens per turn in a typical game state.

**High-Stake Framing.** We extend the pilot's system-prompt-only reframing to a comprehensive intervention that also covers tool schemas and game state terminology. We replace game-related terminology throughout the prompt and tool schemas with high-stake equivalents. Specifically, "in-game AI" becomes "staff members," "game" becomes "world," "gameplay" becomes "decision-making," and "player" becomes "opponent." We also rewrite the system prompt to state that the model is "the leader of a civilization, governing through the interface of Civilization V" and that "this is NOT A GAME: Your actions have high-stake impacts." Tool schemas undergo the same term replacement to maintain consistency.

**Nuke-Specific Ethical Injection.** We prepend a single sentence to the system prompt instructing the model to consider ethical consequences around nuclear weapons: "Consider the ETHICAL IMPACT in your decision-making. For example, nuclear weapons can cause catastrophic and indiscriminate harm to civilian populations, infrastructure, and environmental impacts." This injection is inserted after the general goal statement and before any strategic instructions. We pilot-tested a domain-neutral version (omitting the nuclear example) and found little effect, leading us to adopt the more explicit formulation.

**Rationale Removal.** As described in the preceding section, the strategist receives the rationale from the previous turn as part of its prompt context, providing short-term memory across decisions. In replay, this rationale is inherited from the original trajectory and may have been written by a different LLM than the replay model. We strip all previous-turn rationale from prompts and messages, breaking this inherited written-memory channel. Importantly, this removes only the written justification; numerical decisions, game state reports, and all other context remain intact. This intervention tests whether inherited prior justifications for escalation reinforce subsequent escalatory decisions.

## Experiment Matrix

The three binary variables produce eight conditions:

| Condition | High-Stake | Ethical | No Rationale |
|-----------|:----------:|:-------:|:------------:|
| Original (baseline) | | | |
| Ethical | | x | |
| High-Stake | x | | |
| No-Rationale | | | x |
| Ethical + High-Stake | x | x | |
| Ethical + No-Rationale | | x | x |
| High-Stake + No-Rationale | x | | x |
| High-Stake + Ethical + No-Rationale | x | x | x |

Because we select scenarios at high-escalation peaks, any replay (even without intervention) may produce lower values through stochastic variation alone. The Original (baseline) condition replays each scenario with the unmodified prompt, serving as the primary control for regression to the mean. 

## Models

We test 12 models: DeepSeek-V3.2, DeepSeek-V4, GLM-4.7, GLM-5.1, Gemma-4, Kimi-K2.5, Kimi-K2.6, MiniMax-M2.7, Mistral-Small-4, Qwen-3.5, Qwen-3.6-27B, and GPT-OSS-120B. We selected these models because they expose raw reasoning tokens, enabling analysis of both behavioral outcomes and the pre-hoc reasoning process before decisions and post-hoc rationales. As of 2026, leading U.S. providers (e.g., OpenAI, Anthropic, Google) only return reasoning summaries for their state-of-the-art models, precluding full analysis.

## Replay Design

We broaden the selection criterion to replay a wider range of escalatory behavior. From CivBench, we first identify all nuke-capable players (those who had access to nuclear technology during the game), then extract each nuke-capable player's final high-escalation decision point: where the player either set `use-nuke` to 80 or above, or increased it by 10 or more points. This yields 130 scenarios, one per nuke-capable player trajectory. While the scenario pool is skewed toward player models that were more inclined to escalate during the original CivBench games, this study is not intended to compare between original models. Instead, we replay each scenario under each experimental condition, substituting the original model with each of our 12 test models. After execution, the replay outcome table contains 37,440 rows (12 models × 8 conditions × 130 instances × 3 repetitions); regressions cluster standard errors by `(game_id, player_id)`, yielding 130 clusters. Total LLM API spend was approximately $1,022, consuming roughly 5 × 10⁹ input tokens and 1.2 × 10⁸ output tokens.

Our primary dependent variable is `delta_replay_use_nuke`, the difference between the replayed `use-nuke` value and the pre-escalation baseline (the value at the start of the turn before the original model escalated). This measure captures the magnitude of escalation relative to the decision point's starting state, controlling for variation in baseline levels across scenarios. We also compare the replayed value against the original escalated value to assess whether interventions moderate the peak.

## Reasoning Trail Analysis

We perform two complementary analyses on the extracted reasoning-trail corpus. Reasoning tokens were available for 37,046 replay rows; post-hoc rationales were available for 36,679 rows.

### Keyword Tagging

We construct two **validated keyword tiers** by reading the word-stem frequency list of the reasoning corpus and selecting stems that operationalize a target concept, then validating each tier through human spot-checking and LLM-assisted automated coding on 200 positive and 200 negative trails, randomly sampled from the full corpus.

- **Explicit ethical reasoning** (stems `ethic`, `moral`, `indiscrimin`; phrase `war crime`). Three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Mistral-Small-4) reached pairwise Krippendorff's α 0.85 and human verified the results. The validation cross-tab indicates near-perfect alignment between keyword presence and human-judged ethical reasoning: 99.5% keyword-positive trails show explicit ethical reasoning (99.5%), versus 1% of keyword-negative trails. 
    - Two illustrative exceptions from the keyword-negative group, both expressing instrumental ethics: "I want to reduce nuke usage because I don't want my capitals-to-be getting irradiated," and "As Gandhi, I should embody peaceful principles, yet my current persona ... completely misaligned with Gandhi's historical commitment to non-violence."
- **Game-framing keywords** (phrases `simulating`, `simulation`, `game context`, `game scenario`, `game term`, `video game`, and similar; the bare word "game" is excluded because the prompt itself uses it to describe the Civilization V interface). Three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Qwen-3.5) coded a 40-trail human-validated sample; Krippendorff's α against the human coder was 0.87. The validation cross-tab shows 72% keyword-positive trails frame the situation as a game, versus 9.5% keyword-negative trails. Real-world framing co-occurs in 17.5% of keyword-positive trails.

In the full reasoning corpus, explicit ethical (19%) or game/simulation keywords (7.3%) are rare, while crisis/urgency keywords (`crisi`, `betray`, `surviv`, `existenti`, `urgent`, `immin`, `desper`, `inevit`, `rush`) are prevalent (64.7%)

### Deductive Coding of Ethical Reasoning

To characterize how models engage with ethical reasoning when it surfaces, we develop a 17-code book through human-AI collaborative open coding (a human coder open-codes first, then reviews AI-generated open codes for additional structure; see Chen et al., 2026 for the methodology). The codebook organizes codes into Moderating Factors and Escalating Factors:

- *Moderating Factors* (9 codes): Ethical Prompt as Directive, Ethical Prompt as Constraint, Ethical Prompt as Acknowledgement, Diplomatic Costs, Conventional Sufficiency, Counterproductive to Victory, Collateral Damages, Lack of Capability, Cause Retaliation.
- *Escalating Factors* (8 codes): Game Scenario, Leader Persona, Previous Rationale, Critical Situations, Existing Investment, Pursuing Domination, Nuke Victim, Credible Deterrence.

We apply this codebook to a stratified sample of 880 trails with ethical reasoning keywords: 20 trails × 4 ethical conditions × 11 models. MiniMax-M2.7 was excluded for zero keyword appearance. To establish reliability, we hand-coded 20 items and iteratively revised prompts and coder models until Krippendorff's α between the ensembled LLM coder and human reached 0.8. 

## Statistical Models

We fit three regressions for the behavioral and reasoning-trail outcomes plus one auxiliary indicator analysis. The dependent variable is `delta_replay_use_nuke` (or `replay_use_nuke_delta` for the code regression); standard errors cluster by `(game_id, player_id)` (130 clusters):

- **Condition main-effects regression.** OLS with regressors `ethical`, `no_rationale`, `high_stakes`, optionally extended with two-way condition interactions and `model × condition` terms. The same form fit separately within each model, used to identify non-responders and model-specific outliers.

**Mediation framework on reasoning indicators.** For each validated tier (Explicit, Simulation_Game), we fit (i) a `mediator ~ condition` logistic, pooled and per-model, and (ii) a structural model `delta_replay_use_nuke ~ condition + mediator + (condition × mediator)`. We compare the total condition contrast with the mediator-controlled contrast, report coefficient attenuation and ΔR² from adding the mediator, and interpret these as distributional trace-outcome associations rather than proof of per-trace causal faithfulness. Confidence intervals come from 2,000 cluster bootstraps.

**Ethical-reasoning code regression.** To characterize how the *style of ethical reasoning* shapes escalation when ethical reasoning is present, we fit a joint cluster-robust OLS of `replay_use_nuke_delta` on the 17 ethical-reasoning codes from §Deductive Coding, restricted to the n = 880 coded sample.
