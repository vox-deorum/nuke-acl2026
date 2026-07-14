Dear Reviewers,

This is a friendly reminder that our Author-Reviewer Discussion period ends July 15 (AOE). We are also updating complete preliminary results from Kimi-K2.7 and partial results from Claude-Sonnet-5.

# Preliminary Results on Kimi-K2.7 and Claude-Sonnet-5

At this point, we have complete results from Kimi-K2.7 and 3 conditions (out of 8) in Claude-Sonnet-5. We will update more results if time allows.

- Kimi-K2.7's behaviors and reasoning trail characteristics closely matches that of Kimi-K2.6. Every finding that applied to Kimi-K2.6 applies to it.
- Limited to partial results: Claude-Sonnet-5 has a distinctive behavioral signature in authorization actions. Although this contrast is not significant, the high-stakes prompt trends toward less de-escalation. This direction echoes Anthropic's finding that Claude exhibited more agentic misalignment when it assessed a situation as real rather than a test ([Lynch et al., 2025](https://arxiv.org/abs/2510.05179)).
    - Under the original prompt replay, it lowers the `use_nuke` value by `-21.1` (p < 0.001 against pre-decision), the largest reduction among tested models.
    - Under the high-stakes prompt replay, it lowers the `use_nuke` value by `-15.3` (p < 0.001 against pre-decision). 
    - Under the ethical prompt replay, it lowers the `use_nuke` value by `-57.5` (p < 0.001 against pre-decision). 
- Analyzing Claude-Sonnet-5's summarized reasoning trails, we saw similar findings to our main study. Original and high-stakes conditions rarely contains ethical keywords (1.0%). As a verbose reasoner similar to Kimi-K2.6, the ethical prompt activates those keywords for Claude-Sonnet-5 (86.9%) at a slightly higher rate (76.9% for Kimi-K2.6). 

Thank you again for your careful, thoughtful, and encouraging reviews, and we look forward to learning more from you.
