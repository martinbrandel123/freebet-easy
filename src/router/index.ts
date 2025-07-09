import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import { authRoutes } from './routes/auth.routes'
import { programRoutes } from './routes/program.routes'
import { dashboardRoutes } from './routes/dashboard.routes'
import { landingRoutes } from './routes/landing.routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...landingRoutes,
    ...authRoutes,
    ...dashboardRoutes,
    ...programRoutes
  ]
})

// Appliquer les guards globaux
router.beforeEach(authGuard)

export default router