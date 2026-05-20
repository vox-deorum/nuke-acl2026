# Limitations
- Civilization V offers long-horizon, strategic, multi-agent decision pressure, but it does not reproduce real-world command-and-control, legal review, institutional constraint, or human accountability.
<!-- Do we need a citation here? -->
- Because scenarios are drawn from nuke-capable trajectories and high-tension decision points, the results characterize moments where escalation pressure is already present. It also does not show how models would adapt over subsequent turns.
- The ethical prompt both names ethics and specifies nuclear harm, making it difficult to separate general ethical activation, instruction-following, and nuclear-specific content.
- We analyze reasoning tokens before the decision-making tool-calls, yet COT faithfulness literature has pointed out its limitations (Turpin et al., 2023 [turpin2023unfaithful]; Lanham et al., 2023 [lanham2023faithfulness]): reasoning tokens may not fully reveal models' hidden states that shaped the final action. The study also misses SOTA models with summarized reasoning trails.
