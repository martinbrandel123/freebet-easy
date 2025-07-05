<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProgramStore } from '../../stores/program'
// import HeaderSummary from '../../components/program/HeaderSummary.vue'
import Stepper from '../../components/program/Stepper.vue'
import InstructionCard from '../../components/program/InstructionCard.vue'
import HistoryDrawer from '../../components/program/HistoryDrawer.vue'

const programStore = useProgramStore()
const showHistoryDrawer = ref(false)
const showDebugPanel = ref(false)

// Move import.meta.env.DEV check to script section
// const isDevMode = import.meta.env.DEV
 const isDevMode = true

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
  <div class="program-view">
    <!-- Header Summary -->
    <HeaderSummary/>

    <!-- Main Content -->
    <div class="program-content">
      <div class="container">
        <div class="program-layout">
          <!-- Stepper Sidebar (Desktop) -->
          <aside class="stepper-sidebar">
            <Stepper />
          </aside>

          <!-- Main Instruction Area -->
          <main class="instruction-area">
            <div class="instruction-content">
              <!-- Current Instruction Card -->
              <InstructionCard />

              <!-- Action Buttons -->
              <div class="action-buttons">
                <!-- History Button -->
                <button 
                  @click="toggleHistoryDrawer"
                  class="btn-secondary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Historique</span>
                  <span v-if="programStore.history.length > 0" class="badge">
                    {{ programStore.history.length }}
                  </span>
                </button>

                <!-- Debug Panel Toggle (Development) -->
                <button 
                  v-if="isDevMode"
                  @click="showDebugPanel = !showDebugPanel"
                  class="btn-warning"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                  </svg>
                  <span>Debug</span>
                </button>

                <!-- Reset Button -->
                <button 
                  @click="resetProgram"
                  class="btn-danger"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Réinitialiser</span>
                </button>
              </div>

              <!-- Debug Panel (Development only) -->
              <div 
                v-if="isDevMode && showDebugPanel" 
                class="debug-panel"
              >
                <h3 class="debug-title">🐛 Panel de Debug</h3>
                <div class="debug-grid">
                  <div class="debug-section">
                    <h4 class="debug-subtitle">État actuel</h4>
                    <div class="debug-info">
                      <p><strong>Étape courante:</strong> {{ programStore.currentStep?.title || 'Aucune' }}</p>
                      <p><strong>ID:</strong> {{ programStore.currentStepId }}</p>
                      <p><strong>Progression:</strong> {{ programStore.progressPercentage }}%</p>
                      <p><strong>Gains:</strong> {{ programStore.currentGain }}€</p>
                    </div>
                  </div>
                  <div class="debug-section">
                    <h4 class="debug-subtitle">Actions rapides</h4>
                    <div class="debug-actions">
                      <button 
                        @click="completeCurrentStep"
                        class="debug-btn debug-btn-success"
                      >
                        ✓ Terminer l'étape courante
                      </button>
                      <button 
                        @click="skipCurrentStep"
                        class="debug-btn debug-btn-warning"
                      >
                        ⏭️ Ignorer l'étape courante
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Status Overview -->
                <div class="debug-overview">
                  <h4 class="debug-subtitle">Vue d'ensemble des statuts</h4>
                  <div class="status-grid">
                    <div 
                      v-for="step in programStore.allSteps" 
                      :key="step.id"
                      class="status-item"
                      :class="{
                        'status-done': programStore.stepStatuses[step.id] === 'done',
                        'status-progress': programStore.stepStatuses[step.id] === 'in_progress',
                        'status-todo': programStore.stepStatuses[step.id] === 'todo'
                      }"
                    >
                      <div class="status-title">{{ step.title }}</div>
                      <div class="status-label">{{ programStore.stepStatuses[step.id] }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Program Completion Message -->
              <div 
                v-if="programStore.isProgramCompleted" 
                class="completion-message"
              >
                <div class="completion-icon">🎉</div>
                <h2 class="completion-title">Programme terminé !</h2>
                <p class="completion-text">
                  Félicitations ! Vous avez terminé tout le programme et réalisé un bénéfice de 
                  <strong>+{{ programStore.currentGain }}€</strong>
                </p>
                <div class="completion-content">
                  <p class="completion-subtitle">
                    N'hésitez pas à recommander notre programme à vos amis et famille !
                  </p>
                  <div class="completion-actions">
                    <button class="btn-primary">
                      Partager avec mes amis
                    </button>
                    <button class="btn-secondary">
                      Télécharger mon bilan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
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
      <div class="loading-content">
        <div class="spinner"></div>
        <p>Chargement du programme...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.program-view {
  min-height: 100vh;
  background: #F8FAFC;
}

.program-content {
  flex: 1;
}

.program-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

@media (min-width: 1024px) {
  .program-layout {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
  }
}

.stepper-sidebar {
  order: 2;
}

@media (min-width: 1024px) {
  .stepper-sidebar {
    order: 1;
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
}

.instruction-area {
  order: 1;
}

@media (min-width: 1024px) {
  .instruction-area {
    order: 2;
  }
}

.instruction-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}

/* Utilisation des styles globaux de l'application */
.btn-secondary {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-warning {
  background: #FCD34D;
  color: #92400E;
  border: 1px solid #F59E0B;
  padding: 0.875rem 1.75rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.btn-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.btn-danger {
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #F87171;
  padding: 0.875rem 1.75rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

.badge {
  background: #3B82F6;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
}

.debug-panel {
  background: #FFFBEB;
  border: 1px solid #F59E0B;
  border-radius: 16px;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.debug-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #92400E;
  margin-bottom: 1.5rem;
}

.debug-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .debug-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.debug-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.debug-subtitle {
  font-weight: 600;
  color: #92400E;
  font-size: 1.1rem;
}

.debug-info {
  font-size: 0.95rem;
  color: #451A03;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.6;
}

.debug-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.debug-btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.debug-btn-success {
  background: #10B981;
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.debug-btn-success:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.debug-btn-warning {
  background: #F59E0B;
  color: white;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.debug-btn-warning:hover {
  background: #D97706;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.debug-overview {
  margin-top: 2rem;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  font-size: 0.85rem;
}

.status-item {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid;
  transition: all 0.3s ease;
}

.status-done {
  background: #ECFDF5;
  border-color: #10B981;
  color: #065F46;
}

.status-progress {
  background: #EBF4FF;
  border-color: #3B82F6;
  color: #1E3A8A;
}

.status-todo {
  background: #F8FAFC;
  border-color: #E2E8F0;
  color: #475569;
}

.status-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-label {
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  font-weight: 500;
}

.completion-message {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1px solid #10B981;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  animation: bounceIn 0.6s ease-out;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.completion-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #065F46;
  margin-bottom: 1.5rem;
}

.completion-text {
  font-size: 1.2rem;
  color: #047857;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.completion-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.completion-subtitle {
  color: #059669;
  font-size: 1.1rem;
  line-height: 1.6;
}

.completion-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-content {
  text-align: center;
  color: #6B7280;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #E5E7EB;
  border-top: 3px solid #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
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
@media (max-width: 767px) {
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .completion-actions {
    flex-direction: column;
  }
  
  .completion-title {
    font-size: 2rem;
  }
  
  .debug-panel {
    padding: 1.5rem;
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