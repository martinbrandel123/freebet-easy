// Composable pour la gestion des états asynchrones
import { ref, Ref } from 'vue'
import type { AsyncState, LoadingState } from '../types'

export function useAsync<T = any>() {
  const data: Ref<T | null> = ref(null)
  const loading: Ref<LoadingState> = ref('idle')
  const error: Ref<string | null> = ref(null)

  const execute = async (asyncFunction: () => Promise<T>): Promise<T | null> => {
    loading.value = 'loading'
    error.value = null

    try {
      const result = await asyncFunction()
      data.value = result
      loading.value = 'success'
      return result
    } catch (err: any) {
      error.value = err.message || 'Une erreur est survenue'
      loading.value = 'error'
      return null
    }
  }

  const reset = () => {
    data.value = null
    loading.value = 'idle'
    error.value = null
  }

  const state: AsyncState<T> = {
    get data() { return data.value },
    get loading() { return loading.value },
    get error() { return error.value }
  }

  return {
    ...state,
    execute,
    reset,
    isLoading: loading.value === 'loading',
    isSuccess: loading.value === 'success',
    isError: loading.value === 'error',
    isIdle: loading.value === 'idle'
  }
}