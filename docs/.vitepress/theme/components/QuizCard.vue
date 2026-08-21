<script setup>
import { ref, computed } from 'vue'
import { questions as computerQuestions } from './quiz-computer'
import { questions as mathQuestions } from './quiz-math'
import { questions as englishQuestions } from './quiz-english'

const props = defineProps({
  subject: { type: String, required: true },
})

const bank = {
  computer: computerQuestions,
  math: mathQuestions,
  english: englishQuestions,
}
const questions = bank[props.subject] || []
const idx = ref(0)
const selected = ref(null)
const revealed = ref(false)
const score = ref(0)
const finished = ref(false)
const current = computed(() => questions[idx.value] || null)
const letters = ['A', 'B', 'C', 'D']

function optionText(o) {
  return String(o).replace(/^[A-D][.、:：]\s*/, '')
}
function choose(i) {
  if (revealed.value || finished.value) return
  selected.value = i
}
function reveal() {
  if (selected.value === null || revealed.value) return
  revealed.value = true
  if (selected.value === current.value.answer) score.value++
}
function next() {
  if (idx.value + 1 < questions.length) {
    idx.value++
    selected.value = null
    revealed.value = false
  } else {
    finished.value = true
  }
}
function prev() {
  if (idx.value > 0) {
    idx.value--
    selected.value = null
    revealed.value = false
  }
}
function restart() {
  idx.value = 0
  selected.value = null
  revealed.value = false
  score.value = 0
  finished.value = false
}
</script>

<template>
  <div class="quiz-card">
    <p v-if="questions.length === 0" class="quiz-empty">题库数据缺失，请稍后重试。</p>

    <template v-else-if="!finished">
      <div class="quiz-progress">
        <span>第 {{ idx + 1 }} / {{ questions.length }} 题</span>
        <span>得分 {{ score }}</span>
      </div>
      <h3 class="quiz-q">{{ current.q }}</h3>
      <ul class="quiz-opts">
        <li v-for="(opt, i) in current.options" :key="i">
          <button
            class="quiz-opt"
            :class="{
              'is-selected': selected === i,
              'is-correct': revealed && i === current.answer,
              'is-wrong': revealed && selected === i && i !== current.answer,
            }"
            @click="choose(i)"
          >
            <span class="quiz-letter">{{ letters[i] }}.</span>
            <span>{{ optionText(opt) }}</span>
          </button>
        </li>
      </ul>
      <div class="quiz-actions">
        <button class="quiz-btn" :disabled="selected === null || revealed" @click="reveal">查看答案</button>
        <button class="quiz-btn" @click="prev">上一题</button>
        <button class="quiz-btn quiz-btn-primary" @click="next">{{ idx + 1 < questions.length ? '下一题' : '交卷' }}</button>
      </div>
      <div v-if="revealed" class="quiz-explain">
        ✅ 正确答案：<b>{{ letters[current.answer] }}</b>
        <p>{{ current.explain }}</p>
      </div>
    </template>

    <div v-else class="quiz-result">
      <h3>🎉 完成！</h3>
      <p class="quiz-score">得分：<b>{{ score }}</b> / {{ questions.length }}（{{ Math.round((score / questions.length) * 100) }}%）</p>
      <button class="quiz-btn quiz-btn-primary" @click="restart">重新开始</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.quiz-progress {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}
.quiz-q {
  font-size: 16px;
  line-height: 1.6;
  margin: 8px 0 12px;
}
.quiz-opts {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.quiz-opt {
  width: 100%;
  text-align: left;
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
}
.quiz-opt:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
}
.quiz-opt.is-selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.quiz-opt.is-correct {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
}
.quiz-opt.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}
.quiz-letter {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.quiz-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.quiz-btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
}
.quiz-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.quiz-btn-primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.quiz-explain {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  font-size: 14px;
}
.quiz-result {
  text-align: center;
  padding: 16px;
}
.quiz-score {
  font-size: 18px;
  margin: 8px 0 16px;
}
.quiz-empty {
  color: var(--vp-c-text-2);
}
</style>
