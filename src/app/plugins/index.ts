import type { App } from 'vue'
import { setupVuetify } from './vuetify'
import { setupRouter } from './router'
import { setupPinia } from './pinia'

export function setupPlugins(app: App) {
  setupPinia(app)
  setupVuetify(app)
  setupRouter(app)
}