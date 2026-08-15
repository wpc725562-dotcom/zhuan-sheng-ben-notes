---
title: 站点说明
---

# 站点说明

本站是广东专升本复习笔记的 **VitePress 网页版**，源内容在本地 Obsidian 库：

`D:/专升本/专升本`

## 内容从哪来

| 区块 | Obsidian 路径 | 网站路径 |
|:---|:---|:---|
| 高数章节 | `高等数学/` | [/posts/math/notes/](/posts/math/notes/) |
| 计算机知识点 | `计算机程序设计/` | [/posts/computer/notes/](/posts/computer/notes/) |
| 英语笔记 | `编程技能/专升本英语/` | [/posts/english/notes/](/posts/english/notes/) |
| 政治笔记 | `政治理论/` | [/posts/politics/notes/](/posts/politics/notes/) |
| 各科真题 | `历年真题/` | `/posts/{math,computer,english,politics}/` |

重新同步（本地）：

```bash
cd "D:/专升本/专升本"
node scripts/sync-obsidian-to-blog.mjs
npm run docs:build
```

## 阅读建议

- **刷概念**：章节 / 知识点笔记（含闭卷答案块）
- **刷真题**：2024/2026 完整卷优先，再回溯演练页
- **搜索**：顶栏本地搜索可跨页找公式与关键词

## 主题

樱花二次元主题 + Live2D 参考开源博客 [a3292334877-star/blog](https://github.com/a3292334877-star/blog)。

详见 [资料边界](/guide/sources)。
