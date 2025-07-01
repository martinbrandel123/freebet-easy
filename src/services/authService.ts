import api from '../services/axios'

export const AuthService = {

  async register(payload: any) {
    try {
      const response = await api.post('auth/register', payload, {
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async login(credentials: any) {
    try {
      const response = await api.post('auth/login', credentials, {
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async verifyEmail(token: string) {
    try {
      const response = await api.get('auth/verify-email', {
        params: {token},
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
  
  async resendVerification(email: any) {
    try {
      const response = await api.post('auth/resend-verification', email, {
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  
  async forgotPassword(formData: any) {
    try {
      const response = await api.post('auth/forgot-password', formData, {
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },

  async resetPassword(passwordData: any) {
    try {
      const response = await api.post('auth/reset-password', passwordData, {
      });
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  }
  
};