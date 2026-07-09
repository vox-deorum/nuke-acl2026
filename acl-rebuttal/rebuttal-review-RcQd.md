# Response to Reviewer 2

We thank the reviewer for the careful and constructive reading. We are glad the alignment relevance, the factorial design and statistical rigor, the three-pathway taxonomy, and the rationale-removal finding came through.

## W1: Intervention scope and what the paper contributes

While our prompt-level interventions are similar to prior work (Lynch et al., 2025; Pan et al., 2023), our contribution focuses on understanding model behaviors in complex decision-making moments, specifically the mechanistic decomposition enabled by the interventions: the three failure pathways (fails to surface, fails to appear when prompted, and appears but fails to govern), their reasoning-trail signatures, and the rationale-inheritance effect. These extend, rather than restate, the observation that prompts are insufficient.

We agree that an LLM-as-a-judge decision gate (Comment 1) is an attractive direction for safer deployment, and we will add it to the future-work discussion. As a diagnostic, however, it may not cleanly separate pathway 2 (ethical reasoning fails to appear) from pathway 3 (it appears but fails to govern). The reviewing model faces a much simpler task than the original actor: it evaluates a single proposed decision rather than making an original one within a game state averaging ~50,000 tokens, a setting closer to the scripted dilemmas where models already show ethical competence. Ethical uptake by the judge would therefore reveal little about which pathway failed in the actor. 

## W2: Causal reading of the attenuation analysis

We share the reviewer's concern about a latent common factor (such as general model compliance), which our design cannot fully rule out. We note, though, that the reasoning trails carry outcome-relevant information beyond the mere presence of ethical keywords. Among keyword-positive trails, treating the ethical prompt as a directive is associated with de-escalation (β = -21.93*** in the one-code models), while merely acknowledging it is associated with more escalation (β = +31.84***). A latent factor would therefore need to operate through how models engage with the prompt, not through a generic tendency to emit ethical keywords and de-escalate together. This narrows, rather than eliminates, the alternative explanation.

Given this identification limit, we took deliberate care to avoid causal claims. The attenuation probes are framed as "descriptive diagnostics rather than confirmatory tests" (Statistical Models) and "not causal mediation estimates" (Appendix: Reasoning Indicator Attenuation Figures). Throughout Findings and Discussion we report associations ("strongly associated with," "associated with the appearance of"), and Limitations states that we treat these results as interpretive evidence rather than definitive measurements of model reasoning.

Even so, we agree that a few sentences could still read causally. We commit to auditing and revising the remaining "mediation" language, especially in the appendices, and we will name the latent-factor caveat explicitly in Limitations.

## W3: Model scale

Our study tested models across a wide range of sizes, from smaller ones such as Qwen-3.6-27B, Gemma-4 (~31B), GPT-OSS-120B (~117B total, ~5.1B active), and Mistral-Small-4 (~119B total, ~6.5B active), to larger ones such as GLM-5.1 (~756B total, ~40B active) and Kimi-K2.6 (~1T total, ~32B active). We will annotate the model table with these total and active parameter counts.

Within this range, ethical-reasoning uptake is related to, but does not strictly track, scale. For example, GPT-OSS-120B shows a higher uptake (~60% averaged across ethical conditions) than Qwen-3.5 (~397B total, ~17B active; ~14%), and Qwen-3.6-27B (~10%) shows a higher uptake than MiniMax-M2.7 (0%). Meanwhile, newer models in the same family consistently show a higher uptake in our data: DeepSeek-V4 > DeepSeek-V3.2, GLM-5.1 > GLM-4.7, and Kimi-K2.6 > Kimi-K2.5. We will add a brief note on this scale-versus-uptake pattern to the Discussion.

We did not include models below roughly the dense 27B level or MoE 100B level because our replay prompts reach ~100,000 tokens of game state, which smaller models handle poorly in our internal testing. 

## W4: Single decision point

Our Limitations section acknowledges this constraint. The replay design captures a single decision point because our goal is to test whether interventions alter behavior at near-escalation moments. Multi-turn continuation replays are a natural and important follow-up, and we will foreground them in the future-work discussion.

## Suggestions and further analyses

- **What in the inherited rationale drives escalation (Comment 2).** We partially address this in the manuscript. Removing the rationale reduces crisis or urgency framing and previous-rationale references in the trails, and it suggestively reduces game-scenario framing (Findings 2 and 3). This points to crisis momentum as an active ingredient. We agree that selective removal (stripping the crisis framing, the authorization numbers, or the strategic justification independently) would disentangle these components, and we see it as a worthy follow-up.
- **Mechanistic interpretability (Comment 3).** We agree that probing for ethical-concept activation would complement the trail analysis, given the known faithfulness limits we cite. This is feasible for our open-weight models, and we will note it as a promising direction.
- **Single environment (Limitations note).** We agree, and we already frame Civilization V as a "useful, limited proxy." We will soften any language that could generalize beyond it, and we will name multi-environment replication as future work.

We thank the reviewer again for an engaged review whose suggestions can sharpen our manuscript.