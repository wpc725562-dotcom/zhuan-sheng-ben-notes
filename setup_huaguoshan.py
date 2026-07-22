import os
import sys
import json
import subprocess
from pathlib import Path

# 强制 Python 控制台支持 UTF-8 输出
sys.stdout.reconfigure(encoding='utf-8')

CLAUDE_SETTINGS_DIR = Path.home() / ".claude"
CLAUDE_SETTINGS_PATH = CLAUDE_SETTINGS_DIR / "settings.json"
HUAGUOSHAN_BASE_URL = "http://83.229.124.183:8888/v1"

def setup_huaguoshan_link(api_key):
    print("=" * 60)
    print("🔮 花果山 AI ➡️ 神经链路焊接系统")
    print("=" * 60)

    # 1. 建立配置目录
    if not CLAUDE_SETTINGS_DIR.exists():
        CLAUDE_SETTINGS_DIR.mkdir(parents=True, exist_ok=True)
        print(f"📁 已创建配置目录：{CLAUDE_SETTINGS_DIR}")

    config = {}
    if CLAUDE_SETTINGS_PATH.exists():
        try:
            config = json.loads(CLAUDE_SETTINGS_PATH.read_text(encoding="utf-8"))
            print("📝 读取到现有配置，正在重构...")
        except Exception as e:
            print(f"⚠️ 读取失败，将新建配置: {e}")
            config = {}

    # 2. 构建花果山环境变量
    huaguoshan_env = {
        "ANTHROPIC_BASE_URL": HUAGUOSHAN_BASE_URL,
        "ANTHROPIC_API_KEY": api_key,
        "ANTHROPIC_AUTH_TOKEN": api_key,
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "grok-4.5",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "grok-4.5",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "grok-4.5",
        "CLAUDE_CODE_SUBAGENT_MODEL": "grok-4.5",
        "CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK": "1",
        "DISABLE_PROMPT_CACHING": "1"
    }

    if "env" not in config:
        config["env"] = {}
    config["env"].update(huaguoshan_env)

    # 3. 写入 settings.json
    try:
        CLAUDE_SETTINGS_PATH.write_text(json.dumps(config, indent=2, ensure_ascii=False), encoding="utf-8")
        print("\n✅ settings.json 写入成功！")
    except Exception as e:
        print(f"❌ 写入失败: {e}")
        return

    # 4. 设置 Windows 用户环境变量
    print("\n📡 设置 Windows 全局环境变量...")
    cmds = [
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "{HUAGUOSHAN_BASE_URL}", "User")',
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "{api_key}", "User")',
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "{api_key}", "User")',
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_HAIKU_MODEL", "grok-4.5", "User")',
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_SONNET_MODEL", "grok-4.5", "User")',
        f'[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_OPUS_MODEL", "grok-4.5", "User")'
    ]

    for cmd in cmds:
        try:
            subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True, encoding="utf-8")
        except:
            pass

    print("✅ 环境变量设置完成！")

    print("\n" + "=" * 60)
    print("🎉 花果山 AI 神经链路焊接完毕！")
    print("=" * 60)
    print(f"🔗 Base URL → {HUAGUOSHAN_BASE_URL}")
    print("🤖 Model → grok-4.5")
    print("\n⚠️ 请重启终端/栗子App使环境变量生效！")
    print("=" * 60)

if __name__ == "__main__":
    key = sys.argv[1] if len(sys.argv) > 1 else input("👉 KEY: ")
    setup_huaguoshan_link(key.strip())
