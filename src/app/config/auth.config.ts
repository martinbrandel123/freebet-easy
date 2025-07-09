// Configuration authentification
export const authConfig = {
  // Tokens
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  userKey: 'user_data',
  
  // Session
  sessionTimeout: 24 * 60 * 60 * 1000, // 24h en millisecondes
  refreshThreshold: 5 * 60 * 1000, // Rafraîchir 5min avant expiration
  
  // Google OAuth
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    enabled: import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true'
  },
  
  // Redirections
  redirects: {
    afterLogin: '/dashboard',
    afterLogout: '/',
    afterSignup: '/dashboard',
    loginRequired: '/login'
  },
  
  // Validation
  validation: {
    minPasswordLength: 8,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
} as const

export type AuthConfig = typeof authConfig