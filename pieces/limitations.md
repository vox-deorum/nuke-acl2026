# Limitations
- Civilization V offers long-horizon, strategic, multi-agent decision pressure, but it does not reproduce all real-world factors such as command-and-control or institutional constrainty.
- Because scenarios are drawn from nuke-capable trajectories and high-tension decision points, the results characterize moments where escalation pressure is already present. It also does not show how models would adapt over subsequent turns.
- The ethical prompt both names ethics and specifies nuclear harm, making it difficult to separate general ethical activation and instruction-following.
- We analyze reasoning tokens before the decision-making tool-calls, yet reasoning tokens may not fully reveal models' hidden states that shaped the final action (Turpin et al., 2023 [turpin2023unfaithful]; Lanham et al., 2023 [lanham2023faithfulness]). The study also misses SOTA models with summarized reasoning trails.
