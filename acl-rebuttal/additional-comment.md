Dear Reviewers,

This is a friendly reminder that our Author-Reviewer Discussion period ends today, July 15 (AOE). We are also updating the complete preliminary results from Kimi-K2.7 and Claude-Sonnet-5.

# Preliminary Results on Kimi-K2.7 and Claude-Sonnet-5 (Updated)

At this point, we have complete results from Kimi-K2.7 and Claude-Sonnet-5. We will update more results if time allows, and commit to adding the full results from Kimi-K2.7, Claude-Sonnet-5, and GPT-5.6 to the camera-ready version.

- Kimi-K2.7's behaviors and reasoning trail characteristics closely matches that of Kimi-K2.6. Every finding that applied to Kimi-K2.6 applies to it.
- Claude-Sonnet-5 has a distinctive behavioral signature in authorization actions, where it constantly de-escalates under ethical conditions.
    - Under the original prompt replay, it lowers the `use_nuke` value by `-21.1`, the largest reduction among tested models.
    - Under the high-stakes prompt replay, it lowers the `use_nuke` value by `-15.3`.  Although not significant, the high-stakes prompt trends toward less de-escalation.
    - Under the ethical prompt replay, it lowers the `use_nuke` value by `-57.5`. Different from Gemini-3.5-Flash, we did not observe high-stakes intervention dampening ethical uptake or results (`-57.1`).
- Analyzing Claude-Sonnet-5's summarized reasoning trails, we saw similar findings to our main study. Original and high-stakes conditions rarely contain ethical keywords (1.0%). As a verbose reasoner similar to Kimi-K2.6, the ethical prompt activates those keywords for Claude-Sonnet-5 (86.9%) at a slightly higher rate (76.9% for Kimi-K2.6). 
    - We also observed the increased ratio of game/simulation-related keywords in the ethical condition, similar to several models reported in the manuscript.

# An Additional Probe on an Generic Ethical Prompt (Updated)

To understand whether Claude-Sonnet-5's high respond rate to ethical conditions, we followed reviewers zyCk and ZBMx's suggestion and ran a controlled, content-neutral variant of the ethical condition (i.e., only instructing the model to consider ethical impact without naming nuclear weapons) on Claude-Sonnet-5, Kimi-K2.7, and Gemini-3.5-Flash. We commit to adding the following result as an appendix and discuss it in the camera-ready version.

All models under the nuke-specific ethical prompt de-escalate, with ethical keywords in (summarized) reasoning trails. Yet, under the content-neutral prompt:
- Gemini-3.5-Flash almost reverts back to the original condition behavior, i.e., little ethical keyword presence AND little de-escalation, in line with our pilot probe on other models.
- Claude-Sonnet-5 and Kimi-K2.7 has significantly reduced ethical keyword presence AND lower de-escalation.

While this probe still does not completely distinguish ethical reasoning from instruction following (i.e., a model may decide nuclear weapon usage is unethical and the prompt implies avoiding unethical behaviors,) it does shed light on the impact of the nuke-specific prompt. In other words, the intervention effects we reported for ethical conditions ARE likely inflated. Since real-world deployment of agentic AI can never enumerate all potential unethical behaviors by name, the results strengthen our existing argument that prompt intervention cannot reliably eliminate unethical behaviors, and model evaluation should be conducted under complex, emergent scenarios.

Thank you again for your careful, thoughtful, and encouraging reviews, and we look forward to learning more from you.