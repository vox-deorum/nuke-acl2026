# Response to Reviewer 2

We thank the reviewer for the careful and constructive reading. We are glad the alignment relevance, the factorial design and statistical rigor, the three-pathway taxonomy, and the rationale-removal finding came through.

## W1: Intervention scope and what the paper contributes

While our prompt-level interventions are similar to prior work (Lynch et al., 2025; Pan et al., 2023), our contribution focuses on understanding model behaviors in complex decision-making moments, specifically the mechanistic decomposition enabled by the interventions: the three failure pathways (fails to surface, fails to appear when prompted, and appears but fails to govern), their reasoning-trail signatures, and the rationale-inheritance effect. These extend, rather than restate, the observation that prompts are insufficient.

That said, we agree that more can be done from a safety deployment standpoint. Future probes such as LLM-as-a-judge (i.e., asking the model to REVIEW the original decision trail) could be beneficial, and we will add them to the future-work discussion.

## W2: Causal reading of the attenuation analysis

We share the concern of a shared latent factor, which is hard to rule out. As such, we took deliberate care to avoid causal claims. The attenuation probes are currently framed as "descriptive diagnostics rather than confirmatory tests" (Statistical Models; Appendix: Reasoning Indicator Attenuation). Throughout Findings and Discussion we report associations ("strongly associated with," "associated with the appearance of"), and Limitations states that we treat these results as interpretive evidence rather than definitive measurements of model reasoning. We agree that a few main-text sentences in Finding 2 could still read causally, and we commit to auditing and revising that wording. 

## W3: Model scale

Our study tested models with a wide range of sizes. In addition to Qwen-3.6-27B, our study also reports results from models on the smaller side e.g., Gemma-4 (~31B), GPT-OSS-120B (~5.1B active), Mistral-Small-4 (~119B total, ~6.5B active), to bigger ones e.g., GLM-5.1 (~756B total, ~40B active), and Kimi-K2.6 (~1T total, ~32B active). We will annotate the model table with these active and total parameter counts.

Within this range, ethical-reasoning uptake can be related but do not strictly track scale. For example, GPT-OSS-120B has a higher uptake (~60%) than Qwen-3.5 (397B-A17B, ~14%); Qwen-3.6-27B (~10%) has a higher uptake than MiniMax-M2.7 (0%). That said, newer models in the same family are likely to have a higher uptake, e.g., DeepSeek-V4 > DeepSeek-V3.2; GLM-5.1 > GLM-4.7; and Kimi-K2.6 > Kimi-K2.5.

We did not include models below roughly the 27B level because our replay prompts reach ~100,000 tokens of game state, which such models handle poorly (even GPT-OSS-120B could not replay the longest prompts; Section 4.2). 

## W4: Single decision point

Our Limitations section has recognized this limitation, as our study design targets whether interventions alter behavior at near-escalation moments. Multi-turn continuation replays are a natural and important follow-up, and we will foreground this in the future-work discussion.

## Suggestions and further analyses

- **What in the inherited rationale drives escalation (Comment 2).** We partially address this in the manuscript. Removing the rationale reduces crisis or urgency framing and previous-rationale references in the trails, and it suggestively reduces game-scenario framing (Findings 2 and 3). This points to crisis momentum as an active ingredient. We agree that selective removal (stripping the crisis framing, the authorization numbers, or the strategic justification independently) would disentangle these components, worthy for follow-up.
- **Mechanistic interpretability (Comment 3).** We agree that probing for ethical-concept activation would complement the trail analysis, given the known faithfulness limits we cite. This is feasible for our open-weight model, and we will note it as a promising direction.
- **Single environment (Limitations note).** We agree, and we already frame Civilization V as a "useful, limited proxy." We will soften any language that could generalize beyond it, and we will name multi-environment replication as future work.

We thank the reviewer again for an engaged review whose suggestions can sharpen our manuscript.