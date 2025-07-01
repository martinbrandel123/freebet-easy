<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProgramStore } from '../../stores/program'
import HeaderSummary from '../../components/program/HeaderSummary.vue'
import Stepper from '../../components/program/Stepper.vue'
import InstructionCard from '../../components/program/InstructionCard.vue'
import HistoryDrawer from '../../components/program/HistoryDrawer.vue'

const programStore = useProgramStore()
const showHistory = ref(false)

// Responsive layout
const stepperLayout = ref<'vertical' | 'horizontal' | 'accordion'>('vertical')

const updateLayout = () => {
  const width = window.innerWidth
  if (width < 640) {
    stepperLayout.value = 'accordion'
  } else if (width < 1024) {
    stepperLayout.value = 'horizontal'
  } else {
    stepperLayout.value = 'vertical'
  }
}

onMounted(() => {
  // Initialiser le programme
  programStore.initializeProgram()
  
  // Configurer le layout responsive
  updateLayout()
  window.addEventListener('resize', updateLayout)
})

// Computed pour la classe du container principal
const containerClass = computed(() => {
  if (stepperLayout.value === 'vertical') {
    return 'lg:grid lg:grid-cols-12 lg:gap-8'
  }
  return 'space-y-6'
})
</script>

<template>
  <div class="program-page min-h-screen bg-gray-50">
    <!-- Header fixe -->
    <HeaderSummary />

    <!-- Contenu principal -->
    <main class="container mx-auto px-4 py-6">
      <div :class="containerClass">
        <!-- Stepper - Layout adaptatif -->
        <div 
          :class="{
            'lg:col-span-4 xl:col-span-3': stepperLayout === 'vertical',
            'w-full': stepperLayout !== 'vertical'
          }"
        >
          <div 
            :class="{
              'lg:sticky lg:top-24': stepperLayout === 'vertical'
            }"
          >
            <Stepper :layout="stepperLayout" />
          </div>
        </div>

        <!-- Carte d'instructions -->
        <div 
          :class="{
            'lg:col-span-8 xl:col-span-9': stepperLayout === 'vertical',
            'w-full': stepperLayout !== 'vertical'
          }"
        >
          <InstructionCard />
        </div>
      </div>

      <!-- Bouton d'historique flottant (mobile/tablette) -->
      <button 
        v-if="stepperLayout !== 'vertical'"
        @click="showHistory = true"
        class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-30"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>

      <!-- Bouton d'historique dans la sidebar (desktop) -->
      <div v-if="stepperLayout === 'vertical'" class="lg:fixed lg:bottom-6 lg:left-6">
        <button 
          @click="showHistory = true"
          class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="hidden xl:inline">Historique</span>
        </button>
      </div>
    </main>

    <!-- Drawer d'historique -->
    <HistoryDrawer 
      :is-open="showHistory" 
      @close="showHistory = false" 
    />

    <!-- Debug panel (développement uniquement) -->
    <div v-if="programStore.showAdvancedSettings" class="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
      <h4 class="font-semibold text-gray-900 mb-2">Debug Panel</h4>
      <div class="space-y-2 text-sm">
        <p><strong>Étape courante:</strong> {{ programStore.currentStepId }}</p>
        <p><strong>Progression:</strong> {{ programStore.progressPercentage }}%</p>
        <p><strong>Gains actuels:</strong> {{ programStore.currentGain }}€</p>
        <div class="flex gap-2 mt-3">
          <button 
            @click="programStore.resetProgram"
            class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200"
          >
            Reset
          </button>
          <button 
            @click="programStore.showAdvancedSettings = false"
            class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.program-page {
  /* Assurer que le contenu ne passe pas sous le header fixe */
  padding-top: 0;
}

/* Animations pour les transitions de layout */
.container {
  transition: all 0.3s ease;
}

/* Styles pour le responsive */
@media (max-width: 640px) {
  .container {
    @apply px-2;
  }
}

@media (min-width: 1024px) {
  .program-page {
    /* Ajuster pour le header fixe sur desktop */
    padding-top: 0;
  }
}
</style>