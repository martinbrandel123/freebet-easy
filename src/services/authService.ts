import api from '../services/axios'
import type { 
  AuthCredentials, 
  RegisterData, 
  AuthResponse, 
  EmailVerificationData, 
  PasswordResetData 
} from '../interfaces/auth'
import type { ApiResponse } from '../interfaces/api'

export const AuthService = {

  async register(payload: RegisterData): Promise<ApiResponse<string>> {
    try {
      const response = await api.post('auth/register', payload);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async login(credentials: AuthCredentials): Promise<ApiResponse<string>> {
    try {
      const response = await api.post('auth/login', credentials);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async verifyEmail(token: string): Promise<ApiResponse> {
    try {
      const response = await api.get('auth/verify-email', {
        params: { token },
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
  
  async resendVerification(email: EmailVerificationData): Promise<ApiResponse> {
    try {
      const response = await api.post('auth/resend-verification', email);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async forgotPassword(formData: EmailVerificationData): Promise<ApiResponse> {
    try {
      const response = await api.post('auth/forgot-password', formData);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async resetPassword(passwordData: PasswordResetData): Promise<ApiResponse> {
    try {
      const response = await api.post('auth/reset-password', passwordData);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  }
  
};