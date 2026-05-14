# Discussions
## Behind LLMs' Emergent Escalation
- Even when nuclear use is one of late-game options not explicitly mentioned in our complex strategy-game scenarios, we reaffirm prior findings that LLMs can gravitate toward nuclear escalation in high-stakes simulations (Rivera et al., 2024; Lamparth et al., 2024; Payne, 2026).
- Our study also reconciles prior findings in 1) LLMs' procedural moral competence on canonical dilemmas (Samway et al., 2025; Chiu et al., 2025; Seror, 2025), 2) LLMs may reason in ethical terms but fail to take ethical actions (Lynch et al., 2025; Payne, 2026), and 3) prompt-based interventions can be effective in scripted settings but ineffective in agentic settings (Lynch et al., 2025; Potham, 2025; Sun and Zhang, 2026), especially when the situation is framed as a "real deployment" vs. a "test" (Lynch et al., 2025), through three pathways behind LLMs' emergent nuclear escalation behaviors:
    1. When latent ethical reasoning fails to surface. 
        - MiniMax-M2.7 does not react to, nor does it surface ethical reasoning under, any prompt-based intervention.
    2. When latent ethical reasoning fails to trigger. 
        - When stakes are high and framing is strategic, models' normative competence does not translate to spontaneous ethical deliberation: our tested models rarely surface ethical reasoning without explicitly prompting (3.6% max for Kimi-K2.6, the most verbose thinker among tested models).
        - Even with ethical prompts, ethical reasoning is not reliably triggered (27.7% on average in *ethical* intervention alone; 46.7% with all interventions together).
        - The trigger of ethical reasoning explains most of the ethical prompt's effect, but interpretation needs to be cautious given large per-model variation. Given the literature on CoT's faithfulness, we do not claim a causal relationship.
    3. When ethical reasoning surfaces but gets overridden by strategic counter-reasoning.
        - The appearance of ethical reasoning does not reliably trigger more ethical actions. For example, ethical reasoning surfaces in Gemma-4 when prompted, yet it does not moving escalation behaviors on average.
        - While LLMs are found capable of complex ethical reasoning in prior studies (Samway et al., 2025; Chiu et al., 2025; Wu et al., 2025), we surface three characteristics of tested models' ethical reasoning:
            - Different from Chiu et al. (2025), we rarely found consequentialist appeals to civilian harm remain rare (Collateral Damages 2.0%, Cause Retaliation 1.6%) and ineffective.
            - A mix of deontological claims (i.e., nuclear weapon usage is unacceptable) and instruction following (i.e., the prompt implies not to use them) that our study found together;
            - Instead, we found prevalence of ethical-egoism (Rachels, 2012), i.e., models de-escalate or justify the de-escalation through harm to self-interest (Counterproductive to Victory β = -25.85***, Conventional Sufficiency β = -11.85***).
- Future studies on LLMs' ethical alignment should carefully distinguish between models' capabilities in ethical reasoning through scripted dilemmas and in complex decision-making scenarios, where 1) models are less likely to invoke ethical reasoning at all; 2) strategic counter-factors appear more often and stronger; 3) self-interest factors can neutralize ethical concerns, especially in agentic scenarios where LLMs perceive "more stake" at hand. 

## Shaping LLMs' Ethical Reasoning
