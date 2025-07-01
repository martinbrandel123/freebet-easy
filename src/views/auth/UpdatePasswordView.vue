<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '../../services/authService'

const router = useRouter()
const route = useRoute() 
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const password = ref('')
const confirmPassword = ref('')
const token = ref('')

const passwordData = reactive({
  token: '',
  newPassword: '',
})

onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token as string
    console.log('Token récupéré:', token.value)
  } else {
    error.value = 'Token manquant dans l\'URL'
  }
})

const handlePasswordUpdate = async (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  error.value = ''
  success.value = ''



  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas'
    isLoading.value = false
    return
  }

  passwordData.token = token.value;
  passwordData.newPassword = password.value;

  try {
    console.log("passwordData =>", passwordData)
    await AuthService.resetPassword(passwordData);
    success.value = 'Votre mot de passe a été modifié avec succès'
  } catch (err) {
    error.value = 'Une erreur est survenue lors de la modification du mot de passe'
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
            Retour
          </button>
          
          <h1>Changer le mot de passe</h1>
          <p>Entrez votre nouveau mot de passe</p>
        </div>

        <div class="auth-form">
          <form @submit="handlePasswordUpdate" class="password-form">
            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              {{ success }}  
            </div>
            
            <div class="form-group">
              <label for="password">Nouveau mot de passe</label>
              <input 
                type="password" 
                id="password"
                v-model="password"
                placeholder="••••••••"
                required
                minlength="8"
              >
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmer le mot de passe</label>
              <input 
                type="password" 
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="••••••••"
                required
                minlength="8"
              >
            </div>
            
            <button type="submit" class="auth-button" :disabled="isLoading">
              <span v-if="isLoading">
                <div class="spinner"></div>
              </span>
              <span v-else>Modifier le mot de passe</span>
            </button>
          </form>

          <div class="auth-link">
            <a href="/login">Connectez-vous</a>
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

.success-message {
  color: var(--color-success);
  background-color: #D1FAE5;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-container {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.auth-button {
  width: auto;
  padding: 0.75rem 2rem;
}

</style>