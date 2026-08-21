import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import QuizCard from './components/QuizCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('QuizCard', QuizCard)
  },
}
