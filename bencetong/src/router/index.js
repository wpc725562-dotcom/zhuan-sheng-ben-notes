import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/Learn.vue')
  },
  {
    path: '/ai',
    name: 'AITutor',
    component: () => import('../views/AITutor.vue')
  },
  {
    path: '/reader',
    name: 'Reader',
    component: () => import('../views/Reader.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/guide',
    name: 'ScienceGuide',
    component: () => import('../views/ScienceGuide.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router