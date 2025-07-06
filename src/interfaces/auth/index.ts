export interface User {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  picture?: string
  emailVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  age: string
  isFromFrance: boolean
  bookmakers: string[]
  acceptTerms: boolean
  acceptNewsletter: boolean
}

export interface AuthResponse {
  token: string
  user: User
  message?: string
}

export interface AuthError {
  code: string
  message: string
  field?: string
}

export interface GoogleAuthData {
  idToken: string
}

export interface PasswordResetData {
  token: string
  newPassword: string
}

export interface EmailVerificationData {
  email: string
}