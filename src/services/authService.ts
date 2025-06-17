import apiClient from './api'

export interface SignupData {
  email: string
  name: string
  age: number
  isFrance: boolean
  bookmakers: string[]
}

export interface MagicLinkData {
  email: string
}

export interface VerifyTokenData {
  token: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: any
  token?: string
}

class AuthService {
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/signup', data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription')
    }
  }

  async sendMagicLink(data: MagicLinkData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/magic-link', data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'envoi du lien')
    }
  }

  async verifyMagicLink(data: VerifyTokenData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/magic-link/verify', data)
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token invalide ou expiré')
    }
  }

  getGoogleAuthUrl(): string {
    return `${apiClient.defaults.baseURL}/oauth2/authorize/google`
  }

  logout(): void {
    localStorage.removeItem('auth_token')
  }
}

export default new AuthService()