import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProgramView from '../views/program/ProgramView.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import VerifyEmailView from '../views/auth/VerifyEmailView.vue'
import UpdatePasswordView from '../views/auth/UpdatePasswordView.vue'
import AccountVerificationView from '../views/auth/AccountVerificationView.vue'
import SendEmailVerification from '../views/auth/SendEmailVerification.vue'
import SendPasswordVerification from '../views/auth/SendPasswordVerification.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: SendPasswordVerification,
      meta: { requiresGuest: true }
    },
    {
      path: '/send-email-verification',
      name: 'sendemailverification',
      component: SendEmailVerification,
      meta: { requiresGuest: true }
    },
    {
      path: '/update-password',
      name: 'updatepassword',
      component: UpdatePasswordView,
      meta: { requiresGuest: true }
    },
    {
      path: '/verify-email',
      name: 'verifyemail',
      component: AccountVerificationView,
      meta: { requiresGuest: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: false }
    },
    {
      path: '/programme',
      name: 'program',
      component: ProgramView,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, _from) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

export default router