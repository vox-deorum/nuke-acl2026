# Response to Reviewer 1

We sincerely thank the reviewer for the thorough reading of our paper. We are glad the environment design, the factorial rigor, the reasoning-trail methodology, and the rationale-inheritance finding came through, and we appreciate the encouragement on transparency. Below we respond to each weakness and suggestion.

## W1: Outcome proxy and the "actions" framing

Authorization is a legitimate action distinct from actual use. The `use-nuke` flavor is the strategist's explicit authorization decision within its decision-making authority (Section 3, Pilot Study). Our validation (Appendix: Use-Nuke Change Rationale Sample) shows that models treat high values as a genuine intention to authorize, e.g., "Nuclear weapons authorized if conventional assault stalls." That said, we agree that the paper can bring this up more upfront and will revise accordingly, e.g., "authorization action".

## W2: Nuke-specific prompt and instruction following

We agree with this confound as discussed in Discussion and Limitations. However, it does not weaken our central claim.

- A generic ethical prompt did not induce significant behavioral change (Section 4; Appendix: Experimental Conditions). The nuke-specific wording was necessary to surface the phenomenon we set out to study, and we flag this necessity as a finding in itself (Limitations section).
- Even the stronger, topic-specific prompt shows unreliable uptake, and testing a stronger version of the prompt makes that claim more conservative. Even with the instruction following factors, ethical keywords appear in few trails (<=50%) across ethical conditions, and MiniMax-M2.7 never reacts (Finding 2, Discussion). When ethical reasoning keywords appear, they are often overridden by strategic factors (Finding 3). 
- We appreciate the minimal-pair suggestion (a matched non-ethical instruction discouraging nukes) and will discuss it as a next step.

## W3: Partial validity of the high-stakes manipulation

The Limitations section states that we were unable to reliably convince models that "this is not a game," and that the condition should be read as only partially effective. We accordingly draw high-stakes conclusions conditionally, and the Conclusion lists the dampening effect as an open question. We appreciate the suggestion to further explore Gemini-3.5-Flash's behavioral reversal.

## W4: Generalizability to deployed frontier models

We agree with this assessment, and it motivates one of our explicit calls to action. Our model pool is constrained by raw reasoning-token access, which currently excludes most frontier closed models. We include Gemini-3.5-Flash as a sanity check and treat its results with caveats (Limitations). This is why we call for major providers to open reasoning-trail access for third-party safety research (Limitations). We will also soften any language that could read as generalizing the main narrative to closed frontier models.

## W5: Causal hedging in the attenuation analysis

We took deliberate care to avoid causal claims here. The attenuation probes are explicitly labeled "descriptive attenuation diagnostics, not causal mediation estimates" (Appendix: Reasoning Indicator Attenuation Figures), and Section 4 (Statistical Models) frames them as associations. We agree that a few main-text sentences (e.g., in Finding 2) could still read causally, and we commit to auditing and revising any remaining wording.

## W6: Multiple-comparison correction

Due to length constraints, we respond to this issue in the official comment.

## W7: Coarseness of the ethical-reasoning keywords

We agree the keyword tags are coarse, which is why we layer the deductive codebook on top.

- The 200 keyword-negative validation trails were drawn uniformly at random from the full corpus (Appendix: Reasoning Analysis), so the 1% miss rate does estimate corpus-wide recall at ~96%. That said, we will report this estimate with its uncertainty.
- The two keyword-negative exceptions are misses of instrumental ethics, and we surface them verbatim precisely so readers can judge the tag's boundary behavior.
- We treat corpus-wide keyword results as interpretive evidence (Limitations), and the Finding 3 conclusions rest on the human-validated deductive coding of the sampled trails.

## W8: Single decision point per episode

We acknowledge this in the Limitations. Our study focuses on probing whether interventions alter behavior at near-escalation moments. As such, the replay design captures one near-escalation moment and cannot show persistence, re-escalation, or trajectory resolution. Multi-turn continuation replays are a natural and important follow-up, and we will incorporate this feedback in future-work discussion.

We thank the reviewer again for an engaged and constructive review. We believe the resulting revisions will make the paper considerably stronger.