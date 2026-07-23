# ForestDeer 真题库 · 试扫记录

> 试扫起始：2026-07-24
> 目标公开库：[https://github.com/ForestDeerDev/guangdong-zhuanshengben-resources](https://github.com/ForestDeerDev/guangdong-zhuanshengben-resources)
> 本库私有仓库：`wpc725562-dotcom/zhuan-sheng-ben-notes`
> 原则：**先试扫小体积、有文字层的文件 → 写 Markdown 讲解/摘录 → 推 GitHub**；功能稳了再扩大范围。
> **禁止**：把对方 1GB+ PDF 整仓拷进本库 Git。

---

## 试扫批次 #1（2026-07-24）

| 学科 | 年份 | 格式 | 文字层 | 抽文字节 | 本库笔记 |
|:---|:---:|:---|:---:|---:|:---|
| 英语 | 2022 | PDF 精析 | ✅ | 19695 | [[公共英语/2022-ForestDeer试扫]] |
| 英语 | 2023 | PDF 精析 | ✅ | 19199 | [[公共英语/2023-ForestDeer试扫]] |
| 英语 | 2024 | PDF 精析 | ✅ | 19500 | [[公共英语/2024-ForestDeer试扫]] |
| 计算机 | 2021 | DOCX | ✅ | 3151 | [[计算机程序设计/2021-ForestDeer试扫]] |
| 计算机 | 2022 | DOCX | ✅ | 3215 | [[计算机程序设计/2022-ForestDeer试扫]] |
| 计算机 | 2023 | DOCX | ✅ | 3192 | [[计算机程序设计/2023-ForestDeer试扫]] |
| 计算机 | 2024 | DOCX | ✅ | 3772 | [[计算机程序设计/2024-ForestDeer试扫]] |
| 高等数学 | 2020 | PDF 扫描 | ❌ 待OCR | 600 | [[高等数学/2020-ForestDeer试扫]] |

---



## 试扫批次 #2（2026-07-24）

| 动作 | 结果 | 笔记 |
|:---|:---|:---|
| 英语 2022–2024 写作合并进正式 `年.md` | ✅ 邀请/自荐/写作赛范文入库 | [[公共英语/2022]] [[2023]] [[2024]] |
| 计算机 2021–2024 差异核对表 | ✅ 抽样高一致；2024 程序式有回忆偏差提示 | [[计算机程序设计/03-ForestDeer差异核对]] |
| 高数 2020 第 1–2 页 OCR | ⚠️ 结构可读、公式糊 | [[高等数学/2020-ForestDeer试扫]] |
| 提交 `资料/计算机真题原卷/_sample_*.md` | ✅ 随本批推送 | 本地样例 Markdown |

### 功能完善度（更新）

| 门槛 | 状态 |
|:---|:---|
| 文字层 PDF/DOCX 小样流水线 | ✅ 已通 |
| 写作范文合并进正式笔记 | ✅ 英 2022–2024 |
| 扫描件 OCR 全卷可用 | ❌ 仅验收 2 页；公式不过关 |
| 全量加入 ForestDeer | ❌ 仍不拷 PDF；按需扩年 |

---

## 批次 #3（2026-07-24）· 版权 / OCR / 体积解法

| 动作 | 结果 | 笔记 |
|:---|:---|:---|
| 三道坎解法文档 | ✅ 版权边界 + OCR 分流 + 体积策略 | [[03-版权OCR体积解法]] |
| 装 **RapidOCR**（onnxruntime） | ✅ 中文扫描默认引擎 | 本机 pip |
| 高数 2020 p1–2 对比验收 | ✅ RapidOCR ≫ Tesseract（结构）；公式仍糊 | [[高等数学/_ocr_compare_math2020_p1-2]] |
| 分流脚本 | ✅ `scripts/pdf_pipeline.py` | detect / text / ocr / docx / auto |
| `.gitignore` 加硬 | ✅ `_pdf_cache` / OCR 中间文件 | 仓库根 |

**「全量加入」已重新定义**：全量 = 扩 Markdown 年/科覆盖，**不是**把 ForestDeer PDF 推进 Git。  
详见 [[03-版权OCR体积解法]]。

---

## 流水线（已验证 · v2 分流）

```
ForestDeer raw URL
  → curl 到 D:/专升本/_pdf_cache/forestdeer/   （本地缓存，永不进 Git）
  → scripts/pdf_pipeline.py auto <file>
       ├ text-layer PDF → PyMuPDF / pdftotext
       ├ DOCX           → python-docx
       └ scan PDF       → RapidOCR（默认）/ Tesseract（备用）
  → 历年真题/<学科>/<年>-ForestDeer试扫.md 或合并进 年.md
  → git commit + push 私有库（仅 Markdown）
```

### 什么算「功能完善」再全量加入？

| 门槛 | 说明 | 状态 |
|:---|:---|:---|
| 文字层 PDF | 自动抽 + 人工校对写作/答案块 | ✅ |
| 扫描件 · 中文结构 | RapidOCR 分页可用 | ✅ 验收通过 |
| 扫描件 · 公式原题 | 须公式模型或人工；不硬录 | ❌ 下一阶段 |
| 版权边界 | 只进结构化笔记，不进整本 PDF | ✅ 硬规则 |
| 体积 | 缓存盘外 + gitignore | ✅ |
| 与本库体例一致 | 得分点 / 默写清单 / 链接到 `_索引` | 进行中 |

### 本批建议

1. **优先**：文字层 / DOCX 继续扩年并合并正式 `年.md`（零 OCR 风险）。
2. **扫描件**：只用 OCR 确认**卷结构**；题目练本库已有年.md + 纸质册。
3. **不下载进 Git**：政治 80MB+ 讲义、词汇大包——本地缓存可下，**禁止 commit**。
4. 解法全文：[[03-版权OCR体积解法]]。

---

## 本地缓存位置

```
D:/专升本/_pdf_cache/forestdeer/
  英语/
  高等数学/
  计算机/
  _txt/
```

该目录**不要** `git add`。`.gitignore` 已忽略 `*.pdf`；docx 亦勿提交。

---

## 关联

- [[01-GitHub类似库对照]]
- [[00-资料来源与使用说明]]
- [[总索引]]
