<template>
  <v-container class="auth-callback-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <v-card class="callback-card text-center" elevation="8">
          <v-card-text class="pa-8">
            <v-progress-circular
              indeterminate
              size="64"
              color="primary"
              class="mb-4"
            ></v-progress-circular>
            <h2 class="text-h5 mb-2">Connexion en cours...</h2>
            <p class="text-body-1 text-medium-emphasis">
              Finalisation de votre connexion avec Google
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  // Handle OAuth callback
  const token = route.query.token as string
  const error = route.query.error as string

  if (error) {
    console.error('OAuth error:', error)
    router.push('/signup?error=oauth_failed')
    return
  }

  if (token) {
    // Store the token and redirect
    localStorage.setItem('auth_token', token)
    authStore.isAuthenticated = true
    router.push('/')
  } else {
    // No token received, redirect to signup
    router.push('/signup?error=no_token')
  }
})
</script>

<style scoped>
.auth-callback-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.callback-card {
  border-radius: 16px !important;
}
</style>