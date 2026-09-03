"""按需下载 ForestDeer 上游 PDF 到仓库外缓存盘（不整仓 clone 1GB）。

缓存位置：D:/专升本/_pdf_cache/forestdeer/  ← 已在 .gitignore 内，永不进 Git
用法：
  python scripts/fetch_forestdeer_pdfs.py --list      # 只列清单
  python scripts/fetch_forestdeer_pdfs.py             # 下载白名单
  python scripts/fetch_forestdeer_pdfs.py --all       # 下载全部缺失项
"""

from __future__ import annotations

import argparse
import os
import sys
import urllib.parse
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = r"D:\专升本\_pdf_cache\forestdeer"
RAW = "https://raw.githubusercontent.com/ForestDeerDev/guangdong-zhuanshengben-resources/main/"

# 政治背诵类优先；教材扫描件（同济高数/C语言）与超大文件跳过
WHITELIST_KEYS = [
    "《新思想》高分背诵笔记",
    "专插本政治理论大题简答题",
    "2025专插本政治必背300考点",
    "25插本-政治万能句",
    "【Mayi政治】毛概-教材课后习题答案",
    "新思想-思维导图",
    "2020年广东专插本考试《政治理论》试题",
    "2020年广东专插本考试《英语》试题",
    "语法填空",
]
# 明确排除（版权教材 / 体积过大且与已有笔记重叠）
BLACKLIST_KEYS = [
    "高等数学 第八版",
    "《C语言程序设计》",
    "欢姐",
    "10年真题",
    "2026年专升本考生志愿表",
    "2020年广东专插本考试《高等数学》试题",  # 本库已有 math/2020-OCR版.md
]


def upstream_pdfs() -> list[tuple[int, str]]:
    """从 GitHub API 取上游全部 PDF 路径与大小。"""
    import json
    import urllib.request as u

    req = u.Request(
        "https://api.github.com/repos/ForestDeerDev/guangdong-zhuanshengben-resources"
        "/git/trees/HEAD?recursive=1",
        headers={"User-Agent": "pdf-fetch"},
    )
    tok = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    with u.urlopen(req, timeout=60) as r:
        data = json.load(r)
    return [
        (e["size"], e["path"])
        for e in data.get("tree", [])
        if e["type"] == "blob" and e["path"].lower().endswith(".pdf")
    ]


def local_txt_stems() -> set[str]:
    """本地已有实质文字版（>2KB txt）的主文件名。"""
    stems = set()
    root = os.path.join(REPO, "guangdong-zhuanshengben-resources")
    for dirpath, _, files in os.walk(root):
        for f in files:
            fp = os.path.join(dirpath, f)
            if f.lower().endswith(".txt") and os.path.getsize(fp) > 2000:
                stems.add(os.path.splitext(f)[0])
    return stems


def pick(all_pdfs, stems, want_all=False):
    out = []
    for size, path in all_pdfs:
        stem = os.path.splitext(os.path.basename(path))[0]
        if stem in stems:
            continue  # 已有文字版
        if any(k in path for k in BLACKLIST_KEYS):
            continue
        if not want_all and not any(k in path for k in WHITELIST_KEYS):
            continue
        out.append((size, path))
    return sorted(out, key=lambda x: x[0])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    all_pdfs = upstream_pdfs()
    stems = local_txt_stems()
    todo = pick(all_pdfs, stems, want_all=args.all)
    total = sum(s for s, _ in todo)
    print(f"待下载 {len(todo)} 个 / {total/1048576:.0f} MB -> {CACHE}\n")
    if args.list:
        for s, p in todo:
            print(f"  {s/1048576:7.1f}MB  {p}")
        return 0

    os.makedirs(CACHE, exist_ok=True)
    ok = skip = fail = 0
    for size, path in todo:
        dst = os.path.join(CACHE, path.replace("/", os.sep))
        if os.path.exists(dst) and os.path.getsize(dst) == size:
            skip += 1
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        url = RAW + urllib.parse.quote(path)
        tmp = dst + ".part"
        try:
            urllib.request.urlretrieve(url, tmp)
            if os.path.getsize(tmp) != size:
                raise OSError(f"size mismatch {os.path.getsize(tmp)} != {size}")
            os.replace(tmp, dst)
            ok += 1
            print(f"  ok  {size/1048576:6.1f}MB  {os.path.basename(path)[:50]}", flush=True)
        except Exception as exc:  # noqa: BLE001
            fail += 1
            print(f"  !!  {path[:50]}: {str(exc)[:90]}", flush=True)
            if os.path.exists(tmp):
                os.remove(tmp)
    print(f"\n下载 {ok}, 已存在 {skip}, 失败 {fail}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
