"""PDF -> Markdown 文字层直抽（阶段 A，零成本，不用视觉模型）。

用法:
  python scripts/pdf_to_md.py            # 抽全部有文字层的 PDF
  python scripts/pdf_to_md.py --force    # 覆盖已存在的输出
输出:
  资料/2026讲义/<书名>.md                <- 桌面 6 本精编/黄金讲义
  资料/PDF全文抽取/<学科>/<年份>.md      <- 仓库 docs/public/papers 原卷
"""

from __future__ import annotations

import argparse
import os
import re
import sys

import pymupdf

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESKTOP_NOTES = r"C:\Users\Administrator\Desktop\2026讲义与知识汇编"
PAPERS = os.path.join(REPO, "docs", "public", "papers")
OUT_NOTES = os.path.join(REPO, "资料", "2026讲义")
OUT_PAPERS = os.path.join(REPO, "资料", "PDF全文抽取")

# 机构水印/广告行：整行命中即丢弃（仅用实测到的精确特征，避免误伤正文）
WATERMARK = re.compile(
    r"(叶学长|优课必过|zikao\.p1tao|prince-zip|网校出品|自考资料网)"
)
# 纯页码行："- 10 -" / "第 3 页" / "3" / "1 / 56"
PAGE_NO = re.compile(r"^[\s\-—–]*\d{1,4}[\s\-—–]*$|^第\s*\d+\s*页|^\d{1,4}\s*/\s*\d{1,4}$")

MIN_BODY_CHARS = 50  # 去掉水印后不足此字数视为无实质内容


def clean_page(raw: str) -> str:
    """去水印、去页码、压缩空行。"""
    kept = []
    for line in raw.splitlines():
        s = line.strip()
        if not s:
            kept.append("")
            continue
        if WATERMARK.search(s) and len(s) < 120:
            continue
        if PAGE_NO.match(s):
            continue
        kept.append(line.rstrip())
    text = "\n".join(kept)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text


def extract(pdf_path: str) -> tuple[str, int, int]:
    """返回 (markdown, 实质页数, 空页数)。"""
    doc = pymupdf.open(pdf_path)
    chunks, real, blank = [], 0, 0
    for i, page in enumerate(doc):
        body = clean_page(page.get_text())
        if len(body) < MIN_BODY_CHARS:
            blank += 1
            continue
        real += 1
        chunks.append(f"\n<!-- 原 PDF 第 {i + 1} 页 -->\n\n{body}\n")
    n = doc.page_count
    doc.close()
    head = f"# {os.path.splitext(os.path.basename(pdf_path))[0]}\n\n"
    head += f"> 由 `scripts/pdf_to_md.py` 从 PDF 文字层直抽，共 {n} 页，"
    head += f"实质内容 {real} 页，跳过 {blank} 页（水印/空白/纯图片）。\n"
    head += "> 未做人工校对；公式与图片内容不在文字层内，需另行 OCR。\n"
    return head + "\n".join(chunks), real, blank


def write_out(target: str, md: str, force: bool) -> str:
    os.makedirs(os.path.dirname(target), exist_ok=True)
    if os.path.exists(target) and not force:
        return "skip"
    with open(target, "w", encoding="utf-8", newline="\n") as f:
        f.write(md)
    return "write"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="覆盖已存在的输出")
    args = ap.parse_args()

    jobs: list[tuple[str, str]] = []

    if os.path.isdir(DESKTOP_NOTES):
        for fn in sorted(os.listdir(DESKTOP_NOTES)):
            if fn.lower().endswith(".pdf"):
                src = os.path.join(DESKTOP_NOTES, fn)
                jobs.append((src, os.path.join(OUT_NOTES, fn[:-4] + ".md")))

    if os.path.isdir(PAPERS):
        for subj in sorted(os.listdir(PAPERS)):
            sdir = os.path.join(PAPERS, subj)
            if not os.path.isdir(sdir):
                continue
            for fn in sorted(os.listdir(sdir)):
                if not fn.lower().endswith(".pdf"):
                    continue
                src = os.path.join(sdir, fn)
                dst = os.path.join(OUT_PAPERS, subj, fn[:-4] + ".md")
                jobs.append((src, dst))

    print(f"待处理 {len(jobs)} 个 PDF\n", flush=True)
    stats = {"write": 0, "skip": 0, "empty": 0, "pages_real": 0, "pages_blank": 0}

    for src, dst in jobs:
        rel = os.path.relpath(dst, REPO)
        try:
            md, real, blank = extract(src)
        except Exception as exc:  # noqa: BLE001
            print(f"ERR  {os.path.basename(src)}: {str(exc)[:90]}", flush=True)
            continue
        if real == 0:
            stats["empty"] += 1
            print(f"OCR  {rel}  <- 无文字层，需视觉模型", flush=True)
            continue
        r = write_out(dst, md, args.force)
        stats[r] += 1
        stats["pages_real"] += real
        stats["pages_blank"] += blank
        print(f"{r.upper():5s} {rel}  ({real}页实质/{blank}页跳过)", flush=True)

    print(
        f"\n汇总: 写出 {stats['write']}, 跳过已存在 {stats['skip']}, "
        f"无文字层待OCR {stats['empty']}, 实质页 {stats['pages_real']}, "
        f"跳过页 {stats['pages_blank']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
