# Agent 故障排查知识库

> 收录 DeepSeek Harness / 本仓库开发过程中**真实遇到**的报错与排查方案。
> 目的：以后 Agent 再遇到同类问题，直接查这里，不用从头推理。
> 维护：2026-08-16 起持续追加

---

## 目录

| 编号 | 报错 | 分类 | 状态 |
|:---:|:---|:---|:---:|
| E-01 | npm EALLOWREMOTE：Refusing to fetch remote tgz | 依赖安装 | ✅ 已解决 |
| E-02 | PowerShell 禁止运行 npm.ps1（执行策略） | 环境 | ✅ 已解决 |
| E-03 | PyMuPDF 提取中文乱码（CID 字体无 ToUnicode） | PDF 处理 | ✅ 有方案 |
| E-04 | GitHub API 401/403/404（actions 详情需认证） | API | ✅ 有方案 |
| E-05 | 双栏 PDF 文本提取顺序错乱 | PDF 处理 | ✅ 有方案 |
| E-06 | VitePress build 大 chunk 警告 | 构建 | ✅ 非致命 |
| E-07 | 中文文件名在 PowerShell/控制台乱码 | 环境 | ✅ 有方案 |
| E-08 | Obsidian wiki 链接断链（空格 vs 连字符） | 内容质量 | ✅ 可批量修复 |

---

## E-01 npm EALLOWREMOTE

**现象**：`npm ci` / `npm install` 报：
```
npm error code EALLOWREMOTE
npm error Fetching packages of type "remote" have been disabled
npm error Refusing to fetch "zwitch@https://registry.npmmirror.com/zwitch/-/zwitch-2.0.4.tgz"
```

**根因**：npm 10+ 默认禁用从 lockfile 里以 **remote URL** 形式记录（而非 registry 语义）的包。本仓库 `package-lock.json` 是在 npmmirror 镜像下生成的，`resolved` 字段全部写死了 `https://registry.npmmirror.com/.../xxx.tgz`。

**排查步骤**：
1. 检查 lockfile 中 remote 引用数量：
   ```bash
   grep -c "npmmirror" package-lock.json   # 本仓库修复前为 212 处
   ```
2. 确认 npm 版本：`npm --version`（>=10 触发该保护）

**修复**（已执行并推送）：
```bash
# 把 lockfile 中的镜像 URL 批量替换为官方 registry（不改变依赖树）
# 替换前先备份
python -c "
from pathlib import Path
p = Path('package-lock.json')
t = p.read_text(encoding='utf-8')
t2 = t.replace('https://registry.npmmirror.com/', 'https://registry.npmjs.org/')
p.write_text(t2, encoding='utf-8')
"
# 验证替换干净 + 重新安装
grep -c "npmmirror" package-lock.json   # 应为 0
npm ci
```

**预防**：生成 lockfile 时用官方 registry；或在 CI 的 `npm ci` 前加 `--registry=https://registry.npmjs.org`。

---

## E-02 PowerShell 禁止运行 npm.ps1

**现象**：
```
npm : 无法加载文件 C:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本。
```
**根因**：PowerShell 执行策略（ExecutionPolicy）默认 Restricted/RemoteSigned 限制，且本会话沙箱为 ConstrainedLanguage 模式。

**修复**：
```powershell
# 方案A（推荐）：调用 .cmd 版本，绕过 ps1 脚本
npm.cmd install

# 方案B：临时放行当前会话
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 方案C：改用 npx 或直接 node 调 cli
node node_modules/npm/bin/npm-cli.js install
```

**预防**：在脚本/文档里统一用 `npm.cmd` 而不是 `npm`。

---

## E-03 PyMuPDF 提取中文乱码

**现象**：`fitz.open(pdf).get_text()` 提取中文全为乱码（`�` 替换符），但英文正常。用 pdfplumber 也一样。

**根因**：PDF 内嵌中文字体为 **Type0 / Identity-H 编码且无 ToUnicode CMap**（常见于中文排版软件生成的子集字体），提取器无法把字符代码映射回 Unicode。

**排查**：
```python
import fitz
doc = fitz.open("x.pdf")
for f in doc[0].get_fonts():
    print(f)   # 出现 Identity-H 且无 ToUnicode 即中招
```

**修复**（三选一）：
1. **找配套文本源**（最快）：很多资料库同时提供 `.txt` 版本（如 ForestDeer 仓库 `英语/2025....txt`），直接用文本源清洗，跳过提取。
2. OCR（扫描件）：`rapidocr_onnxruntime` 或 Tesseract 中文包。
3. 其他提取器交叉验证：`pdfplumber`、`pymupdf rawdict`、`pdftotext -layout`。

**注意**：乱码文本**不要人工脑补还原**（红线），优先找权威文本源。

---

## E-04 GitHub API 401/403/404

**现象**：
- 匿名访问 `repos/{owner}/{repo}/actions/runs/{id}/jobs` → 404
- 匿名访问 `.../logs` → 403 Forbidden
- 触发 `rerun` → 401 Unauthorized
- 但 `repos/{owner}/{repo}/actions/runs?per_page=N` 列表可匿名读取

**根因**：GitHub 对 **Actions 详细日志/单个 run 详情** 要求认证（Actions API 鉴权收紧）；只有 run 列表等元数据是公开的。

**排查/修复**：
1. 列表层能看结论（success/failure），确认哪个 job 失败：
   ```bash
   curl -H "User-Agent: dsh" "https://api.github.com/repos/{owner}/{repo}/actions/runs?per_page=5"
   ```
2. 拿完整日志：装 GitHub CLI 并 `gh auth login`：
   ```bash
   gh run view 69 --repo owner/repo --log-failed
   ```
3. 或直接在网页 Actions 页面看（需登录仓库所有者账号）。
4. 触发 rerun：`gh run rerun 69 --failed`（**需要授权，先征得同意**）。

**预防**：CI 排障时优先准备认证凭据（GH_TOKEN 或 gh CLI）。

---

## E-05 双栏 PDF 文本提取顺序错乱

**现象**：双栏排版的试卷，`get_text()` 先读左栏上半段→跳右栏上半段→左栏下半段…，导致阅读理解句子被拦腰截断、文章段落混乱、文章跑到题目后面。

**修复**（本仓库 `pdf-to-knowledge` 技能已实现，见 `skills/pdf-to-knowledge.yaml`）：
- 按"页眉/页码/分页标记"清洗
- 短文区按 `A/B/C` 标记 + 小节标题切段，段落内跨行合并
- 跨页句子自动拼接（分页分隔符前后判断句末标点）
- 红线：**只调整换行/段落/排版，绝不修改原文文字**
- 校验：清洗后逐字符比对原文（去空白/markdown 标记后应完全一致）

---

## E-06 VitePress build 大 chunk 警告

**现象**：
```
(!) Some chunks are larger than 500 kB after minification
```
**性质**：**警告非错误**，构建仍成功（`build complete`）。原因是 markdown-it-mathjax3 等库体积大。

**处理**：当前可忽略。若要优化：`docs/.vitepress/config.mts` 加 `build.rollupOptions.output.manualChunks` 拆分，或 `chunkSizeWarningLimit` 调大。

---

## E-07 中文文件名/内容在控制台乱码

**现象**：PowerShell / 子进程输出中文变成 `涓撳崌鏈瑪璁?` 之类乱码。

**根因**：控制台代码页（GBK）与文件 UTF-8 不匹配；PowerShell 管道编码问题。

**修复**：
```python
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
```
或 PowerShell 中：`[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`。
**注意**：用 `read`/`grep` 工具读文件时如果显示正常，说明文件本身是 UTF-8，只是控制台显示问题（本仓库 `docs/.vitepress/config.mts` 曾因此误判为乱码）。

---

## E-08 Obsidian wiki 链接断链（空格 vs 连字符）

**现象**：断链检查发现 206 处 `[[链接]]` 无法解析，其中 184 处是：
- 链接写 `[[1.1 C语言概述与基本概念]]`（空格）
- 实际文件名 `1.1-C语言概述与基本概念.md`（连字符）

**根因**：文件批量生成时用连字符命名，但人工/历史链接沿用空格；Obsidian 按 basename 匹配因此多数在 Obsidian 内仍可跳转，但相对路径/VitePress 侧断链。

**修复**（脚本化）：
```python
# 对每个断链 target：把 basename 的空格替换为连字符后重新匹配
import re
alt = base.replace(' ', '-')
if alt in basename_index:
    # 替换 md 中所有 [[base]] -> [[alt]]
```
**注意**：替换前备份；只改链接不改文件名（或反之统一，二选一）。

---

## 附录：CI 排障速查（本仓库）

- CI：GitHub Actions `deploy.yml` → build job（npm ci + docs:build）→ deploy job（Pages）
- 最近失败点：run 61 起 build job 失败（疑似 npm ci EALLOWREMOTE，lockfile 已修复推送）
- 本地复现命令：
  ```bash
  npm ci && npm run docs:build   # 应成功
  $env:GITHUB_ACTIONS='true'; npm run docs:build   # 模拟 CI 环境变量
  ```
- 日志获取：`gh run view <id> --log-failed`（需认证）
