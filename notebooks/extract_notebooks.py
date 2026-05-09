"""
Extract Jupyter notebook content (cells, outputs, images) to readable Markdown files.

Usage (from writings/):
    python vox-deorum-colm2026/notebooks/extract_notebooks.py

Output:
    vox-deorum-colm2026/notebooks/extracted/<folder>/<notebook_stem>/
        <notebook_stem>.md
        images/
            cell_NN_out_M.png
"""

import base64
import json
import re
import sys
from io import StringIO
from pathlib import Path

try:
    import nbformat
except ImportError:
    sys.exit("Missing dependency: pip install nbformat")

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

try:
    from tabulate import tabulate
    HAS_TABULATE = True
except ImportError:
    HAS_TABULATE = False


SCRIPT_DIR = Path(__file__).parent
EXTRACTED_DIR = SCRIPT_DIR / "extracted"


def html_to_markdown_table(html: str) -> str | None:
    """Convert an HTML table to a Markdown table string. Returns None on failure."""
    if not HAS_PANDAS or not HAS_TABULATE:
        return None
    try:
        dfs = pd.read_html(StringIO(html))
        if not dfs:
            return None
        parts = []
        for df in dfs:
            parts.append(tabulate(df, headers="keys", tablefmt="github", showindex=False))
        return "\n\n".join(parts)
    except Exception:
        return None


def process_output(output: dict, images_dir: Path, cell_idx: int, out_idx: int) -> str:
    """Convert a single cell output dict to a Markdown fragment."""
    otype = output.get("output_type", "")
    parts = []

    # --- image ---
    for mime in ("image/png", "image/jpeg"):
        if mime in output.get("data", {}):
            ext = "png" if mime == "image/png" else "jpg"
            img_name = f"cell_{cell_idx:02d}_out_{out_idx}.{ext}"
            img_path = images_dir / img_name
            raw = output["data"][mime]
            # nbformat stores as string; strip whitespace/newlines
            img_bytes = base64.b64decode(raw.replace("\n", "").strip())
            img_path.write_bytes(img_bytes)
            parts.append(f"![{img_name}](images/{img_name})")

    # --- html (tables / styled DataFrames) ---
    if "text/html" in output.get("data", {}):
        html = "".join(output["data"]["text/html"])
        md_table = html_to_markdown_table(html)
        if md_table:
            parts.append(md_table)
        else:
            # Fallback: raw HTML in a fenced block
            parts.append(f"```html\n{html.strip()}\n```")

    # --- plain text (stdout, execute_result without html, etc.) ---
    elif "text/plain" in output.get("data", {}):
        text = "".join(output["data"]["text/plain"]).rstrip()
        if text:
            parts.append(f"```\n{text}\n```")

    # --- stream output ---
    if otype == "stream":
        text = "".join(output.get("text", [])).rstrip()
        if text:
            parts.append(f"```\n{text}\n```")

    # --- errors ---
    if otype == "error":
        lines = [output.get("ename", "Error") + ": " + output.get("evalue", "")]
        # Strip ANSI escape codes from traceback
        ansi_escape = re.compile(r"\x1b\[[0-9;]*m")
        for tb_line in output.get("traceback", []):
            lines.append(ansi_escape.sub("", tb_line))
        parts.append(f"```\n" + "\n".join(lines) + "\n```")

    return "\n\n".join(parts)


def extract_notebook(nb_path: Path) -> None:
    stem = nb_path.stem
    # Include the parent folder name to avoid collisions when different
    # subdirectories contain notebooks with the same stem.
    folder = nb_path.parent.relative_to(SCRIPT_DIR)
    out_dir = EXTRACTED_DIR / folder / stem
    images_dir = out_dir / "images"
    out_dir.mkdir(parents=True, exist_ok=True)

    nb = nbformat.read(nb_path, as_version=4)

    sections = [f"# `{stem}`\n\n*Extracted from `{nb_path.name}`*"]

    code_cell_count = 0
    for cell_idx, cell in enumerate(nb.cells):
        ctype = cell.cell_type
        source = cell.source.strip()

        if ctype == "markdown":
            if source:
                sections.append(source)

        elif ctype == "code":
            code_cell_count += 1
            cell_parts = []

            if source:
                cell_parts.append(f"```python\n{source}\n```")

            outputs = cell.get("outputs", [])
            has_image = any(
                "image/png" in o.get("data", {}) or "image/jpeg" in o.get("data", {})
                for o in outputs
            )
            if has_image:
                images_dir.mkdir(exist_ok=True)

            for out_idx, output in enumerate(outputs):
                fragment = process_output(output, images_dir, cell_idx, out_idx)
                if fragment:
                    cell_parts.append(fragment)

            if cell_parts:
                sections.append("\n\n".join(cell_parts))

        elif ctype == "raw":
            if source:
                sections.append(f"```\n{source}\n```")

    md_content = "\n\n---\n\n".join(sections) + "\n"
    md_path = out_dir / f"{stem}.md"
    md_path.write_text(md_content, encoding="utf-8")

    image_count = len(list(images_dir.glob("*"))) if images_dir.exists() else 0
    print(f"  {stem}: {len(nb.cells)} cells, {image_count} images → {md_path.relative_to(SCRIPT_DIR)}")


def main():
    notebooks = sorted(
        p for p in SCRIPT_DIR.rglob("*.ipynb")
        if ".ipynb_checkpoints" not in str(p)
        and "extracted" not in str(p)
    )

    if not notebooks:
        print("No notebooks found.")
        return

    print(f"Extracting {len(notebooks)} notebook(s) to {EXTRACTED_DIR.relative_to(SCRIPT_DIR)}/\n")
    for nb_path in notebooks:
        extract_notebook(nb_path)

    print(f"\nDone. Open any extracted/<folder>/<name>/<name>.md to read.")


if __name__ == "__main__":
    main()
