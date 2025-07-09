import { ref, Ref } from 'vue'
import { apiClient } from '../services/api'
import type { ApiResponse, LoadingState } from '../types'

export function useApi() {
  const loading: Ref<LoadingState> = ref('idle')
  const error: Ref<string | null> = ref(null)

  const execute = async <T>(
    apiCall: () => Promise<ApiResponse<T>>
  ): Promise<T | null> => {
    loading.value = 'loading'
    error.value = null

    try {
      const response = await apiCall()
      loading.value = 'success'
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || 'Erreur API')
      }
    } catch (err: any) {
      loading.value = 'error'
      error.value = err.message || 'Une erreur est survenue'
      return null
    }
  }

  const reset = () => {
    loading.value = 'idle'
    error.value = null
  }

  return {
    loading,
    error,
    execute,
    reset,
    isLoading: loading.value === 'loading',
    isSuccess: loading.value === 'success',
    isError: loading.value === 'error',
    isIdle: loading.value === 'idle'
  }
}