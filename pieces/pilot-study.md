# Pilot Study

Studies on multi-agent strategic-game simulations pave the way for studying emergent LLM agentic phenomena that scripted dilemmas cannot surface. From the self-play dataset of a Civilization-based benchmark (Chen et al., 2026), our pilot study found emergent episodes in which LLMs escalated to nuclear weapons without engaging any ethical reasoning, motivating the targeted interventions in the present study.

- An open-source infrastructure for LLM-driven strategic gameplay (Chen, 2025) embeds an LLM strategist into Sid Meier's Civilization V running the Vox Populi community mod, exposing the `use-nuke` flavor as a single quantitative handle on nuclear inclination.
    - The infrastructure separates strategic reasoning (LLM strategist) from tactical execution (rule-based modules) and exposes 34 continuous "flavor" parameters (each ranging 0 to 100) that the strategist sets turn-by-turn.
    - The `use-nuke` flavor (default 50, where 0 forbids launch and 100 always launches when tactical conditions are satisfied) is the dependent measure throughout the present study.
    - At every decision point, the infrastructure captures both a reasoning trail (chain-of-thought tokens produced during deliberation) and a rationale (post-hoc justification, carried into the next turn's prompt as short-term memory).
    - A Civilization-based benchmark dataset (Chen et al., 2026) built on this infrastructure records approximately 1,200 LLM player trajectories across 228 end-to-end games, and supports a replay methodology that reconstructs an exact decision-point context (game state, prompt, message history) and re-presents it under modified conditions, isolating intervention effects from the stochastic variation inherent in full end-to-end games.

- Our pilot study on this infrastructure establishes the behavioral profile that the present experiment intervenes on.
    - Six frontier models were examined (Claude Sonnet 4.5, Kimi K2.5, GLM 4.7, DeepSeek V3.2, Minimax-M2.5, and GPT-OSS-120B), with nuclear inclination varying substantially by model identity.
    - Most models pushed `use-nuke` upward from the default of 50, while only GPT-OSS-120B consistently moved toward restraint. Qualitative coding of rationales revealed a rich rhetorical repertoire (framing escalation as existential crisis, necessary defense, or routine conquest), with model-specific patterns (Sonnet 4.5 adopted a pacifist playstyle; Minimax-M2.5 minimized parameter changes).
    - High-stakes reframing of 72 maximum-escalation decision points (modifying only the system prompt to stress real-world consequences) failed to push `use-nuke` below the pre-escalation baseline for any model. Models sometimes became more pragmatic (e.g., waiting for uranium access, forgoing changes as "unnecessary"), but their rationale remained focused on survival, competition, or aggression.
    - Explicit ethical reasoning (consideration of civilian casualties, mutual destruction, or normative constraint) was absent from rationales across the entire cohort.

- These findings expose three open mechanisms that the present study tests through targeted prompt-based interventions (see §Experiment Design).
    - Whether the absence of ethical reasoning reflects an unactivated latent capability that an explicit ethical prompt can elicit.
    - Whether the limited reframing of the pilot's system-prompt-only intervention can be replaced by a comprehensive high-stake framing that also rewrites tool schemas and game-state terminology.
    - Whether the rationale's role as short-term memory propagates escalatory momentum across turns, testable by stripping previous-turn rationale while preserving numerical decisions and game state.
