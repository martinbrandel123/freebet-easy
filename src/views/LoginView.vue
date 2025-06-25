<script setup lang="ts">
import { ref } from 'vue'
import AuthGoogleButton from '../components/AuthGoogleButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')

// Configuration Google OAuth
const GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID_GOOGLE.apps.googleusercontent.com'
const API_URL = 'https://votre-api.com/auth/google'

const handleGoogleSuccess = (token: string, userInfo?: any) => {
  console.log('Connexion réussie:', { token, userInfo })
  // La redirection est gérée automatiquement par le composant
}

const handleGoogleError = (errorMessage: string) => {
  error.value = errorMessage
}

const handleGoogleLoading = (loading: boolean) => {
  isLoading.value = loading
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="login-view">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <button @click="goHome" class="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour à l'accueil
          </button>
          
          <div class="logo">
            <span class="logo-text">Genius Programme</span>
            <span class="logo-badge">💰</span>
          </div>
          
          <h1>Connexion à votre compte</h1>
          <p>Accédez à votre espace membre pour commencer à gagner vos 300€</p>
        </div>

        <div class="login-form">
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

          <!-- Formulaire email/mot de passe traditionnel -->
          <form class="email-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="votre@email.com"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input 
                type="password" 
                id="password"
                placeholder="••••••••"
                required
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox">
                <span class="checkmark"></span>
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" class="forgot-password">Mot de passe oublié ?</a>
            </div>

            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="isLoading">
                <div class="spinner"></div>
                Connexion...
              </span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <div class="signup-link">
            <p>Pas encore de compte ? <a href="/#signup">Inscrivez-vous gratuitement</a></p>
          </div>
        </div>

        <div class="login-footer">
          <div class="security-badges">
            <div class="badge">🔒 Sécurisé</div>
            <div class="badge">✅ Vérifié</div>
            <div class="badge">🛡️ Protégé</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.back-button {
  background: none;
  border: none;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #3B82F6;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-badge {
  font-size: 1.2rem;
}

.login-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #6B7280;
  font-size: 1rem;
  margin: 0;
}

.login-form {
  margin-bottom: 2rem;
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.875rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #3B82F6;
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
  gap: 0.5rem;
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
  background: #E5E7EB;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: #3B82F6;
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
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.login-button:disabled {
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

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
}

.signup-link p {
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0;
}

.signup-link a {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}

.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E7EB;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  background: #F1F5F9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 767px) {
  .login-view {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .security-badges {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>