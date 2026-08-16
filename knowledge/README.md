# 📚 专升本知识库（knowledge）

> 由 `pdf-to-knowledge` 技能转换入库的标准考试排版试卷仓库
> 建立日期：2026-08-16

---

## 📁 目录结构

```
knowledge/
├── README.md                    ← 你在这里
├── exam_papers/                 ← 转换完成的干净试卷（.md / .txt）
│   └── raw_backup/              ← 原始未清洗提取文本备份（xxx-raw-backup.txt）
└── optimization-report.md       ← self-optimizer 复盘报告（运行时生成）
```

## 🔧 使用流程

1. **转换**：提供真题 PDF → `pdf-to-knowledge` 技能提取并清洗排版 → 存入 `exam_papers/`，原始文本备份到 `raw_backup/`
2. **排版**：自动调用 `knowledge-formatter` 技能统一标题层级、题目/答案分离、答题横线
3. **优化**：定期运行 `self-optimizer` 技能复盘质量，迭代知识库与技能本身

## ⚠️ 硬性约束

- 只修改换行、段落结构、排版格式；**绝不修改、增删原文、题目、选项内容**
- 原始文本必须备份，方便出错回滚
- 真题 PDF 原卷不进 Git（见仓库 `.gitignore`），只进 Markdown

## 📋 已入库试卷

| 文件 | 来源 | 入库日期 |
|:---|:---|:---|
| [2025广东普通专升本英语真题.md](exam_papers/2025广东普通专升本英语真题.md) | ForestDeerDev/guangdong-zhuanshengben-resources（真题_精析_高清打印版） | 2026-08-16 |
