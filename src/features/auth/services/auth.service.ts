import { apiClient } from '../../../shared/services/api'
import { apiConfig } from '../../../app/config'
import type { 
  LoginCredentials, 
  SignupData, 
  AuthTokens, 
  User,
  PasswordResetRequest,
  PasswordResetData
} from '../types'

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>(
      apiConfig.endpoints.auth.login,
      credentials
    )
    return response.data!
  }

  static async register(userData: SignupData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
      apiConfig.endpoints.auth.register,
      userData
    )
    return response.data!
  }

  static async logout(): Promise<void> {
    await apiClient.post(apiConfig.endpoints.auth.logout)
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>(
      apiConfig.endpoints.auth.refresh,
      { refreshToken }
    )
    return response.data!
  }

  static async forgotPassword(data: PasswordResetRequest): Promise<void> {
    await apiClient.post(apiConfig.endpoints.auth.forgotPassword, data)
  }

  static async resetPassword(data: PasswordResetData): Promise<void> {
    await apiClient.post(apiConfig.endpoints.auth.resetPassword, data)
  }

  static async verifyEmail(token: string): Promise<void> {
    await apiClient.get(apiConfig.endpoints.auth.verifyEmail, {
      params: { token }
    })
  }

  static async resendVerification(email: string): Promise<void> {
    await apiClient.post(apiConfig.endpoints.auth.resendVerification, { email })
  }

  static async googleAuth(idToken: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
      apiConfig.endpoints.auth.google,
      { idToken }
    )
    return response.data!
  }
}