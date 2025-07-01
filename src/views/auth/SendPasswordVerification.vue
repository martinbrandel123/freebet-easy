<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../../services/authService'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const success = ref('')

const formData = reactive({
  email: ''
})

const isFormValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
})

const handleResetRequest = async (e: Event) => {
  e.preventDefault()
  if (!isFormValid.value) {
    error.value = 'Veuillez entrer une adresse email'
    return
  }

  isLoading.value = true
  error.value = ''
  
  try {
    await AuthService.forgotPassword(formData);
    success.value = `Un email pour modifier votre mot de passe a été envoyé à l'adresse email ${formData.email}`
  } catch (err) {
    error.value = 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="auth-view">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <button @click="goBack" class="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour
          </button>
          
          <h1>Mot de passe oublié</h1>
          <p>Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        <div class="auth-form">
          <form @submit="handleResetRequest" class="email-form">
            <div v-if="error" class="error-banner">
              {{ error }}
            </div>

            <div v-if="success" class="success-banner">
              {{ success }}
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email"
                v-model="formData.email"
                placeholder="votre@email.com"
                required
              >
            </div>

            <button type="submit" class="auth-button" :disabled="isLoading">
              <span v-if="isLoading">
                <div class="spinner"></div>
              </span>
              <span v-else>Envoyer le lien</span>
            </button>
          </form>

          <div class="auth-link">
            <p>Vous vous souvenez de votre mot de passe ? <a href="/login">Connectez-vous</a></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: var(--color-error);
  background-color: #FEE2E2;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}
</style>