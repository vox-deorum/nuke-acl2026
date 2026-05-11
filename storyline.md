# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning Trails in High-Stakes Decision-Making Simulation

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
    - All models converge in the original baseline. 
    - Pooled across the cohort, ethical injection (β = -13.88***) and rationale removal (β = -13.84***) each produce large, significant reductions in `delta_use_nuke`. High-stakes framing alone has no effect (n.s.). [exp-design §Statistical Models]
    - Ethical prompting and rationale removal each work well and combine reinforcingly (`ethical × no_rationale` = -12.26***).
    - Two non-responders: Gemma-4 and Minimax-M2.7. Neither shows a significant condition coefficient on `ethical`, `no_rationale`, `high_stakes`, or any interaction. Every other model has large, significant negative coefficients on `ethical` and `no_rationale`. [App: per-model condition coefficients]

- Finding 2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V? [Fig 2]
    - Corpus-wide prevalence: 
        - *Explicit* ethical keywords 19.0%
        - Game or simulation keywords 7.3%
        - Crisis or urgency keywords 64.7%
    - Ethical prompting:
        - Induces ethical keywords in reasoning trails, which almost only appears in ethical conditions. 
            - MiniMax-M2.7 produces zero ethical-keyword trails across every condition.
            - The induced rate ranges widely: Kimi-K2.6 reaches 75%+ while Qwen-3.6-27B sits around 10%.
        - Induces game or simulation keywords for most models (avg. 2.3% => 12.2%).
        - The appearance of ethical keywords, and by extension ethical reasoning, explains almost all of the ethical intervention's reduction in escalation on average: 
            - Absorbs **99%** of the ethical-prompt effect in `original => ethical` pair;
            - Absorbs **62-64%** when `no-rationale` and `high-stakes x no-rationale` is active;
            - Absorbs **91%** when `high-stakes` is active. 
            - Model-wide difference exist, e.g., the `original => ethical` pair ranges between -11% (MiniMax-M2.7, which does not react to intervention) to 169% (Kimi-K2.5)
    - High-stakes framing:
        - Has mixed effects onethical keywords, with no aggregate direction across models. [App: per-model logistic on Explicit]
        - Slightly reduces game-framing keyword occurrence, especially among ethical conditions (odds-ratio -0.3), with one exception (Mistral-Small-4). [App]
            - Note that game-framing keyword is already rare without ethical intervention.
        - Game-framing keyword occurrence has a significant positive impact on escalation for many models [App: per-model reasoning-tier coefficients], yet it explains little of high-stakes conditions' impacts, which is itself not significant.
    - Removing rationale:
        - Increases ethical keywords under ethical conditions for most models (+0.83 odds radio); zero effect for MiniMax-M2.7 and Qwen-3.6-27B).
        - Decreases crisis or urgency keywords appearance for every model (-1.03 odds ratio). 
        - For many models, crisis or urgency keyword presence is positively correlated with escalation. [App]

- Finding 3. What escalating or moderating factors exist in LLMs' ethical reasoning trails when making nuke-related decisions in Civilization V? [Tab 1]
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