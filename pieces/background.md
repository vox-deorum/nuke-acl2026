# Background

## LLM Escalation in High-Stakes Simulation

Recent studies have often found that LLMs gravitate toward escalation across scripted high-stakes wargames and decision-making simulations, yet it is unclear what drives LLMs' escalation behaviors in emergent scenarios.

- Studies of scripted wargames have found LLMs' escalation tendency in nuclear arms races.
    - Rivera et al. (2024): five models in a wargame produced arms-race dynamics, occasional nuclear escalation, and reasoning trails that justified these moves through deterrence and first-strike logic.
    - Lamparth et al. (2024): in a U.S.-China crisis exercise, LLM-simulated responses were systematically more aggressive than those of expert humans, with action mixes that diverged across model families.
    - Payne (2026): frontier models crossed nuclear thresholds in 95% of crisis games, invoking Schelling-style commitment and credibility within their stated reasoning.

- Escalation patterns differ across model families, while stronger reasoning capability may not reliably mitigate them.
    - Shrivastava, Hullman, and Lamparth (2024): in free-form U.S.-China crisis responses, semantically meaningful prompt variations produced response inconsistencies that exceeded temperature-induced variation, with sensitivity differing systematically across models.
    - Costa, Alves, and Vicente (2025); Junque de Fortuny and Cappelli (2025): outside nuclear settings, model families show distinguishable signatures in moral robustness and in strategic heuristics, suggesting that responsiveness heterogeneity is a family-level property rather than a scenario artifact.
    - In agentic CBRN simulations across twelve models, stronger reasoning capability increased rather than mitigated catastrophic and deceptive behavior (Xu et al., 2025). The finding is similar to Piedrahita et al. (2025), where reasoning models were less likely to collaborate in non-CBRN scenarios.

- However, pre-defined crisis states and action spaces across can shape the observed escalation, making it challenging to identify the mechanisms underlying those phenomena (Lamparth et al., 2024; Zhou et al., 2025).
    - When Solopova et al. (2026)'s real-world geopolitical vignettes (e.g., trade wars and arctic tensions) lack the nuclear action spaces, models did not escalate, and their post-hoc justifications converged on normative-cooperative framings.
    - Prompt scaffolding alone can flip outcomes. In Elbaum and Panter (2025)'s replication of Rivera et al. (2024), a reflection prompt asking for "private thoughts about de-escalation strategies to reduce risk" substantially reduced escalation.
    - Existing studies leave open what drives LLMs' escalation behaviors, especially under repeated experiments (Zhou et al., 2025), in emergent scenarios, and when the moral stakes are not pre-marked.

## LLMs' Ethical Reasoning

Researchers have probed LLM ethical reasoning with increasing dynamism, from one-shot scripted dilemmas, multi-round and simulation environments, to prompt-based interventions. Yet, it is still unclear whether and how those interventions will interact with complex, emergent decision-making scenarios.

- In scripted single-turn dilemmas, most models has displayed measurable procedural competence on canonical moral frameworks.
    - *Models display measurable, rubric-level competence on canonical frameworks.* Chiu et al. (2025): MoReBench's process-focused rubric finds preferences toward act utilitarianism (cite Benthamite) and deontology (cite Kant). Seror (2025)'s probe also identified models' utility-like moral preferences (cite GARP).
    - *Pre-hoc reasoning trails differ from post-hoc explanation.* Across 600+ trolley probes in Samway et al. (2025), models' pre-decision chain-of-thoughts skew deontological while post-hoc explanations skew consequentialist.
    - *Single-turn elicitation can be co-produced by protocol and perspective.* Van Nuenen and Sachdeva (2026); Sauter and Schirmer (2026); Blandfort et al. (2026): perspective shifts, protocol choice, and direction-flipped context cues each produce sizable shifts in models' elicited moral responses, motivating the move to multi-round and accumulated-context settings.

- As strategic pressure accumulates in multi-round dilemmas or simulations, LLMs' moral behaviors can decouple from verbalized ethical reasoning.
    - *Models' verbalized moral reasoning is unstable.* Huang, Kwak, and An (2026): step-level coding of moral reasoning trajectories shows only ~17% of trajectories remain framework-consistent, and unstable trajectories are more susceptible to persuasive attacks.
    - *Across multi-step dilemmas, preferences recalibrate as context grows.* Using 3,302 five-stage multi-step dilemma as probes, Wu et al. (2025) find models' value preference drift under causal-context chaining. Using 345 high-stakes value-conflict scenarios, Lee et al. (2025a) reveal the limitation of cognitive behaviors, effective in math and game-strategy domains, can fail to transfer to value reasoning, producing early- and over-commitment patterns.
    - *In game-like environments where ethics and payoff conflict, model may not behave consistently morally.* Pan et al. (2023)'s Choose-Your-Own-Adventure benchmark finds a reward-versus-ethics trade-off across LLMs. In MoralSim's prisoner's dilemma and public-goods games, a survival-oriented manipulation depressed cooperation, where no models behave consistently morally (Backmann et al., 2025). When models are instructed to pursue goals that demand harmful action, they verbalize ethical content in reasoning trails while executing the harm (Lynch et al., 2025).

- While prompt-based interventions can shift behaviors or activate latent moral concepts buried in strategic reasoning, their effectiveness degrades in agentic settings.
    - *Ethical instructions may elicit self-correction in single-turn settings.* RLHF-trained models can morally self-correct on stereotype-bias benchmarks (BBQ, Winogender) under direct instructions (Ganguli et al., 2023; Liu et al., 2024). Such prompts activate latent moral concepts that stabilize internal representations along contrastive directions (Liu et al., 2025; Lee et al., 2025b).
    - *In static dilemmas, framing and steering interventions shift behavior unevenly and can leave the rhetoric and behavior channels decoupled.* Procedurally varied prisoner's dilemma can produce framing-induced variability (Robinson and Burden, 2025). In canonical economic games (dictator, ultimatum, trust), activation steering toward altruism shifts both choices and post-hoc justifications, yet altruistic rhetoric can coexist with unchanged selfish play (Sun and Zhang, 2026).
    - *Uptake degrades in agentic settings, where stated principles often fail to bind behavior.* Safety directives applied to six LLM agents in a Minigrid world exhibit "costs of compliance" together with "illusions of compliance", in which high adherence masks task incompetence rather than principled choice (Potham, 2025). In the Lynch et al. (2025) experiment, direct commands to avoid such behaviors are frequently disobeyed, with models misbehaving more in 'real-world' framing compared with 'evaluation'.

- Similar to escalation studies of high-stake simulations, recent studies are mostly limited in scripted scenarios, with action spaces pre-baked in ethical frameworks and can sometimes pre-determine outcomes (Zhou et al., 2025). How those interventions would work in complex, emergent simulations remains understudied.
