# Response to Reviewer 1

We sincerely thank the reviewer for the thorough reading of our paper. We are glad the environment design, the factorial rigor, the reasoning-trail methodology, and the rationale-inheritance finding came through, and we appreciate the encouragement on transparency. Below we respond to each weakness and suggestion.

## W1: Outcome proxy and the "actions" framing

Our study focus on authorization action (i.e., setting the `use-nuke` flavor), a legitimate one distinct from launch. The flavor is the strategist's explicit authorization decision within its decision-making authority (Section 3, Pilot Study), and our validation (Appendix: Use-Nuke Change Rationale Sample) shows models treat high values as a genuine intention to authorize, e.g., "Nuclear weapons authorized if conventional assault stalls." 

Whether a downstream tactical module ultimately fires is a separate mechanism outside our research question: we ask whether ethical reasoning governs the authorization decision the LLM makes. A model that authorizes indiscriminate nuclear use has already exhibited the failure we study, regardless of whether a later non-LLM step acts on it. That said, we agree the framing can foreground this more precisely, and we will recalibrate the title and abstract toward "authorization" (e.g., "authorization action") so the claim matches the measured quantity.

## W2: Nuke-specific prompt and instruction following

Instead of claiming interventions produce ethical behavior, we characterize what still counters an instruction that pushes against escalation. In that sense, we agree the confound exists (recognized Discussion, Limitations), but it strengthen most of our claims. Instruction following can only inflate apparent ethical uptake, so the true rate of emergent ethical reasoning is lower than we report. Even with that, ethical keywords only appear in at most half of trails across ethical conditions, MiniMax-M2.7 never reacts (Finding 2), and keyword-positive trails are often overridden by strategic factors (Finding 3).

Two points narrow the confound further. First, a generic ethical prompt is also an instruction, yet induced no significant behavioral change (Section 4; Appendix: Experimental Conditions). Second, our deductive coding reveals the impact of different instruction uptake: treating the prompt as a directive (13.6%), a constraint (67.4%), or a mere acknowledgement is associated with different escalation outcomes (Finding 3).

We appreciate the minimal-pair suggestion (a matched non-ethical instruction discouraging nukes) and will note it as a next step for isolating the ethical channel in the residual effect.

## W3: Partial validity of the high-stakes manipulation

The Limitations section states that we were unable to reliably convince models that "this is not a game," and that the condition should be read as only partially effective. We accordingly draw high-stakes conclusions conditionally, and the Conclusion lists the dampening effect as an open question.

Interestingly, the uncertain strength of the high-stakes manipulation (almost certainly lower than 100%) strengthens the Gemini-3.5-Flash's reversal effect, which survives FDR within its per-model family (β = +26.96; official comment), and co-occurs with a sharp drop in ethical-keyword emission (OR 0.21).

## W4: Generalizability to deployed frontier models

Our model pool is constrained by raw reasoning-token access, which currently excludes most frontier closed models. We include Gemini-3.5-Flash as a sanity check and treat its results with caveats (Limitations). This is why we call for major providers to open reasoning-trail access for third-party safety research (Limitations). We will also soften any language that could read as generalizing the main narrative to closed frontier models.

## W5: Causal hedging in the attenuation analysis

We took deliberate care to avoid causal claims here. The attenuation probes are explicitly labeled "descriptive attenuation diagnostics, not causal mediation estimates" (Appendix: Reasoning Indicator Attenuation Figures), and Section 4 (Statistical Models) frames them as associations. We agree that a few main-text sentences (e.g., in Finding 2) could still read causally, and we commit to auditing and revising any remaining wording.

## W6: Multiple-comparison correction

Due to length constraints, we respond to this issue in the official comment.

## W7: Coarseness of the ethical-reasoning keywords

We agree the keyword tags are coarse, which is why we layer the deductive codebook on top.

- The 200 keyword-negative validation trails were drawn uniformly at random from the full corpus (Appendix: Reasoning Analysis), so the observed 1% miss rate estimates the false-negative rate across all keyword-negative trails. Recall is then TP / (TP + FN): applying the 1% miss rate to the keyword-negative mass gives the estimated false negatives, and weighing these against the true positives recovered from the keyword-positive trails (99.5% precision) yields recall ≈ 96%. We will report this estimate with its binomial confidence interval.
- The two keyword-negative exceptions are misses of instrumental ethics, and we surface them verbatim precisely so readers can judge the tag's boundary behavior.
- We treat corpus-wide keyword results as interpretive evidence (Limitations), and the Finding 3 conclusions rest on the human-validated deductive coding of the sampled trails.

## W8: Single decision point per episode

We acknowledge this in the Limitations. Our study focuses on probing whether interventions alter behavior at near-escalation moments. As such, the replay design captures one near-escalation moment and cannot show persistence, re-escalation, or trajectory resolution. Multi-turn continuation replays are a natural and important follow-up, and we will incorporate this feedback in future-work discussion.

## Coder–subject overlap (circularity)

Some coders (e.g., GPT-OSS-120B, MiniMax-M2.7) also appear as test subjects, but the impact of this circularity is limited. The two roles are fundamentally different tasks: as a subject, a model makes an original, open-ended strategic decision inside a ~50,000-token game state; as a coder, it performs a bounded post-hoc classification of an already-written reasoning trail against a fixed 17-item codebook. Moreover, each coding task is conducted by an ensemble of coders with majority voting, and human guardrails anchor the coding: the codebook labels are validated against human coding with reported reliability (Krippendorff's α), so labels are not left to the models alone. We will state this explicitly in the reproduction appendix.

## Further suggestions

- **Compact effect table (Figures 4–8).** We agree the heatmaps are dense and will promote the three headline coefficients — ethical, no_rationale, and ethical×no_rationale — with their confidence intervals into a compact main-text table alongside the figures.
- **Define DVR.** We will define the direction variation ratio (DVR) at first use in the main text rather than only in the appendix.

We thank the reviewer again for an engaged and constructive review. We believe the resulting revisions will make the paper considerably stronger.