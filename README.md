<p align="center">
  <img src="https://img.shields.io/badge/广东专升本-计算机类-blue?style=for-the-badge&logo=github" alt="Badge">
  <img src="https://img.shields.io/badge/适用-2027届-brightgreen?style=for-the-badge" alt="Year">
  <img src="https://img.shields.io/badge/状态-备考中-yellow?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/笔记-20+篇-orange?style=for-the-badge" alt="Notes">
  <img src="https://img.shields.io/badge/模拟卷-3套-red?style=for-the-badge" alt="Exams">
</p>

<h1 align="center">📚 广东专升本 · 计算机复习笔记库</h1>

<p align="center">
  <strong>VitePress 知识库 · 20+ 篇标准化笔记 · 3 套全真模拟卷</strong><br>
  🎯 目标：公办本科 · 计算机类 · 2027 年 3 月考试
</p>

<p align="center">
  <a href="#-仓库结构">📁 仓库结构</a> •
  <a href="#-学习路线">📖 学习路线</a> •
  <a href="#-笔记使用说明">📝 笔记使用说明</a> •
  <a href="#-模拟卷使用说明">📄 模拟卷使用说明</a> •
  <a href="#-在线访问">🌐 在线访问</a>
</p>

---

## 🎯 项目简介

本仓库是基于 **2026 年广东专升本计算机考纲** 构建的完整复习知识库，覆盖《计算机基础与程序设计》全部 21 个考点，包含：

| 资源 | 数量 | 说明 |
|:---|:---:|:---|
| 标准化笔记 | 20+ 篇 | 统一 6 模块模板（考情/引入/核心/例题/扣分坑/自测）|
| 真题审计报告 | 14 份 | 每章基于 2021-2026 年真题的考点频次/分值/陷阱分析 |
| 汇总文档 | 2 份 | 全书索引目录、高频错题汇总 |
| 全真模拟卷 | 3 套 | 每套 45 题 200 分，含完整参考答案和解析 |
| 专项训练 | 2 份 | 编程题做题策略、改错题专项训练 |

---

## 📁 仓库结构

```
zhuan-sheng-ben-notes/
├── docs/posts/computer/notes/     # 📖 核心笔记（20+ 篇，VitePress 站点源）
│   ├── 0.0-计算机基础理论.md        # 前置总览
│   ├── 1.1-1.11  C语言笔记         # 11 篇系统笔记
│   ├── 2.1-2.9  数据结构笔记       # 9 篇系统笔记
│   ├── 3.0-改错题专项训练.md        # 改错题专项
│   ├── 3.3-编程题做题策略.md        # 编程题专项
│   ├── 高频错题汇总.md              # 全局高错陷阱
│   └── index.md                    # 全书索引目录
├── knowledge/audit/               # 📋 14 份章节审计报告
├── plan/                          # 📄 模拟卷
│   ├── 模拟卷命题评估方案.md         # 命题方案
│   ├── 模拟卷-卷一-基础巩固卷.md     # 卷一
│   ├── 模拟卷-卷二-综合中档卷.md     # 卷二
│   └── 模拟卷-卷三-拔高冲刺卷.md     # 卷三
├── agent-troubleshoot/            # Agent 排障库
├── computer-kb/                   # 考点速查
├── skills/                        # 技能库
├── tests/                         # 单元测试
├── docs/.vitepress/               # VitePress 站点配置
└── .github/workflows/             # CI/CD 自动部署
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

## 📄 模拟卷使用说明

- **三卷递进**：卷一摸底（基础 60%）→ 卷二强化（中档 50%）→ 卷三冲刺（拔高 40%）
- **全真还原**：每套 45 题 200 分，题型/题量/时间与真题一致
- **参考答案**：每卷附 `<details>` 折叠完整答案，含解析和可运行代码
- **考点覆盖**：三卷合计覆盖全部 21 个考纲考点

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

---

## 📋 更新日志

| 日期 | 更新内容 |
|:---|:---|
| 2026-08-16 | P0-P4 全项目闭环：20+ 篇笔记重制、14 份审计报告、3 套模拟卷、2 份汇总文档 |
| 2026-08-15 | 笔记审计流水线启动，全局 6 模块格式统一，CI 修复 |

---

<p align="center">
  <strong>📚 广东专升本 · 计算机复习笔记库</strong><br>
  <a href="https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/">🌐 在线访问</a> •
  <a href="https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes">📦 GitHub 仓库</a>
</p>