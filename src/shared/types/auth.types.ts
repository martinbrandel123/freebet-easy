// Types pour l'authentification
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  picture?: string
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  isFromFrance: boolean
  bookmakers: string[]
  acceptTerms: boolean
  acceptNewsletter: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn: number
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface GoogleAuthResponse {
  credential: string
  clientId: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetData {
  token: string
  newPassword: string
}