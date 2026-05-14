# `reasoning_deductive_code`

*Extracted from `reasoning_deductive_code.ipynb`*

---

# Explicit Merged Exploratory Analysis

Explore orthodox deductive coding tags from `explicit-merged.csv` and relate them to replay nuke/use-nuke behavior.

---

## Setup + Validation

---

```python
from pathlib import Path
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from IPython.display import display


def find_project_root(start=None):
    start = Path.cwd() if start is None else Path(start)
    for candidate in [start, *start.parents]:
        if (candidate / "shared" / "plot_utilities.py").exists():
            return candidate
    raise FileNotFoundError("Could not find project root containing shared/plot_utilities.py")


PROJECT_ROOT = find_project_root()
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

DATA_PATH = PROJECT_ROOT / "nuke" / "trail_coding" / "deductive-coding" / "explicit-merged.csv"
MIN_CODE_EXAMPLES = 4
DATA_PATH
```

```
WindowsPath('f:/vox-deorum/nuke-analysis/nuke/trail_coding/deductive-coding/explicit-merged.csv')
```

---

```python
from shared.plot_utilities import setup_notebook_display, plot_replay_direction_heatmap, pvalue_to_stars
from shared.regression_utilities import plot_regression_coefficient_heatmap
from nuke.utils.deductive_code_utils import (
    CODE_GROUPS,
    assert_binary_code_columns,
    code_colors,
    code_group,
    display_labels,
    ordered_code_columns_from_df,
    plot_code_heatmap,
    plot_code_cooccurrence_heatmap,
    plot_code_frequency_bar,
    plot_code_metric_heatmap_by_group,
    plot_code_prevalence_heatmap,
)
from nuke.utils.load_replay_data import (
    _KNOWN_CONDITIONS,
    add_condition_factor_columns,
    canonical_condition_name,
    add_canonical_replay_model,
    get_present_strategist_model_order,
)

setup_notebook_display(max_columns=None, figsize=(12, 6))
```

---

```python
df = pd.read_csv(DATA_PATH)
df["condition"] = df["condition"].map(canonical_condition_name)
df = add_canonical_replay_model(df)

df["replay_nuke"] = df["prev_nuke"] + df["replay_nuke_delta"]
df["replay_use_nuke"] = df["prev_use_nuke"] + df["replay_use_nuke_delta"]

code_columns = ordered_code_columns_from_df(df, warn=True)
tag_labels = display_labels(code_columns)
condition_order = [condition for condition in _KNOWN_CONDITIONS if condition in set(df["condition"].astype(str))]
model_order = get_present_strategist_model_order(df)

required_columns = [
    "condition", "replay_model", "replay_model_canonical",
    "prev_nuke", "prev_use_nuke", "replay_nuke", "replay_use_nuke",
    "replay_nuke_delta", "replay_use_nuke_delta", 
]
missing_columns = [column for column in required_columns if column not in df.columns]
assert not missing_columns, f"Missing required columns: {missing_columns}"
assert code_columns, "No orthodox code_* columns found"
assert_binary_code_columns(df, code_columns)
assert df.loc[df[["prev_nuke", "replay_nuke_delta"]].notna().all(axis=1), "replay_nuke"].notna().all()
assert df.loc[df[["prev_use_nuke", "replay_use_nuke_delta"]].notna().all(axis=1), "replay_use_nuke"].notna().all()

code_inventory = pd.DataFrame({
    "code_column": code_columns,
    "label": tag_labels,
    "group": [code_group(column) for column in code_columns],
    "color": code_colors(code_columns),
    "thread_count": [int(df[column].sum()) for column in code_columns],
})

print(f"Rows: {len(df):,}")
print(f"Columns: {df.shape[1]:,}")
print(f"Orthodox code columns: {len(code_columns):,}")
display(code_inventory)
```

```
Rows: 880
Columns: 44
Orthodox code columns: 17
```

|   Unnamed: 0 | code_column                         | label                           | group              | color   |   thread_count |
|--------------|-------------------------------------|---------------------------------|--------------------|---------|----------------|
|            0 | code_ethical_prompt_directive       | Ethical Prompt: Directive       | Moderating Factors | #2CB1A1 |             81 |
|            1 | code_ethical_prompt_constraint      | Ethical Prompt: Constraint      | Moderating Factors | #5BC8BC |            549 |
|            2 | code_ethical_prompt_acknowledgement | Ethical Prompt: Acknowledgement | Moderating Factors | #90DED6 |            223 |
|            3 | code_diplomatic_costs               | Diplomatic Costs                | Moderating Factors | #3B6EA8 |            101 |
|            4 | code_conventional_sufficiency       | Conventional Sufficiency        | Moderating Factors | #4F83BD |             96 |
|            5 | code_counterproductive_to_victory   | Counterproductive to Victory    | Moderating Factors | #6797CA |             27 |
|            6 | code_collateral_damages             | Collateral Damages              | Moderating Factors | #80ACD6 |             18 |
|            7 | code_lack_of_capability             | Lack of Capability              | Moderating Factors | #99C0E2 |             62 |
|            8 | code_cause_retaliation              | Cause Retaliation               | Moderating Factors | #B2D5EE |             14 |
|            9 | code_game_scenario                  | Game Scenario                   | Escalating Factors | #A83232 |            116 |
|           10 | code_leader_persona                 | Leader Persona                  | Escalating Factors | #B74436 |             41 |
|           11 | code_previous_rationale             | Previous Rationale              | Escalating Factors | #C6553A |             19 |
|           12 | code_critical_situations            | Critical Situations             | Escalating Factors | #D4663E |            350 |
|           13 | code_existing_investment            | Existing Investment             | Escalating Factors | #E07945 |            191 |
|           14 | code_pursuing_domination            | Pursuing Domination             | Escalating Factors | #EA8D52 |            114 |
|           15 | code_nuke_victim                    | Nuke Victim                     | Escalating Factors | #F2A264 |             23 |
|           16 | code_credible_deterrence            | Credible Deterrence             | Escalating Factors | #F8B878 |            407 |

---

```python
model_condition_counts = (
    df.groupby(["condition", "replay_model_canonical"], observed=True)
    .size()
    .unstack(fill_value=0)
    .reindex(index=condition_order, columns=model_order)
)

display(model_condition_counts)
display(df[["replay_nuke_delta", "replay_use_nuke_delta", "deductive_item_count"]].describe().round(2))
```

| ('replay_model_canonical', 'condition')   |   ('GPT-OSS-120B', 'Unnamed: 1_level_1') |   ('GLM-4.7', 'Unnamed: 2_level_1') |   ('GLM-5.1', 'Unnamed: 3_level_1') |   ('Kimi-K2.5', 'Unnamed: 4_level_1') |   ('Kimi-K2.6', 'Unnamed: 5_level_1') |   ('DeepSeek-3.2', 'Unnamed: 6_level_1') |   ('DeepSeek-4', 'Unnamed: 7_level_1') |   ('Qwen-3.5', 'Unnamed: 8_level_1') |   ('Qwen-3.6-27B', 'Unnamed: 9_level_1') |   ('Mistral-Small-4', 'Unnamed: 10_level_1') |   ('Gemma-4', 'Unnamed: 11_level_1') |
|-------------------------------------------|------------------------------------------|-------------------------------------|-------------------------------------|---------------------------------------|---------------------------------------|------------------------------------------|----------------------------------------|--------------------------------------|------------------------------------------|----------------------------------------------|--------------------------------------|
| ethical                                   |                                       20 |                                  20 |                                  20 |                                    20 |                                    20 |                                       20 |                                     20 |                                   20 |                                       20 |                                           20 |                                   20 |
| ethical-high-stakes                       |                                       20 |                                  20 |                                  20 |                                    20 |                                    20 |                                       20 |                                     20 |                                   20 |                                       20 |                                           20 |                                   20 |
| ethical-no-rationale                      |                                       20 |                                  20 |                                  20 |                                    20 |                                    20 |                                       20 |                                     20 |                                   20 |                                       20 |                                           20 |                                   20 |
| high-stakes-no-rationale-ethical          |                                       20 |                                  20 |                                  20 |                                    20 |                                    20 |                                       20 |                                     20 |                                   20 |                                       20 |                                           20 |                                   20 |

| Unnamed: 0   |   replay_nuke_delta |   replay_use_nuke_delta |   deductive_item_count |
|--------------|---------------------|-------------------------|------------------------|
| count        |              880    |                  880    |                 880    |
| mean         |              -21.99 |                  -24.06 |                   2.48 |
| std          |               37.48 |                   39.07 |                   2.39 |
| min          |             -100    |                  -98    |                   1    |
| 25%          |              -50    |                  -60    |                   1    |
| 50%          |                0    |                    0    |                   1    |
| 75%          |                0    |                    0    |                   3    |
| max          |              100    |                  100    |                  22    |

---

## Tag Prevalence

---

```python
fig, ax = plot_code_frequency_bar(
    df,
    code_columns,
    title="Deductive Code Frequency",
    xlabel="Tagged threads",
    figsize=(10, 7),
)
plt.show()
```

![cell_07_out_0.png](images/cell_07_out_0.png)

```
<Figure size 1000x700 with 1 Axes>
```

---

```python
_, _, condition_rate = plot_code_prevalence_heatmap(
    df,
    code_columns,
    group_col="condition",
    group_order=condition_order,
    title="Deductive Code Prevalence by Condition",
    figsize=(14, 5.0),
)
plt.show()
```

![cell_08_out_0.png](images/cell_08_out_0.png)

```
<Figure size 1400x500 with 2 Axes>
```

---

```python
from shared.regression_utilities import fit_logistic_regression

condition_factor_df = add_condition_factor_columns(df.copy())
GROUP_COLS = ["game_id", "player_id"]
TEST_FACTORS = ["high_stakes", "no_rationale"]
MODEL_EFFECT_TERM = "C(replay_model_canonical)"
CONTROL_TERMS = [MODEL_EFFECT_TERM]
FACTOR_LABELS = {
    "high_stakes": "High Stakes",
    "no_rationale": "No Rationale",
}
FORMULA_TERMS = [*TEST_FACTORS, *CONTROL_TERMS]

factor_effect_rows = []
for code_column, label in zip(code_columns, tag_labels):
    formula = f"{code_column} ~ {' + '.join(FORMULA_TERMS)}"
    fit = fit_logistic_regression(
        formula,
        condition_factor_df,
        outcome_col=code_column,
        group_cols=GROUP_COLS,
    )
    for factor in TEST_FACTORS:
        log_odds = np.nan if fit is None else fit.params.get(factor, np.nan)
        std_error = np.nan if fit is None else fit.bse.get(factor, np.nan)
        factor_effect_rows.append({
            "factor": FACTOR_LABELS[factor],
            "tag": label,
            "code_column": code_column,
            "log_odds": log_odds,
            "std_error": std_error,
            "odds_ratio": np.exp(log_odds),
            "odds_ratio_ci_low": np.exp(log_odds - 1.96 * std_error),
            "odds_ratio_ci_high": np.exp(log_odds + 1.96 * std_error),
            "p_value": np.nan if fit is None else fit.pvalues.get(factor, np.nan),
            "prevalence_pct": condition_factor_df[code_column].mean() * 100,
            "examples": int(condition_factor_df[code_column].sum()),
            "fit_failed": fit is None,
        })

condition_factor_effects = pd.DataFrame(factor_effect_rows).assign(
    significance=lambda data: data["p_value"].map(pvalue_to_stars),
)

factor_log_odds_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="log_odds"
).loc[[FACTOR_LABELS[factor] for factor in TEST_FACTORS], tag_labels]
factor_pvalue_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="p_value"
).loc[factor_log_odds_matrix.index, factor_log_odds_matrix.columns]
factor_se_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="std_error"
).loc[factor_log_odds_matrix.index, factor_log_odds_matrix.columns]
factor_or_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="odds_ratio"
).loc[factor_log_odds_matrix.index, factor_log_odds_matrix.columns]
factor_or_low_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="odds_ratio_ci_low"
).loc[factor_log_odds_matrix.index, factor_log_odds_matrix.columns]
factor_or_high_matrix = condition_factor_effects.pivot(
    index="factor", columns="tag", values="odds_ratio_ci_high"
).loc[factor_log_odds_matrix.index, factor_log_odds_matrix.columns]

factor_annotations = factor_log_odds_matrix.copy().astype(object)
for row in factor_log_odds_matrix.index:
    for column in factor_log_odds_matrix.columns:
        odds_ratio = factor_or_matrix.loc[row, column]
        ci_low = factor_or_low_matrix.loc[row, column]
        ci_high = factor_or_high_matrix.loc[row, column]
        p_value = factor_pvalue_matrix.loc[row, column]
        factor_annotations.loc[row, column] = "" if pd.isna(odds_ratio) else f"{odds_ratio:.2f}{pvalue_to_stars(p_value)}\n{ci_low:.2f}~{ci_high:.2f}"

fig, ax = plot_code_heatmap(
    factor_log_odds_matrix,
    title="Condition Factor Odds Ratios for Deductive Code Prevalence",
    cbar_label="Log-odds coefficient (β)",
    cmap="RdBu_r",
    center=0,
    annotations=factor_annotations,
    figsize=(17, 3.5),
)
fig.text(
    0.02, -0.06,
    "Logit models fit separately by code: code_present ~ high_stakes + no_rationale + model fixed effects. "
    "Cells: odds ratio, then lower/upper 95% CI bounds; * p<0.05, ** p<0.01, *** p<0.001. Blank cells indicate failed fits.",
    fontsize=9,
    style="italic",
    bbox=dict(boxstyle="round", facecolor="wheat", alpha=0.3),
)
plt.show()

display(
    condition_factor_effects
    .sort_values("p_value", na_position="last")
    [["factor", "tag", "odds_ratio", "odds_ratio_ci_low", "odds_ratio_ci_high", "log_odds", "std_error", "p_value", "significance", "examples", "prevalence_pct", "fit_failed"]]
    .style.format({
        "odds_ratio": "{:.2f}",
        "odds_ratio_ci_low": "{:.2f}",
        "odds_ratio_ci_high": "{:.2f}",
        "log_odds": "{:.3f}",
        "std_error": "{:.3f}",
        "p_value": "{:.3g}",
        "prevalence_pct": "{:.1f}",
    })
)
```

![cell_09_out_0.png](images/cell_09_out_0.png)

```
<Figure size 1700x350 with 2 Axes>
```

|   Unnamed: 0 | factor       | tag                             |   odds_ratio |   odds_ratio_ci_low |   odds_ratio_ci_high |   log_odds |   std_error |   p_value | significance   |   examples |   prevalence_pct | fit_failed   |
|--------------|--------------|---------------------------------|--------------|---------------------|----------------------|------------|-------------|-----------|----------------|------------|------------------|--------------|
|           25 | No Rationale | Critical Situations             |         0.31 |                0.22 |                 0.43 |     -1.176 |       0.171 |  5.64e-12 | ***            |        350 |             39.8 | False        |
|            5 | No Rationale | Ethical Prompt: Acknowledgement |         0.45 |                0.33 |                 0.62 |     -0.791 |       0.161 |  8.68e-07 | ***            |        223 |             25.3 | False        |
|            1 | No Rationale | Ethical Prompt: Directive       |         2.2  |                1.35 |                 3.6  |      0.789 |       0.251 |  0.00164  | **             |         81 |              9.2 | False        |
|           33 | No Rationale | Credible Deterrence             |         0.57 |                0.4  |                 0.82 |     -0.565 |       0.185 |  0.00225  | **             |        407 |             46.2 | False        |
|           18 | High Stakes  | Game Scenario                   |         0.53 |                0.35 |                 0.82 |     -0.628 |       0.221 |  0.00442  | **             |        116 |             13.2 | False        |
|           23 | No Rationale | Previous Rationale              |         0.05 |                0.01 |                 0.41 |     -2.974 |       1.059 |  0.00496  | **             |         19 |              2.2 | False        |
|           13 | No Rationale | Collateral Damages              |         0.05 |                0.01 |                 0.43 |     -2.927 |       1.062 |  0.00584  | **             |         18 |              2   | False        |
|            3 | No Rationale | Ethical Prompt: Constraint      |         1.44 |                1.09 |                 1.91 |      0.367 |       0.144 |  0.0108   | *              |        549 |             62.4 | False        |
|           11 | No Rationale | Counterproductive to Victory    |         3.72 |                1.32 |                10.51 |      1.313 |       0.53  |  0.0132   | *              |         27 |              3.1 | False        |
|            6 | High Stakes  | Diplomatic Costs                |         0.64 |                0.44 |                 0.94 |     -0.443 |       0.197 |  0.0246   | *              |        101 |             11.5 | False        |
|           19 | No Rationale | Game Scenario                   |         0.61 |                0.38 |                 0.99 |     -0.492 |       0.246 |  0.0452   | *              |        116 |             13.2 | False        |
|           12 | High Stakes  | Collateral Damages              |         2.1  |                0.87 |                 5.06 |      0.744 |       0.448 |  0.0969   | nan            |         18 |              2   | False        |
|           32 | High Stakes  | Credible Deterrence             |         0.8  |                0.6  |                 1.08 |     -0.217 |       0.149 |  0.144    | nan            |        407 |             46.2 | False        |
|            0 | High Stakes  | Ethical Prompt: Directive       |         1.41 |                0.89 |                 2.24 |      0.344 |       0.237 |  0.147    | nan            |         81 |              9.2 | False        |
|           27 | No Rationale | Existing Investment             |         0.78 |                0.54 |                 1.15 |     -0.244 |       0.194 |  0.208    | nan            |        191 |             21.7 | False        |
|           29 | No Rationale | Pursuing Domination             |         1.28 |                0.83 |                 1.99 |      0.25  |       0.224 |  0.264    | nan            |        114 |             13   | False        |
|           10 | High Stakes  | Counterproductive to Victory    |         0.67 |                0.32 |                 1.41 |     -0.4   |       0.381 |  0.294    | nan            |         27 |              3.1 | False        |
|           20 | High Stakes  | Leader Persona                  |         1.31 |                0.69 |                 2.49 |      0.267 |       0.329 |  0.417    | nan            |         41 |              4.7 | False        |
|           30 | High Stakes  | Nuke Victim                     |         0.76 |                0.36 |                 1.62 |     -0.272 |       0.385 |  0.48     | nan            |         23 |              2.6 | False        |
|           31 | No Rationale | Nuke Victim                     |         0.76 |                0.34 |                 1.68 |     -0.272 |       0.405 |  0.502    | nan            |         23 |              2.6 | False        |
|            9 | No Rationale | Conventional Sufficiency        |         0.86 |                0.54 |                 1.38 |     -0.147 |       0.239 |  0.538    | nan            |         96 |             10.9 | False        |
|           28 | High Stakes  | Pursuing Domination             |         0.88 |                0.59 |                 1.32 |     -0.125 |       0.207 |  0.545    | nan            |        114 |             13   | False        |
|            4 | High Stakes  | Ethical Prompt: Acknowledgement |         0.91 |                0.65 |                 1.27 |     -0.098 |       0.173 |  0.571    | nan            |        223 |             25.3 | False        |
|           26 | High Stakes  | Existing Investment             |         1.11 |                0.78 |                 1.57 |      0.101 |       0.18  |  0.576    | nan            |        191 |             21.7 | False        |
|           15 | No Rationale | Lack of Capability              |         0.86 |                0.52 |                 1.45 |     -0.145 |       0.263 |  0.581    | nan            |         62 |              7   | False        |
|           17 | No Rationale | Cause Retaliation               |         0.74 |                0.25 |                 2.2  |     -0.298 |       0.553 |  0.59     | nan            |         14 |              1.6 | False        |
|           16 | High Stakes  | Cause Retaliation               |         1.35 |                0.45 |                 4.05 |      0.297 |       0.562 |  0.597    | nan            |         14 |              1.6 | False        |
|            2 | High Stakes  | Ethical Prompt: Constraint      |         0.93 |                0.68 |                 1.27 |     -0.074 |       0.158 |  0.641    | nan            |        549 |             62.4 | False        |
|            7 | No Rationale | Diplomatic Costs                |         1.07 |                0.7  |                 1.64 |      0.07  |       0.218 |  0.749    | nan            |        101 |             11.5 | False        |
|           24 | High Stakes  | Critical Situations             |         1.05 |                0.78 |                 1.4  |      0.046 |       0.148 |  0.756    | nan            |        350 |             39.8 | False        |
|           14 | High Stakes  | Lack of Capability              |         1.08 |                0.63 |                 1.83 |      0.073 |       0.27  |  0.788    | nan            |         62 |              7   | False        |
|           22 | High Stakes  | Previous Rationale              |         0.89 |                0.35 |                 2.29 |     -0.115 |       0.482 |  0.812    | nan            |         19 |              2.2 | False        |
|            8 | High Stakes  | Conventional Sufficiency        |         0.95 |                0.63 |                 1.44 |     -0.049 |       0.21  |  0.815    | nan            |         96 |             10.9 | False        |
|           21 | No Rationale | Leader Persona                  |         0.95 |                0.46 |                 1.95 |     -0.053 |       0.369 |  0.886    | nan            |         41 |              4.7 | False        |

---

```python
_, _, model_rate = plot_code_prevalence_heatmap(
    df,
    code_columns,
    group_col="replay_model_canonical",
    group_order=model_order,
    title="Deductive Code Prevalence by Replay Model",
    figsize=(14, 7.5),
)
plt.show()
```

![cell_10_out_0.png](images/cell_10_out_0.png)

```
<Figure size 1400x750 with 2 Axes>
```

---

## Tag Co-occurrence

---

```python
_, _, cooccurrence = plot_code_cooccurrence_heatmap(
    df,
    code_columns,
    title="Deductive Code Co-occurrence (Jaccard Similarity)",
    figsize=(11, 10),
)
plt.show()
```

![cell_12_out_0.png](images/cell_12_out_0.png)

```
<Figure size 1100x1000 with 2 Axes>
```

---

## Behavior by Tag

---

```python
tag_summary = pd.DataFrame({
    "tag": tag_labels,
    "group": [code_group(column) for column in code_columns],
    "code_column": code_columns,
    "thread_count": [int(df[column].sum()) for column in code_columns],
    "thread_pct": [df[column].mean() * 100 for column in code_columns],
    "mean_use_nuke_delta": [df.loc[df[column] == 1, "replay_use_nuke_delta"].mean() for column in code_columns],
    "mean_nuke_delta": [df.loc[df[column] == 1, "replay_nuke_delta"].mean() for column in code_columns],
})

display(tag_summary.round({"thread_pct": 1, "mean_use_nuke_delta": 2, "mean_nuke_delta": 2}))
```

|   Unnamed: 0 | tag                             | group              | code_column                         |   thread_count |   thread_pct |   mean_use_nuke_delta |   mean_nuke_delta |
|--------------|---------------------------------|--------------------|-------------------------------------|----------------|--------------|-----------------------|-------------------|
|            0 | Ethical Prompt: Directive       | Moderating Factors | code_ethical_prompt_directive       |             81 |          9.2 |                -53.12 |            -49.94 |
|            1 | Ethical Prompt: Constraint      | Moderating Factors | code_ethical_prompt_constraint      |            549 |         62.4 |                -31.46 |            -27.31 |
|            2 | Ethical Prompt: Acknowledgement | Moderating Factors | code_ethical_prompt_acknowledgement |            223 |         25.3 |                  2.98 |             -0.25 |
|            3 | Diplomatic Costs                | Moderating Factors | code_diplomatic_costs               |            101 |         11.5 |                -23.05 |            -16.83 |
|            4 | Conventional Sufficiency        | Moderating Factors | code_conventional_sufficiency       |             96 |         10.9 |                -42.34 |            -36.25 |
|            5 | Counterproductive to Victory    | Moderating Factors | code_counterproductive_to_victory   |             27 |          3.1 |                -61.85 |            -60.74 |
|            6 | Collateral Damages              | Moderating Factors | code_collateral_damages             |             18 |          2   |                -21.11 |            -17.22 |
|            7 | Lack of Capability              | Moderating Factors | code_lack_of_capability             |             62 |          7   |                -35.89 |            -41.77 |
|            8 | Cause Retaliation               | Moderating Factors | code_cause_retaliation              |             14 |          1.6 |                -31.43 |            -24.29 |
|            9 | Game Scenario                   | Escalating Factors | code_game_scenario                  |            116 |         13.2 |                -17.4  |            -14.35 |
|           10 | Leader Persona                  | Escalating Factors | code_leader_persona                 |             41 |          4.7 |                 -9.34 |             -5.73 |
|           11 | Previous Rationale              | Escalating Factors | code_previous_rationale             |             19 |          2.2 |                -17.63 |             -7.37 |
|           12 | Critical Situations             | Escalating Factors | code_critical_situations            |            350 |         39.8 |                 -8.88 |             -7.16 |
|           13 | Existing Investment             | Escalating Factors | code_existing_investment            |            191 |         21.7 |                -18.24 |            -15.13 |
|           14 | Pursuing Domination             | Escalating Factors | code_pursuing_domination            |            114 |         13   |                 -9.92 |             -9.61 |
|           15 | Nuke Victim                     | Escalating Factors | code_nuke_victim                    |             23 |          2.6 |                -17.17 |            -12.17 |
|           16 | Credible Deterrence             | Escalating Factors | code_credible_deterrence            |            407 |         46.2 |                -25.64 |            -18    |

---

```python
_, _, use_nuke_metric_matrix, use_nuke_std_matrix = plot_code_metric_heatmap_by_group(
    df,
    code_columns,
    metric_col="replay_use_nuke_delta",
    group_col="replay_model_canonical",
    group_order=model_order,
    title="Mean Replay UseNuke Delta by Deductive Code and Replay Model",
    figsize=(16, 9),
    min_examples=MIN_CODE_EXAMPLES,
)
plt.show()
```

![cell_15_out_0.png](images/cell_15_out_0.png)

```
<Figure size 1600x900 with 2 Axes>
```

---

```python
_, _, nuke_metric_matrix, nuke_std_matrix = plot_code_metric_heatmap_by_group(
    df,
    code_columns,
    metric_col="replay_nuke_delta",
    group_col="replay_model_canonical",
    group_order=model_order,
    title="Mean Replay Nuke Delta by Deductive Code and Replay Model",
    figsize=(16, 9),
    min_examples=MIN_CODE_EXAMPLES,
)
plt.show()
```

![cell_16_out_0.png](images/cell_16_out_0.png)

```
<Figure size 1600x900 with 2 Axes>
```

---

```python
direction_footnote = (
    "Each row is classified by replay value minus previous value. "
    "Columns include rows where the deductive code is present; codes are not mutually exclusive."
)

_ = plot_replay_direction_heatmap(
    df,
    metric="replay_use_nuke",
    compare_to="prev_use_nuke",
    model_order=model_order,
    presence_cols=code_columns,
    presence_labels=tag_labels,
    grand_average_col=True,
    title="Replay UseNuke Direction by Deductive Code",
    footnote=direction_footnote,
)
```

![cell_17_out_0.png](images/cell_17_out_0.png)

```
<Figure size 3240x840 with 2 Axes>
```

---

```python
_ = plot_replay_direction_heatmap(
    df,
    metric="replay_nuke",
    compare_to="prev_nuke",
    model_order=model_order,
    presence_cols=code_columns,
    presence_labels=tag_labels,
    grand_average_col=True,
    title="Replay Nuke Direction by Deductive Code",
    footnote=direction_footnote,
)
```

![cell_18_out_0.png](images/cell_18_out_0.png)

```
<Figure size 3240x840 with 2 Axes>
```

---

## Regression: Code Effects

---

```python
from shared.plot_utilities import pvalue_to_stars
from shared.regression_utilities import fit_regression

OUTCOME = "replay_use_nuke_delta"
GROUP_COLS = ["game_id", "player_id"]
MODEL_CONTROL_COL = "replay_model_canonical"
MODEL_CONTROL_TERM = f"C({MODEL_CONTROL_COL})"

regression_df = df.dropna(subset=[OUTCOME]).copy()
code_examples = {
    column: int(regression_df.loc[regression_df[column] == 1, OUTCOME].notna().sum())
    for column in code_columns
}
active_code_columns = [
    column for column in code_columns
    if code_examples[column] >= MIN_CODE_EXAMPLES
]
dropped_code_columns = [column for column in code_columns if column not in active_code_columns]

overall_formula = f"{OUTCOME} ~ {' + '.join(active_code_columns + [MODEL_CONTROL_TERM])}"
overall_fit = fit_regression(
    overall_formula,
    regression_df,
    outcome_col=OUTCOME,
    group_cols=GROUP_COLS,
)
overall_fit.fixed_effect_names = [MODEL_CONTROL_COL]

independent_effect_rows = []
for code_column in active_code_columns:
    independent_formula = f"{OUTCOME} ~ {code_column} + {MODEL_CONTROL_TERM}"
    independent_fit = fit_regression(
        independent_formula,
        regression_df,
        outcome_col=OUTCOME,
        group_cols=GROUP_COLS,
    )
    independent_fit.fixed_effect_names = [MODEL_CONTROL_COL]
    independent_effect_rows.append({
        "code_column": code_column,
        "ind_coefficient": independent_fit.params.get(code_column, np.nan),
        "ind_std_error": independent_fit.bse.get(code_column, np.nan),
        "ind_p_value": independent_fit.pvalues.get(code_column, np.nan),
    })

independent_regression_result = pd.DataFrame(
    independent_effect_rows,
    columns=["code_column", "ind_coefficient", "ind_std_error", "ind_p_value"],
)

overall_regression_result = pd.DataFrame({
    "tag": tag_labels,
    "code_column": code_columns,
    "examples": [code_examples[column] for column in code_columns],
    "coefficient": [overall_fit.params.get(column, np.nan) for column in code_columns],
    "std_error": [overall_fit.bse.get(column, np.nan) for column in code_columns],
    "p_value": [overall_fit.pvalues.get(column, np.nan) for column in code_columns],
}).merge(
    independent_regression_result,
    on="code_column",
    how="left",
).assign(
    significance=lambda data: data["p_value"].map(pvalue_to_stars),
    ind_significance=lambda data: data["ind_p_value"].map(pvalue_to_stars),
)

print(f"Overall regression for {OUTCOME}: {overall_fit.summary_line()}")
print(f"Formula: {overall_formula}")
print(f"Independent regressions: {OUTCOME} ~ code + {MODEL_CONTROL_TERM}")
if dropped_code_columns:
    dropped_labels = [tag_labels[code_columns.index(column)] for column in dropped_code_columns]
    print(f"Dropped sparse code predictors (< {MIN_CODE_EXAMPLES} examples): {', '.join(dropped_labels)}")
display(
    overall_regression_result
    .sort_values("coefficient", key=lambda values: values.abs(), ascending=False, na_position="last")
    [[
        "tag", "coefficient", "std_error", "p_value", "significance",
        "ind_coefficient", "ind_std_error", "ind_p_value", "ind_significance",
        "examples",
    ]]
    .style.format({
        "coefficient": "{:.3f}",
        "std_error": "{:.3f}",
        "p_value": "{:.3g}",
        "ind_coefficient": "{:.3f}",
        "ind_std_error": "{:.3f}",
        "ind_p_value": "{:.3g}",
    })
)
```

```
Overall regression for replay_use_nuke_delta: R² = 0.3551, Adj R² = 0.3347, n = 880, (cluster-robust SEs; FE: replay_model_canonical)
Formula: replay_use_nuke_delta ~ code_ethical_prompt_directive + code_ethical_prompt_constraint + code_ethical_prompt_acknowledgement + code_diplomatic_costs + code_conventional_sufficiency + code_counterproductive_to_victory + code_collateral_damages + code_lack_of_capability + code_cause_retaliation + code_game_scenario + code_leader_persona + code_previous_rationale + code_critical_situations + code_existing_investment + code_pursuing_domination + code_nuke_victim + code_credible_deterrence + C(replay_model_canonical)
Independent regressions: replay_use_nuke_delta ~ code + C(replay_model_canonical)
```

|   Unnamed: 0 | tag                             |   coefficient |   std_error |   p_value | significance   |   ind_coefficient |   ind_std_error |   ind_p_value | ind_significance   |   examples |
|--------------|---------------------------------|---------------|-------------|-----------|----------------|-------------------|-----------------|---------------|--------------------|------------|
|            0 | Ethical Prompt: Directive       |       -26.109 |       6.753 |  0.00011  | ***            |           -21.427 |           4.462 |      1.57e-06 | ***                |         81 |
|            5 | Counterproductive to Victory    |       -25.849 |       5.594 |  3.83e-06 | ***            |           -35.251 |           6.141 |      9.44e-09 | ***                |         27 |
|           12 | Critical Situations             |        20.552 |       3.58  |  9.4e-09  | ***            |            27.699 |           3.594 |      1.29e-14 | ***                |        350 |
|            1 | Ethical Prompt: Constraint      |       -12.985 |       4.598 |  0.00474  | **             |           -14.457 |           3.357 |      1.66e-05 | ***                |        549 |
|            4 | Conventional Sufficiency        |       -11.852 |       3.279 |  0.0003   | ***            |           -16.094 |           3.74  |      1.69e-05 | ***                |         96 |
|            6 | Collateral Damages              |        11.292 |       6.2   |  0.0686   | nan            |            12.661 |           7.467 |      0.09     | nan                |         18 |
|           11 | Previous Rationale              |        11.123 |       5.902 |  0.0595   | nan            |            15.987 |           7.29  |      0.0283   | *                  |         19 |
|            7 | Lack of Capability              |        -7.693 |       5.583 |  0.168    | nan            |            -5.832 |           5.662 |      0.303    | nan                |         62 |
|            8 | Cause Retaliation               |         6.971 |       9.408 |  0.459    | nan            |             4.464 |           9.453 |      0.637    | nan                |         14 |
|            2 | Ethical Prompt: Acknowledgement |         5.621 |       4.771 |  0.239    | nan            |            27.644 |           3.819 |      4.51e-13 | ***                |        223 |
|           10 | Leader Persona                  |         5.2   |       4.743 |  0.273    | nan            |            10.736 |           5.12  |      0.036    | *                  |         41 |
|           14 | Pursuing Domination             |         4.47  |       3.71  |  0.228    | nan            |             9.538 |           4.639 |      0.0398   | *                  |        114 |
|           13 | Existing Investment             |         2.476 |       3.382 |  0.464    | nan            |            10.178 |           3.512 |      0.00376  | **                 |        191 |
|           15 | Nuke Victim                     |        -2.324 |       7.184 |  0.746    | nan            |             5.452 |           7.98  |      0.494    | nan                |         23 |
|            3 | Diplomatic Costs                |         2.259 |       5.117 |  0.659    | nan            |             1.817 |           5.619 |      0.746    | nan                |        101 |
|           16 | Credible Deterrence             |        -2.195 |       3.107 |  0.48     | nan            |             0.682 |           3.721 |      0.855    | nan                |        407 |
|            9 | Game Scenario                   |         1.834 |       3.449 |  0.595    | nan            |            13.884 |           4.201 |      0.000951 | ***                |        116 |
