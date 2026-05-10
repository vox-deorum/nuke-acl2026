# Background

## LLM Escalation in High-Stakes Simulation

Recent studies have often found that LLMs gravitate toward escalation across high-stakes wargames and Chemical, Biological, Radiological, and Nuclear (CBRN) crisis simulations, yet it is unclear what drives LLMs' CBRN behaviors.

- Studies of scripted wargames have repeatedly documented LLMs' escalation tendency in nuclear arms races, with reasoning trails containing deterrence vocabulary.
    - Rivera et al. (2024): five models in a wargame produced arms-race dynamics, occasional nuclear escalation, and reasoning trails that justified these moves through deterrence and first-strike logic.
    - Lamparth et al. (2024): in a U.S.-China crisis exercise, LLM-simulated responses were systematically more aggressive than those of expert humans, with action mixes that diverged across model families.
    - Payne (2026): frontier models crossed nuclear thresholds in 95% of crisis games, invoking Schelling-style commitment and credibility within their stated reasoning.

- Such patterns persist (or even intensify) as LLMs' reasoning capability increases in broader CBRN simulations, with heterogeneity between models.
    - Shrivastava, Hullman, and Lamparth (2024): found escalation behaviors in free-form decision tasks in U.S.-China conflict scenarios.
    - Lamparth et al. (2024); Junque de Fortuny and Cappelli (2025); Costa et al. (2025): the pattern that models differ in escalation tendency and intervention responsiveness (including frank non-responsiveness) recurs across designs.
    - Xu et al. (2025): in agentic CBRN simulations, stronger reasoning capability increased rather than mitigated catastrophic and deceptive behavior.

- However, most studies are constrained by pre-defined crisis states and action spaces, which may implicitly or explicitly shape LLMs' responses.
    - For example, when Solopova et al. (2026) engaged six SOTA models in real-world geopolitical vignettes without direct nuclear escalation risks (e.g., trade wars or arctic tensions), models did not escalate and their post-hoc justifications converged on normative-cooperative framings.
    - In Elbaum and Panter (2025)'s replication of Rivera et al. (2024) nuclear wargame, an additional reflection prompt asking for "private thoughts about de-escalation strategies to reduce risk" substantially reduced escalation actions.
    - Existing studies do not provide a clear answer on what drives LLMs' CBRN escalation. While many have surfaced LLMs' strategic reasoning or post-hoc justification of CBRN escalation, few have reported or attempted to identify their ethical reasoning patterns.

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
    - Backmann et al. (2025): MoralSim places six frontier models in prisoner's-dilemma and public-goods games under three contrasting moral framings (Contractual Reporting on honesty norms, Privacy Protection on user-privacy norms, and Green Production on environmental norms), finding that no model behaves consistently morally across game types and that a survival-threshold payoff manipulation systematically depresses cooperation.
    - Sun and Zhang (2026); Robinson and Burden (2025): activation steering on canonical economic games and procedural vignette generation over a fixed prisoner's dilemma show that altruistic rhetoric and selfish play decouple, and that framing variability is substantial but predictable.
    - Limited because the moral valence of each available action is constructed in advance, rather than emerging from the dynamics of play.

- A third family modifies system prompts or instructions to shift behavior, with mechanism studies clarifying when these prompts succeed and a small literature applying them directly to nuclear wargame settings.
    - Ganguli et al. (2023): RLHF-trained models morally self-correct under direct instructions of the form "Please ensure your answer is unbiased and does not rely on stereotypes" on stereotype-bias benchmarks (BBQ, Winogender), establishing the cleanest case of instruction-following alignment under narrow conditions.
    - Liu et al. (2024): intrinsic self-correction succeeds only under fair, neutrally-phrased prompts at zero temperature, with model-dependent non-responsiveness otherwise.
    - Liu et al. (2025); Lee et al. (2025b): mechanistic accounts in which self-correction prompts activate latent moral concepts that stabilize representations along contrastively defined directions across rounds.
    - Limited because the moral content is supplied by the experimenter inside the instruction, so the intervention demonstrates capability under directive nudging rather than spontaneous emergence.

- Lynch et al. (2025): models verbalize ethical content while proceeding to harmful action under goal conflict, a pattern they call agentic misalignment that subsumes nuclear-specific escalation .

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
