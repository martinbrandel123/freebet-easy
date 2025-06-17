import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService, { type SignupData, type MagicLinkData } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref('')

  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)

  const signup = async (data: SignupData) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await authService.signup(data)
      if (response.success) {
        user.value = response.user
        isAuthenticated.value = true
      }
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const sendMagicLink = async (data: MagicLinkData) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await authService.sendMagicLink(data)
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const verifyMagicLink = async (token: string) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await authService.verifyMagicLink({ token })
      if (response.success) {
        user.value = response.user
        isAuthenticated.value = true
      }
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    authService.logout()
    user.value = null
    isAuthenticated.value = false
    error.value = ''
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isLoggedIn,
    signup,
    sendMagicLink,
    verifyMagicLink,
    logout,
    clearError
  }
})