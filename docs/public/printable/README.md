# 📄 可打印版真题（HTML + PDF）

本目录由脚本自动生成，供打印练习使用。

## 目录

| 目录 | 内容 | 格式 |
|:---|:---|:---|
| `../printable/*.html` | 各科真题可打印 HTML | 浏览器打开 → Ctrl+P 打印 |
| `papers/printable/*.pdf` | 已生成的 PDF 版 | 直接打印 |

## 重新生成

```bash
# 1. Markdown → 可打印 HTML
python scripts/md-to-printable.py --all

# 2. HTML → PDF（需本机 Chrome）
node scripts/html-to-pdf.mjs          # 全部
node scripts/html-to-pdf.mjs math     # 只转数学
```

## 覆盖科目

- `math-*`：高等数学真题（2018-2026）
- `computer-*`：计算机基础与程序设计（2018-2027 指南）
- `english-*`：公共英语（2005-2025）
- `politics-*`：政治理论（2018-2024）

> 生成时间：2026-08-21 · 源文件在 `docs/posts/` 下对应 markdown
