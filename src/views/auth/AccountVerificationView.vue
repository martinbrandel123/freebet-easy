<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '../../services/authService'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const token = ref('')

onMounted(async () => {
  if (route.query.token) {
    token.value = route.query.token as string
    await verifyEmail()
  } else {
    error.value = 'Token de vérification manquant dans l\'URL'
  }
})

const verifyEmail = async () => {
  isLoading.value = true
  error.value = ''
  success.value = ''

  try {
    await AuthService.verifyEmail(token.value);
    success.value = 'Votre email a été vérifié avec succès !'
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err) {
    error.value = 'Le lien de vérification est invalide ou a expiré'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="auth-view">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Vérification d'email</h1>
          <p v-if="!success && !error">Vérification en cours...</p>
        </div>

        <div class="auth-form">
          <div v-if="error" class="error-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ error }}</span>
          </div>

          <div v-if="success" class="success-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ success }}</span>
          </div>

          <div v-if="isLoading" class="loading-container">
            <div class="spinner"></div>
          </div>

          <button 
            v-if="success" 
            @click="goToLogin" 
            class="auth-button"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.1);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.auth-button {
  margin-top: 1.5rem;
  width: 100%;
}
</style>