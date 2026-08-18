# 🚨 指挥官指令 v1.0

> 用法：开一个新 DSH 话题，粘贴全部内容，Agent 自动执行
> 仓库：https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes
> 站点：https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/

---

```markdown
# 指挥官指令：执行仓库健康检查 + 覆盖分析 + 输出报告

## 你的角色
你是「wpc725562-dotcom/zhuan-sheng-ben-notes」仓库的自动维护 Agent。
这个仓库是一个广东专升本 VitePress 笔记站，包含：
- 高等数学（8章36小节）
- 计算机基础与程序设计（C语言1.1-1.11 + 数据结构2.1-2.9）
- 英语（语法/词汇/阅读/写作 + 2008-2025真题）
- 政治理论（18模块 + 2018-2024真题）

## 第一步：克隆仓库
```bash
git clone https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes.git
cd zhuan-sheng-ben-notes
npm install
```

## 第二步：执行健康检查
```bash
npm run health:check
```
记录所有输出，如果有断链（❌ 或 ⚠️），运行：
```bash
node scripts/fix-wiki-links.mjs
```
再跑一次 `npm run health:check` 验证清零。

## 第三步：执行覆盖分析
手动统计 4 个科目的笔记文件数与标准考点的对比：
| 科目 | 标准考点数 | 笔记目录 |
|:---|:---:|:---|
| 高等数学 | 36小节 | docs/posts/math/notes/ |
| 计算机 | 20考点 | docs/posts/computer/notes/ |
| 英语 | 5模块 | docs/posts/english/notes/ |
| 政治 | 18模块 | docs/posts/politics/notes/ |

```bash
echo "数学: $(ls docs/posts/math/notes/*.md | grep -v index | grep -v syllabus | wc -l) 文件"
echo "计算机: $(ls docs/posts/computer/notes/*.md | grep -v index | grep -v syllabus | wc -l) 文件"
echo "英语: $(ls docs/posts/english/notes/*.md | grep -v index | wc -l) 文件"
echo "政治: $(ls docs/posts/politics/notes/*.md | grep -v index | wc -l) 文件"
```

输出覆盖率报告到 knowledge/coverage-report.md

## 第四步：检查 GitHub Actions 自动巡逻状态
```bash
curl -s "https://api.github.com/repos/wpc725562-dotcom/zhuan-sheng-ben-notes/actions/runs?per_page=5" | python3 -c "import sys,json; [print(f'{r[\"name\"]}: {r[\"status\"]} ({r[\"conclusion\"]})') for r in json.load(sys.stdin)['workflow_runs']]"
```
看 auto-patrol workflow 是否运行成功。

## 第五步：检查站点是否正常
```bash
curl -s -o /dev/null -w "%{http_code}" "https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/"
```
应该返回 200。

## 第六步：输出摘要报告
在 knowledge/patrol-summary.md 输出以下内容（Markdown 格式）：

```markdown
# 巡逻摘要报告
- 日期：YYYY-MM-DD
- 执行人：Agent

## 健康检查结果
- 文件结构：✅/❌
- 目录完整性：✅/❌
- 断链检查：✅/❌（修复X处）
- 编码检查：✅/❌
- 索引文件：✅/❌
- 文件大小：✅/❌

## 覆盖率统计
| 科目 | 应覆盖 | 已覆盖 | 覆盖率 |
|:---|:---:|:---:|:---:|

## 修复记录
- 断链修复：X处

## GitHub Actions 状态
- auto-patrol: ✅ 成功 / ❌ 失败
- deploy: ✅ 成功 / ❌ 失败

## 站点状态
- 网站响应：HTTP 200
- 上次构建：xxx

## 建议
- 根据检查结果提出 2-3 条改进建议
```

## 约束
- 修复断链时使用 scripts/fix-wiki-links.mjs（已包含精确映射，无需手动改）
- 只读操作不修改文件
- 所有报告生成到 knowledge/ 目录下
- 如果遇到权限问题，停下来如实报告，不绕过
```

---

## 📋 执行清单

执行完成后，Agent 应逐项打勾：

- [ ] 克隆并安装依赖
- [ ] 健康检查通过
- [ ] 断链已修复（如有）
- [ ] 覆盖率报告已生成
- [ ] GitHub Actions 状态已确认
- [ ] 站点响应正常
- [ ] 摘要报告已输出到 knowledge/patrol-summary.md

---

*由指挥官 AI 自动生成 · 2026-08-18*
*更新方式：修改本文件后重新提交*