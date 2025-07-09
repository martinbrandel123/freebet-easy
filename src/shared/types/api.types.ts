// Types pour les appels API
export interface ApiConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
}

export interface ApiError {
  code: string
  message: string
  status: number
  details?: any
}

export interface RequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
  params?: Record<string, any>
  headers?: Record<string, string>
}