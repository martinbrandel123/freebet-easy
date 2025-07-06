<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '../../services/authService'
import ErrorBanner from '../../components/ui/ErrorBanner.vue'
import SuccessBanner from '../../components/ui/SuccessBanner.vue'
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue'
import type { EmailVerificationData } from '../../interfaces/auth'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const error = ref('')
const success = ref('')

// Récupère l'email depuis l'URL ou permet à l'utilisateur de le saisir
const formData = reactive<EmailVerificationData>({
  email: route.query.email?.toString() || '',
})

const isFormValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
})

async function resendVerificationEmail() {
  if (!isFormValid.value) return

  isLoading.value = true
  error.value = ''
  success.value = ''

  try {
    await AuthService.resendVerification(formData)
    success.value = `Un nouveau lien de vérification a été envoyé à ${formData.email}`
  } catch (err: any) {
    if(err.response.data.code == "ALREADY_VERIFIED") {
      success.value = err.response.data.message
    } else {
      error.value = "Une erreur est survenue lors de l'envoi du email. Veuillez réessayer."
    }
  } finally {
    isLoading.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="auth-view">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <button @click="goToLogin" class="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour à la connexion
          </button>
          
          <h1>Vérification d'email requise</h1>
          <p>Nous avons besoin de vérifier votre adresse email avant de pouvoir continuer</p>
        </div>

        <div class="auth-form">
          <!-- Messages d'état -->
          <ErrorBanner v-if="error" :message="error" />
          <SuccessBanner v-if="success" :message="success" />

          <form @submit.prevent="resendVerificationEmail" class="email-form">
            <div class="form-group">
              <label for="email">Email à vérifier</label>
              <input 
                type="email" 
                id="email"
                placeholder="votre@email.com"
                v-model="formData.email"
                required
              >
            </div>

            <button 
              type="submit" 
              class="auth-button" 
              :disabled="!isFormValid || isLoading"
            >
              <LoadingSpinner v-if="isLoading" size="small" />
              <span v-else>Renvoyer le lien de vérification</span>
            </button>
          </form>

          <div class="auth-link">
            <p>Vous avez déjà vérifié votre email ? <a @click="goToLogin">Connectez-vous</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles identiques à LoginView */
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-light);
  padding: var(--space-lg);
}

.auth-container {
  width: 100%;
  max-width: 480px;
}

.auth-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-lg);
}

.auth-header {
  margin-bottom: var(--space-xl);
  text-align: center;
}

.auth-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--color-text-light);
  font-size: 1rem;
  margin: 0;
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: var(--space-lg);
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  color: var(--color-text);
}

.form-group input {
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
}

.auth-button {
  background: var(--button-gradient);
  color: white;
  border: none;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.auth-link {
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.auth-link a {
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>