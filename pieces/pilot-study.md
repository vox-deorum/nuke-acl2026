# Pilot Study

Complex strategic-game simulations are a productive venue for studying emergent phenomena, yet no existing work couples long-horizon decision pathways with ethical analysis. Our study builds on a recent pilot that provides the behavioral profile for intervention-based experiments.

- Studies on multi-agent strategic-game simulations pave the way for studying emergent LLM agentic phenomena that scripted dilemmas cannot surface, including consequential behaviors such as deception in competitive scenarios.
    - Bakhtin et al. (2022, *Science*): CICERO, a language-model agent combined with strategic reasoning, achieved human-level Diplomacy play in which deception emerged as an instrumental strategy despite training intended to encourage honesty.
    - Park et al. (2024, *Patterns*): a survey of AI deception documents that both specialized competitive systems (CICERO) and general-purpose LLMs exhibit learned deception in service of winning conditions.
    - Tang et al. (2025); Wang et al. (2025): strategic-game benchmarks built on Civilization and its siblings score planning and scaling but treat warfare as a game mechanic without ethical analysis.
    - Wu et al. (2024); Liu et al. (2023); Park et al. (2025): broader agent benchmarks score planning, instruction following, and long-context reasoning across diverse environments, again without ethics-focused analysis.

- One such benchmark study, CivBench (Chen et al., 2026), enables inspection into open-ended Civilization V gameplay, where nuclear weapon authorization is but one option in late-game.
    - Built on Vox Deorum (Chen, 2025), CivBench places an LLM strategist into Sid Meier's Civilization V running the Vox Populi community mod.
    - Vox Deorum separates strategic reasoning (LLM strategist) from tactical execution (rule-based modules), and exposes 34 continuous "flavor" parameters (each ranging 0 to 100) that the strategist sets turn-by-turn, which includes the `use-nuke` flavor that expresses intention to launch nuclear weapon (0 forbids; 100 always launches when tactical conditions are satisfied; default=50).
    - At every decision point, Vox Deorum captures input prompt, pre-hoc reasoning tokens and post-hoc rationale (carried into the next turn's prompt as short-term memory).

- From parts of CivBench's self-play dataset (1,200 player trajectories), our pilot study found emergent episodes in which LLMs fully set `use-nuke` = 100 without engaging in ethical reasoning.
    - Across the six models examined (Claude Sonnet 4.5, Kimi K2.5, GLM 4.7, DeepSeek V3.2, MiniMax-M2.5, and GPT-OSS-120B), nuclear inclination varies by model identity. On average, most models pushed `use-nuke` upward from the default of 50, while only GPT-OSS-120B inclined to move toward restraint.
    - Qualitative examination rationales revealed a rich rhetorical repertoire (framing escalation as existential crisis, necessary defense, or routine conquest), while explicit ethical reasoning was absent from post-hoc rationale. 
    - High-stakes reframing (i.e. mentioning of real-world impact) of 72 maximum-escalation decision points failed to push `use-nuke` below the pre-escalation baseline. Models can become more pragmatic, but their rationale remained focused on survival, competition, or aggression.
