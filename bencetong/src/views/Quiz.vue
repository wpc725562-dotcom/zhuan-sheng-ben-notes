<template>
  <div class="quiz">
    <h1 class="page-title">✏️ 刷题练习</h1>
    <p class="page-subtitle">按章节练习真题，错题自动进 Anki</p>

    <!-- 章节选择 -->
    <div class="card" style="margin-bottom: 16px;">
      <h3 style="margin-bottom: 12px;">选择章节</h3>
      <div class="chapter-tabs">
        <button v-for="(ch, i) in chapters" :key="i"
          class="chapter-tab"
          :class="{ active: selectedChapter === i }"
          @click="selectChapter(i)">
          {{ ch.short }}
        </button>
      </div>
    </div>

    <!-- 题目区域 -->
    <div class="card" v-if="currentQuestion">
      <div class="question-header">
        <span class="q-label">第 {{ currentIndex + 1 }} / {{ questions.length }} 题</span>
        <span class="q-type">{{ currentQuestion.type }}</span>
      </div>
      <div class="question-text">{{ currentQuestion.question }}</div>

      <!-- 选择题选项 -->
      <div v-if="currentQuestion.type === '选择题'" class="options">
        <div v-for="(opt, i) in currentQuestion.options" :key="i"
          class="option"
          :class="{
            selected: selectedOption === i,
            correct: answered && i === currentQuestion.answer,
            wrong: answered && selectedOption === i && i !== currentQuestion.answer
          }"
          @click="selectOption(i)">
          <span class="option-letter">{{ ['A','B','C','D'][i] }}</span>
          <span>{{ opt }}</span>
          <span v-if="answered && i === currentQuestion.answer" class="check-mark">✓</span>
        </div>
      </div>

      <!-- 填空题输入 -->
      <div v-if="currentQuestion.type === '填空题'" class="fill-blank">
        <input v-model="fillAnswer" type="text" placeholder="输入你的答案..." class="fill-input"
          :disabled="answered" @keyup.enter="checkFill" />
        <button v-if="!answered" class="btn btn-primary" @click="checkFill" style="margin-top: 8px;">提交</button>
      </div>

      <!-- 反馈 -->
      <div v-if="answered" class="feedback" :class="isCorrect ? 'correct' : 'wrong'">
        <div class="feedback-icon">{{ isCorrect ? '✅' : '❌' }}</div>
        <div class="feedback-text">
          <strong>{{ isCorrect ? '正确！' : '错误' }}</strong>
          <p>{{ currentQuestion.explanation }}</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="question-actions">
        <button v-if="!answered" class="btn btn-primary" @click="showAnswer">显示答案</button>
        <button v-if="answered" class="btn btn-secondary" @click="pushToAnki" :disabled="pushing">
          {{ pushing ? '添加中...' : '📤 推送到 Anki' }}
        </button>
        <button class="btn btn-secondary" @click="nextQuestion" style="margin-left: 8px;">
          {{ answered ? '下一题 →' : '跳过' }}
        </button>
      </div>
    </div>

    <!-- 无题目 -->
    <div v-else class="card placeholder">
      <div class="placeholder-icon">📝</div>
      <p>选择一个章节开始刷题</p>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">
        题目从笔记仓库的历年真题目录中读取
      </p>
    </div>

    <!-- 统计 -->
    <div class="card" style="margin-top: 16px;" v-if="stats.total > 0">
      <h3 style="margin-bottom: 8px;">📊 练习统计</h3>
      <div class="stats-row">
        <span>已答: {{ stats.answered }}</span>
        <span>正确: {{ stats.correct }} ({{ stats.rate }}%)</span>
        <span>错误: {{ stats.wrong }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const chapters = [
  { short: '函数与极限', full: '第一章 函数与极限' },
  { short: '微分学', full: '第二章 一元函数微分学' },
  { short: '积分学', full: '第三章 一元函数积分学' },
  { short: '向量与几何', full: '第四章 向量与空间几何' },
  { short: '多元函数', full: '第五章 多元函数' },
  { short: '重积分', full: '第六章 重积分与曲线积分' },
  { short: '微分方程', full: '第七章 常微分方程' },
  { short: '无穷级数', full: '第八章 无穷级数' }
]

// 内置示例题目（后续可从仓库真题库读取）
const sampleQuestions = {
  0: [
    {
      type: '选择题',
      question: '函数 f(x) = 1/x 在 x=0 处是（  ）',
      options: ['连续', '可导', '间断', '可微'],
      answer: 2,
      explanation: 'x=0 不在定义域内，所以 f(x) 在 x=0 处间断。'
    },
    {
      type: '选择题',
      question: 'lim(x→0) sin(x)/x = （  ）',
      options: ['0', '1', '∞', '不存在'],
      answer: 1,
      explanation: '这是重要极限公式，lim(x→0) sin(x)/x = 1。'
    },
    {
      type: '填空题',
      question: '函数 y = x² + 1 的导数 dy/dx = ______',
      answer: '2x',
      explanation: '幂函数求导公式：d/dx(xⁿ) = nxⁿ⁻¹，所以 d/dx(x²) = 2x，常数导数为0。'
    }
  ],
  1: [
    {
      type: '选择题',
      question: '函数 y = x³ 在 x=1 处的导数是（  ）',
      options: ['1', '2', '3', '4'],
      answer: 2,
      explanation: 'f\'(x) = 3x²，f\'(1) = 3×1² = 3。'
    }
  ],
  2: [
    {
      type: '选择题',
      question: '∫2x dx = （  ）',
      options: ['x² + C', '2x² + C', 'x² + 2x + C', '2 + C'],
      answer: 0,
      explanation: '∫2x dx = x² + C，常数C不能漏。'
    }
  ]
}

const selectedChapter = ref(-1)
const questions = ref([])
const currentIndex = ref(0)
const selectedOption = ref(-1)
const fillAnswer = ref('')
const answered = ref(false)
const isCorrect = ref(false)
const pushing = ref(false)

const stats = reactive({ total: 0, answered: 0, correct: 0, wrong: 0, rate: 0 })

const currentQuestion = computed(() => {
  if (questions.value.length === 0) return null
  return questions.value[currentIndex.value]
})

function selectChapter(i) {
  selectedChapter.value = i
  questions.value = sampleQuestions[i] || []
  currentIndex.value = 0
  resetQuestion()
  stats.total = questions.value.length
}

function selectOption(i) {
  if (answered.value) return
  selectedOption.value = i
  checkAnswer()
}

function checkAnswer() {
  if (answered.value) return
  answered.value = true
  const q = currentQuestion.value
  if (q.type === '选择题') {
    isCorrect.value = selectedOption.value === q.answer
  }
  stats.answered++
  if (isCorrect.value) {
    stats.correct++
  } else {
    stats.wrong++
  }
  stats.rate = Math.round(stats.correct / stats.answered * 100)
}

function checkFill() {
  if (answered.value || !fillAnswer.value) return
  answered.value = true
  const q = currentQuestion.value
  isCorrect.value = fillAnswer.value.trim() === q.answer
  stats.answered++
  if (isCorrect.value) stats.correct++
  else stats.wrong++
  stats.rate = Math.round(stats.correct / stats.answered * 100)
}

function showAnswer() {
  if (answered.value) return
  answered.value = true
  isCorrect.value = false
  stats.answered++
  stats.wrong++
  stats.rate = Math.round(stats.correct / stats.answered * 100)
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    resetQuestion()
  } else {
    alert('🎉 本章题目已全部完成！')
  }
}

function resetQuestion() {
  answered.value = false
  isCorrect.value = false
  selectedOption.value = -1
  fillAnswer.value = ''
}

async function pushToAnki() {
  pushing.value = true
  const q = currentQuestion.value
  // 通过 AnkiConnect 推送到 Anki
  // 注意：需要 Anki 桌面版已打开
  try {
    const payload = JSON.stringify({
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: '专升本::高数错题',
          modelName: 'Basic',
          fields: {
            Front: q.question + (q.type === '选择题' ? '\n选项: ' + q.options.join(', ') : ''),
            Back: q.explanation
          },
          tags: ['错题', '高数', chapters[selectedChapter.value]?.short || '']
        }
      }
    })
    // 通过 fetch 调用 AnkiConnect（本地 API）
    const resp = await fetch('http://127.0.0.1:8765', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })
    const result = await resp.json()
    if (result.error) {
      alert('Anki 推送失败: ' + result.error + '\n请确保 Anki 桌面版已打开')
    } else {
      alert('✅ 已推送到 Anki！')
    }
  } catch (e) {
    alert('❌ 连接 Anki 失败。请确保 Anki 桌面版已打开并安装了 AnkiConnect 插件。')
  }
  pushing.value = false
}
</script>

<style scoped>
.chapter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chapter-tab {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.chapter-tab.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.chapter-tab:hover:not(.active) {
  background: #f1f5f9;
}
.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.q-label {
  font-weight: 600;
  color: var(--text-secondary);
}
.q-type {
  font-size: 12px;
  background: #eef2ff;
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 4px;
}
.question-text {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
}
.option:hover {
  border-color: var(--primary-light);
}
.option.selected {
  border-color: var(--primary);
  background: #eef2ff;
}
.option.correct {
  border-color: var(--success);
  background: #f0fdf4;
}
.option.wrong {
  border-color: var(--danger);
  background: #fef2f2;
}
.option-letter {
  font-weight: 700;
  color: var(--text-secondary);
  width: 24px;
}
.check-mark {
  margin-left: auto;
  color: var(--success);
  font-weight: 700;
}
.fill-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  outline: none;
}
.fill-input:focus {
  border-color: var(--primary);
}
.feedback {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
}
.feedback.correct {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}
.feedback.wrong {
  background: #fef2f2;
  border: 1px solid #fecaca;
}
.feedback-icon {
  font-size: 24px;
}
.feedback-text {
  flex: 1;
}
.feedback-text strong {
  display: block;
  margin-bottom: 4px;
}
.feedback-text p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.question-actions {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.placeholder {
  text-align: center;
  padding: 40px;
}
.placeholder-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.stats-row {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>