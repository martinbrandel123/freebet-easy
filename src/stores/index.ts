// Store global Pinia
import { createPinia } from 'pinia'

export const pinia = createPinia()

// Re-export des stores par domaine
export * from '../features/auth/stores'
export * from '../features/program/stores'