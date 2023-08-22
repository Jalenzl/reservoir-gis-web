import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeIndex.vue'

const PressureFiledMap = () => import('../views/fieldMap/PressureFiledMap.vue')
const KrigingPressureFieldMap = () => import('@/views/fieldMap/kriging/KrigingPressureFieldMap.vue')
const FlowVectorThematicMap = () => import('@/views/thematic/FlowVelocity.vue')

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
    {
      path: '/krigingPressureFiledMap',
      name: 'KrigingPressureFiledMap',
      component: KrigingPressureFieldMap
    },
    {
      path: '/flowVectorThematicMap',
      name: 'FlowVectorThematicMap',
      component: FlowVectorThematicMap
    },
  ]
})

export default router
