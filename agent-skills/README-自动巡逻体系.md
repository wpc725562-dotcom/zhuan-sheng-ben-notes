# 🚨 自动巡逻体系使用手册

> 让 Agent 自动帮你找问题、自己修复、持续优化仓库。
> 启动时间：2026-08-18

---

## 📋 体系总览

你只需要做一件事：**把笔记推进去，巡逻体系自动干活**。

```
你写笔记 / 推代码
     ↓
┌─────────────────────────────────┐
│   🚨 GitHub Actions 自动巡逻     │
│  (每次 push + 每天凌晨3点)       │
├─────────────────────────────────┤
│  1. 🔨 构建检查（P0）            │
│  2. 🔗 断链检查（P0）            │
│  3. 📋 质量体检（P1）            │
│  4. 📑 索引一致性（P1）          │
│  5. 📊 覆盖分析（P2）            │
├─────────────────────────────────┤
│  输出报告 + 自动建Issue          │
└─────────────────────────────────┘
```

---

## 🛠️ 组成文件

| 文件 | 作用 |
|:---|:---|
| `.github/workflows/auto-patrol.yml` | 自动巡逻 GitHub Actions（核心） |
| `agent-skills/auto-patrol-master.yaml` | Agent 巡逻总指挥技能 |
| `agent-skills/coverage-analyzer.yaml` | 考点覆盖率分析技能 |
| `agent-skills/quality-reporter.yaml` | 质量报告生成技能 |
| `scripts/health-check.mjs` | 本地/CI 健康检查脚本 |

---

## 🔄 三种触发方式

### 1. 自动触发（推代码）
每次你 `git push` 涉及 `docs/`、`skills/`、`knowledge/` 的文件，自动巡逻会自动跑一遍。

### 2. 定时触发
每天凌晨 3:00 自动全量检查（即使没 push 也跑）。

### 3. 手动触发
在 GitHub → Actions → 「🚨 Auto Patrol」→ Run workflow：
- **巡逻级别**：全量 / 快速 / 仅覆盖分析
- **自动修复**：是否自动修 P0/P1
- **创建 Issue**：严重问题是否自动开 Issue

---

## 💻 本地运行

```bash
# 全量检查
npm run health:check

# 快速检查（只查结构）
npm run health:quick

# 覆盖分析
npm run health:coverage

# JSON 输出（给 CI 用）
npm run health:json
```

### 检查项说明
| 检查项 | 含义 | 严重度 |
|:---|:---|:---:|
| 文件结构 | 必需文件是否齐全 | P0 |
| 目录完整性 | 4 科目录是否都在 | P0 |
| 断链检查 | wiki/markdown 链接是否有效 | P0 |
| 编码检查 | UTF-8 无 BOM、无乱码 | P1 |
| 索引文件 | 各目录是否有 index.md | P1 |
| 文件大小 | 是否有过小的占位文件 | P2 |

---

## 🤖 Agent 技能调用

如果使用支持 Agent skill 的工具（DeepSeek Harness 等），可以直接说：

| 你说 | Agent 执行 |
|:---|:---|
| 「开始自动巡逻」 | 加载 auto-patrol-master.yaml，全库检查 |
| 「检查知识库质量」 | 加载 knowledge-base-integrity-check.yaml |
| 「修复断链」 | 加载 broken-link-repair.yaml |
| 「分析考点覆盖率」 | 加载 coverage-analyzer.yaml |
| 「生成质量报告」 | 加载 quality-reporter.yaml |

---

## 📊 输出报告位置

所有报告生成在 `knowledge/` 目录：

| 报告 | 内容 |
|:---|:---|
| `patrol-report-日期.md` | 综合巡逻报告（每天） |
| `link-report.md` | 断链清单 |
| `quality-report.md` | 质量体检清单 |
| `index-report.md` | 索引一致性 | 
| `coverage-report.md` | 考点覆盖率 |
| `health-check-result.json` | 机器可读结果 |

---

## ⚠️ 注意事项

1. **自动修复有边界**：只修格式、链接、索引，绝不改动知识点正文
2. **GitHub Actions 需要权限**：首次用到自动提交报告/建 Issue 需在仓库 Settings → Actions 允许 workflows 写权限
3. **Issue 自动创建**：只有「构建失败」或「有断链」时才触发，避免噪音
4. **本地跑更快**：想立刻看到结果，本地跑 `npm run health:check` 就行