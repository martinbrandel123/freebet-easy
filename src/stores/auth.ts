import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import api from '../services/axios';
import { AuthService } from '../services/authService';
import type { User, AuthCredentials } from '../interfaces/auth';

interface Payload { exp: number; sub: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('access_token') as string | null,
    userInfo: null as User | null,
  }),

  getters: {
    isAuthenticated: state => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('access_token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // ↓ optionnel : décoder quelques claims
      const payload = jwtDecode<Payload>(token);
      this.user = { id: payload.sub } as User;
    },

    async setAuth(token: string, userInfo?: User) {
      this.setToken(token);
      if (userInfo) {
        this.userInfo = userInfo;
      }
    },

    async login(formData: AuthCredentials) {
      const response = await AuthService.login(formData);
      this.setToken(response.data);
    },

    logout() {
      this.user = null;
      this.token = null;
      this.userInfo = null;
      localStorage.removeItem('access_token');
      delete api.defaults.headers.Authorization;
    },

    /** Vérifie au démarrage que le token n'est pas expiré */
    hydrate() {
      if (!this.token) return;
      const { exp } = jwtDecode<Payload>(this.token);
      if (Date.now() >= exp * 1000) {
        this.logout();
      } else {
        api.defaults.headers.Authorization = `Bearer ${this.token}`;
      }
    },

    init() {
      this.hydrate();
    }
  }
});