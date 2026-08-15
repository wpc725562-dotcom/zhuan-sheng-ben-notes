#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B站(Bilibili)元数据+音频抓取脚本 -- 免登录走官方API(实测 2026-08)
用法: python bili_fetch.py BV号 [输出路径]
"""
import argparse, json, subprocess, urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
RE = "https://www.bilibili.com/"

def api(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": RE})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

def get_meta(bvid):
    d = api(f"https://api.bilibili.com/x/web-interface/view?bvid={bvid}")["data"]
    pages = [{"cid": p["cid"], "part": p["part"], "duration": p["duration"]} for p in d.get("pages", [])]
    return {"title": d["title"], "owner": d["owner"]["name"], "duration": d.get("duration", 0), "pages": pages, "pic": d.get("pic", "")}

def pick_audio(cid, bvid):
    d = api(f"https://api.bilibili.com/x/player/playurl?bvid={bvid}&cid={cid}&fnval=16&fourk=1")["data"]
    audios = sorted(d.get("dash", {}).get("audio", []), key=lambda a: a.get("bandwidth") or 0)
    if not audios: raise RuntimeError("无 Dash 音频流")
    return audios[0]["baseUrl"]

def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": RE})
    with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
        n = 0
        while True:
            c = r.read(1 << 20)
            if not c: break
            f.write(c); n += len(c)
    return n

def dur(path):
    o = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=noprint_wrappers=1:nokey=1", path],
                       capture_output=True, text=True).stdout.strip()
    return float(o) if o else None

def main(bvid, out):
    m = get_meta(bvid)
    print(f"标题: {m['title']}  |  UP: {m['owner']}  |  分P: {len(m['pages'])}  总时长: {m['duration']}s")
    if not m["pages"]: print("无分P, 中止"); return
    cid = m["pages"][0]["cid"]
    url = pick_audio(cid, bvid)
    print(f"音频流: {url[:70]}...")
    size = download(url, out)
    print(f"已下载: {out}  {size/1e6:.1f} MB")
    act, exp = dur(out), m["pages"][0]["duration"]
    print(f"时长校验: 实际 {act}s 元数据 {exp}s 差 {abs(act-exp):.1f}s " + ("OK" if act and abs(act-exp) <= 5 else "!!偏差过大"))

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("bvid"); p.add_argument("out", nargs="?", default="audio.m4s")
    main(p.parse_args().bvid, p.parse_args().out)
