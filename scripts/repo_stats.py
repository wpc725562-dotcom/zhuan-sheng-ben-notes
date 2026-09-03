#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""统计仓库四科真实资产量，输出可直接粘贴进 README 的 Markdown 表格。

README 的科目表此前长期失真（笔记数四科全错、高数/计算机模拟卷写成"—"、
计算机年份写了尚未开考的 2027），2026-09-04 曾因此让外部模型误判为
"高数与计算机模拟卷实质正文缺失"。本脚本把口径固化成代码，避免再次口算。

用法：python scripts/repo_stats.py
"""
from __future__ import annotations

import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 站点目录名 -> (科目标签, 分值, 历年真题目录名)
SUBJECTS = [
    ("politics", "政治理论", 100, "政治理论"),
    ("english", "公共英语", 100, "公共英语"),
    ("math", "高等数学", 100, "高等数学"),
    ("computer", "计算机基础与程序设计", 200, "计算机程序设计"),
]

MIN_NOTE_CHARS = 800  # 低于此字符数视为占位页，不计入"笔记"


def read(path: str) -> str:
    return io.open(path, encoding="utf-8", errors="ignore").read()


def count_notes(slug: str) -> int:
    """docs/posts/<slug>/ 下的实质笔记数。

    排除：index.md、模拟卷目录、配套答案页、正文过短的占位页。
    """
    n = 0
    for f in glob.glob(os.path.join(ROOT, "docs", "posts", slug, "**", "*.md"), recursive=True):
        base = os.path.basename(f)
        rel = os.path.relpath(f, ROOT).replace("\\", "/")
        if base == "index.md" or "模拟卷" in rel or "答案" in base:
            continue
        if len(read(f)) < MIN_NOTE_CHARS:
            continue
        n += 1
    return n


def count_papers(paper_dir: str) -> tuple[int, str]:
    """历年真题/<paper_dir>/ 下的年份页数与年份跨度。排除 _索引 与 00- 说明页。"""
    files = [
        f
        for f in glob.glob(os.path.join(ROOT, "历年真题", paper_dir, "*.md"))
        if not os.path.basename(f).startswith(("_", "0"))
    ]
    years = sorted({y for f in files for y in re.findall(r"20\d\d", os.path.basename(f))})
    span = f"{years[0]}–{years[-1]}" if years else "-"
    return len(files), span


def count_mock_papers(slug: str) -> int:
    """模拟卷套数（不含配套 -答案.md）。"""
    return len(
        [
            f
            for f in glob.glob(os.path.join(ROOT, "docs", "posts", slug, "模拟卷", "卷*.md"))
            if "答案" not in os.path.basename(f)
        ]
    )


def main() -> int:
    # Windows 控制台默认 GBK，中文与 – 会抛 UnicodeEncodeError
    if hasattr(sys.stdout, "buffer"):
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

    print("| 科目 | 分值 | 笔记 | 真题年份页 | 模拟卷 |")
    print("|:---|:---:|:---:|:---:|:---:|")
    total_notes = total_mock = 0
    for slug, label, score, paper_dir in SUBJECTS:
        notes = count_notes(slug)
        papers, span = count_papers(paper_dir)
        mocks = count_mock_papers(slug)
        total_notes += notes
        total_mock += mocks
        print(f"| **{label}** | {score} | {notes} 篇 | {span}（{papers} 页） | {mocks} 套 |")
    print(f"\n合计：{total_notes} 篇实质笔记 · {total_mock} 套模拟卷")
    print(f"口径：笔记排除 index.md/模拟卷/答案页/正文<{MIN_NOTE_CHARS}字符的占位页")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
