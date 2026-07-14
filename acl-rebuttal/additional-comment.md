Dear Reviewers,

This is a friendly reminder that our Author-Reviewer Discussion period is happening soon, at the end of July 15 (AOE). We are also updating preliminary complete results from Kimi-K2.7 and partial results from Claude-Sonnet-5, as well as some reminders on the ARR reviewer guide.

# Preliminary Results on Kimi-K2.7 and Claude-Sonnet-5

At this point, we have complete results from Kimi-K2.7 and 3 conditions (out of 8) in Claude-Sonnet-5.

- Kimi-K2.7 behaves statistically indistinguishable from Kimi-K2.6. Every finding that applied to Kimi-K2.6 applies to it.
- Claude-Sonnet-5 has unique behavioral signature in authorization actions. While insignificant, high-stakes prompt trends less towards de-escalation, matching Anthropic's own research in blackmailing behaviors.
    - Under the original prompt replay, it lowers the `use_nuke` value by `-21.1` (p < 0.001), higher than any other tested models.
    - Under the high-stakes prompt replay, it lowers the `use_nuke` value by `-15.3` (p < 0.001). 
    - Under the ethical prompt replay, it lowers the `use_nuke` value by `-57.5` (p < 0.001). 
- That said, its summarized reasoning trails rarely contains ethical keywords in non-ethical interventions (1.0% for both conditions). As a verbose reasoner similar to Kimi-K2.6, the ethical prompt activates those keywords for Sonnet-5 (86.9%) at a slightly higher rate (76.9% for Kimi-K2.6). These preliminary results match our findings.

# Reminders on ARR Reviewer Guide
Per ACL RR's recent official email (see below), we are gently reminding the reviewers:

> Sometimes reviews do not follow the ARR review guidelines, and the authors are encouraged to refer to them in the discussion. If the issue is well-justified, reviewers should update their review accordingly.



Thank you again for your careful, thoughtful, and encouraging reviews, and we look forward to learning more from you.