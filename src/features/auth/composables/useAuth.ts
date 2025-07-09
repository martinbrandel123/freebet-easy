import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores'
import { authConfig } from '../../../app/config'
import type { LoginCredentials, SignupData } from '../types'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)

  const login = async (credentials: LoginCredentials) => {
    await authStore.login(credentials)
    router.push(authConfig.redirects.afterLogin)
  }

  const register = async (userData: SignupData) => {
    await authStore.register(userData)
    router.push(authConfig.redirects.afterSignup)
  }

  const logout = async () => {
    await authStore.logout()
    router.push(authConfig.redirects.afterLogout)
  }

  const requireAuth = () => {
    if (!isAuthenticated.value) {
      router.push(authConfig.redirects.loginRequired)
      return false
    }
    return true
  }

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    requireAuth
  }
}