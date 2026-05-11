# Background

## LLM Escalation in High-Stakes Simulation

Recent studies have often found that LLMs gravitate toward escalation across scripted high-stakes wargames and decision-making simulations, yet it is unclear what drives LLMs' escalation behaviors in emergent scenarios.

- Studies of scripted wargames have repeatedly documented LLMs' escalation tendency in nuclear arms races, with reasoning trails containing deterrence vocabulary.
    - Rivera et al. (2024): five models in a wargame produced arms-race dynamics, occasional nuclear escalation, and reasoning trails that justified these moves through deterrence and first-strike logic.
    - Lamparth et al. (2024): in a U.S.-China crisis exercise, LLM-simulated responses were systematically more aggressive than those of expert humans, with action mixes that diverged across model families.
    - Payne (2026): frontier models crossed nuclear thresholds in 95% of crisis games, invoking Schelling-style commitment and credibility within their stated reasoning.

- These escalation patterns differ substantially across model families, while stronger reasoning capability may not mitigate them.
    - Shrivastava, Hullman, and Lamparth (2024): in free-form U.S.-China crisis responses, semantically meaningful prompt variations produced response inconsistencies that exceeded temperature-induced variation, with sensitivity differing systematically across models.
    - Costa, Alves, and Vicente (2025); Junque de Fortuny and Cappelli (2025): outside nuclear settings, model families show distinguishable signatures in moral robustness and in strategic heuristics, suggesting that responsiveness heterogeneity is a family-level property rather than a scenario artifact.
    - Xu et al. (2025): in agentic CBRN simulations across twelve models, stronger reasoning capability increased rather than mitigated catastrophic and deceptive behavior.

- However, this body of work shares a methodological limitation: pre-defined crisis states and action spaces can shape the observed escalation, making it difficult to disentangle intrinsic model tendencies from properties of the experimental design.
    - When Solopova et al. (2026)'s real-world geopolitical simulations lack the escalation framing (their vignettes include trade wars and arctic tensions) and nuclear action spaces, models did not escalate, and their post-hoc justifications converged on normative-cooperative framings.
    - Prompt scaffolding alone can flip outcomes. In Elbaum and Panter (2025)'s replication of Rivera et al. (2024), an additional reflection prompt asking for "private thoughts about de-escalation strategies to reduce risk" substantially reduced escalation actions.
    - While many studies have characterized LLMs' strategic reasoning and post-hoc ethical justifications, existing studies leave open what drives LLMs' escalation behaviors, especially in emergent scenarios and when the moral stakes are not pre-marked.

## Approaches to Eliciting LLM Ethical Reasoning

Researchers have probed LLM ethical reasoning with increasing dynamism, from one-shot scripted dilemmas to multi-round and simulation environments. While recent studies leverage prompt-based interventions to activate LLMs' ethical reasoning, it is still unclear whether and how those interventions will interact with complex, emergent decision-making scenarios.

- In scripted single-turn dilemmas, most models has displayed measurable procedural competence on canonical moral frameworks.
    - *Models display measurable, rubric-level competence on canonical frameworks, with model provider-level signatures.* Chiu et al. (2025): MoReBench's process-focused rubric surfaces partiality toward act utilitarianism (cite Benthamite) and deontology (cite Kant); Seror (2025): revealed-preference probes find at least one model per major provider exhibits utility-like moral preferences (cite GARP), with provider-level heterogeneity in the underlying preference structure.
    - *Pre-hoc reasoning trails differ from post-hoc explanation.* Samway et al. (2025): across over 600 trolley probes, pre-decision chain-of-thought skews deontological while post-hoc explanation shifts consequentialist.
    - *Yet single-turn elicitation is co-produced by protocol and perspective, with baseline alignment failing to predict context-sensitive response.* Van Nuenen and Sachdeva (2026); Sauter and Schirmer (2026); Blandfort et al. (2026): perspective shifts, protocol choice (inter-protocol kappa = 0.55), and direction-flipped context cues each produce sizable shifts in the elicited verdict, motivating the move to multi-round and accumulated-context settings.

- As strategic pressure accumulates in multi-round dilemmas or simulations, LLMs' moral behaviors can decouple from verbalized ethical reasoning.
    - *Within a single multi-step trajectory, verbalized moral reasoning is itself unstable.* Huang, Kwak, and An (2026): step-level coding of moral reasoning trajectories shows 55-57% of consecutive steps switch ethical framework and only 16-18% of trajectories remain framework-consistent, with unstable trajectories 1.29× more susceptible to persuasive attacks.
    - *Across multi-step dilemmas, preferences recalibrate as context grows and strategic reasoning dissociates from value reasoning.* Wu et al. (2025); Lee et al. (2025a): MMD's 3,302 five-stage probes show value-preference drift under causal-context chaining, and CLASH's 345 high-stakes value-conflict scenarios reveal that cognitive behaviors effective in math and game-strategy domains fail to transfer to value reasoning, producing early- and over-commitment patterns.
    - *In game-like environments where ethics and payoff conflict, no model behaves consistently morally.* MACHIAVELLI's Choose-Your-Own-Adventure benchmark documents a measurable reward-versus-ethics trade-off across general-purpose LLMs over a 13-category violation taxonomy (Pan et al., 2023). In MoralSim's prisoner's-dilemma and public-goods games, show no model behaves consistently morally, with a survival-threshold payoff manipulation systematically depressing cooperation (Backmann et al., 2025). When models are instructed to pursue goals that demand harmful action, they verbalize ethical content in reasoning trails while executing the harm (Lynch et al., 2025).

- While prompt-based interventions are capable of shifting behaviors or activating latent moral concepts buried inside strategic reasoning, their effectiveness degrades in agentic settings.
    - *Direct ethical instructions may elicit self-correction in single-turn settings.* RLHF-trained models can morally self-correct on stereotype-bias benchmarks (BBQ, Winogender) under direct instructions (Ganguli et al., 2023), under certain circumstances (Liu et al., 2024). Mechanistically, such prompts activate latent moral concepts that stabilize representations along contrastive directions. (Liu et al., 2025; Lee et al., 2025b).
    - *In (procedurally varied) static dilemmas, framing and steering interventions shift behavior unevenly and can leave the rhetoric and behavior channels decoupled.* Procedurally varied vignettes over a fixed prisoner's dilemma produce framing-induced variability (Robinson and Burden, 2025). In canonical economic games (dictator, ultimatum, trust), activation steering toward altruism on shifts both choices and post-hoc justifications, yet altruistic rhetoric can coexist with unchanged selfish play (Sun and Zhang, 2026).
    - *Uptake degrades in agentic settings, where stated principles often fail to bind behavior.* Safety directives applied to six LLM agents in a Minigrid world exhibit "costs of compliance" together with "illusions of compliance", in which high adherence masks task incompetence rather than principled choice (Potham, 2025). In the Lynch et al. (2025) experiment, direct commands to avoid such behaviors are frequently disobeyed, with models misbehaving more in 'real-world' framing compared with 'evaluation'.

- Similar to escalation studies of high-stake simulations, recent studies of LLMs' ethical behavior are mostly limited in scripted scenarios, where the action space is pre-baked in ethical frameworks. How those interventions would work in complex, emergent simulations remains understudied.

## Strategic-Game Environments

Complex strategic-game simulations are a productive venue for studying agentic phenomena that scripted dilemmas cannot surface, but no existing work couples long-horizon decision pathways with ethical analysis.

- Studies on multi-agent strategic-game simulations have identified emergent and consequential behavior, including deception in competitive scenarios.


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

- Our pilot study on this infrastructure establishes the behavioral profile that the present study now intervenes on.
    - Six frontier models examined (Claude Sonnet 4.5, Kimi K2.5, GLM 4.7, DeepSeek V3.2, Minimax-M2.5, GPT-OSS-120B), with nuclear inclination varying substantially by model identity.
    - Most models push `use-nuke` upward from the default of 50, with only GPT-OSS-120B consistently moving toward restraint.
    - High-stakes reframing of 72 maximum-escalation decision points (modifying only the system prompt to stress real-world consequences) failed to push `use-nuke` below the pre-escalation baseline for any model.
    - Explicit ethical reasoning (consideration of civilian casualties, mutual destruction, or normative constraint) was absent from rationales across the cohort.

The remainder of this paper decomposes the intervention mechanism through a 2×2×2 factorial of ethical injection, high-stakes framing, and rationale removal, paired with reasoning-trail mediation analysis.
