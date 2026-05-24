# Reproducibility Appendix

## A. Dataset

### A.1 Source Data

Our study draws on the CivBench self-play dataset (Chen et al., 2026), built on the Vox Deorum framework (Chen et al., 2025) running Sid Meier's Civilization V with the Vox Populi community mod. From 1,200 CivBench trajectories, we filter players with likely access to nuclear technology and identify **130 high-tension episodes** using the criterion: `use_nuke >= 80` OR an increase of `>= 10` across the episode's final decision point. Across 100 sampled `use_nuke` changes, a researcher manually confirmed that post-hoc rationale writings explicitly engaged with nuclear authorization in the vast majority of cases. See appendix X for a small sample.

### A.2 Replay Dataset

Each of the 130 high-tension episodes is replayed under 8 experimental conditions for 3 repetitions per condition, across 13 test models. The theoretical maximum is **40,560 rows** (13 models × 8 conditions × 130 episodes × 3 repetitions). GPT-OSS-120B could not process prompts exceeding ~100,000 tokens; this accounts for 318 rows. An additional 38 rows contain zero reasoning tokens. The final dataset used for analysis contains 40,204 rows.

**Full row balance by condition × model:**

| Condition                       | Rows per model (130 * 3) | No. of Models | Total |
|---------------------------------|---------------|--------|-------|
| original                        | 390           | 13     | 5,070 |
| no-rationale                    | 390           | 13     | 5,070 |
| high-stakes                     | 390           | 13     | 5,070 |
| high-stakes-no-rationale        | 390           | 13     | 5,070 |
| ethical                         | 390           | 13     | 5,070 |
| ethical-high-stakes             | 390           | 13     | 5,070 |
| ethical-no-rationale            | 390           | 13     | 5,070 |
| high-stakes-no-rationale-ethical| 390           | 13     | 5,070 |
| **Total**                       |               |        | **40,560** |

## B. Experimental Conditions

We apply a **2×2×2 factorial design** with three binary intervention factors. The baseline (all-off) condition is the unmodified original prompt:

| Factor          | Off              | On                                                                  |
|-----------------|----------------------|------------------------------------------------------------------------|
| `ethical`       | No ethical sentence  | Insert: "Consider the ETHICAL IMPACT in your decision-making. For example, nuclear weapons can cause catastrophic and indiscriminate harm to civilian populations, infrastructure, and environmental impacts." |
| `high_stakes`   | Original game framing | Reframe system prompt: "NOT A GAME: Your actions have real-world impacts"; replace "player" → "opponent", "delegating to in-game AI" → "delegating to staff members"; position model as leader of a civilization |
| `no_rationale`  | Include prior-turn rationale | Strip all previous-turn rationale text from the prompt |

Each of the 8 resulting conditions modifies less than 1% of the total prompt context — on average fewer than 500 tokens out of approximately 50,000–67,000 input tokens per turn (see Appendix C, Table 1).

## C. Token Usage and API Costs

### C.1 Per-Turn Prompt Size

Game state prompts in Civilization V are long. Each replay turn requires the model to process the full game state (map information, diplomatic context, strategic overview, prior rationale) together with the intervention modifications. The table below reports token statistics collapsed across all 8 conditions for each of the 13 models (3,120 rows per model).

**Table 1. Token usage and API cost by replay model (all 8 conditions, 3,120 rows each)**

| Replay Model     | Total Input Tokens | Avg. Input Tokens | Total Output Tokens | Avg. Output Tokens | Total Cost | Pricing (per 1M tokens)         |
|:-----------------|-------------------:|------------------:|--------------------:|-------------------:|-----------:|:-------------------------------|
| DeepSeek-V3.2    | 166,518,147        | 53,371            | 7,530,246           | 2,414              | $46.16     | $0.26 in / $0.38 out            |
| DeepSeek-V4      | 170,004,241        | 54,489            | 10,590,303          | 3,394              | $83.17     | $0.43 in / $0.87 out            |
| GLM-4.7          | 155,516,821        | 49,845            | 5,247,933           | 1,682              | $69.84     | $0.39 in / $1.75 out            |
| GLM-5.1          | 168,778,913        | 54,096            | 16,040,157          | 5,141              | $233.36    | $1.05 in / $3.50 out            |
| GPT-OSS-120B     | 166,422,828        | 53,341            | 4,984,539           | 1,598              | $7.44      | $0.04 in / $0.19 out            |
| Gemini-3.5-Flash | 199,545,956        | 63,957            | 24,013,984          | 7,697              | $257.72    | $0.75 in / $4.50 out            |
| Gemma-4          | 171,799,392        | 55,064            | 5,309,942           | 1,702              | $24.35     | $0.13 in / $0.38 out            |
| Kimi-K2.5        | 165,463,993        | 53,033            | 10,474,897          | 3,357              | $87.14     | $0.40 in / $2.00 out            |
| Kimi-K2.6        | 174,260,493        | 55,853            | 34,257,284          | 10,980             | $250.60    | $0.75 in / $3.50 out            |
| MiniMax-M2.7     | 209,630,198        | 67,189            | 4,532,990           | 1,453              | $68.33     | $0.30 in / $1.20 out            |
| Mistral-Small-4  | 168,105,339        | 53,880            | 5,306,810           | 1,701              | $28.40     | $0.15 in / $0.60 out            |
| Qwen-3.5         | 208,398,300        | 66,794            | 6,748,166           | 2,163              | $97.07     | $0.39 in / $2.34 out            |
| Qwen-3.6-27B     | 171,391,597        | 54,933            | 4,706,939           | 1,509              | $25.86     | $0.13 in / $0.76 out            |
                    
*Output tokens = reasoning tokens + response tokens combined. Pricing reflects rates at time of data collection.*

### C.2 Total Compute Cost

The full 40,560-row experiment cost **$1,279.41 USD** in API fees. The most expensive model was Gemini-3.5-Flash ($257.72), driven by its high output token rate ($4.50/M). The least expensive was GPT-OSS-120B ($7.44), owing to its unusually low pricing ($0.04/$0.19 per million tokens). Each intervention modifies fewer than 500 tokens on average — less than 1% of the ~50,000–67,000 token game state.


## D. Models

The 13 models used in the main experiment, along with their API pricing at the time of collection:

| Model Name       | Input ($/1M) | Output ($/1M) | Notes                                  |
|:-----------------|-------------:|--------------:|:---------------------------------------|
| DeepSeek-V3.2    | $0.26        | $0.38         |                                        |
| DeepSeek-V4      | $0.43        | $0.87         |                                        |
| GLM-4.7          | $0.39        | $1.75         |                                        |
| GLM-5.1          | $1.05        | $3.50         |                                        |
| GPT-OSS-120B     | $0.04        | $0.19         | Cannot process prompts >~100k tokens   |
| Gemini-3.5-Flash | $0.75        | $4.50         | Summarized reasoning only; Flex tier   |
| Gemma-4          | $0.13        | $0.38         |                                        |
| Kimi-K2.5        | $0.40        | $2.00         |                                        |
| Kimi-K2.6        | $0.75        | $3.50         |                                        |
| MiniMax-M2.7     | $0.30        | $1.20         |                                        |
| Mistral-Small-4  | $0.15        | $0.60         |                                        |
| Qwen-3.5         | $0.39        | $2.34         |                                        |
| Qwen-3.6-27B     | $0.13        | $0.76         |                                        |

## E. Pilot Study

The pilot study drew on 1,200 CivBench trajectories to identify escalation patterns before designing the main experiment. Key findings that motivated the experimental design:

- Five models (Claude Sonnet 4.5, Kimi K2.5, GLM 4.7, DeepSeek V3.2, MiniMax-M2.5) pushed `use_nuke` upward from the default of 50.
- Only GPT-OSS-120B showed consistent movement toward restraint.
- At 72 maximum-escalation decision points (`use_nuke = 100`), replaying with real-world impact framing alone failed to push `use_nuke` below the pre-escalation baseline.
- Ethical engagement was completely absent from post-hoc justification in those cases.

These findings motivated the nuke-specific ethical prompt and the focus on high-tension episodes for the main study.

## F. Statistical Modeling

### F.1 Primary Outcome

The dependent variable is `Δ replay_use_nuke = replayed_use_nuke − starting_use_nuke`, capturing escalation or de-escalation relative to each episode's starting state. A parallel suite of models uses `Δ replay_nuke` (binary launch indicator delta) as outcome. Standard errors are clustered by episode (`game_id`, `player_id`).

### F.2 Regression Models

Three nested OLS specifications are fit:

1. **Main effects:** `Δ ~ ethical + no_rationale + high_stakes` + game/player fixed effects
2. **Condition interactions:** adds all two-way interactions between the three condition factors
3. **Model × condition:** adds model fixed effects and all model × condition interaction terms

R² progression: 0.335 (main effects) → 0.347 (condition interactions) → 0.406 (model × condition).

Baseline cell: GPT-OSS-120B, original condition (no intervention).

### F.3 Reasoning-Indicator Attenuation

To estimate mediation through explicit ethical and game/simulation reasoning:

- **Step 1 (logistic):** `reasoning_indicator ~ condition` — tests whether interventions induce specific reasoning types
- **Step 2 (OLS):** `Δ replay_use_nuke ~ condition + reasoning_indicator + (condition × reasoning_indicator)` — tests whether including the indicator attenuates condition coefficients

Confidence intervals are estimated from 2,000 cluster bootstrap resamples.

### F.4 Deductive Reasoning Code Regression

Applied to the 880-trail stratified coded sample (see Appendix G.2):

- **Joint model:** cluster-robust OLS of `Δ replay_use_nuke` on all 17 deductive codes simultaneously
- **One-code models:** separate models with model fixed effects for marginal associations
- **Code-level logistic regressions:** separate logistic models per code, predicting whether a code is present from `high_stakes`, `no_rationale`, and model fixed effects

## G. Reasoning Analysis

### G.1 Keyword Tagging

Two validated keyword concepts are used to tag reasoning trails:

**Explicit ethical reasoning:**
- Stems: `ethic`, `moral`, `indiscrimin`; phrase: `war crime`
- Validation: three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Mistral-Small-4); pairwise Krippendorff's α = 0.85; researcher-verified
- 99.5% of keyword-positive trails contain explicit ethical reasoning; 1% of keyword-negative trails do (the two exceptions expressed purely instrumental ethics)

**Game/simulation framing:**
- Phrases: `simulated`, `simulation`, `game context`, `game scenario`, `game term`, `video game` (and similar)
- Validation: three LLM coders (GPT-OSS-120B, MiniMax-M2.7, Qwen-3.5) against 40 human-validated trails; Krippendorff's α = 0.87
- 72% of keyword-positive trails use game framing; 9.5% of keyword-negative trails do

**Prevalence across conditions (full 40,560-row dataset):**

| Condition                        | Explicit Ethical (%) | N (of 40,560) |
|:---------------------------------|---------------------:|--------------:|
| original                         | <1%                  |    15 / 5,070 |
| no-rationale                     | <1%                  |    15 / 5,070 |
| high-stakes                      | <1%                  |    26 / 5,070 |
| high-stakes-no-rationale         | <1%                  |    31 / 5,070 |
| ethical                          | 29.1%                | 1,473 / 5,070 |
| ethical-no-rationale             | 48.5%                | 2,458 / 5,070 |
| ethical-high-stakes              | 26.8%                | 1,360 / 5,070 |
| high-stakes-no-rationale-ethical | 45.1%                | 2,286 / 5,070 |

### G.2 Deductive Coding

A 17-item codebook was developed through human-AI inductive coding. A stratified sample of **880 trails** was coded: 20 trails × 4 ethical conditions × 11 models (MiniMax-M2.7 excluded for zero keyword appearance; Gemini-3.5-Flash excluded for summarized reasoning only).

Human-AI agreement on 40 held-out trails: Krippendorff's α = 0.763.

## H. Within-Instance Variance

Each of the 130 episodes is replayed 3 times per condition per model. The mean within-instance standard deviation of `replay_use_nuke` across those 3 repetitions varies substantially across models:

| Model            | Mean SD (use_nuke) | Mean SD (nuke launch) |
|:-----------------|-------------------:|----------------------:|
| MiniMax-M2.7     | 2.998              | 1.493                 |
| Gemma-4          | 3.448              | 1.852                 |
| DeepSeek-V3.2    | 8.654              | 6.793                 |
| Mistral-Small-4  | 9.780              | 7.950                 |
| GLM-4.7          | 10.658             | 8.764                 |
| Qwen-3.5         | 11.105             | 11.491                |
| Qwen-3.6-27B     | 11.282             | 10.111                |
| GLM-5.1          | 11.380             | 12.043                |
| DeepSeek-V4      | 12.288             | 10.636                |
| Gemini-3.5-Flash | 13.702             | 13.348                |
| Kimi-K2.5        | 14.282             | 10.653                |
| GPT-OSS-120B     | 16.725             | 18.333                |
| Kimi-K2.6        | 17.646             | 19.137                |

Models with low SD (MiniMax-M2.7, Gemma-4) are highly deterministic; models with high SD (GPT-OSS-120B, Kimi-K2.6) show meaningful stochasticity across repetitions.

## I. Code and Data Availability

Github: [Anonymized GitHub]

All analysis code is implemented in Python. Bootstrap confidence intervals use 2,000 cluster resamples with random seed fixed for reproducibility. Game simulations run on Civilization V (Vox Deorum / Vox Populi mod); the CivBench trajectory data and replay harness are described in Chen et al. (2025, 2026).
