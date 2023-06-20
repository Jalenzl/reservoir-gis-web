import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeIndex.vue'

const PressureFiledMap = () => import('../views/fieldMap/PressureFiledMap.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pressureFiledMap',
      name: 'PressureFiledMap',
      component: PressureFiledMap
    },
  ]
})

export default router
