<template>
  <div class="auth-view">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <button @click="goHome" class="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour à l'accueil
          </button>
          
          <h1>Connexion à votre compte</h1>
        </div>

        <div class="auth-form">
          <AuthGoogleButton
            :client-id="GOOGLE_CLIENT_ID"
            :api-url="API_URL"
            redirect-path="/dashboard"
            button-text="ou connectez-vous avec votre email"
            theme="outline"
            size="large"
            shape="rectangular"
            @success="handleGoogleSuccess"
            @error="handleGoogleError"
            @loading="handleGoogleLoading"
          />

          <form @submit.prevent="submitForm" class="email-form">
            <div v-if="error" class="error-banner">
              {{ error }}
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="votre@email.com"
                v-model="formData.email"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input 
                type="password" 
                id="password"
                v-model="formData.password"
                placeholder="••••••••"
                required
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.rememberMe">
                <span class="checkmark"></span>
                <span>Se souvenir de moi</span>
              </label>
              <a @click="goToForgotPassword" class="forgot-password" style="cursor: pointer;">
                Mot de passe oublié ?
              </a>
            </div>

            <button type="submit" class="auth-button" :disabled="!isFormValid || isLoading">
              <span v-if="isLoading">
                <div class="spinner"></div>
              </span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <div class="auth-link">
            <p>Pas encore de compte ? <a href="/signup">Inscrivez-vous gratuitement</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables'
import { authConfig } from '../../../app/config'
import AuthGoogleButton from '../components/AuthGoogleButton.vue'
import type { LoginFormData } from '../types'

const router = useRouter()
const { login, isLoading, error } = useAuth()

const GOOGLE_CLIENT_ID = authConfig.google.clientId
const API_URL = 'https://votre-api.com/auth'

const formData = reactive<LoginFormData>({
  email: '',
  password: '',
  rememberMe: false
})

const isFormValid = computed(() => {
  return formData.email.trim() !== '' && formData.password.trim() !== ''
})

const submitForm = async () => {
  if (!isFormValid.value) return
  
  try {
    await login({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe
    })
  } catch (err) {
    // L'erreur est gérée par le composable useAuth
  }
}

const handleGoogleSuccess = (token: string, userInfo?: any) => {
  console.log('Connexion Google réussie:', { token, userInfo })
}

const handleGoogleError = (errorMessage: string) => {
  console.error('Erreur Google:', errorMessage)
}

const handleGoogleLoading = (loading: boolean) => {
  console.log('Google loading:', loading)
}

const goHome = () => {
  router.push('/')
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style scoped>
@import '../../../shared/styles/variables.css';

.auth-view {
  min-height: 100vh;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md) var(--space-sm);
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-lg);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.back-button {
  background: none;
  border: none;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  margin-bottom: var(--space-md);
  font-size: 0.9rem;
  transition: color var(--transition-normal);
}

.back-button:hover {
  color: var(--color-primary);
}

.auth-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-group label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 18px;
  height: 18px;
  background: var(--color-border);
  border-radius: 4px;
  position: relative;
  transition: all var(--transition-normal);
}

.checkbox-label input:checked + .checkmark {
  background: var(--color-primary);
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 0.7rem;
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.auth-button {
  background: var(--button-gradient);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.auth-link {
  text-align: center;
  margin-top: var(--space-md);
}

.auth-link p {
  color: var(--color-text-light);
  font-size: 0.9rem;
  margin: 0;
}

.auth-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.auth-link a:hover {
  text-decoration: underline;
}

.error-banner {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  border-left: 4px solid var(--color-error);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease-out;
  box-shadow: var(--shadow-sm);
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(-10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@media (max-width: 767px) {
  .form-options {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
  }
}
</style>