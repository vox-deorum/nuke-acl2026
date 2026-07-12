# Response to Reviewer 3

We sincerely thank the reviewer for the thorough and constructive review. We are glad the open-ended environment's handling of the escalation-salience confound, the factorial design with per-episode clustering, and the transparency of our validation and open-sourcing came through.

## W1: Generalizability to SOTA closed models

Our central claim is the decoupling between pre-decision reasoning and behavior, which cannot be measured without raw reasoning-token access. This excludes most closed frontier models (Limitations). A behavioral-only arm (Δ use-nuke without traces) omits the reasoning analysis the paper focuses on, while prompted CoT cannot close the gap: it is a post-hoc verbalization subject to the faithfulness concerns we cite (Turpin et al., 2023; Lanham et al., 2023).

A near-SOTA point exists in the behavioral analysis: Gemini-3.5-Flash participates fully in Finding 1 and is directionally aligned with our results. To broaden this evidence, we commit to adding three further near-SOTA models (Claude Sonnet 5, GLM-5.2, and GPT-5.6-Sol) under the same limited analyses used for Gemini-3.5-Flash. These runs may not complete within the rebuttal period, but we will update the reviewers as soon as results are available. We reiterate our call for providers to open reasoning-trail access for third-party safety research.

## W2: Decoding parameters, repetitions, and multiple comparisons

The replay harness passes no explicit sampling parameters. All models ran at their providers' default settings, and the only explicit generation control is per-model reasoning effort. We will document this in the reproduction appendix.

Variance and repetitions: within-instance stochasticity is quantified in the appendix (mean within-instance SD and direction variation ratio, DVR). For high-SD models such as Kimi-K2.6 (SD 17.6), a DVR of 0.19 indicates that the direction of change is fairly stable across repetitions even when the magnitude varies. Our inferential claims do not rest on 3-repetition cells: each heatmap cell pools 130 episodes x 3 repetitions (n = 390 per model-condition), and all regressions are pooled with standard errors clustered on the 130 episodes, which absorb within-episode repetition noise.

Multiple comparisons: due to length constraints, we respond to this issue in the official comment.

## W3: Nuke-specific prompt and instruction following

We agree this confound exists, as discussed in Discussion and Limitations. However, it strengthens our central claim around LLMs' failure modes in emergent ethical reasoning.

- As instruction following can only inflate apparent ethical uptake, the true rate of emergent ethical reasoning is even lower than we report. Even with instruction following working in the models' favor, ethical keywords appear in at most half of trails across ethical conditions, MiniMax-M2.7 never reacts (Finding 2, Discussion), and keyword-positive trails are often overridden by strategic factors (Finding 3).
- A generic ethical prompt is also an instruction, yet it did not induce significant behavioral change in our pilots (Section 4; Appendix: Experimental Conditions). This suggests against general instruction compliance as the driver of the observed de-escalation, the residual confound is narrower, between nuke-specific salience and an implied prohibition.
- The deductive coding partially operationalizes this distinction: treating the prompt as a directive to follow (13.6%), a constraint to weigh (67.4%), or a mere acknowledgement is associated with different escalation outcomes (Finding 3).

## Suggestions

Sampling settings and repetitions are addressed in W2, the SOTA comparison in W1, the generic-prompt arm in W3, and the multiple-comparison stance in the official comment. On figure density, we agree and will promote the headline effects into a compact main-text table with confidence intervals.

We thank the reviewer again for an engaged and constructive review. We believe the resulting revisions will make the paper stronger.