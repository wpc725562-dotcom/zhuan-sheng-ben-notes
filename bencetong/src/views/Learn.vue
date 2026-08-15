<template>
  <div class="learn">
    <h1 class="page-title">📚 学习内容</h1>
    <p class="page-subtitle">广东专升本高等数学 — 各章节知识点精讲</p>

    <div class="learn-layout">
      <!-- 左侧：章节列表 -->
      <div class="chapter-list-panel">
        <div
          v-for="ch in chapters"
          :key="ch.id"
          class="chapter-card"
          :class="{
            active: currentChapter?.id === ch.id,
            completed: chapterProgress[ch.id]
          }"
          @click="selectChapter(ch)"
        >
          <div class="chapter-color" :style="{ background: ch.color }"></div>
          <div class="chapter-info">
            <div class="chapter-num">{{ ch.num }}</div>
            <div class="chapter-name">{{ ch.name }}</div>
            <div class="chapter-meta">
              <span class="weight-badge">{{ ch.weight }}</span>
              <span v-if="chapterProgress[ch.id]" class="done-badge">✅ 已学</span>
            </div>
          </div>
          <div class="chapter-sections-count">{{ ch.sections.length }} 节</div>
        </div>
      </div>

      <!-- 右侧：内容区域 -->
      <div class="content-panel">
        <!-- 未选择章节 -->
        <div v-if="!currentChapter" class="placeholder">
          <div class="placeholder-icon">📖</div>
          <p>从左侧选择一个章节开始学习</p>
          <p class="placeholder-hint">建议按顺序从第1章开始</p>
        </div>

        <!-- 已选择章节 -->
        <div v-else class="chapter-content">
          <!-- 章节标题 -->
          <div class="content-header">
            <div>
              <h2>{{ currentChapter.num }} {{ currentChapter.name }}</h2>
              <p class="content-subtitle">考纲占比 {{ currentChapter.weight }} · 共 {{ currentChapter.sections.length }} 节知识点</p>
            </div>
            <div class="header-actions">
              <button
                class="btn"
                :class="chapterProgress[currentChapter.id] ? 'btn-secondary' : 'btn-success'"
                @click="toggleComplete(currentChapter.id)"
              >
                {{ chapterProgress[currentChapter.id] ? '✅ 已标记完成' : '📌 标记为已学完' }}
              </button>
            </div>
          </div>

          <!-- 知识点卡片 -->
          <div
            v-for="(section, i) in currentChapter.sections"
            :key="i"
            class="section-card"
          >
            <h3 class="section-title">{{ section.title }}</h3>
            <div class="section-content" v-html="renderMarkdown(section.content)"></div>

            <div v-if="section.formula" class="formula-box">
              <div class="formula-label">📐 公式</div>
              <div class="formula-text">{{ section.formula }}</div>
            </div>

            <div v-if="section.example" class="example-box">
              <div class="example-label">✏️ 例题</div>
              <div class="example-text" v-html="renderMarkdown(section.example)"></div>
            </div>

            <!-- 科学方法：费曼挑战 + 掌握度自评 -->
            <div class="science-methods">
              <!-- 费曼挑战 -->
              <div class="feynman-section">
                <button class="btn btn-sm feynman-btn" @click="toggleFeynman(i)">
                  🗣️ {{ feynmanOpen[i] ? '收起费曼挑战' : '费曼挑战：用自己的话解释' }}
                </button>
                <div v-if="feynmanOpen[i]" class="feynman-box">
                  <p class="feynman-hint">用你自己的话重新解释这个知识点，就像教给一个完全不懂的人。</p>
                  <textarea
                    v-model="feynmanAnswers[i]"
                    class="feynman-input"
                    :placeholder="'试着解释「' + section.title + '」...'"
                    rows="3"
                  ></textarea>
                  <div class="feynman-actions">
                    <button class="btn btn-sm btn-primary" @click="saveFeynman(i)">
                      ✅ 保存我的解释
                    </button>
                    <span v-if="feynmanSaved[i]" class="saved-tip">已保存！</span>
                  </div>
                </div>
              </div>

              <!-- 掌握度自评 -->
              <div class="mastery-section">
                <span class="mastery-label">掌握度：</span>
                <span
                  v-for="star in 5"
                  :key="star"
                  class="mastery-star"
                  :class="{ active: (mastery[i] || 0) >= star }"
                  @click="setMastery(i, star)"
                >★</span>
                <span class="mastery-text">{{ masteryText(mastery[i] || 0) }}</span>
              </div>

              <!-- 推送到 Anki -->
              <button class="btn btn-sm btn-secondary push-anki-btn" @click="pushToAnki(section, i)">
                📤 推送到 Anki 复习
              </button>
            </div>
          </div>

          <!-- 章节练习 -->
          <div class="practice-section">
            <h3>📝 本章小练习</h3>
            <div v-for="(item, i) in currentChapter.practice" :key="i" class="practice-item">
              <div class="practice-question">
                <span class="practice-num">{{ i + 1 }}.</span>
                {{ item.question }}
              </div>
              <div class="practice-actions">
                <button
                  class="btn btn-secondary btn-sm"
                  @click="togglePracticeAnswer(i)"
                >
                  {{ showPracticeAnswers[i] ? '🙈 隐藏答案' : '👀 查看答案' }}
                </button>
                <span v-if="item.hint" class="hint-btn" @click="showPracticeHint(i)">
                  💡 提示
                </span>
              </div>
              <div v-if="showPracticeAnswers[i]" class="practice-answer">
                <strong>答案：</strong>{{ item.answer }}
              </div>
              <div v-if="practiceHints[i]" class="practice-hint">
                💡 {{ item.hint }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { CHAPTERS, getChapterProgress, saveChapterProgress } from '../data/chapters-data.js'

const chapters = CHAPTERS
const currentChapter = ref(null)
const chapterProgress = reactive(getChapterProgress())
const showPracticeAnswers = reactive({})
const practiceHints = reactive({})

// 科学方法状态
const feynmanOpen = reactive({})
const feynmanAnswers = reactive({})
const feynmanSaved = reactive({})
const mastery = reactive({})
const pushingAnki = reactive({})

const MASTERY_KEY = 'bencetong_mastery'
const FEYNMAN_KEY = 'bencetong_feynman'

function selectChapter(ch) {
  currentChapter.value = ch
  window.scrollTo({ top: 0, behavior: 'smooth' })
  // 恢复该章的掌握度和费曼数据
  loadScienceData(ch.id)
}

function toggleComplete(chapterId) {
  const newVal = !chapterProgress[chapterId]
  chapterProgress[chapterId] = newVal
  saveChapterProgress(chapterId, newVal)
}

function togglePracticeAnswer(i) {
  showPracticeAnswers[i] = !showPracticeAnswers[i]
}

function showPracticeHint(i) {
  practiceHints[i] = !practiceHints[i]
}

// ---- 费曼挑战 ----
function toggleFeynman(i) {
  feynmanOpen[i] = !feynmanOpen[i]
}

function saveFeynman(i) {
  feynmanSaved[i] = true
  setTimeout(() => { feynmanSaved[i] = false }, 2000)
  // 保存到 localStorage
  const key = `${FEYNMAN_KEY}_${currentChapter.value.id}_${i}`
  localStorage.setItem(key, feynmanAnswers[i] || '')
}

// ---- 掌握度自评 ----
function setMastery(sectionIdx, star) {
  mastery[sectionIdx] = star
  // 保存到 localStorage
  const key = `${MASTERY_KEY}_${currentChapter.value.id}`
  const data = JSON.parse(localStorage.getItem(key) || '{}')
  data[sectionIdx] = star
  localStorage.setItem(key, JSON.stringify(data))
}

function masteryText(level) {
  const texts = ['未评分', '没懂😵', '有点模糊🤔', '基本理解👍', '比较清楚💪', '完全掌握🎯']
  return texts[level] || ''
}

// ---- 加载科学数据 ----
function loadScienceData(chapterId) {
  // 掌握度
  const masteryKey = `${MASTERY_KEY}_${chapterId}`
  const saved = JSON.parse(localStorage.getItem(masteryKey) || '{}')
  Object.keys(saved).forEach(k => { mastery[Number(k)] = saved[k] })

  // 费曼答案
  const ch = chapters.find(c => c.id === chapterId)
  if (ch) {
    ch.sections.forEach((_, i) => {
      const key = `${FEYNMAN_KEY}_${chapterId}_${i}`
      const val = localStorage.getItem(key)
      if (val) feynmanAnswers[i] = val
    })
  }
}

// ---- 推送到 Anki ----
async function pushToAnki(section, sectionIdx) {
  const key = `push_${currentChapter.value.id}_${sectionIdx}`
  pushingAnki[key] = true

  // 构建 Anki 卡片内容
  const front = `${currentChapter.value.num} ${currentChapter.value.name} — ${section.title}`
  const back = `${section.content.replace(/\*\*/g, '').substring(0, 300)}...\n\n公式：${section.formula || '无'}\n\n例题：${section.example || '无'}`

  try {
    const payload = JSON.stringify({
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: '专升本::高数知识点',
          modelName: 'Basic',
          fields: {
            Front: front,
            Back: back
          },
          tags: ['高数', currentChapter.value.num, '知识点']
        }
      }
    })
    const resp = await fetch('http://127.0.0.1:8765', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })
    const result = await resp.json()
    if (result.error) {
      alert('Anki 推送失败: ' + result.error + '\n请确保 Anki 桌面版已打开')
    } else {
      alert('✅ 已推送到 Anki！可在「专升本::高数知识点」牌组中复习')
    }
  } catch (e) {
    alert('❌ 连接 Anki 失败。请确保 Anki 桌面版已打开并安装了 AnkiConnect 插件。')
  }

  pushingAnki[key] = false
}

// ---- Markdown 渲染 ----
function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/### (.+)/g, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/> 💡 (.+)/g, '<blockquote>💡 $1</blockquote>')
    .replace(/\n/g, '<br>')
}

onMounted(() => {
  const saved = getChapterProgress()
  Object.assign(chapterProgress, saved)
})
</script>

<style scoped>
.learn-layout {
  display: flex;
  gap: 20px;
  min-height: calc(100vh - 140px);
}

/* 左侧章节列表 */
.chapter-list-panel {
  width: 240px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.chapter-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.chapter-card:hover {
  border-color: var(--primary-light);
  transform: translateX(2px);
}
.chapter-card.active {
  border-color: var(--primary);
  background: #eef2ff;
  box-shadow: 0 2px 8px rgba(99,102,241,0.15);
}
.chapter-card.completed {
  opacity: 0.85;
}
.chapter-card.completed::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  border: 1px solid var(--success);
  pointer-events: none;
}

.chapter-color {
  width: 6px;
  height: 40px;
  border-radius: 3px;
  flex-shrink: 0;
}

.chapter-info {
  flex: 1;
  min-width: 0;
}
.chapter-num {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;
}
.chapter-name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chapter-meta {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}
.weight-badge {
  font-size: 10px;
  background: #f1f5f9;
  color: var(--text-secondary);
  padding: 1px 6px;
  border-radius: 3px;
}
.done-badge {
  font-size: 10px;
  color: var(--success);
}
.chapter-sections-count {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
}

/* 右侧内容 */
.content-panel {
  flex: 1;
  min-width: 0;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: var(--text-secondary);
}
.placeholder-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.placeholder-hint {
  font-size: 13px;
  margin-top: 8px;
  color: #94a3b8;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.content-header h2 {
  font-size: 22px;
  font-weight: 700;
}
.content-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.header-actions {
  flex-shrink: 0;
}

/* 知识点卡片 */
.section-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}
.section-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text);
  padding-bottom: 8px;
  border-bottom: 2px solid #f1f5f9;
}
.section-content {
  line-height: 1.8;
  font-size: 14px;
  color: var(--text);
}
.section-content :deep(blockquote) {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 10px 14px;
  margin: 10px 0;
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  color: #0369a1;
}
.section-content :deep(code) {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  color: var(--primary);
}
.section-content :deep(h4) {
  font-size: 15px;
  font-weight: 600;
  margin: 12px 0 6px;
}

/* 公式框 */
.formula-box {
  background: linear-gradient(135deg, #f0f4ff, #eef2ff);
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  padding: 14px;
  margin: 12px 0;
}
.formula-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 6px;
}
.formula-text {
  font-size: 15px;
  font-family: 'Times New Roman', serif;
  color: #1e293b;
  line-height: 1.6;
}

/* 例题框 */
.example-box {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  margin: 12px 0;
}
.example-label {
  font-size: 12px;
  font-weight: 600;
  color: #f59e0b;
  margin-bottom: 6px;
}
.example-text {
  font-size: 14px;
  line-height: 1.8;
}

/* 科学方法区域 */
.science-methods {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
}

/* 费曼挑战 */
.feynman-section {
  width: 100%;
}
.feynman-btn {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  font-size: 12px;
}
.feynman-btn:hover {
  background: #fde68a;
}
.feynman-box {
  margin-top: 8px;
  padding: 12px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
}
.feynman-hint {
  font-size: 12px;
  color: #92400e;
  margin-bottom: 8px;
}
.feynman-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #fde68a;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}
.feynman-input:focus {
  border-color: #f59e0b;
}
.feynman-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.saved-tip {
  font-size: 12px;
  color: var(--success);
  font-weight: 600;
}

/* 掌握度自评 */
.mastery-section {
  display: flex;
  align-items: center;
  gap: 4px;
}
.mastery-label {
  font-size: 12px;
  color: var(--text-secondary);
}
.mastery-star {
  font-size: 20px;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.15s;
}
.mastery-star.active {
  color: #f59e0b;
  text-shadow: 0 0 4px rgba(245,158,11,0.3);
}
.mastery-star:hover {
  transform: scale(1.2);
}
.mastery-text {
  font-size: 11px;
  color: var(--text-secondary);
  margin-left: 4px;
}

/* 推送 Anki 按钮 */
.push-anki-btn {
  font-size: 12px;
  margin-left: auto;
}

/* 练习 */
.practice-section {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}
.practice-section h3 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
}
.practice-item {
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}
.practice-item:last-child {
  border-bottom: none;
}
.practice-question {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
}
.practice-num {
  font-weight: 700;
  color: var(--primary);
  margin-right: 4px;
}
.practice-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn-sm {
  padding: 4px 12px;
  font-size: 12px;
}
.hint-btn {
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}
.hint-btn:hover {
  background: #f1f5f9;
  color: var(--text);
}
.practice-answer {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  font-size: 13px;
}
.practice-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #f59e0b;
  padding: 4px 8px;
}
</style>