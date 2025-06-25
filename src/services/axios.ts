import axios from 'axios'
import { useAuthStore } from '../stores/auth' // <-- le store Pinia
import type { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
