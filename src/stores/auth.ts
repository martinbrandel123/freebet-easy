import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('jwt'))
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userInfo = computed(() => user.value)

  // Actions
  const setAuth = async (authToken: string, userData?: User) => {
    token.value = authToken
    user.value = userData || null
    
    // Stocker dans localStorage
    localStorage.setItem('jwt', authToken)
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    
    // Nettoyer localStorage
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }

  const loadUserFromStorage = () => {
    const storedToken = localStorage.getItem('jwt')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken) {
      token.value = storedToken
    }
    
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error)
        localStorage.removeItem('user')
      }
    }
  }

  const checkTokenValidity = async () => {
    if (!token.value) return false

    try {
      // Ici vous pouvez faire un appel à votre API pour vérifier la validité du token
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (!response.ok) {
        logout()
        return false
      }

      return true
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error)
      logout()
      return false
    }
  }

  // Initialiser le store
  const init = () => {
    loadUserFromStorage()
  }

  return {
    // State
    token,
    user,
    isLoading,
    
    // Getters
    isAuthenticated,
    userInfo,
    
    // Actions
    setAuth,
    logout,
    loadUserFromStorage,
    checkTokenValidity,
    init
  }
})