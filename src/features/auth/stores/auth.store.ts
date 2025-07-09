import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { AuthService } from '../services'
import { authConfig } from '../../../app/config'
import type { User, AuthTokens, LoginCredentials, SignupData, AuthState } from '../types'

interface JwtPayload {
  exp: number
  sub: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.user,
    userInfo: (state) => state.user,
    accessToken: (state) => state.tokens?.accessToken || null
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.isLoading = true
      this.error = null

      try {
        const tokens = await AuthService.login(credentials)
        await this.setTokens(tokens)
        
        // Décoder le token pour obtenir les infos utilisateur
        const payload = jwtDecode<JwtPayload>(tokens.accessToken)
        this.user = {
          id: payload.sub,
          email: payload.email,
          firstName: '',
          lastName: '',
          name: payload.email,
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        this.isAuthenticated = true
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async register(userData: SignupData) {
      this.isLoading = true
      this.error = null

      try {
        const { user, tokens } = await AuthService.register(userData)
        await this.setTokens(tokens)
        this.user = user
        this.isAuthenticated = true
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        await AuthService.logout()
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } finally {
        this.clearAuth()
      }
    },

    async setTokens(tokens: AuthTokens) {
      this.tokens = tokens
      localStorage.setItem(authConfig.tokenKey, tokens.accessToken)
      if (tokens.refreshToken) {
        localStorage.setItem(authConfig.refreshTokenKey, tokens.refreshToken)
      }
    },

    clearAuth() {
      this.user = null
      this.tokens = null
      this.isAuthenticated = false
      this.error = null
      
      localStorage.removeItem(authConfig.tokenKey)
      localStorage.removeItem(authConfig.refreshTokenKey)
      localStorage.removeItem(authConfig.userKey)
    },

    async refreshTokens() {
      const refreshToken = localStorage.getItem(authConfig.refreshTokenKey)
      if (!refreshToken) {
        this.clearAuth()
        return false
      }

      try {
        const tokens = await AuthService.refreshToken(refreshToken)
        await this.setTokens(tokens)
        return true
      } catch (error) {
        this.clearAuth()
        return false
      }
    },

    hydrate() {
      const token = localStorage.getItem(authConfig.tokenKey)
      if (!token) return

      try {
        const payload = jwtDecode<JwtPayload>(token)
        
        // Vérifier si le token n'est pas expiré
        if (Date.now() >= payload.exp * 1000) {
          this.clearAuth()
          return
        }

        // Restaurer l'état d'authentification
        this.tokens = {
          accessToken: token,
          refreshToken: localStorage.getItem(authConfig.refreshTokenKey) || undefined,
          expiresIn: payload.exp * 1000 - Date.now()
        }
        
        this.user = {
          id: payload.sub,
          email: payload.email,
          firstName: '',
          lastName: '',
          name: payload.email,
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        this.isAuthenticated = true
      } catch (error) {
        console.error('Erreur lors de l\'hydratation:', error)
        this.clearAuth()
      }
    }
  }
})