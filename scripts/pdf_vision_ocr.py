"""PDF -> Markdown 视觉模型 OCR（阶段 B，仅用于无文字层的页面）。

默认引擎：baiapi qwen3.8-flash（2026-09-03 实测具备视觉能力）。
特性：分页渲染、断点续跑、余额守卫、失败重试、进度落盘。

用法:
  python scripts/pdf_vision_ocr.py --pdf <路径> --out <md路径> [--pages 1-10] [--dpi 150]
  python scripts/pdf_vision_ocr.py --pdf <路径> --out <md路径> --probe   # 只跑 1 页验收
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

import pymupdf

ENV_PATH = os.path.expandvars(r"%APPDATA%\reasonix\.env")
API_URL = "https://api.b.ai/v1/chat/completions"
MODEL = "qwen3.8-flash"

PROMPT = """这是一页广东专升本复习资料/试卷的扫描图。请把它完整转写成 Markdown。

要求：
1. 忠实转录全部可见文字，不要概括、不要遗漏、不要添加解释。
2. 数学公式用 LaTeX：行内 $...$，独立公式 $$...$$。极限、分式、根号、上下标、积分务必准确。
3. 保留题号（如 1. / (1) / 例1）和层级结构，用 Markdown 标题标记章节。
4. 表格用 Markdown 表格语法。
5. 代码（C 语言等）用围栏代码块。
6. 图片/图形无法转录时，用 `> [图: 简短描述]` 占位。
7. 忽略水印广告文字（如"公众号""网校出品"等）。
8. 只输出 Markdown 正文，不要任何前言或总结。"""


def api_key() -> str:
    with open(ENV_PATH, encoding="utf-8") as f:
        for line in f:
            if line.startswith("BAIAI_API_KEY="):
                return line.strip().split("=", 1)[1]
    raise RuntimeError("BAIAI_API_KEY not found")


def render_page(pdf: str, pno: int, dpi: int) -> str:
    doc = pymupdf.open(pdf)
    pix = doc[pno - 1].get_pixmap(dpi=dpi)
    tmp = os.path.join(os.environ.get("TEMP", "/tmp"), f"ocr_p{pno}_{os.getpid()}.png")
    pix.save(tmp)
    doc.close()
    with open(tmp, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    os.remove(tmp)
    return b64


class OutOfCredit(RuntimeError):
    pass


def ocr_page(key: str, b64: str, retries: int = 2) -> str:
    body = {
        "model": MODEL,
        "max_tokens": 4000,
        "temperature": 0,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{b64}"},
                    },
                ],
            }
        ],
    }
    last = ""
    for attempt in range(retries + 1):
        req = urllib.request.Request(
            API_URL,
            data=json.dumps(body).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = json.load(resp)
            msg = (data.get("choices") or [{}])[0].get("message", {})
            text = (msg.get("content") or "").strip()
            if not text:
                text = (msg.get("reasoning_content") or "").strip()
            if text:
                usage = data.get("usage", {})
                print(
                    f"    tokens in={usage.get('prompt_tokens')} "
                    f"out={usage.get('completion_tokens')}",
                    flush=True,
                )
                return text
            last = "empty content"
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode(errors="replace")[:200]
            last = f"HTTP {exc.code}: {detail}"
            if exc.code in (402, 403) or "insufficient" in detail.lower():
                raise OutOfCredit(last) from exc
            if exc.code == 429:
                time.sleep(25 * (attempt + 1))
                continue
        except Exception as exc:  # noqa: BLE001
            last = str(exc)[:200]
        time.sleep(5)
    raise RuntimeError(f"OCR failed after retries: {last}")


def parse_pages(spec: str, total: int) -> list[int]:
    out: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            a, b = part.split("-", 1)
            out.extend(range(int(a), int(b) + 1))
        else:
            out.append(int(part))
    return [p for p in out if 1 <= p <= total]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pdf")
    ap.add_argument("--out")
    ap.add_argument("--pages", default="")
    ap.add_argument("--dpi", type=int, default=150)
    ap.add_argument("--probe", action="store_true", help="只跑第 1 个内容页做验收")
    args = ap.parse_args()

    if not args.pdf or not args.out:
        ap.error("--pdf and --out are required")

    key = api_key()
    doc = pymupdf.open(args.pdf)
    total = doc.page_count
    doc.close()

    pages = parse_pages(args.pages, total) if args.pages else list(range(1, total + 1))
    if args.probe:
        pages = pages[:1]

    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    done: set[int] = set()
    if os.path.exists(args.out):
        text = open(args.out, encoding="utf-8").read()
        done = {int(m) for m in re.findall(r"<!-- OCR-PAGE (\d+) -->", text)}

    if not done:
        with open(args.out, "w", encoding="utf-8", newline="\n") as f:
            f.write(f"# {os.path.splitext(os.path.basename(args.pdf))[0]}\n\n")
            f.write(
                f"> 视觉模型 OCR（`{MODEL}` via baiapi）· 源文件 {total} 页 · "
                f"dpi={args.dpi} · 生成 {time.strftime('%Y-%m-%d %H:%M')}\n"
            )
            f.write("> 公式与排版已尽力还原，**仍需人工校对**。\n")

    for pno in pages:
        if pno in done:
            continue
        print(f"  page {pno}/{total}", flush=True)
        try:
            b64 = render_page(args.pdf, pno, args.dpi)
            md = ocr_page(key, b64)
        except OutOfCredit as exc:
            print(f"  !! 余额不足，安全停止：{exc}", flush=True)
            print(f"  已完成页记录在 {args.out}，充值后重跑可续。", flush=True)
            return 3
        except RuntimeError as exc:
            print(f"  !! 跳过 page {pno}: {exc}", flush=True)
            continue
        with open(args.out, "a", encoding="utf-8", newline="\n") as f:
            f.write(f"\n<!-- OCR-PAGE {pno} -->\n\n### 第 {pno} 页\n\n{md}\n")
        print(f"  ok page {pno}", flush=True)
        time.sleep(1.5)

    sort_pages(args.out)
    return 0


def sort_pages(path: str) -> None:
    """按 <!-- OCR-PAGE N --> 重排，修复补跑失败页造成的页序错乱。"""
    import io

    src = io.open(path, encoding="utf-8").read()
    m = re.search(r"\n<!-- OCR-PAGE \d+ -->", src)
    if not m:
        return
    head = src[: m.start()].rstrip() + "\n"
    parts = re.split(r"\n<!-- OCR-PAGE (\d+) -->\n", src[m.start() :])
    pages = sorted(
        ((int(parts[i]), parts[i + 1].strip()) for i in range(1, len(parts) - 1, 2)),
        key=lambda x: x[0],
    )
    out = [head] + [f"\n<!-- OCR-PAGE {n} -->\n\n{c}\n" for n, c in pages]
    io.open(path, "w", encoding="utf-8", newline="\n").write("".join(out))
    print(f"  sorted {len(pages)} pages", flush=True)


if __name__ == "__main__":
    sys.exit(main())
