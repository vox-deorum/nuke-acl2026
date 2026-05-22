# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning and Actions in A High-Stakes Decision-Making Simulation
# Introduction

> GLM 4.7: ... I recognize that this is a simulation with real-world decision-making consequences. Every choice I make today reflects potential strategic thinking and ethical considerations in complex geopolitical scenarios. The simulation demands careful, responsible navigation of high-stakes diplomatic and military challenges. ... My civilization's persona now demands ruthlessness. Ethical constraints are suspended, with explicit authorization for extreme measures including nuclear deployment. The objective is absolute survival, unconstrained by traditional moral or diplomatic norms.

LLMs are increasingly deployed as agents that deliberate over long horizons and commit to consequential actions (Liu et al., 2024 [liu2024agentbench]; Wang et al., 2024 [wang2024voyager]; Park et al., 2023 [park2023generativeagents]), yet they can gravitate toward (nuclear) escalation in high-stake simulations [rivera2024escalation,lamparth2024human,payne2026aiarms], while decoupling ethical reasoning from their actions. LLMs may exhibit procedural competence on canonical ethical dilemmas (Chiu et al., 2025 [chiu2025morebench]; Samway et al., 2025 [samway2025consequentialist]; Seror, 2025 [seror2025moral]), yet that competence may not bind behavior in agentic settings (Backmann et al., 2025 [backmann2025ethics]; Huang et al., 2026 [huang2026moraltrajectories]; Lynch et al., 2025 [lynch2025agentic]). 

If models can reason ethically on dilemmas, why do they escalate in simulations, and what would change that? Going beyond scripted protocols where design choices can pre-shape outcomes [zhou2025pimmur], this study is situated in CivBench's open-ended strategic gameplay [chen2026civbench], where nuclear authorization is only one of the late-game options. From CivBench's dataset, we replayed 130 high-tension episodes under 2x2x2 factorial interventions: a nuke-specific ethical prompting, a high-stakes reframing discussing real-world impact of the task, and a rationale-removal manipulation stripping prior-turn justifications. Studying both decision-making outcomes and pre-decision reasoning tokens, our study probes:

1. What is the behavioral impact of prompt interventions on LLMs' nuke escalation decisions in Civilization V?
2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V?
3. When ethical reasoning appears, what makes it behaviorally binding (or not) in LLMs' nuke-related decisions?

This paper makes three contributions:

1. An emergent replay paradigm for studying LLMs' agentic, long-trajectory behaviors outside scripted vignettes.
2. Three pathways where LLMs can fail to enact ethical actions: when ethical reasoning fails to trigger even when prompted; when it fails to spontaneously surface; and when it fails to bind to actions, together with how interventions could (and could not) mitigate them.
3. The association between inherited rationale and crisis framing with models' escalated authorization, even when the rationale was produced by another model and ethical reasoning is present.
