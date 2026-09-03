# ForestDeer 上游扫描件 · 文字版

> 2026-09-04 由 `scripts/ocr_forestdeer_batch.py` + `qwen3.8-flash` 视觉模型 OCR
> 源：ForestDeerDev/guangdong-zhuanshengben-resources 上游 25 个 PDF / 158 页（**全部纯扫描，零文字层**）
> 原件缓存 `D:/专升本/_pdf_cache/forestdeer/`（仓库外，不进 Git）

## 内容

| 学科 | 文件 | 说明 |
|:---|:---|:---|
| 政治理论 | 【新思想】第一~十七章 | 高分背诵笔记，**本库政治科目此前最大短板** |
| 政治理论 | 25插本-政治万能句、2025必背300考点、大题简答题44题、新思想-思维导图、【Mayi政治】毛概课后习题、2020试题 | 主观题素材 |
| 英语 | 语法填空（20页）、2020试题 | 专项训练 |

## 使用须知

1. **必须人工校对**：视觉模型对符号级细节可能出错（同项目实测高数 OCR 出现过漏负号）。政治表述以官方教材为准。
2. **版权边界**：这些是机构整理资料，仅供个人复习对照。按 [[03-版权OCR体积解法]] 规则，**原件 PDF 永不进 Git**,本目录只存文字版。
3. **不要整段当"泄题包"使用**：题干与答案以你手里的正版广东真题册为准。

## 重跑

```bash
python scripts/fetch_forestdeer_pdfs.py --list   # 看还有哪些没下
python scripts/fetch_forestdeer_pdfs.py          # 下载到缓存盘
python scripts/ocr_forestdeer_batch.py --dpi 200 # OCR（断点续跑，已完成的页会跳过）
```
