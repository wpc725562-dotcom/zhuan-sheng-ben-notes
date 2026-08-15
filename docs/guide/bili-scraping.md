# B站爬取优化笔记（实测 2026-08）

本地实测定论：**B站元数据可免登录白嫖（官方 API），瓶颈仅在「下载播放流」这一关。**

## 核心结论一句话

> **元数据 100% 拿走（API 直取），真正卡住 yt-dlp 的只是网页抓取层（HTTP 412 风控），不是登录/网络。** 下载流走官方播放流 API 可免登录。

## 已实测验证的能力

| 环节 | 端点 | 结果 |
|:---|:---|:---:|
| 元数据 | `x/web-interface/view?bvid=` | ✅ code:0 标题/UP/分P/cid/时长/封面 |
| 播放流 | `x/player/playurl?bvid=&cid=&fnval=16` | ✅ code:0 免登录，DASH 音频若干条 |
| 下载 m4s | 流地址直拉 | ✅ |
| 时长校验 | ffprobe vs 元数据 | ✅ 差 ≤5% |

> 坑：用 `api/playurl` 会被反爬，**必须用 `x/player/playurl` + Referer 头**。

## 三板斧（下载流破解）

1. **元数据一律走官方 API**（别用 yt-dlp），`curl` 带 `User-Agent + Referer: https://m.bilibili.com/`
2. **下载流**：带完整 `Referer + Origin`，用 `x/player/playurl` 取 Dash 音频流
3. **降档**：选最小码率音频（`bandwidth` 最小的 dash.audio），口播/对话够用，大幅降风控

## 时长校验建议

- 分P视频：**逐 P 用 `pages[].duration` 比对**，别用整体 duration（分P 总长≠单段音频）
- 阈值 ±5%；差异大优先**重下一遍**而非自动改，避免音画不同步

## 脚本源码

见仓库 `scripts/bili_fetch.py`：
```bash
python scripts/bili_fetch.py BV号 [输出.m4s]
```
自动：元数据 → 取最小bandwidth音频流 → 下载 → ffprobe时长校验。

## 注意

- B站教学视频大多**无官方 chapters**，转写后按文本结构拆章仍是正确兜底。
- 本机到部分中国站点（百度/知乎/文库）出口被限，GitHub/B站 可达——资源优先走这两通道。
