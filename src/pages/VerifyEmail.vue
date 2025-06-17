<template>
  <v-container class="verify-email-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <v-card class="verify-card text-center" elevation="8">
          <v-card-text class="pa-8">
            <div v-if="loading" class="loading-state">
              <v-progress-circular
                indeterminate
                size="64"
                color="primary"
                class="mb-4"
              ></v-progress-circular>
              <h2 class="text-h5 mb-2">Vérification en cours...</h2>
              <p class="text-body-1 text-medium-emphasis">
                Nous vérifions votre lien de connexion
              </p>
            </div>

            <div v-else-if="success" class="success-state">
              <v-icon color="success" size="64" class="mb-4">
                mdi-check-circle
              </v-icon>
              <h2 class="text-h5 mb-2">Email vérifié !</h2>
              <p class="text-body-1 text-medium-emphasis mb-4">
                Votre email a été vérifié avec succès. Vous êtes maintenant connecté.
              </p>
              <v-btn
                color="primary"
                size="large"
                @click="redirectToHome"
              >
                Continuer
              </v-btn>
            </div>

            <div v-else class="error-state">
              <v-icon color="error" size="64" class="mb-4">
                mdi-alert-circle
              </v-icon>
              <h2 class="text-h5 mb-2">Lien invalide</h2>
              <p class="text-body-1 text-medium-emphasis mb-4">
                {{ errorMessage }}
              </p>
              <div class="action-buttons">
                <v-btn
                  color="primary"
                  variant="outlined"
                  class="mr-2"
                  @click="goToSignup"
                >
                  Nouvelle inscription
                </v-btn>
                <v-btn
                  color="primary"
                  @click="resendLink"
                  :loading="resendLoading"
                >
                  Renvoyer le lien
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="4000"
      location="top"
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const success = ref(false)
const errorMessage = ref('')
const resendLoading = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

onMounted(async () => {
  const token = route.query.token as string
  
  if (!token) {
    loading.value = false
    errorMessage.value = 'Token manquant dans l\'URL'
    return
  }

  try {
    const response = await authStore.verifyMagicLink(token)
    if (response.success) {
      success.value = true
    } else {
      errorMessage.value = response.message || 'Erreur lors de la vérification'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Token invalide ou expiré'
  } finally {
    loading.value = false
  }
})

const redirectToHome = () => {
  router.push('/')
}

const goToSignup = () => {
  router.push('/signup')
}

const resendLink = async () => {
  // This would require the email to be stored or passed somehow
  // For now, redirect to signup
  showNotification('Veuillez vous rendre sur la page d\'inscription pour recevoir un nouveau lien', 'info')
  setTimeout(() => {
    router.push('/signup')
  }, 2000)
}

const showNotification = (message: string, color: 'success' | 'error' | 'info' = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}
</script>

<style scoped>
.verify-email-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.verify-card {
  border-radius: 16px !important;
}

.loading-state,
.success-state,
.error-state {
  padding: 2rem 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .v-btn {
    margin: 0.25rem 0;
  }
}
</style>