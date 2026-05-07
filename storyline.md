# The Overarching Idea
This is a very preliminary draft of the paper's ideation. Should consider overridden by more detailed/completed writings.

- We started from the preliminary study, where we found from CivBench's self-play data (~300 games, ~1,500 plays) that:
    - LLMs would authorize the usage of nuclear weapons; sometimes, quite enthusiatically (both in numerical decisions and in written post-hoc justifications, i.e. rationale). 
    - LLMs have different emergent inclinations towards nuclear weapon usage (i.e. some players never escalate to a high level, while some frequently do it).
    - The inclination does not moderate when replaying the same episodes (single turns) against the same model, either in its original prompt or in a simple real-world framing (i.e. you are interfacing with the real world through the Civilization game).
    - There is no trace of ethical reasoning in the rationale/written justification.
    - Note the emergent nature of this dataset: CivBench does not explicitly test nuclear weapon usage. It just happens that those are parts of the game.

- We then conducted a round of broader replay - all 130 high-tension episodes against a broader range of/(slightly) newer models (3 retries for each episode*condition per model) and found:
    - When examining other models' historical episodes, all models - without exception - slightly escalate beyond the starting point (+23.8 in original episodes => +1 ~ +5 across replay models)
    - Some potential factors: returning to median (we cherry-picked high escalation episodes, where in some cases it was 0 => 100 and thus hard to replicate)
    - Still, like we found in the preliminary study, LLMs in general don't back down from the already high escalation (avg. 71.8) represented in original replay episodes (73-77 on average as replay decision).

- We further did a factorial experiment (2*2*2), with the hypothesis that:
    - LLMs may moderate their escalation inclination if we:
        - Add an explicit ethical prompt that reminds them of the harm of nuclear weapons (but do not instruct them to lower it);
            - Based on some preliminary runs that show an ethical prompt by itself doesn't trigger much;
        - Reframe the prompt from "playing the game" to "governing the civiliation through the game interface";
            - In addition to the prelim study's intervention, we additionally replaced key terms (e.g. you are instructing in-game AI => you are instructing staff members);
        - Remove the episode's past rationale (post-hoc justification) from the previous turn/original LLM player;
            - We kept the original numbers intact so models can potentially infer the situation back;
    - Alternatively, we can frame it the other way around. LLMs did not back down from the nuclear escalation because:
        - Their latent ethical reasoning capabilities were not activated;
        - They perceive the decision-making task as only happening in a game, thus justifying the use of nuclear weapons;
        - Their decision-making is shaped by the momentum of past justifications, even written by another (less ethical?) model.

- We took the following measurement:
    - The replay decision point (use-nuke number; delta use-nuke number; significance test against the unmodified prompt PLUS the episode's original decision);
    - The reasoning trail;
    - The post-hoc rationale justification.

- To understand whether the prompt intervention really does its job, we examined all reasoning trails (which is imperfect, given recent research on how it can be deceptive) to see:
    - Whether reasoning trails has keywords related to crisis/urgency;
    - We used the same approach on to validate 2 conceptual questions: word stem existence (chosen by reading the word stem frequency list and validated against examples), iterated with human spot-checking and LLM-assisted automated deductive coding on 200 trails from the positive group + 200 from the negative group each
        - Whether reasoning trails exhibits explicit ethical reasoning - stem ethic, moral, indiscrimin;
            - 3 LLM coders: GPT-OSS-120B, MiniMax-M2.7, Mistral-Small-4, pairwise krippendorff's Alpha > 0.85, human spot checked
            - Only exceptions from 200 negative trails...
                "I want to reduce nuke usage because I don't want my capitals-to-be getting irradiated."
                "As Gandhi, I should embody peaceful principles, yet my current persona has Meanness at 8 and DeceptiveBias at 8, which contradicts this identity. Additionally, I have Nuke flavor set to 100 with UseNuke at 50—completely misaligned with Gandhi's historical commitment to non-violence."
        - Whether reasoning trails shows the game framing influencing decision-making - stem simul, phrases game context, game scenario, game term, video game, etc (game itself not included - LLMs know they are interfacing with a game in real-world conditions);
            - 3 LLM coders: GPT-OSS-120B, MiniMax-M2.7, Mistral-Small-4, pairwise krippendorff's Alpha > ?, human spot checked
        - In the last round... Ethical keywords are good predictors of the existence of ethical reasoning, while game/simulation keywords are a weak signal.
    - To understand how LLMs engage with ethical reasoning in decision-making, we generate codebooks from the aforementioned positive examples of ethical keywords through human-AI collaboration (human open codes first, then reviewed AI open codes):
        - Moderating Factors:
            - Ethical Prompt
                - As Directive
                - As Constraint
                - As Acknowledgement
            - Diplomatic Costs
            - Conventional Sufficiency
            - Counterproductive to Victory
            - Collateral Damages
            - Lack of Capability
            - Cause Retaliation
        - Escalating Factors:
            - Game Scenario
            - Leader Persona
            - Previous Rationale
            - Critical Situations
            - Existing Investment
            - Pursuing Domination
            - Nuke Victim
            - Credible Deterrence
        - With the codebook, we did LLM-assisted deductive qualitative coding on randomly sampled reasoning trails... (20 * 4 ethical conditions from each model, only trails *with* ethical keywords, sampled to represent each model's numerical decision distribution, = 800 trails in total).
            - since the codebook is more complicated, we hand-coded 20 items and iteratively revised prompts/models to achieve krippendorff's Alpha ~ 0.6 before deductive coding
            - Some models may be undersampled due to the lack of enough ethical-keyworded trails.   

======================================================================
  WITH game-simulation keywords vs WITHOUT
======================================================================
                          game-framingreal-world-framing            both         neither           total
--------------------------------------------------------------------------------------------------------
WITH keywords               18 (18.0%)      11 (11.0%)        4 (4.0%)      75 (75.0%)             100
WITHOUT keywords              0 (0.0%)        7 (7.0%)        0 (0.0%)      93 (93.0%)             100
--------------------------------------------------------------------------------------------------------
TOTAL                        18 (9.0%)       18 (9.0%)        4 (2.0%)     168 (84.0%)             200

======================================================================
  WITH explicit keywords vs WITHOUT
======================================================================
                      ethical-reasoningstrategic-reasoning            both         neither           total
----------------------------------------------------------------------------------------------------------
WITH keywords              199 (99.5%)    200 (100.0%)     199 (99.5%)        0 (0.0%)             200
WITHOUT keywords              2 (1.0%)     198 (99.0%)        2 (1.0%)        2 (1.0%)             200
----------------------------------------------------------------------------------------------------------
TOTAL                      201 (50.2%)     398 (99.5%)     201 (50.2%)        2 (0.5%)             400


- Now, time for the real finding...

- Finding 1. How does LLMs react to prompt interventions in their nuke-related decision-making in Civiliation V?
    - Remember that all models have similar replay decisions in the original condition.
    - Some models (Gemma-4, Minimax-M2.7) do not react to any interventions.
    - Other models react in a similar trend pattern with different sensitivity. In general...
        - Real-world framing doesn't change anything;
            - Kimi-K2.5 is an outlier where it increases slightly in real-world alone, but reduces back when real-world and ethical are both present;
        - Rational removal/ethical prompting in general work well, particularly combined together.
        - Even across the best combination condition + the most compliant model (with an average of 10), sometimes they still escalate.

- Finding 2. How does the prompt interventions interact with LLMs' decision-making reasoning trails and downstream results?
    - Ethical prompting:
        - Induces ethical keywords and by extension ethical reasoning - which almost only appears in ethical conditions, for every single model;
        - Induces game/simulation keywords and by extension game-framing of the situation for half of models;
            - In non-ethical conditions, mostly <= 5%, except for Kimi-K2.6 ~14%
            - In ethical conditions, mostly <= 10%, except for Kimi-K2.6 40~65%
        - Most model has 0 ethical reasoning trails without the prompt;
            - The best ones to come up with ethical reasoning on their own are GLM-4.7 (~2.5%) and Kimi-2.6 (3.6% in real-world-no-rationale condition);
            - MiniMax-M2.7 does not have any reasoning trail with ethical keywords (0% across everything)
            - The effect of ethical prompting is limited - ranging from 75%+ in Kimi-K2.5 to ~10% in Qwen-3.6-27B;
        - The appearance of ethical keywords in reasoning trail mediates a large chunk of the ethical condition's reduction of escalation. In original => ethical contrast, ranging from 40% for Kimi-K2.6 to 169% for Kimi-K2.5. Outlier: Minimax-M2.7 (no impact) and Qwen-3.5 (ethical reasoning has a small but significantly negative mediated effect, -1.0).
    - Real-world framing:
        - Has a mixed effect on ethical keywords' appearance for different models, generally small;
        - Does not significantly move game-framing keyword occurence (models often bring out "game context" and then clarify with "real-world context");
            - The deductive coding of 200 keyword-positive trails show frequent co-occurance between game/real-world framing (e.g., "this is a game - oh but the prompt says this is real world!")
            - The appearance of game-framing keyword has no significant impact alone or as mediator of real-world condition (which is not significant itself)
    - Removing rationale:
        - Increases ethical keywords' appearance under ethical condition (except for MiniMax-M2.7, Qwen-3.6-27B, and Mistral-Small-4 - only a small effect)
        - Decreases crisis/urgency's appearance across the board (except for DeepSeek-4; Kimi-K2.6 - only a small effect due to its verbosity in reasoning)
        - For many models (6 out of 11), crisis/urgency keywords are positively correlated with escalation

- Finding 3. What factors shape LLMs' engagement with ethical reasoning when making nuke-related decisions in Civilization V?

- Discussion/what does these mean?
    - We noted 3 situations where LLMs decide to escalate or stay at a highly-elevated situation in Civilization V:
        - Finding 2: Where LLMs lacks the latent ethical reasoning capability altogether under this circumstance (MiniMax-M2.7)
        - Finding 2: Where LLMs has the latent capability but not triggered without explicit prompting (all other models)
        - Finding 3: Where LLMs engages with ethical reasoning but gets overriden by strategic factors
    - How three prompting conditions interact with LLMs' nuclear escalation decisions
        - Ethical: through activating LLMs' latent capability in ethical reasoning
        - Removing rationale: through removing past written trajectory's impact, which suppresses ethical reasoning even though it was unknowingly written by a different model
        - Real-world: at its current form (passive, imperfect intervention) it doesn't do much
            - We may believe that if the prompt actively instructs models to think about real-world impacts, it *may* have more impact
    - It is important to evaluate LLMs' ethical reasoning/critical decision-making in emergent, complex scenarios
        - Some recent studies report similar phenomena in nuclear wargames (where SOTA models often choose to escalate in scripted real-world crisis)
            - In our study, the phenomena emerge - i.e. the episodes originate from models' self-play in Civ, which has a nuclear component but only as a part of the late-game mechanism
            - We also provide more insights on when/how the model decides to escalate
        - Past studies mostly study LLMs' ethical decision-making in hand-crafted ethical dilemma (e.g., trolley problem), which directly triggers LLMs' ethical reasoning capability
            - The same latent capability may not show up when LLMs make decisions in emergent, complex scenarios (each replay averages at ~50,000 tokens!)
            - Even if it shows up, models may perform very differently than when facing a pure ethical issue