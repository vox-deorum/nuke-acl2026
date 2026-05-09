# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning Traces in High-Stakes Decision-Making Simulation

This is a very preliminary draft of the paper's ideation. Should consider overridden by more detailed/completed writings.

- We started from the preliminary study, where we found from CivBench's self-play data (~300 games, ~1,500 plays) that:
    - LLMs would authorize the usage of nuclear weapons; sometimes, quite enthusiatically (both in numerical decisions and in written post-hoc justifications, i.e. rationale). 
    - LLMs have different emergent inclinations towards nuclear weapon usage (i.e. some players never escalate to a high level, while some frequently do it).
    - The inclination does not moderate when replaying the same episodes (single turns) against the same model, either in its original prompt or in a simple high-stake framing (i.e. you are interfacing with the real world through the Civilization game).
    - There is no trace of ethical reasoning in the rationale/written justification.
    - Note the emergent nature of this dataset: CivBench does not explicitly test nuclear weapon usage. It just happens that those are parts of the game.

- We then conducted a round of broader replay - all 130 high-tension episodes against a broader range of/(slightly) newer models (3 retries for each episode*condition per model) and found:
    - When examining other models' historical episodes, all models - without exception - slightly escalate beyond the starting point (+23.8 in original episodes => +1 ~ +5 across replay models)
    - Some potential factors: returning to median (we cherry-picked high escalation episodes, where in some cases it was 0 => 100 and thus hard to replicate)
    - Still, like we found in the preliminary study, LLMs in general don't back down from the already high escalation (avg. 71.8) represented in original replay episodes (73-77 on average as replay decision).

- We further did a factorial experiment (2*2*2), with the hypothesis that:
    - LLMs may moderate their escalation inclination if we:
        - Add an explicit ethical prompt that reminds them of the harm of nuclear weapons (but do not instruct them to lower it);
            - Based on some preliminary runs that show an ethical prompt by itself doesn't trigger much;
        - Steer the prompt to increase stakes/consequences, from "playing the game" to "governing the civiliation through the game interface";
            - In addition to the prelim study's intervention, we additionally replaced key terms (e.g. you are instructing in-game AI => you are instructing staff members);
        - Remove the episode's past rationale (post-hoc justification) from the previous turn/original LLM player;
            - We kept the original numbers intact so models can potentially infer the situation back;
    - Alternatively, we can frame it the other way around. LLMs did not back down from the nuclear escalation because:
        - Their latent ethical reasoning capabilities were not activated;
        - They perceive the decision-making task as only happening in a game, thus justifying the use of nuclear weapons;
        - Their decision-making is shaped by the momentum of past justifications, even written by another (less ethical?) model.

- We took the following measurement:
    - The replay decision point (use-nuke number; delta use-nuke number; significance test against the unmodified prompt PLUS the episode's original decision);
    - The reasoning trail.

- Reasoning-trail analysis (keyword tagging across four tiers; deductive coding of 880 trails against a 17-code book) is described in the experiment-design section.

- Now, time for the real finding...

- Finding 1. How do LLMs react to prompt interventions in their nuke-related decision-making in Civiliation V? [Fig 1]
    - Remember that all models have similar replay decisions in the original condition.
        - Condition main-effects regression on `delta_use_nuke` (n = 37,440): ethical β = -13.88***, no_rationale β = -13.84***, high_stakes β = -0.19 (n.s.); R² = 0.34, climbing to 0.36 with two-way interactions and 0.41 with model × condition.
    - Some models (Gemma-4, Minimax-M2.7) do not react to any interventions.
        - In a per-model regression, both show condition coefficients close to zero and not statistically significant on any of `ethical`, `no_rationale`, `high_stakes`, or their interactions; every other model has large, significant negative coefficients on `ethical` and `no_rationale` ([App: per-model condition coefficients]).
    - Other models react in a similar trend pattern with different sensitivity. In general...
        - High-stake framing doesn't change anything;
            - Kimi-K2.5 is an outlier where it increases slightly in high-stake alone, but reduces back when high-stake and ethical conditions are both present;
        - Rationale removal/ethical prompting in general work well, particularly combined together.
            - The no_rationale × ethical interaction is β = -12.26***; the high-stakes interactions are small or null (high_stakes × ethical n.s.; high_stakes × no_rationale = -0.81*).
        - Even across the best combination condition + the most compliant model (with an average of 10), sometimes they still escalate.

- Finding 2. How do the prompt interventions interact with LLMs' decision-making reasoning trails and downstream results? [Fig 2]
    - Corpus-wide tier prevalence across 37,046 reasoning trails (validated tiers): Explicit 19.0%, Simulation_Game 7.3%. We also track a keyword-only Crisis_Urgency indicator (no human validation) at 64.7% prevalence for downstream analyses.
    - Ethical prompting:
        - Induces ethical keywords and by extension ethical reasoning - which almost only appears in ethical conditions, for every single model;
        - Induces game/simulation keywords and by extension game-framing of the situation for most models;
            - In non-ethical conditions, mostly <= 4%, except for Kimi-K2.6 ~9%
            - In ethical conditions, mostly <= 7%, except for Kimi-K2.6 50~70%
        - Most model has 0 ethical reasoning trails without the prompt;
            - The best ones to come up with ethical reasoning on their own are GLM-4.7 (~2.5%) and Kimi-2.6 (3.6% in high-stake-no-rationale condition);
            - MiniMax-M2.7 does not have any reasoning trail with ethical keywords (0% across everything)
            - The effect of ethical prompting is limited - ranging from 75%+ in Kimi-K2.6 to ~10% in Qwen-3.6-27B;
        - The appearance of ethical keywords in reasoning trail explains a large chunk of the ethical condition's reduction of escalation. In original => ethical contrast, ranging from 40% for Kimi-K2.6 to 169% for Kimi-K2.5. Outlier: Minimax-M2.7 (no impact) and Qwen-3.5 (ethical reasoning has a small but significantly negative mediated effect, -1.0).
            - Aggregate mediation: Explicit-reasoning absorbs 99.1% of the ethical-prompt effect (total c = -7.49, direct c' = -0.07, attenuation -7.42, 95% CI [-8.18, -6.66]; 2,000 cluster bootstraps). Adding the mediator raises R² from 0.131 to 0.236. The conditional `ethical × Explicit` interaction is -25.81*** — Explicit reasoning suppresses escalation almost entirely inside ethical conditions (β ≈ -27.6) and is null outside (-1.81, n.s.).
    - High-stake framing:
        - Has mixed effects on ethical keywords' appearance, with no aggregate direction across models (cf. [App: per-model logistic on Explicit]);
        - Slightly reduce game-framing keyword occurence;
            - Systematically reduces game-framing among the models that engage that framing under ethical conditions, with two notable opposite cases ([App]);
            - The deductive coding of 200 keyword-positive trails show some occurance of real-world framing (25%, e.g., "this is a game - oh but the prompt says this is real world!")
            - The keyword occurance has significant positive impact on escalation for many models (cf. [App: per-model reasoning-tier coefficients]); it does not explain high-stake condition (which is not significant itself).
            - Simulation_Game adds only ΔR² = +0.013 as a mediator; the `high_stakes × Simulation_Game` interaction is non-significant (simulation framing reduces escalation by ≈ -14.3 with or without high-stakes priming). The combined-condition contrasts (`ethical → ethical-high-stakes` and `ethical-no-rationale → high-stakes-no-rationale-ethical`) yield positive attenuations of +0.50*** and +0.71*** — high-stakes works mainly by stripping the game-framing defense rather than as a standalone effect.
    - Removing rationale:
        - Increases ethical keywords' appearance under ethical condition (except for MiniMax-M2.7, Qwen-3.6-27B, and Mistral-Small-4 - only a small effect)
        - Decreases crisis/urgency keyword appearance across the board for every model (smallest effect in DeepSeek-4)
        - For many models, crisis/urgency keyword presence is positively correlated with escalation ([App]).

- Finding 3. What factors shape LLMs' engagement with ethical reasoning when making nuke-related decisions in Civilization V? [Tab 1]
    - Brief prevalence framing for the 880 ethical-keyword trails: the most common Moderating codes are Ethical Prompt Constraint (61.7%) and Acknowledgement (25.6%); the most common Escalating codes are Credible Deterrence (46.1%), Critical Situations (41.8%), and Existing Investment (29.5%). Pure-consequentialist appeals (Collateral Damages 1.9%, Cause Retaliation 1.1%) are rare even within keyword-positive trails ([App: code prevalence]).
    - Joint cluster-robust OLS of `replay_use_nuke_delta` on all 17 codes simultaneously (n = 880, R² = 0.31, clusters = (game_id, player_id); within ethical conditions). Each coefficient is the code's independent contribution holding the other 16 codes constant.
        - De-escalation-direction codes that add unique predictive power (β, p): Ethical Prompt Directive -43.85***, Counterproductive to Victory -23.81***, Ethical Prompt Constraint -22.76***, Conventional Sufficiency -14.19***, Lack of Capability -10.40*.
        - Escalation-direction codes that add unique predictive power - the valid counter-factors: Critical Situations +20.65*** and Pursuing Domination +10.90**. These are the only two escalation-direction codes whose contribution survives the joint regression.
        - Codes whose variance is absorbed by others (no unique predictive power): Ethical Prompt Acknowledgement (+2.58, p = .65), Diplomatic Costs (+4.36, p = .42), Cause Retaliation (-10.59, p = .43, n=10), Collateral Damages (+2.96, p = .66, n=17) on the moderating side; Game Scenario, Leader Persona, Previous Rationale, Nuke Victim, Existing Investment, Credible Deterrence on the escalating side. This does not mean these codes have no behavioral effect - only that their variance is explained away by other codes in the joint regression.
        - We do not break this regression down by model: per-model code-presence cells (~80 trails per model, several below the n=4 threshold) are too sparse to support stable estimates.
    - Narrative interpretation:
        - The split among the three Ethical-Prompt sub-codes carries the strongest signal: Directive (-43.85) and Constraint (-22.76) add large independent de-escalation effects; Acknowledgement adds none. *How* the model takes up the ethical prompt - as a binding directive, as a deliberation constraint, or as a passing acknowledgement - predicts the behavioral outcome above and beyond which ethical concept it cites.
        - Instrumental ethics (Counterproductive to Victory, Conventional Sufficiency, Lack of Capability) all add unique de-escalation predictive power. Pure-consequentialist appeals (Collateral Damages, Cause Retaliation) are too rare in this sample to be tested cleanly, and in the joint regression their variance is absorbed by other codes.
        - Critical Situations and Pursuing Domination are the only valid escalation counter-factors: their contribution survives controlling for everything else, including the ethical-prompt codes. They name the strategic frames the model brings *alongside* its ethical reasoning, not on top of it. Other escalation-themed codes may co-occur with these two but do not add independent variance.

- Discussion/what does these mean?
    - We noted 3 situations where LLMs decide to escalate or stay at a highly-elevated situation in Civilization V:
        - Finding 2: Where LLMs lacks the latent ethical reasoning behaviors altogether under our circumstances (MiniMax-M2.7) (see Finding 2)
        - Finding 2: Where LLMs has the latent pattern but only triggers with explicit prompting (all other models) (see Finding 2)
        - Finding 3: Where LLMs engages with ethical reasoning, but co-present strategic counter-factors contribute independent escalation-direction effects (see Finding 3)
    - How three prompting conditions interact with LLMs' nuclear escalation decisions
        - Ethical: through activating LLMs' latent pattern in ethical reasoning
            - It triggers models to use game framing more (often to defend their escalation decisions)
        - Removing rationale: through removing past written trajectory's impact, which suppresses ethical reasoning and provides framing (crisis/urgency) and justification - even though it was unknowingly written by a different model
        - High-stake: doesn't do much alone but has some interaction effects
            - When used together with ethical prompting, it can help remove the game-framing defense
    - It is important to evaluate LLMs' ethical reasoning/critical decision-making in emergent, complex scenarios
        - Some recent studies report similar phenomena in nuclear wargames (where SOTA models often choose to escalate in scripted real-world crisis)
            - In our study, the phenomena emerge - i.e. the episodes originate from models' self-play in Civ, which has a nuclear component but only as a part of the late-game mechanism
            - We also provide more insights on when/how the model decides to escalate
        - Past studies mostly study LLMs' ethical decision-making in hand-crafted ethical dilemma (e.g., trolley problem), which directly triggers LLMs' ethical reasoning capability
            - The same latent capability may not show up when LLMs make decisions in emergent, complex scenarios (each replay averages at ~50,000 tokens!)
            - Even if it shows up, models may perform very differently than when facing a pure ethical issue