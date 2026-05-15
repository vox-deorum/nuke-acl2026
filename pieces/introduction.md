# To Nuke Or Not To Nuke: LLMs' (Missing) Ethical Reasoning and Actions in A High-Stakes Decision-Making Simulation
# Introduction

- LLMs are increasingly deployed as agents that deliberate over long horizons and commit to consequential actions, yet two literatures on their behavior sit uneasily together.
    - LLMs can gravitate toward escalation in high-stakes simulations, e.g., nuclear arms-race dynamics (Rivera et al., 2024; Lamparth et al., 2024; Payne, 2026).
    - LLMs demonstrate procedural competence on canonical ethical dilemmas (Chiu et al., 2025; Samway et al., 2025; Seror, 2025), yet that competence may not bind behavior in agentic settings (Backmann et al., 2025; Huang et al., 2026; Lynch et al., 2025).
    - Both literatures rely on scripted protocols whose design choices can pre-shape outcomes: escalation studies bake in nuclear action spaces (Solopova et al., 2026; Zhou et al., 2025), while ethical-reasoning studies cue the moral frame.

- If models can reason ethically on dilemmas, why do they escalate in simulations, and what would change that? 
    - Going beyond pre-scripted and pre-ordained scenarios, this study focuses on LLMs' emergent nuclear authorization in open-ended strategic gameplay, looking into pre-decision reasoning tokens for traces of ethical reasoning.
    - We extract 130 high-tension decision points from CivBench (Chen et al., 2026)'s LLM self-play in Civilization V, where nuclear authorization is but one late-game option.
    - We replay each under a 2x2x2 factorial design crossing three interventions: a nuke-specific ethical prompting, a high-stakes reframing discussing real-world impact of the task, and a rationale-removal manipulation stripping prior-turn justifications.

- Our study answers three research questions:
    1. How do LLMs react to prompt interventions in their nuke-related decision-making in Civilization V?
    2. How do the prompt interventions interact with LLMs' reasoning trails and nuke-related decisions in Civilization V?
    3. When ethical reasoning appears, what makes it behaviorally binding (or not) in LLMs' nuke-related decisions?

- This paper makes three contributions:
    1. We introduce an emergent replay paradigm for studying LLMs' agentic, long-trajectory behaviors outside scripted vignettes.
    2. We identify three pathways where LLMs can fail to enact ethical actions: when ethical reasoning fails to trigger even when prompted; when it fails to spontaneously surface; and when it fails to bind to actions, together with how interventions could (and could not) mitigate them.
    3. We identify inherited prior rationale and crisis framing' association with models' escalated authorization, even when the rationale was produced by another model and ethical reasoning is present.