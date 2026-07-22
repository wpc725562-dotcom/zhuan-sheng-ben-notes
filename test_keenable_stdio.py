import os
import sys
import json
import subprocess
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

def find_npx():
    candidates = [
        "C:/Program Files/nodejs/npx.cmd",
        os.path.expanduser("~/AppData/Roaming/npm/npx.cmd"),
        os.path.expanduser("~/scoop/apps/nodejs/current/npx.cmd"),
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    for p in os.environ.get("PATH", "").split(";"):
        np = os.path.join(p, "npx.cmd")
        if os.path.isfile(np):
            return np
        npe = os.path.join(p, "npx.exe")
        if os.path.isfile(npe):
            return npe
    return "npx.cmd"

def send_json_rpc(process, method, params=None, msg_id=None):
    message = {"jsonrpc": "2.0", "method": method}
    if params is not None:
        message["params"] = params
    if msg_id is not None:
        message["id"] = msg_id
    payload = json.dumps(message) + "\n"
    process.stdin.write(payload)
    process.stdin.flush()

def read_json_rpc(process):
    line = process.stdout.readline()
    if not line:
        return None
    try:
        return json.loads(line.strip())
    except Exception as e:
        print(f"⚠️ 解析响应失败: {line} | 错误: {e}")
        return None

def test_keenable_connection():
    print("=" * 60)
    print("🔮 MTool - Keenable 神经元链路 Stdio 测试...")
    print("=" * 60)
    
    npx_path = find_npx()
    print(f"📡 npx 路径: {npx_path}")
    
    try:
        process = subprocess.Popen(
            f'"{npx_path}" -y @keenable/mcp',
            stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, text=True, encoding="utf-8", shell=True
        )
    except Exception as e:
        print(f"❌ 启动失败: {e}")
        return

    # Initialize
    print("🤝 发起 MCP Initialize 握手...")
    send_json_rpc(process, "initialize", {
        "protocolVersion": "2024-11-05", "capabilities": {},
        "clientInfo": {"name": "mtool-keenable-debugger", "version": "1.0.0"}
    }, msg_id=1)
    
    init_resp = read_json_rpc(process)
    if init_resp and "result" in init_resp:
        print("✅ Initialize 握手成功！")
    else:
        print(f"❌ 握手失败: {init_resp}")
        process.terminate()
        return

    send_json_rpc(process, "notifications/initialized")
    print("🟢 协议激活！")
    print("-" * 60)

    # tools/list
    print("🛠️ 获取工具清单...")
    send_json_rpc(process, "tools/list", msg_id=2)
    tools_resp = read_json_rpc(process)
    
    if tools_resp and "result" in tools_resp:
        tools = tools_resp["result"].get("tools", [])
        print(f"🎉 发现 {len(tools)} 个工具：")
        for tool in tools:
            print(f"  👉 【{tool['name']}】: {tool.get('description', '')[:80]}...")
    print("-" * 60)

    # 实战搜索 (不带 count 参数)
    query = "广东专升本 数据结构 严蔚敏 考纲"
    print(f"🔍 搜索: 【{query}】")
    
    send_json_rpc(process, "tools/call", {
        "name": "search_web_pages",
        "arguments": {"query": query, "snippet_max_length": 500}
    }, msg_id=3)
    
    search_resp = read_json_rpc(process)
    
    if search_resp and "result" in search_resp:
        content = search_resp["result"].get("content", [])
        if content:
            print("🚀 检索成功！结果如下：\n")
            for idx, item in enumerate(content[:5], 1):
                text = item.get("text", "")[:300].replace('\n', ' ')
                print(f"📝 结果 {idx}: {text}")
                print()
        else:
            print("⏳ 没有找到结果。")
    else:
        print(f"❌ 检索失败: {search_resp}")
        # 看看 stderr
        try:
            err = process.stderr.read()
            if err: print(f"stderr: {err[:300]}")
        except: pass

    print("=" * 60)
    process.terminate()
    print("🎉 测试完成！")
    print("=" * 60)

if __name__ == "__main__":
    test_keenable_connection()
