import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiConfig } from '../../../app/config'
import type { ApiResponse, ApiError } from '../../types'

class ApiClient {
  private instance: AxiosInstance
  private retryCount = 0

  constructor() {
    this.instance = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: apiConfig.headers
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // Retry logic
        if (error.code === 'ECONNABORTED' && this.retryCount < apiConfig.retryAttempts) {
          this.retryCount++
          await new Promise(resolve => setTimeout(resolve, apiConfig.retryDelay))
          return this.instance(originalRequest)
        }

        // Token refresh logic
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          // Implement token refresh logic here
        }

        this.retryCount = 0
        return Promise.reject(this.formatError(error))
      }
    )
  }

  private formatError(error: any): ApiError {
    return {
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || error.message || 'Une erreur est survenue',
      status: error.response?.status || 500,
      details: error.response?.data
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config)
    return response.data
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch(url, data, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
export default apiClient