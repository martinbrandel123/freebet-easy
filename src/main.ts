import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Import des icônes
import 'vuetify/styles' // Import des styles de base Vuetify
import router from './router'
import './style.css'
import App from './App.vue'

// Initialisation Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Utilise les icônes Material Design
  },
  theme: {
    defaultTheme: 'light'
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // <-- Ajoutez cette ligne

app.mount('#app')