# `replay_token_costs`

*Extracted from `replay_token_costs.ipynb`*

---

# Replay Token Cost Accounting

Purpose: compute token usage and estimated API cost for the study-round replay experiments.

Inputs:
- Combined replay CSV data from `load_replay_data()`.
- Per-model pricing from `shared.model_catalog.get_pricing_per_million()`.

Unit of analysis:
- One replay row per `(game_id, player_id, turn, condition, replay_model, repetition)`.

Definitions:
- `Combined Output` is `reasoning_tokens + output_tokens`.
- `Total Cost` applies input and output prices per million tokens to observed token counts.

---

```python
import sys
sys.path.insert(0, '..')

import pandas as pd
from IPython.display import display

from shared.plot_utilities import setup_notebook_display
from shared.model_catalog import get_pricing_per_million
from nuke.utils.load_replay_data import (
    add_canonical_replay_model,
    load_replay_data,
)

setup_notebook_display()
df = load_replay_data()
df = add_canonical_replay_model(df)
df["combined_output_tokens"] = df["reasoning_tokens"] + df["output_tokens"]


print(f"Token columns present: input_tokens, reasoning_tokens, output_tokens")
print(f"Rows with any NaN tokens: {df[['input_tokens', 'reasoning_tokens', 'output_tokens']].isna().any(axis=1).sum()}")
print(f"Rows with zero input_tokens: {(df['input_tokens'] == 0).sum()}")
```

```
✓ Loaded 40,560 rows from 104 files
  Conditions   : original, no-rationale, high-stakes, high-stakes-no-rationale, ethical, ethical-high-stakes, ethical-no-rationale, high-stakes-no-rationale-ethical
  Replay models: DeepSeek-V3.2, DeepSeek-V4, GLM-4.7, GLM-5.1, Gemini-3.5-Flash, Gemma-4, Kimi-K2.5, Kimi-K2.6, MiniMax-M2.7, Mistral-Small-4, Qwen-3.5, Qwen-3.6-27B, gpt-oss-120b

  Rows per condition × replay model:
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                                         DeepSeek-V3.2       DeepSeek-V4           GLM-4.7           GLM-5.1  Gemini-3.5-Flash           Gemma-4         Kimi-K2.5         Kimi-K2.6      MiniMax-M2.7   Mistral-Small-4          Qwen-3.5      Qwen-3.6-27B      gpt-oss-120b             Total
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                            original               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
                        no-rationale               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
                         high-stakes               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
            high-stakes-no-rationale               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
                             ethical               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
                 ethical-high-stakes               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
                ethical-no-rationale               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
    high-stakes-no-rationale-ethical               390               390               390               390               390               390               390               390               390               390               390               390               390              5070
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
                               Total              3120              3120              3120              3120              3120              3120              3120              3120              3120              3120              3120              3120              3120             40560
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Token columns present: input_tokens, reasoning_tokens, output_tokens
Rows with any NaN tokens: 0
Rows with zero input_tokens: 356
```

---

```python
PRICING_PER_MILLION = get_pricing_per_million()
PRICING_PER_MILLION
```

```
{'GPT-OSS-120B': {'input_per_million': 0.039, 'output_per_million': 0.19},
 'Sonnet-4.5': {'input_per_million': 3.0, 'output_per_million': 15.0},
 'GLM-4.7': {'input_per_million': 0.39, 'output_per_million': 1.75},
 'GLM-5.1': {'input_per_million': 1.05, 'output_per_million': 3.5},
 'Minimax-M2.5': {'input_per_million': 0.2, 'output_per_million': 1.17},
 'Minimax-M2.7': {'input_per_million': 0.3, 'output_per_million': 1.2},
 'Kimi-K2.5': {'input_per_million': 0.4, 'output_per_million': 2},
 'Kimi-K2.6': {'input_per_million': 0.75, 'output_per_million': 3.5},
 'DeepSeek-3.2': {'input_per_million': 0.26, 'output_per_million': 0.38},
 'DeepSeek-4': {'input_per_million': 0.435, 'output_per_million': 0.87},
 'Qwen-3.5': {'input_per_million': 0.39, 'output_per_million': 2.34},
 'Qwen-3.6-27B': {'input_per_million': 0.13, 'output_per_million': 0.76},
 'Mistral-Small-4': {'input_per_million': 0.15, 'output_per_million': 0.6},
 'Gemma-4': {'input_per_million': 0.13, 'output_per_million': 0.38},
 'Gemini-3.5-Flash': {'input_per_million': 0.75, 'output_per_million': 4.5},
 'GPT-5.4': {'input_per_million': 2.5, 'output_per_million': 15}}
```

---

```python
def format_number(value):
    if pd.isna(value):
        return 'N/A'
    return f'{value:,.0f}'


def format_currency(value):
    if pd.isna(value):
        return 'N/A'
    return f'${value:,.2f}'


def format_cost_per_unit(model_name, pricing_per_million):
    p = pricing_per_million.get(model_name, {})
    ip, op = p.get('input_per_million'), p.get('output_per_million')
    if ip is None or op is None:
        return 'Missing pricing'
    return f"${ip:,.2f} in / ${op:,.2f} out per 1M"


# Compute per-row cost
df['input_price_per_million'] = df['replay_model_canonical'].map(
    lambda m: PRICING_PER_MILLION.get(m, {}).get('input_per_million')
)
df['output_price_per_million'] = df['replay_model_canonical'].map(
    lambda m: PRICING_PER_MILLION.get(m, {}).get('output_per_million')
)
df['row_cost'] = (
    df['input_tokens'] / 1_000_000 * df['input_price_per_million']
    + df['combined_output_tokens'] / 1_000_000 * df['output_price_per_million']
)

# Summarize by condition and replay model
summary = (
    df.groupby(['condition', 'replay_model_canonical'], observed=True)
    .agg(
        Rows=('row_cost', 'size'),
        Total_Input=('input_tokens', 'sum'),
        Avg_Input=('input_tokens', 'mean'),
        Total_Output=('combined_output_tokens', 'sum'),
        Avg_Output=('combined_output_tokens', 'mean'),
        Total_Cost=('row_cost', 'sum'),
    )
    .reset_index()
    .rename(columns={
        'condition': 'Condition',
        'replay_model_canonical': 'Replay Model',
        'Total_Input': 'Total Input',
        'Avg_Input': 'Avg. Input',
        'Total_Output': 'Total Output',
        'Avg_Output': 'Avg. Output',
        'Total_Cost': 'Total Cost',
    })
)

summary['Cost Per Unit'] = summary['Replay Model'].map(
    lambda m: format_cost_per_unit(m, PRICING_PER_MILLION)
)

# Display formatted
summary_display = summary.copy()
for col in ['Rows', 'Total Input', 'Avg. Input', 'Total Output', 'Avg. Output']:
    summary_display[col] = summary_display[col].map(format_number)
summary_display['Total Cost'] = summary_display['Total Cost'].map(format_currency)

display(summary_display)
print(summary_display.to_markdown(index=False))
```

| Unnamed: 0   | Condition                        | Replay Model    | Rows   | Total Input   | Avg. Input   | Total Output   | Avg. Output   | Total Cost   | Cost Per Unit               |
|--------------|----------------------------------|-----------------|--------|---------------|--------------|----------------|---------------|--------------|-----------------------------|
| 0            | original                         | DeepSeek-3.2    | 390    | 20879003      | 53536        | 885504         | 2271          | $5.77        | $0.26 in / $0.38 out per 1M |
| 1            | original                         | DeepSeek-4      | 390    | 21998413      | 56406        | 1360157        | 3488          | $10.75       | $0.43 in / $0.87 out per 1M |
| 2            | original                         | GLM-4.7         | 390    | 21306145      | 54631        | 745496         | 1912          | $9.61        | $0.39 in / $1.75 out per 1M |
| 3            | original                         | GLM-5.1         | 390    | 21179872      | 54307        | 2261041        | 5798          | $30.15       | $1.05 in / $3.50 out per 1M |
| 4            | original                         | GPT-OSS-120B    | 390    | 21084339      | 54062        | 568347         | 1457          | $0.93        | $0.04 in / $0.19 out per 1M |
| ...          | ...                              | ...             | ...    | ...           | ...          | ...            | ...           | ...          | ...                         |
| 99           | high-stakes-no-rationale-ethical | Kimi-K2.6       | 390    | 22349164      | 57306        | 4168846        | 10689         | $31.35       | $0.75 in / $3.50 out per 1M |
| 100          | high-stakes-no-rationale-ethical | Minimax-M2.7    | 390    | 29147132      | 74736        | 540071         | 1385          | $9.39        | $0.30 in / $1.20 out per 1M |
| 101          | high-stakes-no-rationale-ethical | Mistral-Small-4 | 390    | 20496619      | 52555        | 770283         | 1975          | $3.54        | $0.15 in / $0.60 out per 1M |
| 102          | high-stakes-no-rationale-ethical | Qwen-3.5        | 390    | 25662733      | 65802        | 820672         | 2104          | $11.93       | $0.39 in / $2.34 out per 1M |
| 103          | high-stakes-no-rationale-ethical | Qwen-3.6-27B    | 390    | 21019784      | 53897        | 579872         | 1487          | $3.17        | $0.13 in / $0.76 out per 1M |

```
| Condition                        | Replay Model     |   Rows | Total Input   | Avg. Input   | Total Output   | Avg. Output   | Total Cost   | Cost Per Unit               |
|:---------------------------------|:-----------------|-------:|:--------------|:-------------|:---------------|:--------------|:-------------|:----------------------------|
| original                         | DeepSeek-3.2     |    390 | 20,879,003    | 53,536       | 885,504        | 2,271         | $5.77        | $0.26 in / $0.38 out per 1M |
| original                         | DeepSeek-4       |    390 | 21,998,413    | 56,406       | 1,360,157      | 3,488         | $10.75       | $0.43 in / $0.87 out per 1M |
| original                         | GLM-4.7          |    390 | 21,306,145    | 54,631       | 745,496        | 1,912         | $9.61        | $0.39 in / $1.75 out per 1M |
| original                         | GLM-5.1          |    390 | 21,179,872    | 54,307       | 2,261,041      | 5,798         | $30.15       | $1.05 in / $3.50 out per 1M |
| original                         | GPT-OSS-120B     |    390 | 21,084,339    | 54,062       | 568,347        | 1,457         | $0.93        | $0.04 in / $0.19 out per 1M |
| original                         | Gemini-3.5-Flash |    390 | 24,455,479    | 62,706       | 3,156,131      | 8,093         | $32.54       | $0.75 in / $4.50 out per 1M |
| original                         | Gemma-4          |    390 | 21,715,142    | 55,680       | 645,671        | 1,656         | $3.07        | $0.13 in / $0.38 out per 1M |
| original                         | Kimi-K2.5        |    390 | 20,829,954    | 53,410       | 1,235,542      | 3,168         | $10.80       | $0.40 in / $2.00 out per 1M |
| original                         | Kimi-K2.6        |    390 | 22,247,601    | 57,045       | 4,477,669      | 11,481        | $32.36       | $0.75 in / $3.50 out per 1M |
| original                         | Minimax-M2.7     |    390 | 24,713,822    | 63,369       | 524,928        | 1,346         | $8.04        | $0.30 in / $1.20 out per 1M |
| original                         | Mistral-Small-4  |    390 | 21,265,473    | 54,527       | 563,663        | 1,445         | $3.53        | $0.15 in / $0.60 out per 1M |
| original                         | Qwen-3.5         |    390 | 20,959,841    | 53,743       | 750,566        | 1,925         | $9.93        | $0.39 in / $2.34 out per 1M |
| original                         | Qwen-3.6-27B     |    390 | 22,248,130    | 57,046       | 565,514        | 1,450         | $3.32        | $0.13 in / $0.76 out per 1M |
| no-rationale                     | DeepSeek-3.2     |    390 | 20,358,440    | 52,201       | 1,022,276      | 2,621         | $5.68        | $0.26 in / $0.38 out per 1M |
| no-rationale                     | DeepSeek-4       |    390 | 20,666,061    | 52,990       | 1,243,676      | 3,189         | $10.07       | $0.43 in / $0.87 out per 1M |
| no-rationale                     | GLM-4.7          |    390 | 20,684,453    | 53,037       | 666,706        | 1,710         | $9.23        | $0.39 in / $1.75 out per 1M |
| no-rationale                     | GLM-5.1          |    390 | 20,654,291    | 52,960       | 1,659,174      | 4,254         | $27.49       | $1.05 in / $3.50 out per 1M |
| no-rationale                     | GPT-OSS-120B     |    390 | 20,979,424    | 53,793       | 630,739        | 1,617         | $0.94        | $0.04 in / $0.19 out per 1M |
| no-rationale                     | Gemini-3.5-Flash |    390 | 23,991,621    | 61,517       | 2,666,631      | 6,838         | $29.99       | $0.75 in / $4.50 out per 1M |
| no-rationale                     | Gemma-4          |    390 | 21,210,855    | 54,387       | 616,752        | 1,581         | $2.99        | $0.13 in / $0.38 out per 1M |
| no-rationale                     | Kimi-K2.5        |    390 | 20,308,710    | 52,074       | 1,195,461      | 3,065         | $10.51       | $0.40 in / $2.00 out per 1M |
| no-rationale                     | Kimi-K2.6        |    390 | 20,623,693    | 52,881       | 3,972,919      | 10,187        | $29.37       | $0.75 in / $3.50 out per 1M |
| no-rationale                     | Minimax-M2.7     |    390 | 26,358,029    | 67,585       | 707,113        | 1,813         | $8.76        | $0.30 in / $1.20 out per 1M |
| no-rationale                     | Mistral-Small-4  |    390 | 20,820,730    | 53,386       | 585,077        | 1,500         | $3.47        | $0.15 in / $0.60 out per 1M |
| no-rationale                     | Qwen-3.5         |    390 | 20,775,694    | 53,271       | 834,142        | 2,139         | $10.05       | $0.39 in / $2.34 out per 1M |
| no-rationale                     | Qwen-3.6-27B     |    390 | 20,650,522    | 52,950       | 487,614        | 1,250         | $3.06        | $0.13 in / $0.76 out per 1M |
| high-stakes                      | DeepSeek-3.2     |    390 | 21,322,181    | 54,672       | 846,481        | 2,170         | $5.87        | $0.26 in / $0.38 out per 1M |
| high-stakes                      | DeepSeek-4       |    390 | 22,334,926    | 57,269       | 1,405,310      | 3,603         | $10.94       | $0.43 in / $0.87 out per 1M |
| high-stakes                      | GLM-4.7          |    390 | 21,931,409    | 56,234       | 729,075        | 1,869         | $9.83        | $0.39 in / $1.75 out per 1M |
| high-stakes                      | GLM-5.1          |    390 | 21,532,339    | 55,211       | 2,222,103      | 5,698         | $30.39       | $1.05 in / $3.50 out per 1M |
| high-stakes                      | GPT-OSS-120B     |    390 | 20,794,378    | 53,319       | 588,214        | 1,508         | $0.92        | $0.04 in / $0.19 out per 1M |
| high-stakes                      | Gemini-3.5-Flash |    390 | 25,360,791    | 65,028       | 3,345,690      | 8,579         | $34.08       | $0.75 in / $4.50 out per 1M |
| high-stakes                      | Gemma-4          |    390 | 21,346,560    | 54,735       | 682,236        | 1,749         | $3.03        | $0.13 in / $0.38 out per 1M |
| high-stakes                      | Kimi-K2.5        |    390 | 20,915,655    | 53,630       | 1,357,069      | 3,480         | $11.08       | $0.40 in / $2.00 out per 1M |
| high-stakes                      | Kimi-K2.6        |    390 | 22,861,769    | 58,620       | 4,844,465      | 12,422        | $34.10       | $0.75 in / $3.50 out per 1M |
| high-stakes                      | Minimax-M2.7     |    390 | 24,597,425    | 63,070       | 523,373        | 1,342         | $8.01        | $0.30 in / $1.20 out per 1M |
| high-stakes                      | Mistral-Small-4  |    390 | 21,504,196    | 55,139       | 713,628        | 1,830         | $3.65        | $0.15 in / $0.60 out per 1M |
| high-stakes                      | Qwen-3.5         |    390 | 34,056,759    | 87,325       | 971,748        | 2,492         | $15.56       | $0.39 in / $2.34 out per 1M |
| high-stakes                      | Qwen-3.6-27B     |    390 | 21,675,678    | 55,579       | 680,320        | 1,744         | $3.33        | $0.13 in / $0.76 out per 1M |
| high-stakes-no-rationale         | DeepSeek-3.2     |    390 | 20,609,816    | 52,846       | 962,915        | 2,469         | $5.72        | $0.26 in / $0.38 out per 1M |
| high-stakes-no-rationale         | DeepSeek-4       |    390 | 20,774,325    | 53,268       | 1,291,929      | 3,313         | $10.16       | $0.43 in / $0.87 out per 1M |
| high-stakes-no-rationale         | GLM-4.7          |    390 | 5,992,825     | 15,366       | 187,583        | 481           | $2.67        | $0.39 in / $1.75 out per 1M |
| high-stakes-no-rationale         | GLM-5.1          |    390 | 20,826,458    | 53,401       | 1,766,367      | 4,529         | $28.05       | $1.05 in / $3.50 out per 1M |
| high-stakes-no-rationale         | GPT-OSS-120B     |    390 | 20,475,931    | 52,502       | 661,072        | 1,695         | $0.92        | $0.04 in / $0.19 out per 1M |
| high-stakes-no-rationale         | Gemini-3.5-Flash |    390 | 25,936,053    | 66,503       | 2,812,415      | 7,211         | $32.11       | $0.75 in / $4.50 out per 1M |
| high-stakes-no-rationale         | Gemma-4          |    390 | 20,669,018    | 52,997       | 654,623        | 1,679         | $2.94        | $0.13 in / $0.38 out per 1M |
| high-stakes-no-rationale         | Kimi-K2.5        |    390 | 20,392,176    | 52,288       | 1,353,340      | 3,470         | $10.86       | $0.40 in / $2.00 out per 1M |
| high-stakes-no-rationale         | Kimi-K2.6        |    390 | 20,678,485    | 53,022       | 4,084,785      | 10,474        | $29.81       | $0.75 in / $3.50 out per 1M |
| high-stakes-no-rationale         | Minimax-M2.7     |    390 | 29,137,867    | 74,712       | 542,346        | 1,391         | $9.39        | $0.30 in / $1.20 out per 1M |
| high-stakes-no-rationale         | Mistral-Small-4  |    390 | 21,064,516    | 54,012       | 737,493        | 1,891         | $3.60        | $0.15 in / $0.60 out per 1M |
| high-stakes-no-rationale         | Qwen-3.5         |    390 | 31,284,957    | 80,218       | 989,436        | 2,537         | $14.52       | $0.39 in / $2.34 out per 1M |
| high-stakes-no-rationale         | Qwen-3.6-27B     |    390 | 21,853,480    | 56,035       | 552,105        | 1,416         | $3.26        | $0.13 in / $0.76 out per 1M |
| ethical                          | DeepSeek-3.2     |    390 | 21,197,247    | 54,352       | 932,489        | 2,391         | $5.87        | $0.26 in / $0.38 out per 1M |
| ethical                          | DeepSeek-4       |    390 | 21,293,051    | 54,598       | 1,366,313      | 3,503         | $10.45       | $0.43 in / $0.87 out per 1M |
| ethical                          | GLM-4.7          |    390 | 21,621,063    | 55,439       | 742,213        | 1,903         | $9.73        | $0.39 in / $1.75 out per 1M |
| ethical                          | GLM-5.1          |    390 | 21,126,758    | 54,171       | 2,291,235      | 5,875         | $30.20       | $1.05 in / $3.50 out per 1M |
| ethical                          | GPT-OSS-120B     |    390 | 21,114,190    | 54,139       | 609,656        | 1,563         | $0.94        | $0.04 in / $0.19 out per 1M |
| ethical                          | Gemini-3.5-Flash |    390 | 23,344,055    | 59,857       | 3,139,522      | 8,050         | $31.64       | $0.75 in / $4.50 out per 1M |
| ethical                          | Gemma-4          |    390 | 23,427,512    | 60,071       | 694,395        | 1,780         | $3.31        | $0.13 in / $0.38 out per 1M |
| ethical                          | Kimi-K2.5        |    390 | 21,434,596    | 54,961       | 1,243,565      | 3,189         | $11.06       | $0.40 in / $2.00 out per 1M |
| ethical                          | Kimi-K2.6        |    390 | 21,115,905    | 54,143       | 4,272,884      | 10,956        | $30.79       | $0.75 in / $3.50 out per 1M |
| ethical                          | Minimax-M2.7     |    390 | 24,475,410    | 62,757       | 525,054        | 1,346         | $7.97        | $0.30 in / $1.20 out per 1M |
| ethical                          | Mistral-Small-4  |    390 | 21,250,869    | 54,489       | 567,357        | 1,455         | $3.53        | $0.15 in / $0.60 out per 1M |
| ethical                          | Qwen-3.5         |    390 | 22,362,279    | 57,339       | 769,718        | 1,974         | $10.52       | $0.39 in / $2.34 out per 1M |
| ethical                          | Qwen-3.6-27B     |    390 | 21,166,633    | 54,273       | 579,953        | 1,487         | $3.19        | $0.13 in / $0.76 out per 1M |
| ethical-high-stakes              | DeepSeek-3.2     |    390 | 21,108,428    | 54,124       | 933,542        | 2,394         | $5.84        | $0.26 in / $0.38 out per 1M |
| ethical-high-stakes              | DeepSeek-4       |    390 | 21,065,405    | 54,014       | 1,413,953      | 3,626         | $10.39       | $0.43 in / $0.87 out per 1M |
| ethical-high-stakes              | GLM-4.7          |    390 | 22,223,282    | 56,983       | 745,214        | 1,911         | $9.97        | $0.39 in / $1.75 out per 1M |
| ethical-high-stakes              | GLM-5.1          |    390 | 21,926,379    | 56,221       | 2,295,281      | 5,885         | $31.06       | $1.05 in / $3.50 out per 1M |
| ethical-high-stakes              | GPT-OSS-120B     |    390 | 20,879,994    | 53,538       | 592,824        | 1,520         | $0.93        | $0.04 in / $0.19 out per 1M |
| ethical-high-stakes              | Gemini-3.5-Flash |    390 | 24,710,581    | 63,360       | 3,467,749      | 8,892         | $34.14       | $0.75 in / $4.50 out per 1M |
| ethical-high-stakes              | Gemma-4          |    390 | 21,925,238    | 56,219       | 690,199        | 1,770         | $3.11        | $0.13 in / $0.38 out per 1M |
| ethical-high-stakes              | Kimi-K2.5        |    390 | 20,853,156    | 53,470       | 1,444,400      | 3,704         | $11.23       | $0.40 in / $2.00 out per 1M |
| ethical-high-stakes              | Kimi-K2.6        |    390 | 22,331,104    | 57,259       | 4,401,229      | 11,285        | $32.15       | $0.75 in / $3.50 out per 1M |
| ethical-high-stakes              | Minimax-M2.7     |    390 | 24,808,240    | 63,611       | 653,096        | 1,675         | $8.23        | $0.30 in / $1.20 out per 1M |
| ethical-high-stakes              | Mistral-Small-4  |    390 | 20,991,136    | 53,823       | 726,536        | 1,863         | $3.58        | $0.15 in / $0.60 out per 1M |
| ethical-high-stakes              | Qwen-3.5         |    390 | 27,898,254    | 71,534       | 785,362        | 2,014         | $12.72       | $0.39 in / $2.34 out per 1M |
| ethical-high-stakes              | Qwen-3.6-27B     |    390 | 21,377,903    | 54,815       | 754,901        | 1,936         | $3.35        | $0.13 in / $0.76 out per 1M |
| ethical-no-rationale             | DeepSeek-3.2     |    390 | 20,387,110    | 52,275       | 991,090        | 2,541         | $5.68        | $0.26 in / $0.38 out per 1M |
| ethical-no-rationale             | DeepSeek-4       |    390 | 20,772,023    | 53,262       | 1,234,301      | 3,165         | $10.11       | $0.43 in / $0.87 out per 1M |
| ethical-no-rationale             | GLM-4.7          |    390 | 20,975,191    | 53,783       | 712,645        | 1,827         | $9.43        | $0.39 in / $1.75 out per 1M |
| ethical-no-rationale             | GLM-5.1          |    390 | 20,693,615    | 53,061       | 1,726,075      | 4,426         | $27.77       | $1.05 in / $3.50 out per 1M |
| ethical-no-rationale             | GPT-OSS-120B     |    390 | 20,392,693    | 52,289       | 642,261        | 1,647         | $0.92        | $0.04 in / $0.19 out per 1M |
| ethical-no-rationale             | Gemini-3.5-Flash |    390 | 23,713,697    | 60,804       | 2,612,489      | 6,699         | $29.54       | $0.75 in / $4.50 out per 1M |
| ethical-no-rationale             | Gemma-4          |    390 | 21,137,458    | 54,199       | 648,369        | 1,662         | $2.99        | $0.13 in / $0.38 out per 1M |
| ethical-no-rationale             | Kimi-K2.5        |    390 | 20,323,140    | 52,111       | 1,304,013      | 3,344         | $10.74       | $0.40 in / $2.00 out per 1M |
| ethical-no-rationale             | Kimi-K2.6        |    390 | 22,052,772    | 56,546       | 4,034,487      | 10,345        | $30.66       | $0.75 in / $3.50 out per 1M |
| ethical-no-rationale             | Minimax-M2.7     |    390 | 26,392,273    | 67,672       | 517,009        | 1,326         | $8.54        | $0.30 in / $1.20 out per 1M |
| ethical-no-rationale             | Mistral-Small-4  |    390 | 20,711,800    | 53,107       | 642,773        | 1,648         | $3.49        | $0.15 in / $0.60 out per 1M |
| ethical-no-rationale             | Qwen-3.5         |    390 | 25,397,783    | 65,123       | 826,522        | 2,119         | $11.84       | $0.39 in / $2.34 out per 1M |
| ethical-no-rationale             | Qwen-3.6-27B     |    390 | 21,399,467    | 54,870       | 506,660        | 1,299         | $3.17        | $0.13 in / $0.76 out per 1M |
| high-stakes-no-rationale-ethical | DeepSeek-3.2     |    390 | 20,655,922    | 52,964       | 955,949        | 2,451         | $5.73        | $0.26 in / $0.38 out per 1M |
| high-stakes-no-rationale-ethical | DeepSeek-4       |    390 | 21,100,037    | 54,103       | 1,274,664      | 3,268         | $10.29       | $0.43 in / $0.87 out per 1M |
| high-stakes-no-rationale-ethical | GLM-4.7          |    390 | 20,782,453    | 53,288       | 719,001        | 1,844         | $9.36        | $0.39 in / $1.75 out per 1M |
| high-stakes-no-rationale-ethical | GLM-5.1          |    390 | 20,839,201    | 53,434       | 1,818,881      | 4,664         | $28.25       | $1.05 in / $3.50 out per 1M |
| high-stakes-no-rationale-ethical | GPT-OSS-120B     |    390 | 20,701,879    | 53,082       | 691,426        | 1,773         | $0.94        | $0.04 in / $0.19 out per 1M |
| high-stakes-no-rationale-ethical | Gemini-3.5-Flash |    390 | 28,033,679    | 71,881       | 2,813,357      | 7,214         | $33.69       | $0.75 in / $4.50 out per 1M |
| high-stakes-no-rationale-ethical | Gemma-4          |    390 | 20,367,609    | 52,225       | 677,697        | 1,738         | $2.91        | $0.13 in / $0.38 out per 1M |
| high-stakes-no-rationale-ethical | Kimi-K2.5        |    390 | 20,406,606    | 52,325       | 1,341,507      | 3,440         | $10.85       | $0.40 in / $2.00 out per 1M |
| high-stakes-no-rationale-ethical | Kimi-K2.6        |    390 | 22,349,164    | 57,306       | 4,168,846      | 10,689        | $31.35       | $0.75 in / $3.50 out per 1M |
| high-stakes-no-rationale-ethical | Minimax-M2.7     |    390 | 29,147,132    | 74,736       | 540,071        | 1,385         | $9.39        | $0.30 in / $1.20 out per 1M |
| high-stakes-no-rationale-ethical | Mistral-Small-4  |    390 | 20,496,619    | 52,555       | 770,283        | 1,975         | $3.54        | $0.15 in / $0.60 out per 1M |
| high-stakes-no-rationale-ethical | Qwen-3.5         |    390 | 25,662,733    | 65,802       | 820,672        | 2,104         | $11.93       | $0.39 in / $2.34 out per 1M |
| high-stakes-no-rationale-ethical | Qwen-3.6-27B     |    390 | 21,019,784    | 53,897       | 579,872        | 1,487         | $3.17        | $0.13 in / $0.76 out per 1M |
```

---

```python
# Summary by replay model (collapsed across conditions)
model_summary = (
    df.groupby('replay_model_canonical', observed=True)
    .agg(
        Rows=('row_cost', 'size'),
        Conditions=('condition', 'nunique'),
        Total_Input=('input_tokens', 'sum'),
        Avg_Input=('input_tokens', 'mean'),
        Total_Output=('combined_output_tokens', 'sum'),
        Avg_Output=('combined_output_tokens', 'mean'),
        Total_Cost=('row_cost', 'sum'),
    )
    .reset_index()
    .rename(columns={
        'replay_model_canonical': 'Replay Model',
        'Total_Input': 'Total Input',
        'Avg_Input': 'Avg. Input',
        'Total_Output': 'Total Output',
        'Avg_Output': 'Avg. Output',
        'Total_Cost': 'Total Cost',
    })
)

model_summary['Cost Per Unit'] = model_summary['Replay Model'].map(
    lambda m: format_cost_per_unit(m, PRICING_PER_MILLION)
)

model_summary_display = model_summary.copy()
for col in ['Rows', 'Conditions', 'Total Input', 'Avg. Input', 'Total Output', 'Avg. Output']:
    model_summary_display[col] = model_summary_display[col].map(format_number)
model_summary_display['Total Cost'] = model_summary_display['Total Cost'].map(format_currency)

display(model_summary_display)
print(model_summary_display.to_markdown(index=False))

overall_total = summary['Total Cost'].sum()
print(f"\nOverall Total Cost: {format_currency(overall_total)}")
```

|   Unnamed: 0 | Replay Model     |   Rows |   Conditions |   Total Input |   Avg. Input |   Total Output |   Avg. Output | Total Cost   | Cost Per Unit               |
|--------------|------------------|--------|--------------|---------------|--------------|----------------|---------------|--------------|-----------------------------|
|            0 | DeepSeek-3.2     |   3120 |            8 |     166518147 |        53371 |        7530246 |          2414 | $46.16       | $0.26 in / $0.38 out per 1M |
|            1 | DeepSeek-4       |   3120 |            8 |     170004241 |        54489 |       10590303 |          3394 | $83.17       | $0.43 in / $0.87 out per 1M |
|            2 | GLM-4.7          |   3120 |            8 |     155516821 |        49845 |        5247933 |          1682 | $69.84       | $0.39 in / $1.75 out per 1M |
|            3 | GLM-5.1          |   3120 |            8 |     168778913 |        54096 |       16040157 |          5141 | $233.36      | $1.05 in / $3.50 out per 1M |
|            4 | GPT-OSS-120B     |   3120 |            8 |     166422828 |        53341 |        4984539 |          1598 | $7.44        | $0.04 in / $0.19 out per 1M |
|            5 | Gemini-3.5-Flash |   3120 |            8 |     199545956 |        63957 |       24013984 |          7697 | $257.72      | $0.75 in / $4.50 out per 1M |
|            6 | Gemma-4          |   3120 |            8 |     171799392 |        55064 |        5309942 |          1702 | $24.35       | $0.13 in / $0.38 out per 1M |
|            7 | Kimi-K2.5        |   3120 |            8 |     165463993 |        53033 |       10474897 |          3357 | $87.14       | $0.40 in / $2.00 out per 1M |
|            8 | Kimi-K2.6        |   3120 |            8 |     174260493 |        55853 |       34257284 |         10980 | $250.60      | $0.75 in / $3.50 out per 1M |
|            9 | Minimax-M2.7     |   3120 |            8 |     209630198 |        67189 |        4532990 |          1453 | $68.33       | $0.30 in / $1.20 out per 1M |
|           10 | Mistral-Small-4  |   3120 |            8 |     168105339 |        53880 |        5306810 |          1701 | $28.40       | $0.15 in / $0.60 out per 1M |
|           11 | Qwen-3.5         |   3120 |            8 |     208398300 |        66794 |        6748166 |          2163 | $97.07       | $0.39 in / $2.34 out per 1M |
|           12 | Qwen-3.6-27B     |   3120 |            8 |     171391597 |        54933 |        4706939 |          1509 | $25.86       | $0.13 in / $0.76 out per 1M |

```
| Replay Model     | Rows   |   Conditions | Total Input   | Avg. Input   | Total Output   | Avg. Output   | Total Cost   | Cost Per Unit               |
|:-----------------|:-------|-------------:|:--------------|:-------------|:---------------|:--------------|:-------------|:----------------------------|
| DeepSeek-3.2     | 3,120  |            8 | 166,518,147   | 53,371       | 7,530,246      | 2,414         | $46.16       | $0.26 in / $0.38 out per 1M |
| DeepSeek-4       | 3,120  |            8 | 170,004,241   | 54,489       | 10,590,303     | 3,394         | $83.17       | $0.43 in / $0.87 out per 1M |
| GLM-4.7          | 3,120  |            8 | 155,516,821   | 49,845       | 5,247,933      | 1,682         | $69.84       | $0.39 in / $1.75 out per 1M |
| GLM-5.1          | 3,120  |            8 | 168,778,913   | 54,096       | 16,040,157     | 5,141         | $233.36      | $1.05 in / $3.50 out per 1M |
| GPT-OSS-120B     | 3,120  |            8 | 166,422,828   | 53,341       | 4,984,539      | 1,598         | $7.44        | $0.04 in / $0.19 out per 1M |
| Gemini-3.5-Flash | 3,120  |            8 | 199,545,956   | 63,957       | 24,013,984     | 7,697         | $257.72      | $0.75 in / $4.50 out per 1M |
| Gemma-4          | 3,120  |            8 | 171,799,392   | 55,064       | 5,309,942      | 1,702         | $24.35       | $0.13 in / $0.38 out per 1M |
| Kimi-K2.5        | 3,120  |            8 | 165,463,993   | 53,033       | 10,474,897     | 3,357         | $87.14       | $0.40 in / $2.00 out per 1M |
| Kimi-K2.6        | 3,120  |            8 | 174,260,493   | 55,853       | 34,257,284     | 10,980        | $250.60      | $0.75 in / $3.50 out per 1M |
| Minimax-M2.7     | 3,120  |            8 | 209,630,198   | 67,189       | 4,532,990      | 1,453         | $68.33       | $0.30 in / $1.20 out per 1M |
| Mistral-Small-4  | 3,120  |            8 | 168,105,339   | 53,880       | 5,306,810      | 1,701         | $28.40       | $0.15 in / $0.60 out per 1M |
| Qwen-3.5         | 3,120  |            8 | 208,398,300   | 66,794       | 6,748,166      | 2,163         | $97.07       | $0.39 in / $2.34 out per 1M |
| Qwen-3.6-27B     | 3,120  |            8 | 171,391,597   | 54,933       | 4,706,939      | 1,509         | $25.86       | $0.13 in / $0.76 out per 1M |

Overall Total Cost: $1,279.41
```
