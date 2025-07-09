// Types communs utilisés dans toute l'application
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface ValidationError {
  field: string
  message: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T = any> {
  data: T | null
  loading: LoadingState
  error: string | null
}