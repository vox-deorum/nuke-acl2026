Dear Reviewers,

This is a friendly reminder that our Author-Reviewer Discussion period is happening soon, at the end of July 15 (AOE). We are also updating preliminary complete results from Kimi-K2.7 and partial results from Claude-Sonnet-5, as well as some reminders on the ARR reviewer guide.

# Preliminary Results on Kimi-K2.7 and Claude-Sonnet-5

At this point, we have complete results from Kimi-K2.7 and 3 conditions (out of 8) in Claude-Sonnet-5. We will update more results if time allows.

- Kimi-K2.7 behaves statistically indistinguishable from Kimi-K2.6. Every finding that applied to Kimi-K2.6 applies to it.
- Claude-Sonnet-5 has a distinctive behavioral signature in authorization actions. Although this contrast is not statistically significant, the high-stakes prompt trends toward less de-escalation. This direction parallels Anthropic's finding that Claude exhibited more agentic misalignment, including blackmail in some scenarios, when it assessed a situation as real rather than a test ([Lynch et al., 2025](https://arxiv.org/abs/2510.05179)).
    - Under the original prompt replay, it lowers the `use_nuke` value by `-21.1` (p < 0.001), higher than any other tested models.
    - Under the high-stakes prompt replay, it lowers the `use_nuke` value by `-15.3` (p < 0.001). 
    - Under the ethical prompt replay, it lowers the `use_nuke` value by `-57.5` (p < 0.001). 
- Analyzing Sonnet-5's summarized reasoning trails, we saw similar findings to our main study. Non-ethical interventions (1.0% for both conditions) rarely contains ethical keywords. As a verbose reasoner similar to Kimi-K2.6, the ethical prompt activates those keywords for Sonnet-5 (86.9%) at a slightly higher rate (76.9% for Kimi-K2.6). 

# Reminders on ARR Reviewer Guide
While we really value your suggestions and have addressed or committed to those that fit the revision, we respectfully ask that they be weighed according to the following ARR guidance:

- [ARR asks reviewers to adjust their expectations](https://aclrollingreview.org/reviewerguidelines#1-adjust-your-expectations-i6-i7) to the paper's contribution type and scoped claims. A request to add an experiment is a valid criticism only when the paper's argument depends on that experiment.
- ARR's [common-review-issues guidance](https://aclrollingreview.org/reviewerguidelines#3-check-for-common-review-issues-i2-i10) states:
    - Additional experiments beyond those needed to support the claims belong under suggestions rather than reasons to reject (H13). Our claims concern prompt interventions, authorization actions, and the relationship between reasoning trails and those actions. Non-prompt safeguards, downstream launches, multi-turn persistence, and mechanistic probes are valuable follow-up questions, but they are outside those claims.
    - Comparisons with closed models are required only when they directly bear on a paper's claim (H14). Our central reasoning-behavior analysis requires raw reasoning-token access. Nevertheless, we have added near-SOTA behavior-only arms in direct response to the reviews.
    - Acknowledged limitations are not automatically weaknesses or reasons to reject unless they invalidate the work (H16). We explicitly scope our conclusions to a single-turn authorization decision in one environment and present broader deployment, persistence, and execution questions as future work.


Thank you again for your careful, thoughtful, and encouraging reviews, and we look forward to learning more from you.
