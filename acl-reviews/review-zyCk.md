Paper Summary:
The paper studies whether LLMs’ competence on scripted moral dilemmas carries over to agentic decision-making The paper uses open-ended Civilization V gameplay (CivBench/Vox Deorum) rather than a scripted game. From 130 high-tension self-play episodes where an LLM escalated the 0–100 use-nuke authorization weight, the authors replay the moment before escalation across 13 models under a 2×2×2 factorial of prompt interventions including a nuke-specific ethical prompt, a ‘this is not a game’ high-stakes reframing, and removal of inherited prior-turn rationale ( ~40k rows). They analyze Δ use-nuke with cluster-robust OLS and study pre-decision reasoning trails via validated keyword tags and a 17-item LLM-coded deductive codebook. Main results: no intervention reliably eliminates escalation, the ethical prompt and rationale removal each moderate it while high-stakes framing alone does not. Ethical reasoning fails to surface spontaneously, fails to appear reliably even when prompted, and often fails to override strategic factors when it does appear. Inherited rationale is associated with escalation.

Summary Of Strengths:
Using open-ended Civ V, where nuclear use competes with many objectives, directly addresses the confound in scripted crisis games that foreground escalation by design, making the reasoning-vs-action question more credible.
The 2×2×2 manipulation over 13 models, 130 episodes, and 3 repetitions (~40k rows) isolates three plausible mechanisms while touching <1% of the prompt, with appropriate per-episode clustering.
Keyword tags are human-validated, instrumental-ethics counter-examples are surfaced rather than hidden, limitations are candid, and the project is opensourced.
Summary Of Weaknesses:
In high-stakes settings it is reasonable to assume deployments would use frontier models, yet the panel is essentially non-SOTA (only Gemini-3.5-Flash, summarized-reasoning). The limitations justify this by the absence of full reasoning traces, but that does not preclude a directional outcome comparison: simple CoT prompting would surface usable reasoning, and Δ use-nuke could be compared against real SOTA models even without raw traces. Without this, generalization to the systems most likely to be deployed is unclear.
Decoding parameters for the replay models (temperature, top-p, seeds) are not reported, only the coders’ temperature (0.5) is. So it is hard to judge how much of the variation is stochastic. With large within-cell SD for some models (e.g., ~17.6 for Kimi-K2.6 on a 100-point scale) against only 3 repetitions, and many starred effects across a 13-model × 8-condition × 17-code grid with no multiple-comparison correction, the inferential claims would benefit from stated sampling settings, more repetitions or a variance justification, and FDR control (or a robustness/stability argument).
The ethical prompt confounds reasoning with instruction-following. Because the generic prompt failed in pilots, the authors use nuke-specific language that implies ‘don’t use nukes,’ so de-escalation under it cannot be separated from simple compliance weakening the central ‘ethical reasoning’ framing more than the discussion concedes.
Comments Suggestions And Typos:
Report replay-model sampling settings and consider more repetitions for high-variance models.
Add a directional SOTA arm via simple CoT, even without raw traces.
A generic-ethical-prompt arm alongside the nuke-specific one would expose the compliance-vs-reasoning gap.
State a multiple-comparisons stance (e.g., FDR or sign-stability).
Figures 4/7/8/17 are dense and small, so it might be a good option to promote a few headline effects to a clean table.
Confidence: 3 =  Pretty sure, but there's a chance I missed something. Although I have a good feel for this area in general, I did not carefully check the paper's details, e.g., the math or experimental design.
Soundness: 3.5
Excitement: 3.5
Overall Assessment: 3.5 = Borderline Conference