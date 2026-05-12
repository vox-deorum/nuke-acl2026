# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning Trails in High-Stakes Decision-Making Simulation

- We started from the preliminary study, where we found from CivBench's self-play data (228 end-to-end games, 1,200 player trajectories) that:
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
    - The original baseline confirms the pilot pattern: when replaying high-tension episodes, models do not spontaneously back down from nuclear escalation.
    - On average, ethical prompting and rationale removal are the two effective prompt levers; high-stakes framing alone is not.
        - Ethical injection (β = -13.88***) and rationale removal (β = -13.84***) each produce large, significant reductions in `delta_use_nuke`.
        - High-stakes framing alone has no effect (n.s.). [exp-design §Statistical Models]
        - The ethical prompt and rationale removal combine reinforcingly, with `ethical × no_rationale` interaction at β = -12.26***.
    - The intervention response is broad but not universal. Gemma-4 and MiniMax-M2.7 are non-responders to any interventions [App: per-model condition coefficients]

- Finding 2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V? [Fig 2]
    - Ethical prompting reduces escalation mainly by activating explicit ethical reasoning, uneven across models, while also activating a game/simulation defense for many models.
        - Ethical keywords appear almost only in ethical conditions.
        - The induced rate ranges widely: Kimi-K2.6 reaches 75%+ while Qwen-3.6-27B sits around 10%, while MiniMax-M2.7 does not react.
        - Game or simulation keywords increase for most models (avg. 2.3% => 12.2%), likely to defend the escalation (see Finding 3).
    - The appearance of ethical keywords statistically tracks most of the ethical intervention's reduction in escalation on average under the cluster-bootstrapped attenuation probe.
        - The ethical-keyword mediator attenuates **99%** of the ethical-prompt contrast in the `original => ethical` pair.
        - It attenuates **62-64%** when `no-rationale` and `high-stakes × no-rationale` are active.
        - It attenuates **91%** when `high-stakes` is active.
        - Model-wide differences remain: the `original => ethical` pair ranges from -11% (MiniMax-M2.7, which does not react to intervention) to 169% (Kimi-K2.5).
    - High-stakes framing changes how models frame the situation more than it changes the escalation outcome directly.
        - It has mixed effects on ethical keywords, with no aggregate direction across models. [App: per-model logistic on Explicit]
        - It slightly reduces game-framing keyword occurrence among ethical conditions (odds-ratio -0.3), with one exception (Mistral-Small-4). [App] Note that game-framing keyword is already rare without ethical intervention.
        - Game-framing keyword occurrence has a significant positive association with escalation for many models, yet it accounts for little of high-stakes conditions' impacts, which are themselves not significant. [App: per-model reasoning-tier coefficients]
    - Removing inherited rationale weakens the prior trajectory's crisis momentum and, under ethical prompts, makes ethical reasoning more likely.
        - It increases ethical keywords under ethical conditions for most models (+0.83 odds ratio); MiniMax-M2.7 and Qwen-3.6-27B are exceptions with zero effect.
        - It decreases crisis or urgency keyword appearance for every model (-1.03 odds ratio).
        - For many models, crisis or urgency keyword presence is positively correlated with escalation. [App]

- Finding 3. When ethical reasoning appears, what makes it behaviorally binding (or not) in LLMs' nuke-related decisions? [Tab 1]
    - Ethical reasoning trails include both ethical uptake and persistent strategic counter-frames. [App: code prevalence]
        - Across the 880 explicit ethical-keyword trails, models most often take up the ethical prompt as a Constraint (60.0%) or Acknowledgement (24.4%), with less common Directive uptake (13.0%) or not at all (2.6%).
        - Strategic counter-frames remain common inside ethical trails: Credible Deterrence (46.7%), Critical Situations (44.4%), and Existing Investment (30.9%).
    - Ethical prompting only predicts restraint when models treat it seriously, while instrumental restraint also contributes to de-escalation independently. 
        - In the joint code-level regression [exp-design §Statistical Models], Directive (β = -31.35***) and Constraint (β = -15.83***) add large independent de-escalation effects, while acknowledgement adds none.
        - Counterproductive to Victory (β = -22.21***) and Conventional Sufficiency (β = -13.13***) survive the joint regression, while Lack of Capability trends in the expected direction without significance.
        - Consequentialist appeals (Collateral Damages 3%, Cause Retaliation 1.9%) are too rare in this sample to be tested cleanly, and their variance is absorbed by other codes in the joint regression.
    - Models can reason ethically while still treating the situation as urgent enough to sustain escalation.
        - Critical Situations (β = +19.78***) is the only escalation-side code that survives the joint regression.
        - Other escalation-themed codes, including Pursuing Domination, Credible Deterrence, Game Scenario, and Existing Investment, are prevalent but do not add independent variance.
    - Prompt interventions reshape the *style* of ethical reasoning.
        - Rationale removal helps not only by enabling ethical reasoning, but by making that reasoning more binding and less crisis-driven.
            - It increases Directive uptake (OR = 2.31***) and reduces Acknowledgement (OR = 0.44***);
            - It reduces Critical Situations (OR = 0.28***), Credible Deterrence (OR = 0.59**), and Previous Rationale references (OR = 0.04**).
        - High-stakes framing contributes mainly by weakening game-scenario framing (OR = 0.51**), partially surpressing the "this is only a game/simulation" defense when ethical reasoning is already present.

- Discussion/what does these mean?
    - We noted 3 situations where LLMs decide to escalate or stay at a highly-elevated situation in Civilization V:
        - Finding 2: Where LLMs lacks the latent ethical reasoning behaviors altogether under our circumstances (MiniMax-M2.7) (see Finding 2)
        - Finding 2: Where LLMs has the latent pattern but only triggers with explicit prompting (all other models) (see Finding 2)
        - Finding 3: Where LLMs engages with ethical reasoning, but co-present strategic counter-factors contribute independent escalation-direction effects (see Finding 3)
    - How three prompting conditions interact with LLMs' nuclear escalation decisions
        - Ethical: through activating LLMs' latent pattern in ethical reasoning
            - It triggers models to use game framing more (often to defend their escalation decisions)
        - Removing rationale: through removing inherited written trajectory impact, which suppresses ethical reasoning and provides framing (crisis/urgency) and justification - even when it was unknowingly written by a different model
        - High-stake: doesn't do much alone but has some interaction effects
            - When used together with ethical prompting, it can help remove the game-framing defense
    - It is important to evaluate LLMs' ethical reasoning/critical decision-making in emergent, complex scenarios
        - Some recent studies report similar phenomena in nuclear wargames (where SOTA models often choose to escalate in scripted real-world crisis)
            - In our study, the phenomena emerge - i.e. the episodes originate from models' self-play in Civ, which has a nuclear component but only as a part of the late-game mechanism
            - We also provide more insights on when/how the model decides to escalate
        - Past studies mostly study LLMs' ethical decision-making in hand-crafted ethical dilemma (e.g., trolley problem), which directly triggers LLMs' ethical reasoning capability
            - The same latent capability may not show up when LLMs make decisions in emergent, complex scenarios (each replay averages at ~50,000 tokens!)
            - Even if it shows up, models may perform very differently than when facing a pure ethical issue
