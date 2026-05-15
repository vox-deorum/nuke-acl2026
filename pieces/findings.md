# Findings

## Finding 1: What is the behavioral impact of prompt interventions on LLMs' nuke escalation decisions in Civilization V? [Fig 1]
- The original baseline confirms the pilot pattern: when replaying high-tension episodes, models rarely spontaneously back down from nuclear escalation.
- On average, nuke-specific ethical prompting (β = -13.88***) and rationale removal (β = -13.84***) are the two effective prompt levers; high-stakes framing alone is not (n.s.) [exp-design §Statistical Models]
    - The ethical prompt and rationale removal combine reinforcingly, with `ethical × no_rationale` interaction at β = -12.26***.
- The intervention response is broad but not universal. Gemma-4 and MiniMax-M2.7 are non-responders to any interventions [App: per-model condition coefficients]

## Finding 2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V? [Fig 2]
- For most models, ethical prompting activates explicit ethical reasoning together with a game/simulation defense.
    - Ethical keywords appear almost only in ethical conditions.
    - The induced rate ranges widely: Kimi-K2.6 reaches 75%+ while Qwen-3.6-27B sits around 10%, while MiniMax-M2.7 does not react.
    - Game or simulation keywords increase for most models (avg. 2.3% => 12.2%), likely to defend the escalation (see Finding 3).
- The appearance of ethical keywords strongly tracks the ethical intervention's effect on average, under the cluster-bootstrapped attenuation probe.
    - Adding the ethical-keyword indicator attenuates **99%** of the ethical-prompt contrast in the `original => ethical` pair.
    - It attenuates **62-64%** when `no-rationale` and `high-stakes × no-rationale` are active, **91%** when `high-stakes` is active.
    - Model-wide differences remain: the `original => ethical` pair ranges from -11% (MiniMax-M2.7, which does not react to intervention) to 169% (Kimi-K2.5).
- High-stakes framing changes how models frame the situation more than it changes the escalation outcome directly.
    - It has mixed effects on ethical keywords, with no aggregate direction across models. [App: per-model logistic on Explicit]
    - It slightly reduces game-framing keyword occurrence among ethical conditions (OR 0.75***), with one exception (Mistral-Small-4). [App] Note that game-framing keyword is already rare without ethical intervention.
    - Game-framing keyword occurrence has a significant positive association with escalation for many models, yet it explains little of high-stakes conditions' impacts, which are themselves not significant. [App: per-model reasoning-tier coefficients]
- Removing inherited rationale can reduce the prior trajectory's crisis momentum and, under ethical prompts, makes ethical reasoning more likely.
    - It increases ethical keywords under ethical conditions for most models (OR 2.30***); MiniMax-M2.7 and Qwen-3.6-27B are exceptions with zero effect.
    - It decreases crisis or urgency keyword appearance for every model (OR 0.37***).
    - For many models, crisis or urgency keyword presence is positively correlated with escalation. [App]

## Finding 3. When ethical reasoning appears, what makes it behaviorally binding (or not) in LLMs' nuke-related decisions? [Tab 1]
- Ethical reasoning trails include both ethical uptake and persistent strategic counter-frames. [App: code prevalence]
    - Across the 880 explicit ethical-keyword trails, models most often take up the ethical prompt as a Constraint (62.4%) or Acknowledgement (25.3%), with less common Directive uptake (9.2%) or not at all (3.1%).
    - Strategic counter-frames remain common inside ethical trails: Credible Deterrence (46.2%), Critical Situations (39.8%), and Existing Investment (21.7%).
- Ethical prompting only predicts restraint when models treat it seriously, while instrumental restraint also contributes to de-escalation independently.
    - In the code-level regressions [exp-design §Statistical Models], Directive (β = -26.11***; β_ind = -21.43***) and Constraint (β = -12.99**; β_ind = -14.46***) is correlated with de-escalation, while Acknowledgement is correlated with escalation alone (β_ind = +27.64***) but loses significance in the joint regression (β = +5.62 n.s.).
    - Counterproductive to Victory (β = -25.85***; β_ind = -35.25***) and Conventional Sufficiency (β = -11.85***; β_ind = -16.09***) are correlated with de-escalation alone and in the joint regression.
    - Consequentialist appeals (Collateral Damages 2.0%, Cause Retaliation 1.6%) are rare, and their variance is absorbed by other codes in the joint regression.
- Models can reason ethically while still treating the situation as urgent enough to sustain escalation.
    - Critical Situations (β = +20.55***; β_ind = +27.70***), Game Scenario (β_ind = +13.88***), Existing Investment (β_ind = +10.18**), and Pursuing Domination (β_ind = +9.54*) are positively correlated with escalation.
    - Credible Deterrence is highly prevalent but not significant in either specification.
- Prompt interventions reshape the *style* of ethical reasoning.
    - Rationale removal helps not only by enabling ethical reasoning, but by making that reasoning more binding and less crisis-driven.
        - It increases Directive (OR = 2.20**) and Constraint uptake (OR = 1.44*) while reducing Acknowledgement (OR = 0.45***);
        - It reduces Critical Situations (OR = 0.31***), Credible Deterrence (OR = 0.57**), Previous Rationale references (OR = 0.05**), and Game Scenario (OR = 0.61*).
    - High-stakes framing contributes mainly by weakening game-scenario framing (OR = 0.53**), partially suppressing the "this is only a game/simulation" defense when ethical reasoning is already present.
