<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import LoadingSpinner from '../ui/LoadingSpinner.vue'
import type { User } from '../../interfaces/auth'

const props = defineProps<{
  clientId: string
  apiUrl?: string
  redirectPath?: string
  buttonText?: string
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  customStyle?: boolean
}>()

const emit = defineEmits<{
  success: [token: string, userInfo?: User]
  error: [error: string]
  loading: [isLoading: boolean]
}>()

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const defaultApiUrl = props.apiUrl || 'https://ton-api.com/auth/google'
const defaultRedirectPath = props.redirectPath || '/dashboard'

const handleGoogleCallback = async (response: any) => {
  isLoading.value = true
  error.value = ''
  emit('loading', true)

  try {
    const idToken = response.credential

    const res = await fetch(defaultApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ idToken }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur ${res.status}: ${res.statusText}`)
    }

    const data = await res.json()
    const token = data.token || data.accessToken || data.jwt

    if (!token) {
      throw new Error('Token non reçu du serveur')
    }

    // Stocker le token et les infos utilisateur
    await authStore.setAuth(token, data.user)

    // Émettre l'événement de succès
    emit('success', token, data.user)

    // Redirection
    router.push(defaultRedirectPath)

  } catch (err: any) {
    console.error('Erreur de login Google:', err)
    error.value = err.message || 'Erreur de connexion avec Google'
    emit('error', error.value)
  } finally {
    isLoading.value = false
    emit('loading', false)
  }
}

const handleCustomGoogleLogin = () => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.prompt()
  }
}

onMounted(() => {
  // Attendre que Google Identity Services soit chargé
  const initializeGoogleAuth = () => {
    if (window.google && window.google.accounts) {
      // Définir la fonction callback globalement
      window.handleGoogleCallback = handleGoogleCallback

      // Initialiser le bouton Google
      window.google.accounts.id.initialize({
        client_id: props.clientId,
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      // Rendre le bouton si pas de style personnalisé
      if (!props.customStyle) {
        const buttonElement = document.getElementById('google-signin-button')
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            type: 'standard',
            shape: props.shape || 'rectangular',
            theme: props.theme || 'outline',
            text: 'signin_with',
            size: props.size || 'large',
            width: '100%'
          })
        }
      }
    } else {
      // Réessayer après un court délai
      setTimeout(initializeGoogleAuth, 100)
    }
  }

  initializeGoogleAuth()
})
</script>

<template>
  <div class="google-auth-container">
    <!-- Bouton Google standard -->
    <div v-if="!customStyle" class="google-signin-wrapper">
      <div 
        id="google-signin-button"
        class="google-signin-button"
        :class="{ 'loading': isLoading }"
      ></div>
      
      <!-- Bouton de fallback personnalisé -->
      <div v-if="isLoading" class="loading-overlay">
        <LoadingSpinner size="small" />
        <span>Connexion en cours...</span>
      </div>
    </div>

    <!-- Bouton Google personnalisé -->
    <div v-else class="custom-google-button">
      <button 
        @click="handleCustomGoogleLogin"
        class="google-button"
        :disabled="isLoading"
      >
        <div v-if="isLoading" class="button-loading">
          <LoadingSpinner size="small" />
          <span>Connexion...</span>
        </div>
        <div v-else class="button-content">
          <svg class="google-icon" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continuer avec Google</span>
        </div>
      </button>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      <span>{{ error }}</span>
    </div>

    <!-- Séparateur -->
    <div v-if="buttonText" class="separator">
      <span>{{ buttonText }}</span>
    </div>
  </div>
</template>

<style scoped>
.google-auth-container {
  width: 100%;
}

.google-signin-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

.google-signin-button {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.google-signin-button.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #6B7280;
}

/* Bouton Google personnalisé */
.custom-google-button {
  width: 100%;
  margin-bottom: 1rem;
}

.google-button {
  width: 100%;
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.google-button:hover:not(:disabled) {
  border-color: #CBD5E1;
  background: #FAFBFC;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content,
.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.google-icon {
  flex-shrink: 0;
}

.button-loading {
  color: #6B7280;
}

.error-message {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.error-icon {
  flex-shrink: 0;
}

.separator {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #E5E7EB;
}

.separator span {
  background: white;
  padding: 0 1rem;
  color: #6B7280;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
}

/* Styles pour les différentes tailles */
.google-signin-button :deep(.gsi-material-button) {
  width: 100% !important;
}

/* Responsive */
@media (max-width: 767px) {
  .google-signin-button {
    min-height: 45px;
  }
  
  .separator {
    margin: 1rem 0;
  }
  
  .google-button {
    padding: 0.875rem;
  }
}
</style>