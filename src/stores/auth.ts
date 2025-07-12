import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import api from '../services/axios';
import { AuthService } from '../services/authService';

interface Payload { exp: number; sub: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:   null as any,
    token:  localStorage.getItem('access_token') as string | null,
  }),

  getters: {
    isAuthenticated: state => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('access_token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // ↓ optionnel : décoder quelques claims
      const payload = jwtDecode<Payload>(token);
      this.user = { id: payload.sub };
    },

    async login(formData: any) {
      try {
        const response = await AuthService.login(formData);
        console.log("RESPONSE LOGIN ", response.data.data)
        this.setToken(response.data.data);
      } catch (error) {
        console.log("ERROR LOGIN", error);
      }

    },

    logout() {
      this.user  = null;
      this.token = null;
      localStorage.removeItem('access_token');
      delete api.defaults.headers.Authorization;
    },

    /** Vérifie au démarrage que le token n’est pas expiré */
    hydrate() {
      console.log(this.token);
      if (!this.token) return;
      const { exp } = jwtDecode<Payload>(this.token);
      if (Date.now() >= exp * 1000) {
        this.logout();
      } else {
        api.defaults.headers.Authorization = `Bearer ${this.token}`;
      }
    }
  }
});