<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgramStore } from '../../stores/program'

interface Props {
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits<{
  close: []
}>()

const programStore = useProgramStore()

const sortedHistory = computed(() => {
  return [...programStore.history].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
})

const getActionIcon = (action: string) => {
  switch (action) {
    case 'completed':
      return '✅'
    case 'skipped':
      return '⏭️'
    case 'started':
      return '▶️'
    default:
      return '📝'
  }
}

const getActionLabel = (action: string) => {
  switch (action) {
    case 'completed':
      return 'Terminé'
    case 'skipped':
      return 'Ignoré'
    case 'started':
      return 'Commencé'
    default:
      return 'Action'
  }
}

const getStepTitle = (stepId: string) => {
  const step = programStore.allSteps.find(s => s.id === stepId)
  return step?.title || 'Étape inconnue'
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  }).format(new Date(date))
}

const clearHistory = () => {
  programStore.history.splice(0)
  programStore.saveProgress()
}
</script>

<template>
  <!-- Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="emit('close')"
  ></div>

  <!-- Drawer -->
  <div 
    class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Historique</h3>
      <button 
        @click="emit('close')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="sortedHistory.length === 0" class="text-center py-8 text-gray-500">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p>Aucune action enregistrée</p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="(entry, index) in sortedHistory" 
          :key="index"
          class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <!-- Icône -->
          <div class="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm">
            {{ getActionIcon(entry.action) }}
          </div>

          <!-- Contenu -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">
              {{ getActionLabel(entry.action) }}
            </p>
            <p class="text-sm text-gray-600 truncate">
              {{ getStepTitle(entry.stepId) }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ formatTime(entry.timestamp) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 p-4">
      <button 
        v-if="sortedHistory.length > 0"
        @click="clearHistory"
        class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        Effacer l'historique
      </button>
      
      <div class="mt-3 text-xs text-gray-500 text-center">
        {{ sortedHistory.length }} action{{ sortedHistory.length > 1 ? 's' : '' }} enregistrée{{ sortedHistory.length > 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>