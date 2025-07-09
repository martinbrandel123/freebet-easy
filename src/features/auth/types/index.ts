export * from '../../../shared/types/auth.types'

// Types spécifiques au domaine auth
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignupFormData {
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

export interface AuthFormErrors {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  age?: string
  acceptTerms?: string
  general?: string
}