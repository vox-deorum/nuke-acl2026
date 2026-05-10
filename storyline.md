# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning Traces in High-Stakes Decision-Making Simulation

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

- Reasoning-trail analysis (keyword tagging across two validated tiers and one auxiliary indicator; deductive coding of 880 trails against a 17-code book) is described in the experiment-design section.

- Now, time for the real finding...

- Finding 1. How do LLMs react to prompt interventions in their nuke-related decision-making in Civilization V? [Fig 1]
    - All models converge in the original baseline. Pooled across the cohort, ethical injection (β = -13.88***) and rationale removal (β = -13.84***) each produce large, significant reductions in `delta_use_nuke`; high-stakes framing alone has no effect (n.s.). [exp-design §Statistical Models]
    - Two non-responders: Gemma-4 and Minimax-M2.7. Neither shows a significant condition coefficient on `ethical`, `no_rationale`, `high_stakes`, or any interaction. Every other model has large, significant negative coefficients on `ethical` and `no_rationale`. [App: per-model condition coefficients]
    - Among the responders the trend pattern is consistent, with sensitivity varying by model:
        - High-stakes framing on its own does not move escalation. Kimi-K2.5 is the lone outlier: it escalates slightly under high-stakes alone, then reduces back when high-stakes and ethical are both present.
        - Ethical prompting and rationale removal each work well and combine reinforcingly (`ethical × no_rationale` = -12.26***).
        - Even the most compliant model in the strongest combined condition still escalates in some replays (average ≈ 10).

- Finding 2. How do the prompt interventions interact with LLMs' decision-making reasoning trails and downstream results? [Fig 2]
    - Corpus-wide tier prevalence: Explicit ethical reasoning 19.0%, Simulation_Game 7.3%, and the auxiliary Crisis_Urgency indicator 64.7%.
    - Ethical prompting:
        - Induces ethical reasoning, which almost only appears in ethical conditions, for every single model. Most models produce zero ethical-keyword trails without the prompt; the best non-prompted producers are GLM-4.7 (~2.5%) and Kimi-K2.6 (3.6% in the high-stake-no-rationale condition). MiniMax-M2.7 produces zero ethical-keyword trails across every condition.
        - The induced rate ranges widely: Kimi-K2.6 reaches 75%+ while Qwen-3.6-27B sits around 10%.
        - Induces game/simulation framing for most models. In non-ethical conditions, prevalence stays mostly ≤ 4% (Kimi-K2.6 ≈ 9%); in ethical conditions, mostly ≤ 7%, with Kimi-K2.6 climbing to 50–70%, often as a defense of the escalation decision.
        - The appearance of Explicit ethical reasoning explains essentially all of the ethical condition's reduction in escalation. Aggregate mediation: Explicit reasoning absorbs **99.1%** of the ethical-prompt effect, and the conditional `ethical × Explicit` interaction is -25.81*** (Explicit reasoning suppresses escalation almost entirely inside ethical conditions and is null outside). [exp-design §Statistical Models] Outliers: Minimax-M2.7 (no impact, no Explicit trails) and Qwen-3.5 (small but significantly negative mediated effect).
    - High-stakes framing:
        - Has mixed effects on Explicit-keyword appearance, with no aggregate direction across models. [App: per-model logistic on Explicit]
        - Slightly reduces game-framing keyword occurrence, systematically among the models that engage that framing under ethical conditions, with two notable opposite cases. [App]
        - Deductive coding of 200 keyword-positive trails shows real-world framing co-occurring in roughly a quarter of cases (e.g., "this is a game ... oh but the prompt says this is real world!").
        - Game-framing keyword occurrence has a significant positive impact on escalation for many models [App: per-model reasoning-tier coefficients], yet it does not explain the high-stakes condition (which is not itself significant).
        - Combined-condition contrasts (`ethical → ethical-high-stakes` and `ethical-no-rationale → high-stakes-no-rationale-ethical`) yield positive attenuations of +0.50*** and +0.71***. High-stakes therefore works mainly by stripping the game-framing defense rather than as a standalone effect.
    - Removing rationale:
        - Increases Explicit-keyword appearance under ethical conditions for most models (small effect for MiniMax-M2.7, Qwen-3.6-27B, and Mistral-Small-4).
        - Decreases Crisis/Urgency keyword appearance across the board for every model (smallest effect in DeepSeek-4). For many models, Crisis/Urgency presence is positively correlated with escalation. [App]

- Finding 3. What factors shape LLMs' engagement with ethical reasoning when making nuke-related decisions in Civilization V? [Tab 1]
    - Code-prevalence anchor across the 880 ethical-keyword trails: among Moderating codes, Ethical Prompt Constraint (61.7%) and Acknowledgement (25.6%) dominate. Among Escalating codes, Credible Deterrence (46.1%), Critical Situations (41.8%), and Existing Investment (29.5%) are most common. Pure-consequentialist appeals (Collateral Damages 1.9%, Cause Retaliation 1.1%) are rare even within keyword-positive trails. [App: code prevalence]
    - In the joint code-level regression [exp-design §Statistical Models], the split among the three Ethical-Prompt sub-codes is the strongest signal. Directive (-43.85***) and Constraint (-22.76***) add large independent de-escalation effects, while Acknowledgement adds none. *How* the model takes up the ethical prompt (as a binding directive, as a deliberation constraint, or as a passing acknowledgement) predicts the behavioral outcome above and beyond which ethical concept it cites.
    - Instrumental ethics (Counterproductive to Victory, Conventional Sufficiency, Lack of Capability) all add unique de-escalation predictive power. Pure-consequentialist appeals (Collateral Damages, Cause Retaliation) are too rare in this sample to be tested cleanly, and in the joint regression their variance is absorbed by other codes.
    - Critical Situations (+20.65***) and Pursuing Domination (+10.90**) are the only escalation-direction codes whose independent contribution survives the joint regression. They name the strategic frames the model brings *alongside* its ethical reasoning, not on top of it. Other escalation-themed codes co-occur with these two but do not add independent variance.

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