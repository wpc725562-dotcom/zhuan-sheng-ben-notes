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

## 流水线（已验证）

```
ForestDeer raw URL
  → curl 到 D:/专升本/_pdf_cache/forestdeer/   （本地缓存，gitignore）
  → pdftotext / python-docx / (可选) tesseract OCR
  → 历年真题/<学科>/<年>-ForestDeer试扫.md
  → git commit + push 私有库
```

### 什么算「功能完善」再全量加入？

| 门槛 | 说明 |
|:---|:---|
| 文字层 PDF | 自动抽 + 人工校对写作/答案块 |
| 扫描件 PDF | 分页 OCR 可用、中文公式不崩太多 |
| 版权边界 | 只进结构化笔记，不进整本 PDF 二进制 |
| 与本库体例一致 | 得分点 / 默写清单 / 链接到 `_索引` |

### 本批建议

1. **英语 2022–2024 精析 PDF**：文字层好，优先继续补写作题到正式 `公共英语/年.md`。
2. **计算机 2021–2024 docx**：抽文本完整，可与现有回忆版交叉核对。
3. **高数 2020 扫描 PDF**：需 OCR，单开下一阶段。
4. **不下载**：政治 80MB+ 讲义、词汇 13MB 大图包，等 OCR 流程稳了再说。

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
