<p align="center">
  <img src="https://img.shields.io/badge/广东专升本-计算机类-blue?style=for-the-badge&logo=github" alt="Badge">
  <img src="https://img.shields.io/badge/适用-2027届-brightgreen?style=for-the-badge" alt="Year">
  <img src="https://img.shields.io/badge/状态-备考中-yellow?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/笔记-130+篇-orange?style=for-the-badge" alt="Notes">
  <img src="https://img.shields.io/badge/真题-60+年份页-red?style=for-the-badge" alt="Exams">
  <img src="https://img.shields.io/github/actions/workflow/status/wpc725562-dotcom/zhuan-sheng-ben-notes/deploy.yml?style=for-the-badge&label=Deploy" alt="Deploy">
  <img src="https://img.shields.io/github/stars/wpc725562-dotcom/zhuan-sheng-ben-notes?style=for-the-badge&label=Stars" alt="Stars">
</p>

<h1 align="center">📚 广东专升本 · 四科复习笔记库</h1>

<p align="center">
  <strong>VitePress 知识库 · 213 篇实质笔记 · 77 个真题年份页 · 11 套模拟卷</strong><br>
  🎯 目标：公办本科 · 计算机类 · 2027 年 3 月考试
</p>

<p align="center">
  <a href="#-仓库结构">📁 仓库结构</a> •
  <a href="#-学习路线">📖 学习路线</a> •
  <a href="#-笔记使用说明">📝 笔记使用说明</a> •
  <a href="#-在线访问">🌐 在线访问</a>
</p>

---

## 🎯 项目简介

本仓库是**广东普通专升本（专插本）四科全科复习知识库**，覆盖：

| 科目 | 分值 | 笔记 | 真题年份页 | 模拟卷 |
|:---|:---:|:---:|:---:|:---:|
| **政治理论**（公共课） | 100 | 29 篇 | 2012–2026（15 页） | 3 套 |
| **公共英语**（公共课） | 100 | 42 篇 | 2005–2025（39 页） | 2 套 |
| **高等数学**（专业基础课） | 100 | 82 篇 | 2003–2026（10 页） | 3 套 |
| **计算机基础与程序设计**（专业综合课） | **200** | 60 篇 | 2018–2026（13 页） | 3 套 |

> **统计口径**（2026-09-04 重算，此前四科数字全部失真，曾导致外部评估误判为"模拟卷缺失"）：
> - 笔记 = `docs/posts/<科>/**/*.md`，排除 `index.md`、模拟卷目录、答案页、正文 < 800 字符的占位页
> - 真题年份页 = `历年真题/<科>/*.md`，排除 `_索引`、`00-` 前缀说明页
> - 模拟卷 = `docs/posts/<科>/模拟卷/卷*.md`（不含配套 `-答案.md`）；高数/计算机各 3 套 20/45 题、政治 3 套 35–37 题、英语 2 套 31/32 题
> - 重算命令：`python scripts/repo_stats.py`
>
> 站点同时是 **Obsidian 双链笔记库**（顶层 `历年真题/`、`政治理论/`、`高等数学/` 等为 Obsidian 导航区）+ **VitePress 站点源**（`docs/posts/`）。

---

## 📁 仓库结构

```
zhuan-sheng-ben-notes/
├── docs/                          # 📖 VitePress 站点源（在线发布）
│   ├── posts/
│   │   ├── math/notes/            #   高等数学系统笔记（70 篇）
│   │   ├── computer/notes/        #   计算机基础与程序设计笔记（28 篇）
│   │   ├── politics/notes/        #   政治理论系统笔记（21 篇）
│   │   ├── english/notes/         #   英语笔记（11 篇）
│   │   ├── math|computer|politics|english/   # 各科真题年份页
│   │   ├── 高频考点/              #   高频考点 TOP20
│   │   └── resources/             #   学习资源库
│   ├── guide/                     #   报考指南（考纲/院校/分数线）
│   └── public/                    #   站点静态资源（figs/papers/covers）
├── 历年真题/                      # 🔗 Obsidian 真题区（双链导航）
├── 政治理论/ 高等数学/ 编程技能/   # 🔗 Obsidian 笔记区
├── 资料/ 备考计划/                # 🔗 Obsidian 资料区
├── bencetong/                     # 🖥️ 本科通 Electron 刷题应用
├── knowledge/                     # 📋 知识库辅助（审计/考点速查）
├── tests/                         # 单元测试
└── docs/.vitepress/               # VitePress 站点配置
```

---

## 📖 学习路线

### 阶段一：基础入门（第一轮）

| 顺序 | 内容 | 时间 |
|:---:|:---|:---:|
| 1 | [0.0 计算机基础理论](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/0.0-计算机基础理论) | 1 天 |
| 2 | [1.1 C语言概述](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.1-C语言概述与基本概念) → [1.5 循环结构](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.5-循环结构程序设计) | 5 天 |
| 3 | [1.6 数组](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.6-数组) → [1.7 函数](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.7-函数) → [1.8 指针](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.8-指针) | 5 天 |
| 4 | [1.9 结构体](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.9-结构体与共用体) → [1.10 文件](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/1.10-文件操作) | 2 天 |

### 阶段二：数据结构（第二轮）

| 顺序 | 内容 | 时间 |
|:---:|:---|:---:|
| 1 | [2.1 数据结构概念](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.1-数据结构基本概念) → [2.2 线性表](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.2-线性表) → [2.3 栈和队列](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.3-栈和队列) | 4 天 |
| 2 | [2.4 串/数组/广义表](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.4-串、数组和广义表) → [2.5 树和二叉树](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.5-树和二叉树) | 3 天 |
| 3 | [2.6 图](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.6-图) → [2.7 查找](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.7-查找) → [2.8 排序](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/2.8-排序) | 4 天 |

### 阶段三：专项突破 + 模拟（第三轮）

| 顺序 | 内容 | 时间 |
|:---:|:---|:---:|
| 1 | [3.0 改错题专项](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/3.0-改错题专项训练) | 1 天 |
| 2 | [3.3 编程题策略](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/3.3-编程题做题策略) | 1 天 |
| 3 | [高频错题汇总](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/computer/notes/高频错题汇总) 复盘 | 1 天 |
| 4 | 卷一 → 卷二 → 卷三 限时模拟 | 3 天 |

---

## 📝 笔记使用说明

每篇笔记遵循 **6 模块统一模板**：

| 模块 | 图标 | 内容 |
|:---|:---:|:---|
| 历年真题考情 | ① 📊 | 出题频次星级、常考题型、预估分值、学习目标 |
| 零基础大白话引入 | ② 🗣️ | 生活化类比（厨师/储物柜/排队等）|
| 正式核心知识点讲解 | ③ 📖 | 考纲要求 + 真题实考内容，禁止超纲 |
| 真题同源例题 | ④ 🧪 | 入门基础题 + 真题改编题，逐变量推演 |
| 历年真题高频扣分坑 | ⑤ ⚠️ | 每章 10 条陷阱表，含出处年份 |
| 课后自测练习题 | ⑥ 📝 | 2-5 题真题风格 + VitePress 折叠答案 |

---

## 🌐 在线访问

**VitePress 站点**：https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/

> 站点全量同步笔记内容，支持搜索、导航、代码高亮、数学公式渲染。

---

## 🛠️ 技术栈

- **框架**：VitePress 1.6 + Vue 3
- **部署**：GitHub Actions → GitHub Pages
- **数学公式**：markdown-it-mathjax3
- **代码高亮**：highlight.js
- **搜索**：VitePress 本地搜索
- **本地笔记**：Obsidian（双链导航）

---

## 🛠️ Agent 开发项目

> 本仓库作者也是 **AI Agent 开发者**，以下是相关的 Agent 开发项目：

| 项目 | 说明 | 技术栈 |
|:---|:---|:---|
| 🎓 [本科通 · 学习助手](bencetong/) | 广东专升本桌面学习助手：学习看板 / 笔记阅读 / 刷题练习（对接 Anki）/ 科学学习指南 / GitHub 同步。AI Agent 辅助开发 | Electron + Vue 3 + Vite + Pinia |

> 🔜 更多 Agent 开发项目（如真题检索 MCP 插件）正在建设中，敬请期待！

---

## 📋 更新日志

| 日期 | 更新内容 |
|:---|:---|
| 2026-08-24 | **仓库同步与升级**：合并远程/本地提交，新增 Agent 开发项目展示区 |
| 2026-08-24 | 仓库四科整合：README 对齐高数/计算机/政治/英语全科结构 |
| 2026-08-24 | 补全政治历年真题 2012-2019 + 2025 高数回忆版（图片） |
| 2026-08-16 | P0-P4 全项目闭环：20+ 篇笔记重制、14 份审计报告、3 套模拟卷、2 份汇总文档 |
| 2026-08-15 | 笔记审计流水线启动，全局 6 模块格式统一，CI 修复 |

---

<p align="center">
  <strong>📚 广东专升本 · 四科复习笔记库</strong><br>
  <a href="https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/">🌐 在线访问</a> •
  <a href="https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes">📦 GitHub 仓库</a>
</p>
