// Constantes globales de l'application
export const APP_CONFIG = {
  NAME: 'Freebet to Cash',
  VERSION: '1.0.0',
  DESCRIPTION: 'Gagnez jusqu\'à 500€ sans risque grâce aux bonus des paris sportifs',
  AUTHOR: 'Freebet to Cash Team'
} as const

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
} as const

export const AUTH_CONFIG = {
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user_data',
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24h en ms
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROGRAM: '/program',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_EMAIL: '/verify-email',
  UPDATE_PASSWORD: '/update-password'
} as const

export const STORAGE_KEYS = {
  PROGRAM_PROGRESS: 'program-progress',
  USER_PREFERENCES: 'user-preferences',
  THEME: 'theme'
} as const

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_AGE: 18,
  MAX_AGE: 99,
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100
} as const

export const BOOKMAKERS = [
  { id: 'zebet', name: 'Zebet', logo: '🎯' },
  { id: 'vibrez', name: 'Vibrez', logo: '🧩' },
  { id: 'bwin', name: 'Bwin', logo: '💥' },
  { id: 'betclic', name: 'Betclic', logo: '🔥' },
  { id: 'betsson', name: 'Betsson', logo: '🎰' },
  { id: 'unibet', name: 'Unibet', logo: '🧩' },
  { id: 'parionssport', name: 'Parions sport', logo: '🏆' },
  { id: 'feelingbet', name: 'Feelingbet', logo: '😊' },
  { id: 'olybet', name: 'Olybet', logo: '🥇' },
  { id: 'genybet', name: 'Genybet', logo: '⚡' },
  { id: 'netbet', name: 'Netbet', logo: '🎲' },
  { id: 'pmu', name: 'Pmu', logo: '🐎' },
  { id: 'vbet', name: 'Vbet', logo: '🚀' },
  { id: 'winamax', name: 'Winamax', logo: '🏅' }
] as const

export const STEP_TYPES = {
  SIGNUP: 'signup',
  DEPOSIT: 'deposit',
  BET: 'bet',
  FREEBET: 'freebet',
  RESULT: 'result'
} as const

export const STEP_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
} as const