<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '../../services/authService'
import ErrorBanner from '../../components/ui/ErrorBanner.vue'
import SuccessBanner from '../../components/ui/SuccessBanner.vue'
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue'

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
          <ErrorBanner v-if="error" :message="error" />
          <SuccessBanner v-if="success" :message="success" />

          <div v-if="isLoading" class="loading-container">
            <LoadingSpinner size="large" />
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

.auth-button {
  margin-top: 1.5rem;
  width: 100%;
}
</style>