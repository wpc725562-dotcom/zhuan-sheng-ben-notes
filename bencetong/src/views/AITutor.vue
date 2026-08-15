<template>
  <div class="ai-tutor">
    <h1 class="page-title">🤖 AI 学习助手</h1>
    <p class="page-subtitle">问高数问题，AI 帮你解答</p>

    <!-- 未配置 API key -->
    <div v-if="!hasApiKey" class="card no-key">
      <div class="no-key-icon">🔑</div>
      <h3>需要配置 DeepSeek API Key</h3>
      <p>请先在设置页面填入你的 DeepSeek API Key，即可使用 AI 学习助手</p>
      <router-link to="/settings" class="btn btn-primary">去设置 →</router-link>
    </div>

    <!-- 对话区域 -->
    <div v-else class="chat-container">
      <!-- 消息列表 -->
      <div class="chat-messages" ref="messagesRef">
        <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role">
          <div class="msg-avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</div>
          <div class="msg-content">
            <div class="msg-text" v-html="renderMessage(msg.content)"></div>
            <div v-if="msg.role === 'assistant' && msg.sources" class="msg-sources">
              <div v-for="(src, j) in msg.sources" :key="j" class="source-chip">
                📖 {{ src }}
              </div>
            </div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="message assistant">
          <div class="msg-avatar">🤖</div>
          <div class="msg-content">
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="messages.length === 0" class="welcome">
          <div class="welcome-icon">🧮</div>
          <h3>有什么高数问题想问？</h3>
          <p class="welcome-hint">比如：</p>
          <div class="suggestions">
            <div v-for="(q, i) in suggestedQuestions" :key="i"
              class="suggestion-chip"
              @click="askSuggestion(q)">
              {{ q }}
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input-bar">
        <textarea
          v-model="inputText"
          class="chat-input"
          placeholder="输入你的高数问题..."
          rows="1"
          @keydown.enter.exact="sendMessage"
          @input="autoResize"
          :disabled="loading"
        ></textarea>
        <button
          class="btn btn-primary send-btn"
          @click="sendMessage"
          :disabled="loading || !inputText.trim()"
        >
          {{ loading ? '思考中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

const API_KEY_STORAGE = 'bencetong_deepseek_key'
const API_URL = 'https://api.deepseek.com/v1/chat/completions'

const hasApiKey = ref(false)
const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const messagesRef = ref(null)

const suggestedQuestions = [
  '极限 lim(x→0) sin(x)/x 为什么等于 1？',
  '导数 f\'(x) 和微分 dy/dx 有什么区别？',
  '积分 ∫ x² dx 怎么算？能给我讲详细步骤吗？',
  '什么是链式法则？举个简单例子',
  '我零基础，应该先学什么？给我一个学习计划'
]

onMounted(() => {
  checkApiKey()
})

function checkApiKey() {
  const key = localStorage.getItem(API_KEY_STORAGE)
  hasApiKey.value = !!key && key.length > 10
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 150) + 'px'
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  loading.value = true

  await scrollToBottom()

  try {
    const apiKey = localStorage.getItem(API_KEY_STORAGE)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是本科通 AI 学习助手，专门辅导广东专升本高等数学。

你的教学风格：
1. 用通俗比喻和生活中的例子解释数学概念（适合零基础）
2. 解答要详细，分步骤，每个公式都要解释
3. 遇到难题时，先问用户哪里不懂，再针对性解答
4. 鼓励用户，给 positive feedback
5. 如果用户问的不是高数问题，委婉引导回高数话题

学习背景：用户是广东专升本考生，零基础起步，目标 80 分，每周学习 3-6 小时。`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      })
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.message || `API 请求失败 (${response.status})`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题，能再详细说说吗？'

    messages.value.push({ role: 'assistant', content: reply })
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: `❌ 出错了：${e.message}\n\n请检查：\n1. API Key 是否正确\n2. 网络是否通畅\n3. 在设置页面重新配置`
    })
  }

  loading.value = false
  await scrollToBottom()
}

function askSuggestion(q) {
  inputText.value = q
  sendMessage()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

function renderMessage(text) {
  if (!text) return ''
  // 支持代码块、粗体、换行
  let html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
  return html
}
</script>

<style scoped>
.ai-tutor {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
}

/* 未配置 Key */
.no-key {
  text-align: center;
  padding: 60px 40px;
  margin: 40px auto;
  max-width: 400px;
}
.no-key-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.no-key h3 {
  margin-bottom: 12px;
}
.no-key p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

/* 对话容器 */
.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  max-width: 85%;
}
.message.user {
  flex-direction: row-reverse;
  margin-left: auto;
}
.msg-avatar {
  font-size: 28px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}
.message.user .msg-avatar {
  background: #eef2ff;
}
.message.assistant .msg-avatar {
  background: #f0fdf4;
}
.msg-content {
  background: #f8fafc;
  padding: 14px 18px;
  border-radius: 12px;
  line-height: 1.7;
  font-size: 14px;
}
.message.user .msg-content {
  background: var(--primary);
  color: #fff;
}
.msg-text :deep(code) {
  background: rgba(0,0,0,0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
}
.msg-text :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 8px 0;
  font-size: 13px;
}
.msg-text :deep(pre code) {
  background: none;
  padding: 0;
}
.msg-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.source-chip {
  font-size: 11px;
  background: #eef2ff;
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 4px;
}

/* 欢迎 */
.welcome {
  text-align: center;
  padding: 40px 20px;
}
.welcome-icon {
  font-size: 64px;
  margin-bottom: 12px;
}
.welcome h3 {
  margin-bottom: 8px;
}
.welcome-hint {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
  margin: 0 auto;
}
.suggestion-chip {
  padding: 10px 16px;
  background: #f1f5f9;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.suggestion-chip:hover {
  background: #eef2ff;
  color: var(--primary);
}

/* 输入区域 */
.chat-input-bar {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  background: #fff;
}
.chat-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
}
.chat-input:focus {
  border-color: var(--primary);
}
.send-btn {
  align-self: flex-end;
  padding: 10px 20px;
}

/* 打字动画 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}
.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: bounce 1.4s infinite ease-in-out both;
}
.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
</style>