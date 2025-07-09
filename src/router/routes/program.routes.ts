import type { RouteRecordRaw } from 'vue-router'

export const programRoutes: RouteRecordRaw[] = [
  {
    path: '/program',
    name: 'program',
    component: () => import('../../features/program/views/ProgramView.vue'),
    meta: { 
      requiresAuth: false, // Temporairement false pour les tests
      title: 'Programme'
    }
  }
]