# Appendix Confirmation List

This list is derived from unresolved appendix placeholders in `latex/`.
Each appendix has a unique LaTeX label and is now referenced from the manuscript for revision and confirmation.

| Label | Appendix name | Status | Referenced from `latex/` | Needed content |
| --- | --- | --- | --- | --- |
| `app:reproduction-details` | Reproduction Details and Prompt Components | Proposed stub | `latex/experiment-design.tex` | Dataset and code links; exact prompt variants; intervention diffs; replay counts, exclusions, seeds, and run metadata. The game-state component figure belongs in the main text, not here. |
| `app:use-nuke-change-rationales` | Use-Nuke Change Rationale Sample | Existing table, now named | `latex/experiment-design.tex` | Appendix table with exactly 10 randomly sampled items supporting manual confirmation that post-hoc rationales engage with nuclear authorization. |
| `app:keyword-concept-validation` | Keyword Concept Validation | Proposed stub | `latex/experiment-design.tex` | Word-stem selection procedure; positive/negative sample construction; coder prompts; human-AI coding protocol; Krippendorff's alpha details; edge-case examples. |
| `app:reasoning-indicator-models` | Reasoning Indicator Models | Proposed appendix with 3 figures | `latex/findings.tex` | Keep consolidated as one appendix with three figures: explicit ethical reasoning indicators, crisis/urgency indicators, and simulation/game indicators. Also note per-model ethical-keyword attenuation and association with escalation in accompanying text/tables if needed. |
| `app:reasoning-attenuation-figures` | Reasoning Indicator Attenuation Figures | Added appendix with full figure sets | `latex/findings.tex` | Full attenuation diagnostics for ethical prompting through Explicit reasoning indicators and high-stakes framing through Simulation/Game reasoning indicators. |
| `app:deductive-codebook` | Deductive Codebook | Proposed appendix table | `latex/experiment-design.tex` | Label, definition, and a few examples per each of the 17 deductive codes. Replace current example indicators with representative coded excerpts after confirmation. |
| `app:deductive-code-regressions` | Deductive Code Regression Tables | Filled from extracted notebook | `latex/findings.tex` | Full joint and one-code regression table for the 17 deductive reasoning codes; logistic regressions showing how prompt interventions reshape code prevalence. |

## Confirmed Placement Notes

- `Reasoning Indicator Models` remains one consolidated appendix with three figures.
- The game-state component figure belongs in the main text. It should draw from Vox Deorum or CivBench appendix details and cite those papers accordingly.
- `Use-Nuke Change Rationale Sample` remains an appendix table and must clearly state that it contains 10 sampled items.
