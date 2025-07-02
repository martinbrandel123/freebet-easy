<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProgramStore } from '../../stores/program'
import HeaderSummary from '../../components/program/HeaderSummary.vue'
import Stepper from '../../components/program/Stepper.vue'
import InstructionCard from '../../components/program/InstructionCard.vue'
import HistoryDrawer from '../../components/program/HistoryDrawer.vue'

const programStore = useProgramStore()
const showHistoryDrawer = ref(false)
const showDebugPanel = ref(false)

onMounted(() => {
  // Initialiser le programme au chargement
  programStore.initializeProgram()
})

const toggleHistoryDrawer = () => {
  showHistoryDrawer.value = !showHistoryDrawer.value
}

const resetProgram = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le programme ? Cette action est irréversible.')) {
    programStore.resetProgram()
  }
}

// Debug functions (development only)
const completeCurrentStep = () => {
  if (programStore.currentStep) {
    programStore.markStepAsCompleted(programStore.currentStep.id)
  }
}

const skipCurrentStep = () => {
  if (programStore.currentStep) {
    programStore.skipStep(programStore.currentStep.id)
  }
}
</script>

<template>
  <div class="program-view min-h-screen bg-gray-50">
    <!-- Header Summary -->
    <HeaderSummary />

    <!-- Main Content -->
    <div class="program-content">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Stepper Sidebar (Desktop) -->
          <div class="lg:col-span-1">
            <Stepper />
          </div>

          <!-- Main Instruction Area -->
          <div class="lg:col-span-3">
            <div class="space-y-6">
              <!-- Current Instruction Card -->
              <InstructionCard />

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3 justify-between items-center">
                <!-- History Button -->
                <button 
                  @click="toggleHistoryDrawer"
                  class="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Historique</span>
                  <span v-if="programStore.history.length > 0" class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {{ programStore.history.length }}
                  </span>
                </button>

                <!-- Debug Panel Toggle (Development) -->
                <button 
                  v-if="import.meta.env.DEV"
                  @click="showDebugPanel = !showDebugPanel"
                  class="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                  </svg>
                  <span>Debug</span>
                </button>

                <!-- Reset Button -->
                <button 
                  @click="resetProgram"
                  class="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Réinitialiser</span>
                </button>
              </div>

              <!-- Debug Panel (Development only) -->
              <div 
                v-if="import.meta.env.DEV && showDebugPanel" 
                class="debug-panel bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <h3 class="font-semibold text-yellow-800 mb-3">🐛 Panel de Debug</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-yellow-700 mb-2">État actuel</h4>
                    <div class="text-sm space-y-1">
                      <p><strong>Étape courante:</strong> {{ programStore.currentStep?.title || 'Aucune' }}</p>
                      <p><strong>ID:</strong> {{ programStore.currentStepId }}</p>
                      <p><strong>Progression:</strong> {{ programStore.progressPercentage }}%</p>
                      <p><strong>Gains:</strong> {{ programStore.currentGain }}€</p>
                    </div>
                  </div>
                  <div>
                    <h4 class="font-medium text-yellow-700 mb-2">Actions rapides</h4>
                    <div class="space-y-2">
                      <button 
                        @click="completeCurrentStep"
                        class="w-full bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        ✓ Terminer l'étape courante
                      </button>
                      <button 
                        @click="skipCurrentStep"
                        class="w-full bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                      >
                        ⏭️ Ignorer l'étape courante
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Status Overview -->
                <div class="mt-4">
                  <h4 class="font-medium text-yellow-700 mb-2">Vue d'ensemble des statuts</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div 
                      v-for="step in programStore.allSteps" 
                      :key="step.id"
                      class="p-2 rounded border"
                      :class="{
                        'bg-green-100 border-green-300': programStore.stepStatuses[step.id] === 'done',
                        'bg-blue-100 border-blue-300': programStore.stepStatuses[step.id] === 'in_progress',
                        'bg-gray-100 border-gray-300': programStore.stepStatuses[step.id] === 'todo'
                      }"
                    >
                      <div class="font-medium truncate">{{ step.title }}</div>
                      <div class="text-gray-600">{{ programStore.stepStatuses[step.id] }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Program Completion Message -->
              <div 
                v-if="programStore.isProgramCompleted" 
                class="completion-message bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center"
              >
                <div class="text-4xl mb-4">🎉</div>
                <h2 class="text-2xl font-bold text-green-800 mb-2">Programme terminé !</h2>
                <p class="text-green-700 mb-4">
                  Félicitations ! Vous avez terminé tout le programme et réalisé un bénéfice de 
                  <strong>+{{ programStore.currentGain }}€</strong>
                </p>
                <div class="space-y-3">
                  <p class="text-green-600">
                    N'hésitez pas à recommander notre programme à vos amis et famille !
                  </p>
                  <div class="flex flex-wrap gap-3 justify-center">
                    <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Partager avec mes amis
                    </button>
                    <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Télécharger mon bilan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Drawer -->
    <HistoryDrawer 
      :is-open="showHistoryDrawer" 
      @close="showHistoryDrawer = false" 
    />

    <!-- Loading State (if needed) -->
    <div v-if="!programStore.currentStep && !programStore.isProgramCompleted" class="loading-state">
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement du programme...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.program-view {
  min-height: 100vh;
}

.program-content {
  flex: 1;
}

.debug-panel {
  animation: slideDown 0.3s ease-out;
}

.completion-message {
  animation: bounceIn 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .program-content .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Print styles */
@media print {
  .debug-panel,
  .action-buttons {
    display: none !important;
  }
}
</style>