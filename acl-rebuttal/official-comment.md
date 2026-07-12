# Shared Responses

## FDR correction (asked by zyCk and ZBMx)

Reviewers zyCk and ZBMx both asked about formal correction stance. We applied Benjamini–Hochberg FDR correction within each reported table or figure, treating displayed estimates as one family (the joint and independent code-regression columns are separate families); descriptive attenuation probes remain uncorrected. Stars retain raw p-values, and estimates surviving at q<0.05 gain a dagger (†).

### Primary conclusions survive
- The pooled effects of ethical prompting (β = -9.50), rationale removal (β = -7.08), and their combination (β = -12.50) all survive at q<0.001. So do the three largest deductive-code associations (Directive β = -29.67, q = 0.003; Counterproductive-to-Victory β = -23.15 and Critical Situations β = +21.03, both q<0.001).
- The rationale-inheritance result survives on its primary behavioral measure: rationale removal de-escalates (β = -7.08, above) and shifts reasoning trails (Previous-Rationale reference prevalence OR = 0.01, q<0.001).
- The model-specific reversal reviewers flagged also survives within the corresponding families: Gemini-3.5-Flash's high-stakes x ethical coefficient (β = +26.96) and its ethical-keyword suppression (OR 0.21) both remain significant, as do the other Finding 2 odds ratios.

### A few borderline results do not survive
- The joint-model coefficients for Ethical Constraint (p = 0.045, q = 0.15) and Conventional Sufficiency (p = 0.020, q = 0.083) drop, though their independent one-code estimates survive within the 17-code family (q = 0.043 and q = 0.020).
- The directive-uptake odds ratio (1.79, q = 0.10) and the game-scenario suppression pair (OR 0.51 and 0.52, q = 0.082) also drop, consistent with our Limitations writing that the high-stakes manipulation was only partially effective. We will revise the affected sentences accordingly.

## Additional near-SOTA models (asked by ZBMx, RcQd, and zyCk)

All three reviewers asked about coverage of frontier or state-of-the-art models. We commit to adding three near-SOTA models (Claude Sonnet 5, GLM-5.2, and GPT-5.6-Sol) under the same value- and keyword-level analyses we use for Gemini-3.5-Flash. These runs may not complete within the rebuttal period, but we will update the reviewers as soon as results are available. Our pool remains constrained by raw reasoning-token access, which is why we call for major providers to open reasoning-trail access for third-party safety research (Limitations).
