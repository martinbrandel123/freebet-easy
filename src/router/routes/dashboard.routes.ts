import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../features/dashboard/views/DashboardView.vue'),
    meta: { 
      requiresAuth: false, // Temporairement false pour les tests
      title: 'Tableau de bord'
    }
  }
]