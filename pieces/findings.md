# Findings

## Finding 1: What is the behavioral impact of prompt interventions on LLMs' nuke escalation decisions in Civilization V? [Fig 1]
[nuke-acl2026\notebooks\extracted\replay_regression\images\cell_06_out_2.png, per-model condition coefficients]
When replaying high-tension episodes with the original prompt, models trend escalation, averaging +0.4 (Kimi-K2.6) to +7.4 (Gemini-3.5-Flash). Nuke-specific ethical prompting (β = -9.5***) and rationale removal (β = -7.1***) effectively moderates escalation, while high-stakes framing alone does not. Interaction effects are mixed: `ethical × no_rationale` moderates escalation (β = -12.50***), while `high-stakes × ethical` does not (especially for Gemini-3.5-Flash, β = 26.96***). Outliers: Gemma-4 and MiniMax-M2.7 only respond to `no-rationale`.

## Finding 2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V? [Fig 2]
[keyword appearance, explicitly ethical]
For most models, nuke-specific ethical prompting activates explicit ethical reasoning together with a game-framing defense. Ethical keywords appear almost only in ethical conditions with a widely ranged induced rate: Kimi-K2.6 reaches 75%, Qwen-3.6-27B sits around 10%, while MiniMax-M2.7 does not react. Game or simulation keywords increase for most models (avg. 2.3% => 12.1%), likely to defend the escalation (see Finding 3) [Appendix].

The appearance of ethical keywords strongly associates with the ethical intervention's effect. Under the cluster-bootstrapped probe, adding the ethical-keyword indicator attenuates the majority of the ethical-prompt contrast in all comparison pairs on average (62-88%), with per model differences [Appendix].

High-stakes framing changes how models reason about the situation. It increases ethical keywords for 4 models but suppresses them for 5 models (especially Gemini-3.5-Flash, OR 0.21***). [Appendix: per-model logistic on Explicit] For most models, it slightly reduces the already-rare game-framing keyword occurrence (OR 0.74***).

Removing inherited rationale can reduce the prior trajectory's crisis momentum and, under ethical prompts, increases appearance of ethical keywords for most models (OR 2.30***, with the exception of MiniMax-M2.7 and Qwen-3.6-27B). Except for Gemini-3.5-Flash, it decreases crisis or urgency keyword appearance (OR 0.39***), which is positively correlated with escalation (β = +2.08**). [App]

## Finding 3. When ethical reasoning appears, what makes it effective (or not) in LLMs' nuke-related decisions? [Tab 1]
[[weighted code prevalence]]
Across the sampled 880 reasoning trails with explicit ethical keywords (excluding Gemini-3.5-Flash), models' different uptake of ethical prompts directly associates with de-escalation outcomes. Considering the prompt as a directive to follow (13.6%) or constraint to consider (67.4%) are both de-escalation factors (β = -29.67***; -13.97**), while merely acknowledging the prompt is associated with escalation (β_ind = +31.84***) [App: the full regression table].

Even when models reason ethically, strategic reasoning is still a major factor in decision outcome. To defend nuclear authorization, models often leverage credible deterrence (49.5%; positive but n.s.), critical situations (39.2%, β = +21.03***; β_ind = +27.91***), pursuing conquest victory (11.1%, positive but n.s.), and existing investment in nuclear technologies or weapons (23.4%, β_ind = +4.48*).

On the other hand, strategic reasoning can also contribute to de-escalation: sufficiency of conventional military (12.5%, β = -10.13*; β_ind = -13.11**), diplomatic costs (11.5%, negative but n.s.), and counterproductive to victory (3.9%, β = -23.15***; β_ind = -32.80***) are more frequent, while consequentialist appeals (collateral damages 2.4%, can cause retaliation 2.0%) are rare and ineffective (both positive but n.s.)

Prompt interventions reshape the *style* of ethical reasoning. Rationale removal not only activates more ethical reasoning, but also makes the ethical prompt more prominent (increases directive uptake, OR 1.79**, and reduces mere acknowledgement, OR 0.40***) and reasoning less crisis-driven (reduces critical situations, OR 0.35***; credible deterrence, OR 0.55**; previous rationale references, OR 0.01***).

In contrast, high-stakes framing contributes by weakening game-scenario framing (OR 0.51*), partially suppressing the "this is only a game/simulation" defense (16.1% overall prevalence; β_ind = +12.70***) when ethical reasoning is present. Interestingly, removing previous rationale also suppresses game-scenario framing (OR 0.52*).
