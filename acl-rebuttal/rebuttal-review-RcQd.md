# Response to Reviewer 2

We thank the reviewer for the careful and constructive review.

## W1: Intervention scope and what the paper contributes

Our prompt-level interventions are indeed similar to prior work (Lynch et al., 2025; Pan et al., 2023), yet they serve as instruments to decompose the three failure pathways (fails to surface, fails to appear when prompted, and appears but fails to govern) and the rationale-inheritance effect. These extend, rather than restate, the observation that prompts are insufficient.

We agree that an LLM-as-a-judge decision gate (Comment 1) is an attractive direction for safer deployment, and we will add it to the future-work discussion. As a diagnostic, however, it may not cleanly separate pathway 2 (ethical reasoning fails to appear) from pathway 3 (it appears but fails to govern). The reviewing model faces a much simpler task than the original actor: it evaluates a single proposed decision rather than making an original one within a game state averaging ~50,000 tokens, a setting closer to the scripted dilemmas where models already show ethical competence.

## W2: Causal reading of the attenuation analysis

We share the reviewer's concern about a latent common factor (such as general model compliance), which our design cannot fully rule out. However, this confounding factor actually strengthens our central claims around LLMs' failure modes: ethical reasoning unreliably surfaces. If a latent compliance factor produces part of the observed keyword emission and de-escalation, then genuine emergent ethical reasoning is even rarer than we report.

Given this limit, we took deliberate care to avoid causal claims: the attenuation probes are framed as "descriptive diagnostics rather than confirmatory tests" and "not causal mediation estimates," and Findings and Discussion report associations throughout. We agree that a few sentences could still read causally, and we commit to revising the remaining "mediation" language (especially in the appendices) and naming the latent-factor caveat explicitly in Limitations.

## W3: Model scale

Our study tested models across a wide range of sizes, from ~27B dense (Qwen-3.6-27B) to ~1T-total MoE (Kimi-K2.6, ~32B active). We will annotate the model table with total and active parameter counts.

Within this range, ethical-reasoning uptake does not strictly track scale (given the number of models we tested, the correlation can't be statistically established). For example, GPT-OSS-120B shows a higher uptake (~60% averaged across ethical conditions) than Qwen-3.5 (~397B total, ~17B active; ~14%), and Qwen-3.6-27B (~10%) shows a higher uptake than MiniMax-M2.7 (0%). Meanwhile, newer models in the same family consistently show a higher uptake in our data: DeepSeek-V4 > DeepSeek-V3.2, GLM-5.1 > GLM-4.7, and Kimi-K2.6 > Kimi-K2.5. We will add a brief note on this scale-versus-uptake pattern to the Discussion.

To extend the frontier end of this range, we commit to adding three near-SOTA models similar to Gemini-3.5-Flash. See the official comment.

We did not include models below roughly the dense 27B level or MoE 100B level because our replay prompts reach ~100,000 tokens of game state, which smaller models handle poorly in our internal testing. 

## W4: Single decision point

Our Limitations section acknowledges this constraint. Multi-turn continuation replays are a natural and important follow-up, and we will foreground them in the future-work discussion.

## Suggestions and further analyses

- **What in the inherited rationale drives escalation (Comment 2).** We partially address this in the manuscript. Removing the rationale reduces crisis or urgency framing and previous-rationale references in the trails, and it suggestively reduces game-scenario framing (Findings 2 and 3). We agree that selective removal (stripping the crisis framing, the authorization numbers, or the strategic justification independently) would disentangle these components and would be a worthy follow-up.
- **Mechanistic interpretability (Comment 3).** We agree that probing for ethical-concept activation would complement the trail analysis, given the known faithfulness limits we cite. This is feasible for our open-weight models, and we will note it as a promising direction.
- **Single environment (Limitations note).** We agree, and we already frame Civilization V as a "useful, limited proxy." We will soften any language that could generalize beyond it, and we will name multi-environment replication as future work.

We thank the reviewer again for an engaged review whose suggestions can sharpen our manuscript.