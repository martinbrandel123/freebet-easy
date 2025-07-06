export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
}

export interface ApiError {
  code: string
  message: string
  status: number
  field?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}