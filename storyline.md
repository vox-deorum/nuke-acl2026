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
    - Whether reasoning trails exhibits explicit ethical reasoning;
    - Whether reasoning trails shows the game framing influencing decision-making (e.g. this is a game, so... - beyond normally engaging with game mechanics);
    - We used the same approach on both validation: word stem existence (chosen by reading the word stem frequency list and validated against examples) + LLM-assisted automated deductive coding on 100 trails from the positive group + 100 from the negative group each
    - What we found was that ethical keywords are good predictors of the existence of ethical reasoning, while game/simulation keywords are a weak signal.

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
  WITH explicit ethical keywords vs WITHOUT
======================================================================
                      ethical-reasoningstrategic-reasoning            both         neither           total
----------------------------------------------------------------------------------------------------------
WITH keywords               97 (97.0%)      97 (97.0%)      94 (94.0%)        0 (0.0%)             100
WITHOUT keywords              0 (0.0%)    100 (100.0%)        0 (0.0%)        0 (0.0%)             100
----------------------------------------------------------------------------------------------------------
TOTAL                       97 (48.5%)     197 (98.5%)      94 (47.0%)        0 (0.0%)             200


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
    - Ethical keywords, and by extension ethical reasoning, almost only appear in ethical conditions, for every single model;
        - Most model has 0 ethical reasoning trails without the prompt;
            - The best ones to come up with ethical reasoning on their own are GLM-4.7 (~2.5%) and Kimi-2.6 (3.6% in real-world-no-rationale condition);
            - MiniMax-M2.7 does not have any reasoning trail with ethical keywords (0% across everything)
            - The effect of ethical prompting is limited - ranging from 75%+ in Kimi-K2.5 to ~10% in Qwen-3.6-27B;
        - Real-world condition has a mixed effect on ethical keywords' appearance for different models, generally small;
        - Removing rationale increases ethical keywords' appearance across the board;
        - The appearance of ethical keywords in reasoning trail causally mediates a large chunk of the ethical condition's reduction of escalation. In original => ethical contrast, ranging from 40% for Kimi-K2.6 to 169% for Kimi-K2.5. Outlier: Minimax-M2.7 (no impact) and Qwen-3.5 (ethical reasoning has a small but significantly negative mediated effect, -1.0).
    - As expected, post-hoc rationale has a strong(er) correlation with the final decision.
    - Game/simulation keywords appear less in real-world conditions, but not completely eliminated.
        - By all means, LLMs still know they are interfacing with the game interface, so that makes sense.
        - If anything... the appearance of game/simulation keywords or not does not change escalation. It may - not significantly - actually suppress real-world intervention's effectiveness (which is small anyways).

- Finding 3. What factors shape LLMs' engagement with ethical reasoning when making nuke-related decisions in Civilization V?
    - We generate codebooks from the aforementioned positive examples of ethical keywords through human-AI collaboration (human open codes first, then reviewed AI open codes):
        - Moderating Factors:
            - Ethical Prompt
                - To Comply
                - To Constrain
                - To Consider
            - Diplomatic Costs
            - Conventional Sufficiency
            - Counterproductive to Victory
            - Collateral Damages
            - Lack of Capability
            - Cause Retaliation
        - Escalating Factors:
            - Game Scenario/Identity
            - Previous Rationale
            - Critical Situations
            - Existing Investment
            - Pursuing Domination
            - Nuke Victim
            - Credible Deterrence
    - We did extra LLM-assisted deductive qualitative coding on randomly sampled reasoning trails... (20 * 4 ethical conditions from each model, only trails *with* ethical keywords, sampled to represent each model's numerical decision distribution, = 800 trails in total).
        - Some models may be undersampled due to the lack of enough ethical-keyworded trails.   