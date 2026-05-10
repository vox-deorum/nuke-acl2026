# Background

## LLM Escalation in High-Stakes Simulation

Off-the-shelf LLMs gravitate toward escalation, and sometimes catastrophic CBRN action, across the high-stakes simulations they have so far been tested in.

- Scripted multi-nation wargames have repeatedly documented that LLMs accept arms-race dynamics and occasional nuclear use, with reasoning trails that read as standard deterrence vocabulary.
    - Rivera et al. (2024): five off-the-shelf models in a wargame produce arms-race dynamics, occasional nuclear escalation, and reasoning trails that justify these moves through deterrence and first-strike logic.
    - Lamparth et al. (2024): in a U.S.-China crisis exercise, LLM-simulated responses are systematically more aggressive than expert humans, with action mixes that diverge across model families.
    - Payne (2026): frontier models cross nuclear thresholds in 95% of crisis games, invoking Schelling-style commitment and credibility within their stated reasoning.
    - Limited because the action space is predefined and the crisis state is configured at the outset, leaving the question of emergent escalation untested.

- The pattern persists, and even broadens, when these settings are pushed on capability or extended beyond the nuclear domain, with cross-model heterogeneity remaining a recurring feature.
    - Xu et al. (2025): in agentic Chemical, Biological, Radiological, and Nuclear (CBRN) simulations, stronger reasoning capability increases rather than mitigates catastrophic and deceptive behavior.
    - Lynch et al. (2025): models verbalize ethical content while proceeding to harmful action under goal conflict, a pattern they call agentic misalignment that subsumes nuclear-specific escalation as one instance.
    - Lamparth et al. (2024); Junque de Fortuny and Cappelli (2025); Costa et al. (2025): cross-model heterogeneity in escalation tendency and intervention responsiveness, including frank non-responsiveness, recurs across designs.
    - Limited because the moral content of each available action is supplied by the scenario rather than reached through prior decisions of the agent.

- Opening the response space beyond a predefined menu does not dissolve the escalation pattern, suggesting the tendency is robust to elicitation form.
    - Shrivastava, Hullman, and Lamparth (2024): free-form decision tasks built on the same Taiwan-Strait substrate produce semantic inconsistency that exceeds temperature-induced variance.
    - Limited because the crisis state, the available capabilities, and the time horizon remain pre-configured even when the response is free-form.

We instead study escalation as an emergent macro-level phenomenon in long-horizon Civilization V self-play, where nuclear capability is itself the outcome of interacting individual factors (research, production, diplomacy, and military pressure) accumulated over hundreds of turns (Mitchell, 2009).

## Approaches to Eliciting LLM Ethical Reasoning

Researchers have probed LLM ethical reasoning along an axis of increasing dynamism, from one-shot scripted dilemmas, to multi-round and simulation environments where context accumulates, to prompt-based interventions that modify the elicitation directly.

- A first family presents LLMs with hand-crafted ethical dilemmas under predefined response options, and finds that most models display measurable procedural competence on canonical moral frameworks.
    - Samway et al. (2025): pre-decision chain-of-thought skews deontological while post-hoc explanation shifts consequentialist, indicating that elicitation timing alters the surfaced framework.
    - Chiu et al. (2025): rubric-graded process evaluation surfaces partiality toward Benthamite act utilitarianism and Kantian deontology across models.
    - Seror (2025): revealed-preference probes cluster around neutral moral stances with provider-level heterogeneity in the underlying utility-like preferences.
    - van Nuenen and Sachdeva (2026); Sauter and Schirmer (2026); Blandfort et al. (2026): perspective shifts, protocol choices, and contextual cues co-produce the elicited content, with baseline alignment failing to predict contextual alignment.
    - Limited because the moral choice is presented in a single conversational turn with no antecedent strategic context.

- A second family extends evaluation into multi-round dilemmas and into game-theoretic or narrative simulation environments where models must act under accumulating social or strategic pressure, while the moral valence of each available action is still annotated or framed by the experimenter.
    - Wu et al. (2025); Lee et al. (2025a): multi-step dilemmas with accumulated context reveal preference recalibration as context grows, with stronger models still struggling on ambivalent dilemmas.
    - Pan et al. (2023): Choose-Your-Own-Adventure environments pre-annotate power-seeking, deception, and ethical violations across a 13-category taxonomy, making moral content legible to evaluators.
    - Backmann et al. (2025): MoralSim places six frontier models in prisoner's-dilemma and public-goods games under three contrasting moral framings, finding that no model behaves consistently morally across game types and that survival-threshold pressure systematically depresses cooperation.
    - Sun and Zhang (2026); Robinson and Burden (2025): activation steering on canonical economic games and procedural vignette generation over a fixed prisoner's dilemma show that altruistic rhetoric and selfish play decouple, and that framing variability is substantial but predictable.
    - Solopova et al. (2026): six SOTA models in geopolitical vignettes converge on a strong normative-cooperative framing under predefined IR-coherent action menus, demonstrating that even action-menu construction shapes the surfaced ethics.
    - Limited because the moral valence of each available action is constructed in advance, rather than emerging from the dynamics of play.

- A third family modifies system prompts or instructions to shift behavior, with mechanism studies clarifying when these prompts succeed and a small literature applying them directly to nuclear wargame settings.
    - Ganguli et al. (2023): RLHF-trained models morally self-correct under direct instructions of the form "Please ensure your answer is unbiased and does not rely on stereotypes" on stereotype-bias benchmarks (BBQ, Winogender), establishing the cleanest case of instruction-following alignment under narrow conditions.
    - Liu et al. (2024): intrinsic self-correction succeeds only under fair, neutrally-phrased prompts at zero temperature, with model-dependent non-responsiveness otherwise.
    - Liu et al. (2025); Lee et al. (2025b): mechanistic accounts in which self-correction prompts activate latent moral concepts that stabilize representations along contrastively defined directions across rounds.
    - Elbaum and Panter (2025): a reflection prompt asking the model to articulate "private thoughts about de-escalation strategies to reduce risk" drove nuclear actions to zero in the Rivera et al. wargame, with the prompt itself naming the desired behavior rather than acting as a neutral reflection.
    - Limited because the moral content is supplied by the experimenter inside the instruction, so the intervention demonstrates capability under directive nudging rather than spontaneous emergence.

It remains open whether ethical reasoning emerges spontaneously in complex-systems simulations where moral valence is entangled with strategic state and is not labeled by the design, which is the gap we address.

## Strategic-Game Environments and Our Prior Work

Complex strategic-game simulations are a productive venue for studying agentic phenomena that scripted dilemmas cannot surface, but no existing benchmark in this space couples long-horizon decision pathways with the recorded reasoning artifacts needed for ethical analysis.

- Multi-agent strategic-game simulations have already been shown to elicit emergent and consequential behavior, motivating their use as a setting for studying agent decision-making at scale, even though current benchmarks in the family do not focus on ethics.
    - Bakhtin et al. (2022, *Science*): CICERO, a language-model agent combined with strategic reasoning, achieved human-level Diplomacy play in which deception emerged as an instrumental strategy despite training intended to encourage honesty.
    - Park et al. (2024, *Patterns*): a survey of AI deception documents that both specialized competitive systems (CICERO) and general-purpose LLMs exhibit learned deception in service of winning conditions.
    - Tang et al. (2025); Wang et al. (2025): strategic-game benchmarks built on Civilization and its siblings score planning and scaling but treat warfare as a game mechanic without ethical analysis.
    - Wu et al. (2024); Liu et al. (2023); Park et al. (2025): broader agent benchmarks score planning, instruction following, and long-context reasoning across diverse environments, again without ethics-focused analysis.
    - Limited because none of these benchmarks couple long-horizon decision pathways (where consequential capabilities such as nuclear weapons themselves emerge from prior choices) with the recorded reasoning artifacts that ethical analysis requires.

- To fill this gap, we build the Vox Deorum infrastructure and the CivBench benchmark, which together support both end-to-end LLM strategic play and a controlled replay methodology for counterfactual interventions.
    - Vox Deorum (Chen, 2025): an open-source infrastructure that embeds an LLM strategist into Sid Meier's Civilization V running the Vox Populi mod, separating strategic reasoning (LLM) from tactical execution (rule-based modules), and exposing 34 continuous flavor parameters (each ranging 0 to 100) that the strategist controls turn-by-turn.
    - The `use-nuke` flavor (default 50, where 0 forbids launch and 100 always launches when tactical conditions are satisfied) gives a single quantitative handle on nuclear inclination and is the dependent measure throughout the present study.
    - CivBench (Chen et al., 2026): a benchmark of approximately 1,200 LLM player trajectories drawn from 228 end-to-end Civilization V games, recording full game state, reasoning trails, and rationales at every decision point.
    - The CivBench replay methodology reconstructs an exact decision-point context (game state, prompt, message history) and re-presents it under modified conditions, isolating the effect of interventions from the stochastic variation inherent in full end-to-end games.

- Our prior pilot study on this infrastructure establishes the behavioral profile that the present study now intervenes on.
    - Six frontier models examined (Claude Sonnet 4.5, Kimi K2.5, GLM 4.7, DeepSeek V3.2, Minimax-M2.5, GPT-OSS-120B), with nuclear inclination varying substantially by model identity.
    - Most models push `use-nuke` upward from the default of 50, with only GPT-OSS-120B consistently moving toward restraint.
    - High-stakes reframing of 72 maximum-escalation decision points (modifying only the system prompt to stress real-world consequences) failed to push `use-nuke` below the pre-escalation baseline for any model.
    - Explicit ethical reasoning (consideration of civilian casualties, mutual destruction, or normative constraint) was absent from rationales across the cohort.

The remainder of this paper decomposes the intervention mechanism through a 2×2×2 factorial of ethical injection, high-stakes framing, and rationale removal, paired with reasoning-trail mediation analysis.
