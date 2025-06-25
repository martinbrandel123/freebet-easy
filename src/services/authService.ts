import api from '../services/axios'

export const AuthService = {

  async register(payload: any) {
    try {
      const response = await api.post('auth/register', payload, {
      });
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Échec de l\'inscription'
      );
    }
  },

  
};