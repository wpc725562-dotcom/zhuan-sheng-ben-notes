# -*- coding: utf-8 -*-
"""Export English exam notes to VitePress docs/posts/english/."""
from pathlib import Path
import re

ROOT = Path(r"D:/专升本/专升本")
SRC = ROOT / "历年真题/公共英语"
DST = ROOT / "docs/posts/english"
DST.mkdir(parents=True, exist_ok=True)

# For site: keep writing + keys + answers; truncate huge OCR paper body
MAX_PAPER_IN_SITE = 6000


def to_site_md(text: str, year: int) -> str:
    # remove wikilinks -> plain text or md links
    def repl_wiki(m):
        inner = m.group(1)
        if "|" in inner:
            target, label = inner.split("|", 1)
        else:
            target, label = inner, inner
        label = label.strip()
        # map common
        if "_索引" in target or target.strip() == "_索引":
            return f"[英语索引](/posts/english/)"
        if "总索引" in target:
            return f"[总索引](/guide/)"
        if "00-资料" in target or "资料来源" in target:
            return f"[资料说明](/guide/sources)"
        if "作文模板" in target:
            return label
        if "英语知识库" in target:
            return label
        # year links
        m2 = re.search(r"(20\d{2})", target)
        if m2:
            y = m2.group(1)
            return f"[{label}](/posts/english/{y})"
        return label

    text = re.sub(r"\[\[([^\]]+)\]\]", repl_wiki, text)

    # escape Vue mustache
    text = text.replace("{{", "{​{").replace("}}", "}​}")

    # truncate OCR paper section inside details/code if huge
    def trunc_paper(m):
        body = m.group(1)
        if len(body) > MAX_PAPER_IN_SITE:
            body = body[:MAX_PAPER_IN_SITE] + "\n\n…（网站版截断；完整 OCR 见 Obsidian 源库或本地 PDF）\n"
        return f"<details>\n<summary>点击展开 {year} 年试卷抽取文本</summary>\n\n```\n{body}\n```\n\n</details>"

    text = re.sub(
        r"<details>\s*<summary>点击展开[^<]*</summary>\s*```(.*?)```\s*</details>",
        trunc_paper,
        text,
        flags=re.S,
    )

    # footer
    text = re.sub(
        r"返回：.*",
        f"← [英语真题总览](/posts/english/) · [首页](/)",
        text,
    )

    # frontmatter
    fm = (
        "---\n"
        f"title: 公共英语 {year} 真题详解\n"
        f"description: 广东专升本公共英语 {year} · 写作范文 + 答案解析\n"
        "---\n\n"
    )
    return fm + text


def main():
    years = []
    for p in sorted(SRC.glob("*.md")):
        if p.name.startswith("_"):
            continue
        m = re.match(r"(20\d{2})\.md", p.name)
        if not m:
            continue
        year = int(m.group(1))
        md = to_site_md(p.read_text(encoding="utf-8"), year)
        out = DST / f"{year}.md"
        out.write_text(md, encoding="utf-8")
        years.append(year)
        print(f"site {year}.md {len(md)} chars")

    # index
    rows = []
    for y in sorted(years, reverse=True):
        status = "卷面+解析" if y >= 2013 and y != 2024 else ("解析+范文" if y == 2024 else "卷面 OCR")
        rows.append(f"| [{y}](/posts/english/{y}) | {status} |")

    index = f"""---
title: 公共英语 · 真题总览
description: 广东专升本公共英语 2008–2024 真题详解
---

# 公共英语 · 真题总览

> 来自主人上传 PDF 抽取整理 · OCR 可能有空格粘连，**以本地 PDF 为准**

## 年份列表

| 年份 | 状态 |
|:---:|:---|
{chr(10).join(rows)}

## 怎么刷

1. 近三年（2022–2024）限时整套
2. 每周默写 2 篇写作（书信 + NOTICE）
3. 错题记搭配

## 本地完整版

Obsidian 打开仓库 `历年真题/公共英语/`，含完整 OCR 与本地 PDF 路径说明。

← [回首页](/)
"""
    (DST / "index.md").write_text(index, encoding="utf-8")
    print("index years:", years)


if __name__ == "__main__":
    main()
