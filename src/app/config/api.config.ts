// Configuration API
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      verifyEmail: '/auth/verify-email',
      resendVerification: '/auth/resend-verification',
      google: '/auth/google'
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
      changePassword: '/user/change-password'
    },
    program: {
      steps: '/program/steps',
      progress: '/program/progress',
      updateProgress: '/program/progress'
    }
  },
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const

export type ApiConfig = typeof apiConfig