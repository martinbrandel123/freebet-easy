<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AuthGoogleButton from '../components/AuthGoogleButton.vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../services/authService'
import { useAuthStore } from '../stores/auth';


const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const auth   = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
})

const isFormValid = computed(() => {
  return formData.email.trim() !== '' && formData.password.trim() !== ''
})

// Configuration Google OAuth
const GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID_GOOGLE.apps.googleusercontent.com'
const API_URL = 'https://votre-api.com/auth/google'

async function submitForm() {

    if (!isFormValid.value) return

    isLoading.value = true
    error.value = ''

    try {
      await auth.login(formData);
    } catch (err: any) {
      if(err.code == "BAD_CREDENTIALS") {
        error.value = err.message
      } else if(err.code == "EMAIL_NOT_VERIFIED") {
        router.push({
          path: '/send-email-verification',
          query: { email: formData.email }
        })
      } else {
        error.value = "Une erreur est survenue lors de la connexion"
      }
    } finally {
      isLoading.value = false
    }
  }



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

const goToForgotPassword = () => {
  router.push('/forgot-password')
}

</script>

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

          <!-- Formulaire email/mot de passe traditionnel -->
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
                <input type="checkbox">
                <span class="checkmark"></span>
                <span>Se souvenir de moi</span>
              </label>
              <a @click="goToForgotPassword" class="forgot-password" style="cursor: pointer;">Mot de passe oublié ?</a>
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

<style scoped>
/* Classes spécifiques non couvertes par auth.css */
.logo-badge {
  font-size: 1.2rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

p {
  color: var(--color-text-light);
  font-size: 1rem;
  margin: 0;
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
  transition: all 0.3s ease;
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

@media (max-width: 767px) {
  .form-options {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
  }
}
</style>