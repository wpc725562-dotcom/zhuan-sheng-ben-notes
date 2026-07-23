# 高等数学 · 2020 · ForestDeer 试扫（扫描件）

> **试扫日期**：2026-07-24
> **来源库**：[ForestDeerDev/guangdong-zhuanshengben-resources](https://github.com/ForestDeerDev/guangdong-zhuanshengben-resources)
> **源文件**：`高等数学/2020年广东专插本考试《高等数学》试题.pdf`
> **识别方式**：`pdftotext` → **几乎无正文**（扫描件 / 特殊字体）
> **本地缓存**：`D:/专升本/_pdf_cache/forestdeer/高等数学/2020-高数.pdf`
> **关联**：[[2020]] · [[02-ForestDeer试扫记录]]

---

## 试扫结论

| 项 | 结果 |
|:---|:---|
| 文字层 | ❌ 失败（仅 582 字节噪声/水印） |
| OCR | ⏳ 下一阶段：分页 `tesseract chi_sim+eng` 或 pdf MCP `read_by_ocr` |
| 当前 | **不**把乱码写进正式题库；继续用本库 [[2020]] 回忆版练习 |

### pdftotext 原始输出（证明需要 OCR）

```
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
^NNcg,O�`oQwww.gzzkgk.cn  W�>u5020-88282667  15374053589

_fiO�QQ:1163816823        QlOS:gzzkgk
```

### 下一步 OCR 命令备忘

```bash
# 先转图再 OCR（示例：第 1 页）
pdftoppm -f 1 -l 1 -png "D:/专升本/_pdf_cache/forestdeer/高等数学/2020-高数.pdf" /tmp/m2020
tesseract /tmp/m2020-1.png /tmp/m2020-1 -l chi_sim+eng
```

功能验收通过后再批量 OCR 进笔记。
