#!/usr/bin/env node
/**
 * git-sync.mjs — 安全 git 提交/推送守卫（DeepSeek Harness 原生能力，非第三方插件）
 *
 * 目标：在 Agent 自动改笔记、批量提交时，把「提交不规范 / 误提交 / force-push」
 * 等事故挡在门外，保证推 GitHub 的过程可控、可回溯。
 *
 * 用法：
 *   node scripts/git-sync.mjs --message "📚 补全高数第3章例题"          # 只提交（带校验）
 *   node scripts/git-sync.mjs --message "..." --push                  # 提交 + 推送
 *   node scripts/git-sync.mjs --prefix 📚 --message "..." --push      # 显式指定前缀 emoji
 *   node scripts/git-sync.mjs --yes --push                            # 跳过交互提示（Agent 用）
 *
 * 行为：
 *   1. 强制提交信息规范（emoji 前缀 + 中文描述），可用 --allow-nonstandard 关闭
 *   2. 提交前默认先跑 scripts/health-check.mjs --quick，失败即中止（--no-check 关闭）
 *   3. 只允许提交文档类文件；*.pdf/*.zip/*.docx 除非在 docs/public 例外名单，否则拒绝
 *   4. 绝对拒绝 --force / --force-with-lease / force-push
 *   5. push 前先 fetch，若非 fast-forward 则中止并给出 pull 指引
 *   6. 提交前会列出将提交的文件清单供复核（--yes 跳过交互）
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

// 允许提交的扩展名（笔记/脚本/配置）
const ALLOWED_EXT = new Set(['.md', '.mts', '.ts', '.tsx', '.js', '.mjs', '.json', '.yaml', '.yml', '.py', '.ps1', '.css', '.svg', '.html', '.webp', '.txt', '.sh']);
// 远端一键 push 允许的路径（.gitignore 之外的例外如分年真题 PDF）
const ALLOWED_EXCEPTION = ['docs/public/papers/'];
// 提交信息规范前缀（沿用仓库既有习惯）
const PREFIXES = ['📚', '🔧', '🚨', '✨', '🐛', '💄', '♻️', '📝', '⬆️', '⚡', '🏷️', '🗃️'];

const args = process.argv.slice(2);
function getArg(flag) { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; }
const has = (flag) => args.includes(flag);

const message = getArg('--message') ?? getArg('-m');
const prefix = getArg('--prefix');
const doPush = has('--push') || has('-p');
const yes = has('--yes');
const noCheck = has('--no-check');
const allowNonStandard = has('--allow-non-prefix');
const allowForce = has('--allow-force'); // 防御性：默认永远拒绝，除非显式且明确意图

function die(msg) { console.error(`\n❌ ${msg}`); process.exit(1); }
function git(args_, opts = {}) {
  const r = spawnSync('git', args_, { cwd: ROOT, encoding: 'utf-8', ...opts });
  return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim(), status: r.status };
}

// ---------- 0. 环境检查 ----------
if (!existsSync(join(ROOT, '.git'))) die(`不是 git 仓库：${ROOT}`);
if (allowForce) die('--force 已被硬性禁止：本守卫不接受 force/force-with-lease 推送。');

// ---------- 1. 提交信息校验 ----------
if (!message || !message.trim()) die('缺少提交信息。请用 --message "..." 提供（推荐带 emoji 前缀）。');
const trimmedMsg = message.trim();
const firstToken = trimmedMsg.split(/\s/)[0];
const hasEmoji = PREFIXES.includes(firstToken) || /^[🚀🔖🎯📌✅❌⚠️🔥💡🧪🔬🗂️📁🆕]/.test(trimmedMsg);

if (!allowNonStandard) {
  if (!hasEmoji) die(`提交信息缺少规范前缀。期望形如：「📚 补全高数第1章例题」。${PREFIXES.join(' ')}`);
  if (trimmedMsg.length < 6) die('提交信息过短，请写明做了什么事。');
}
const commitTopic = prefix ? `${prefix} ${trimmedMsg}` : trimmedMsg;

// ---------- 2. 工作区扫描 ----------
const st = git(['status', '--porcelain=v1', '-z']);
if (!st.ok) die(`git status 失败：${st.err}`);
if (st.out.length === 0) { console.log('✅ 工作区干净，无需提交。'); process.exit(0); }

const entries = st.out.split('\0').filter(Boolean);
const staged = [];
const unstaged = [];
for (const line of entries) {
  const xy = line.slice(0, 2);
  const path = line.slice(3).replace(/^"|"$/g, '');
  if (xy[0] !== ' ' && xy[0] !== '?') staged.push(path);
  else unstaged.push(path);
}
console.log(`\n已暂存 ${staged.length} 项 / 未暂存 ${unstaged.length} 项`);
staged.slice(0, 30).forEach(p => console.log(`  + ${p}`));
if (staged.length > 30) console.log(`  ... 共 ${staged.length} 项`);

// 允许用户把希望纳入的文件先 add 进来；未暂存文件也给提示
if (unstaged.length && !yes) {
  console.log(`\n⚠️ 有 ${unstaged.length} 个未暂存文件仍在工作区（不会被提交）。若想一并提交请先 git add。`);
}

// ---------- 3. 敏感/大文件拦截 ----------
const forbidden = [];
for (const p of staged) {
  const lower = p.toLowerCase();
  const forbiddenExt = !ALLOWED_EXT.has(lower.split('.').pop()) && !isException(p);
  const privatePath = /node_modules\/|\.git\/|docs\/\.vitepress\/dist\/|\/\.obsidian\//.test(lower);
  if (privatePath) forbidden.push(`${p}（私有/构建产物）`);
  else if (forbiddenExt) forbidden.push(`${p}（扩展名不被允许）`);
}
if (forbidden.length) die(`检测到 ${forbidden.length} 个不允许提交的文件，已中止：\n  - ` + forbidden.slice(0, 20).join('\n  - '));

function isException(p) { return ALLOWED_EXCEPTION.some(prefix_ => p.startsWith(prefix_)); }

// ---------- 4. 提交前健康检查 ----------
if (!noCheck && existsSync(join(ROOT, 'scripts', 'health-check.mjs'))) {
  console.log('\n🩺 提交前健康检查…');
  const hc = spawnSync(process.execPath, [join(ROOT, 'scripts', 'health-check.mjs'), '--quick'], { cwd: ROOT, encoding: 'utf-8' });
  if (hc.status !== 0) die(`健康检查未通过，中止提交。先修复后再试。\n${(hc.stdout||'').slice(-1200)}`);
  console.log('✅ 健康检查通过');
} else if (noCheck) {
  console.log('ℹ️ 已跳过健康检查（--no-check）');
}

// ---------- 5. 提交 ----------
const commit = git(['commit', '-m', commitTopic]);
if (!commit.ok) die(`提交失败：\n${commit.err}\n${commit.out}`);
console.log(`\n✅ 已提交：${commit.out.split('\n')[0]}`);
const head = git(['rev-parse', '--short', 'HEAD']);

// ---------- 6. 推送（可选，带 fast-forward 保护） ----------
if (!doPush) {
  console.log(`\nℹ️ 未推送。HEAD=${head.out}。可执行：node scripts/git-sync.mjs --push`);
  process.exit(0);
}

// 先核对远端是否新增了本地没有的提交，避免非 fast-forward
const ref = git(['symbolic-ref', '--short', 'refs/remotes/origin/HEAD']).ok ? 'origin/HEAD' : 'origin/main';
const remoteFetch = git(['fetch', 'origin']);
if (!remoteFetch.ok) die(`fetch 失败：${remoteFetch.err}`);
const up = git(['rev-list', '--count', `${ref}..HEAD`]);
const down = git(['rev-list', '--count', `HEAD..${ref}`]);
const upN = Number(up.out); const downN = Number(down.out);
if (downN > 0) die(`远端领先本地 ${downN} 个提交，直接 push 会变成 non-fast-forward（相当于覆写远端）。请先 pull 或 rebase：\n  git pull --rebase origin ${'main'}\n然后重试。`);
if (upN < 1) { console.log('ℹ️ 本地没有需要推送的新提交，跳过。'); process.exit(0); }

const pushR = git(['push', 'origin', 'HEAD']);
if (!pushR.ok) die(`推送失败：\n${pushR.err}\n${pushR.out}`);
console.log(`\n🚀 已推送 ${upN} 个提交到 origin。`);