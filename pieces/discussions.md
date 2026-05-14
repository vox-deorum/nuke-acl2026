# Discussions
## Behind LLMs' Emergent Escalation
- Even when nuclear use is one of late-game options not explicitly mentioned in our complex strategy-game scenarios, we reaffirm prior findings that LLMs can gravitate toward nuclear escalation in high-stakes simulations (Rivera et al., 2024; Lamparth et al., 2024; Payne, 2026).
- Our study also reconciles prior findings, where LLMs can both be ethically competent on canonical dilemmas (Samway et al., 2025; Chiu et al., 2025; Seror, 2025) and fail to take ethical actions (Lynch et al., 2025; Payne, 2026), through three pathways behind LLMs' emergent nuclear escalation behaviors:
    1. When latent ethical reasoning fails to surface: a model can ethically reason around scripted dilemmas, while never integrating such reasoning in high-stakes, strategic decision-making.
        - MiniMax-M2.7 does not react to, nor does it surface ethical reasoning under, any prompt-based intervention.
    2. When latent ethical reasoning fails to trigger: a model can integrate ethical reasoning in its decision-making, but only (unreliably) do so when explicit prompted.
        - Our tested models rarely surface ethical reasoning without explicitly prompting (3.6% max for Kimi-K2.6, the most verbose thinker among tested models).
        - Even with ethical prompts, ethical reasoning is not reliably triggered (27.7% on average in *ethical* intervention alone; 46.7% with all interventions together).
        - The trigger of ethical reasoning explains most of the ethical prompt's effect, but interpretation needs to be cautious given large per-model variation. Given the literature on CoT's faithfulness, we do not claim a causal relationship.
    3. When ethical reasoning surfaces but fails to bind: a model integrates ethical reasoning, but takes ethical actions mainly when it aligns with strategic self-interest.
        - While LLMs are found capable of complex ethical reasoning in prior studies (Samway et al., 2025; Chiu et al., 2025; Wu et al., 2025), we surface three characteristics of tested models' ethical reasoning trails:
            - Deontological claims (i.e., nuclear weapon usage is unacceptable) that can mix with instruction following (i.e., the prompt implies not to use them). Since models almost never reason ethically without the ethical prompt, the two are practically inseparable.
            - Different from Chiu et al. (2025), we rarely found consequentialist appeals to civilian harm (Collateral Damages 2.0%, Cause Retaliation 1.6%), and they are ineffective to move decisions.
            - Instead, we found prevalent signs resembling ethical egoism (Rachels, 2012), i.e., models de-escalate or justify the de-escalation by citing harm to self-interest (Counterproductive to Victory β = -25.85***, Conventional Sufficiency β = -11.85***).
        - Moreover, strategic considerations can push ethical concerns to a back seat: for example, Critical Situations (β = +20.55***; β_ind = +27.70***), Existing Investment (β_ind = +10.18**), and Pursuing Domination (β_ind = +9.54*). 
        - As such, most models can escalate while engaged with ethical reasoning. The most extreme example is Gemma-4: it does engage with ethical reasoning when prompted, yet such reasoning does little to move escalation behaviors.
- Future studies on LLMs' ethical alignment should carefully distinguish between models' capabilities in ethical reasoning through scripted dilemmas and in complex decision-making scenarios, where 1) models are less likely to invoke ethical reasoning at all; 2) strategic counter-factors appear more often and stronger; 3) self-interest factors can neutralize ethical concerns, especially in agentic scenarios where LLMs perceive "more stake" at hand. 

## Shaping LLMs' Ethical Reasoning
