"""补齐「图片排版页」：对 pdf_to_md.py 跳过的页做视觉模型 OCR，并插回原 md 的正确页序位置。

背景：pdf_to_md.py 会跳过「去水印后不足 50 字」的页。其中一部分是封面/空白（无所谓），
但另一部分是**整页图片排版**（正文全在图里），直抽会把内容整页丢掉。本脚本专治这类页。

用法:
  python scripts/pdf_fill_image_pages.py --dry-run   # 只列出将要补哪些页
  python scripts/pdf_fill_image_pages.py             # 执行补齐（幂等，已补过的页会跳过）
"""

from __future__ import annotations

import argparse
import io
import os
import re
import sys
import time

import pymupdf

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pdf_to_md import DESKTOP_NOTES, MIN_BODY_CHARS, PAPERS, clean_page  # noqa: E402
from pdf_vision_ocr import api_key, ocr_page, render_page  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_NOTES = os.path.join(REPO, "资料", "2026讲义")
OUT_PAPERS = os.path.join(REPO, "资料", "PDF全文抽取")

# 已整本 OCR 的文件，跳过（避免重复烧 token）
SKIP = {"【精编讲义】2026广东专插本《高等数学 》"}

MARK = re.compile(r"<!-- 原 PDF 第 (\d+) 页")
DONE = re.compile(r"<!-- 原 PDF 第 (\d+) 页（视觉模型 OCR 补齐）")


def pdfs_under(base: str):
    for entry in sorted(os.listdir(base)):
        p = os.path.join(base, entry)
        if os.path.isdir(p):
            yield from pdfs_under(p)
        elif entry.lower().endswith(".pdf"):
            yield p


def image_pages(pdf: str) -> list[int]:
    """无实质文字层 **且含图片** 的页 = 内容真的丢了，需要 OCR 补齐。"""
    doc = pymupdf.open(pdf)
    miss = [
        i
        for i in range(1, doc.page_count + 1)
        if len(clean_page(doc[i - 1].get_text())) < MIN_BODY_CHARS
        and len(doc[i - 1].get_images()) > 0
    ]
    doc.close()
    return miss


def target_md(pdf: str) -> str | None:
    """映射 PDF -> 已生成的 md 路径。"""
    stem = os.path.splitext(os.path.basename(pdf))[0]
    if stem in SKIP:
        return None
    if os.path.normpath(pdf).startswith(os.path.normpath(DESKTOP_NOTES)):
        return os.path.join(OUT_NOTES, stem + ".md")
    subj = os.path.basename(os.path.dirname(pdf))
    return os.path.join(OUT_PAPERS, subj, stem + ".md")


def insert_pages(md_text: str, filled: dict[int, str]) -> str:
    """按原 PDF 页序插入（从后往前插，避免字符偏移失效）。"""
    marks = [(m.start(), int(m.group(1))) for m in MARK.finditer(md_text)]
    for n, md in sorted(filled.items(), reverse=True):
        block = f"\n<!-- 原 PDF 第 {n} 页（视觉模型 OCR 补齐） -->\n\n{md}\n"
        nxt = next((pos for pos, num in marks if num > n), None)
        if nxt is not None:
            md_text = md_text[:nxt] + block + md_text[nxt:]
        else:
            md_text = md_text.rstrip() + "\n" + block
    return md_text


def collect_jobs() -> list[tuple[str, str, list[int]]]:
    jobs = []
    for base in (PAPERS, DESKTOP_NOTES):
        if not os.path.isdir(base):
            continue
        for pdf in pdfs_under(base):
            md = target_md(pdf)
            if not md or not os.path.exists(md):
                continue
            already = {int(m) for m in DONE.findall(io.open(md, encoding="utf-8").read())}
            miss = [p for p in image_pages(pdf) if p not in already]
            if miss:
                jobs.append((pdf, md, miss))
    return jobs


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--dpi", type=int, default=200)
    args = ap.parse_args()

    jobs = collect_jobs()
    todo = sum(len(m) for _, _, m in jobs)
    print(f"待补 {len(jobs)} 个文件 / {todo} 页\n", flush=True)
    if args.dry_run:
        for _, md, miss in jobs:
            print(f"  {os.path.relpath(md, REPO)}  <- {miss}")
        return 0

    key = api_key()
    for pdf, md, miss in jobs:
        rel = os.path.relpath(md, REPO)
        print(f"== {rel} ({len(miss)}页)", flush=True)
        filled: dict[int, str] = {}
        for pno in miss:
            try:
                filled[pno] = ocr_page(key, render_page(pdf, pno, args.dpi))
                print(f"   ok p{pno}", flush=True)
            except Exception as exc:  # noqa: BLE001
                print(f"   !! p{pno}: {str(exc)[:120]}", flush=True)
            time.sleep(1.2)
        if filled:
            text = io.open(md, encoding="utf-8").read()
            io.open(md, "w", encoding="utf-8", newline="\n").write(insert_pages(text, filled))
            print(f"   -> 写入 {len(filled)} 页", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
