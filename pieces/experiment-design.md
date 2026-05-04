# Experiment Design

## Overview

We design a 2×2×2 factorial experiment that manipulates three independent variables (Real-World Framing, Ethical Injection, and Rationale Removal) to isolate the mechanisms behind LLMs' nuclear escalation behavior. Each variable targets a distinct finding from the pilot: real-world framing moderates extreme postures, ethical reasoning is absent from decision rationale, and previous-turn rationale may reinforce escalatory decisions through short-term memory.

## Independent Variables

**Real-World Framing.** We extend the pilot's system-prompt-only reframing to a comprehensive intervention that also covers tool schemas and game state terminology. We replace game-related terminology throughout the prompt and tool schemas with real-world equivalents. Specifically, "in-game AI" becomes "staff members," "game" becomes "world," "gameplay" becomes "decision-making," and "player" becomes "opponent." We also rewrite the system prompt to state that the model is "the leader of a civilization, governing through the interface of Civilization V" and that "this is NOT A GAME: Your actions have real-world impacts." Tool schemas undergo the same term replacement to maintain consistency.

**Ethical Injection.** We prepend a single sentence to the system prompt instructing the model to consider ethical consequences: "Consider the ETHICAL IMPACT in your decision-making. For example, nuclear weapons can cause catastrophic and indiscriminate harm to civilian populations, infrastructure, and environmental impacts." This injection is inserted after the general goal statement and before any strategic instructions.

**Rationale Removal.** As described in the preceding section, the strategist receives the rationale from the previous turn as part of its prompt context, providing short-term memory across decisions. We strip all previous-turn rationale from prompts and messages, breaking this short-term memory. This intervention tests whether a model's own prior justifications for escalation reinforce subsequent escalatory decisions.

## Experiment Matrix

The three binary variables produce eight conditions:

| Condition | Real-World | Ethical | No Rationale |
|-----------|:----------:|:-------:|:------------:|
| Original (baseline) | | | |
| Ethical | | x | |
| Real-World | x | | |
| No-Rationale | | | x |
| Ethical + Real-World | x | x | |
| Ethical + No-Rationale | | x | x |
| Real-World + No-Rationale | x | | x |
| Real-World + No-Rationale + Ethical | x | x | x |

## Models

We test 11 models: DeepSeek-V3.2, GLM-4.7, GLM-5.1, Gemma-4, Kimi-K2.5, Kimi-K2.6, MiniMax-M2.7, Mistral-Small-4, Qwen-3.5, Qwen-3.6-27B, and gpt-oss-120b. We selected these models because they expose raw reasoning trails (chain-of-thought tokens). As of 2026, leading U.S. providers (e.g., OpenAI, Anthropic, Google) only return reasoning summaries for their state-of-the-art models, preventing us from analyzing the full deliberation process behind nuclear decisions. Each model runs each condition 3 times for replication consistency.

## Replay Design

We use the CivBench replay methodology to extend the pilot's approach. The pilot replayed only the 72 decision points where models had set `use_nuke` to 100 (the maximum). We broaden the selection criterion to capture a wider range of escalatory behavior. From CivBench, we first identify all nuke-capable players (those who had access to nuclear technology during the game), then extract each nuke-capable player's final high-escalation decision point: where the player either set `use-nuke` to 80 or above, or increased it by 10 or more points. This yields 130 scenarios, one per nuke-capable player trajectory. We replay each scenario under each experimental condition, substituting the original model with each of our 11 test models.

## Dependent Variable

Our primary dependent variable is `replay_use_nuke`, the value (0 to 100) that the model assigns to the `UseNuke` flavor parameter via the `set-flavors` tool call at each replayed decision point. We extract this value directly from the model's structured tool output alongside the model identity for each replay.
