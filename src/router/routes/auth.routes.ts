import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../../features/auth/views/LoginView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Connexion'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../../features/auth/views/SignupView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Inscription'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('../../features/auth/views/ForgotPasswordView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Mot de passe oublié'
    }
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: () => import('../../features/auth/views/VerifyEmailView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Vérification email'
    }
  },
  {
    path: '/update-password',
    name: 'updatePassword',
    component: () => import('../../features/auth/views/UpdatePasswordView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Nouveau mot de passe'
    }
  },
  {
    path: '/send-email-verification',
    name: 'sendEmailVerification',
    component: () => import('../../features/auth/views/SendEmailVerificationView.vue'),
    meta: { 
      requiresGuest: true,
      title: 'Vérification email'
    }
  }
]