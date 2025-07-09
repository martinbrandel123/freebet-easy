// Configuration générale de l'application
export const appConfig = {
  name: 'Freebet to Cash',
  version: '1.0.0',
  description: 'Gagnez jusqu\'à 500€ sans risque grâce aux bonus des paris sportifs',
  
  // Environnement
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // URLs
  baseUrl: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5173',
  apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  
  // Fonctionnalités
  features: {
    googleAuth: import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true'
  },
  
  // Limites
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxUploadFiles: 10,
    sessionTimeout: 24 * 60 * 60 * 1000 // 24h
  }
} as const

export type AppConfig = typeof appConfig