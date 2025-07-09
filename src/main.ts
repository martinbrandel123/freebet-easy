import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './app/plugins'
import { useAuthStore } from './features/auth/stores'
import './shared/styles'

const app = createApp(App)

// Configuration des plugins
setupPlugins(app)

// Hydratation de l'authentification
const authStore = useAuthStore()
authStore.hydrate()

app.mount('#app')