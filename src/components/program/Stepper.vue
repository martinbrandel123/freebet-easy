<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProgramStore } from '../../stores/program'
import BookmakerLogo from './BookmakerLogo.vue'

const programStore = useProgramStore()
const showMobileAccordion = ref(false)

const groupedSteps = computed(() => {
  const groups: Record<string, any[]> = {}
  
  programStore.allSteps.forEach(step => {
    const groupKey = step.bookmaker
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(step)
  })
  
  return Object.entries(groups).map(([bookmaker, steps]) => ({
    bookmaker,
    steps,
    isCompleted: steps.every(step => programStore.stepStatuses[step.id] === 'done'),
    hasStarted: steps.some(step => programStore.stepStatuses[step.id] !== 'todo')
  }))
})


const openGroups = ref<Record<string, boolean>>({});

// Initialiser tous les groupes comme ouverts par défaut
onMounted(() => {
  groupedSteps.value.forEach(group => {
    openGroups.value[group.bookmaker] = true;
  });
});


const getStepIcon = (type: string) => {
  const icons = {
    signup: '📝',
    deposit: '💳',
    bet: '🎲',
    freebet: '🎁',
    result: '📊'
  }
  return icons[type as keyof typeof icons] || '📋'
}

const getStatusColor = (stepId: string) => {
  const status = programStore.stepStatuses[stepId]
  switch (status) {
    case 'done':
      return 'status-done'
    case 'in_progress':
      return 'status-progress'
    default:
      return 'status-todo'
  }
}

const canAccessStep = (step: any) => {
  const stepIndex = programStore.allSteps.findIndex(s => s.id === step.id)
  if (stepIndex === 0) return true
  
  const previousStep = programStore.allSteps[stepIndex - 1]
  return programStore.stepStatuses[previousStep.id] === 'done'
}

const handleStepClick = (step: any) => {
  if (canAccessStep(step)) {
    programStore.goToStep(step.id)
  }
}
</script>

<template>
  <div class="stepper-container">
    <!-- Desktop/Tablet Stepper -->
    <div class="stepper-desktop">
      <div class="stepper-header">
        <h3 class="stepper-title">Progression du programme</h3>
      </div>
      

      <div class="groups-container">
        <div 
          v-for="(group, groupIndex) in groupedSteps" 
          :key="groupIndex"
          class="group-section"
        >
          <!-- Group Header -->
        <div class="group-header" @click.stop="openGroups[group.bookmaker] = !openGroups[group.bookmaker]">
          <div class="group-info">
            <h4 class="group-title">{{ group.bookmaker }}</h4>
            <p class="group-progress">
              {{ group.steps.filter(s => programStore.stepStatuses[s.id] === 'done').length }}/{{ group.steps.length }} terminées
            </p>
          </div>
          <div v-if="group.isCompleted" class="group-badge">
            <span class="badge-completed">✓ Terminé</span>
          </div>
          <div class="group-toggle">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              :class="{ 'rotate-180': !openGroups[group.bookmaker] }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

<!-- Steps in group - modifié -->
<div 
  class="steps-container"
  v-if="openGroups[group.bookmaker]"
>
  <!-- ... contenu existant des steps ... -->
</div>

          <!-- Steps in group -->
          <div class="steps-container"  v-if="openGroups[group.bookmaker]">
            <div 
              v-for="step in group.steps" 
              :key="step.id"
              class="step-item"
              :class="[
                programStore.currentStepId === step.id ? 'step-current' : '',
                canAccessStep(step) ? 'step-accessible' : 'step-disabled'
              ]"
              @click="handleStepClick(step)"
            >
              <!-- Step icon and status -->
              <div class="step-indicator">
                <div 
                  class="step-circle"
                  :class="getStatusColor(step.id)"
                >
                  <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
                  <span v-else-if="programStore.stepStatuses[step.id] === 'in_progress'">{{ step.order }}</span>
                  <span v-else>{{ step.order }}</span>
                </div>
                <!-- <span class="step-icon">{{ getStepIcon(step.type) }}</span> -->
              </div>

              <!-- Step content -->
              <div class="step-content">
                <h5 class="step-title">{{ step.title }}</h5>
                <!-- <p class="step-bookmaker">{{ step.bookmaker }}</p> -->
              </div>

              <!-- Current step indicator -->
              <div v-if="programStore.currentStepId === step.id" class="current-indicator">
                <div class="pulse-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Stepper -->
    <div class="stepper-mobile">
      <!-- Current step summary -->
      <div class="current-step-summary">
        <div class="summary-content">
          <div class="summary-indicator">
            <div 
              class="summary-circle"
              :class="getStatusColor(programStore.currentStep?.id || '')"
            >
              {{ programStore.currentStep?.order }}
            </div>
          </div>
          <div class="summary-info">
            <h4 class="summary-title">{{ programStore.currentStep?.title }}</h4>
            <p class="summary-bookmaker">{{ programStore.currentStep?.bookmaker }}</p>
          </div>
          <button 
            @click="showMobileAccordion = !showMobileAccordion"
            class="summary-toggle"
          >
            <svg 
              class="toggle-icon"
              :class="{ 'toggle-rotated': showMobileAccordion }"
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Expandable full stepper -->
      <div 
        v-if="showMobileAccordion"
        class="mobile-accordion"
      >
        <h3 class="accordion-title">Toutes les étapes</h3>
        
        <div class="accordion-groups">
          <div 
            v-for="(group, groupIndex) in groupedSteps" 
            :key="groupIndex"
            class="accordion-group"
          >
            <!-- Group Header -->
            <div class="accordion-group-header">
              <BookmakerLogo 
                v-for="bookmaker in group.bookmaker.split(', ').slice(0, 1)" 
                :key="bookmaker"
                :bookmaker="bookmaker.trim()" 
                size="sm"
              />
              <div class="accordion-group-info">
                <h4 class="accordion-group-title">{{ group.bookmaker }}</h4>
                <p class="accordion-group-progress">
                  {{ group.steps.filter(s => programStore.stepStatuses[s.id] === 'done').length }}/{{ group.steps.length }}
                </p>
              </div>
              <div v-if="group.isCompleted" class="accordion-group-badge">
                <span>✓</span>
              </div>
            </div>

            <!-- Steps -->
            <div class="accordion-steps">
              <div 
                v-for="step in group.steps" 
                :key="step.id"
                class="accordion-step"
                :class="[
                  programStore.currentStepId === step.id ? 'accordion-step-current' : '',
                  canAccessStep(step) ? 'accordion-step-accessible' : 'accordion-step-disabled'
                ]"
                @click="handleStepClick(step)"
              >
                <div 
                  class="accordion-step-circle"
                  :class="getStatusColor(step.id)"
                >
                  <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
                  <span v-else>{{ step.order }}</span>
                </div>
                <span class="accordion-step-icon">{{ getStepIcon(step.type) }}</span>
                <div class="accordion-step-content">
                  <p class="accordion-step-title">{{ step.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="progress-summary">
      <div class="progress-header">
        <span class="progress-label">Progression globale</span>
        <span class="progress-percentage">{{ programStore.progressPercentage }}%</span>
      </div>
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: `${programStore.progressPercentage}%` }"
        ></div>
      </div>
      <div class="progress-footer">
        <span>{{ programStore.completedSteps }} terminées</span>
        <span>{{ programStore.totalSteps }} total</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-container {
  height: 100%;
}

.stepper-desktop {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.stepper-desktop::-webkit-scrollbar {
  width: 6px;
}

.stepper-desktop::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 3px;
}

.stepper-desktop::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 3px;
}

.stepper-desktop::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

.stepper-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E7EB;
}

.stepper-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.groups-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.group-section {
  position: relative;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}

.group-header:hover {
  background-color: #f0f4f8;
}

.group-toggle {
  margin-left: auto;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-toggle svg {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.group-logos {
  display: flex;
  gap: -0.25rem;
}

.group-logo {
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.group-info {
  flex: 1;
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.25rem 0;
}

.group-progress {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.group-badge {
  margin-left: auto;
}

.badge-completed {
  background: #ECFDF5;
  color: #065F46;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #10B981;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #E5E7EB;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #E5E7EB;
  background: white;
}

.step-item:hover:not(.step-disabled) {
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.step-current {
  background: #EBF4FF;
  border-color: #3B82F6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
}

.step-accessible {
  cursor: pointer;
}

.step-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
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
  color: #6B7280;
}

.step-icon {
  font-size: 1.25rem;
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.step-bookmaker {
  font-size: 0.8rem;
  color: #6B7280;
  margin: 0;
}

.current-indicator {
  flex-shrink: 0;
}

.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #3B82F6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Mobile Stepper */
.stepper-mobile {
  display: block;
}

@media (min-width: 1024px) {
  .stepper-mobile {
    display: none;
  }
}

.current-step-summary {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;
}

.summary-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.summary-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.summary-info {
  flex: 1;
  margin-left: 0.75rem;
}

.summary-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.25rem 0;
}

.summary-bookmaker {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.summary-toggle {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.summary-toggle:hover {
  background: #F1F5F9;
  color: #374151;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-rotated {
  transform: rotate(180deg);
}

.mobile-accordion {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
  padding: 1rem;
  animation: slideDown 0.3s ease-out;
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

.accordion-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1rem 0;
}

.accordion-groups {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-group {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-group-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #F8FAFC;
}

.accordion-group-info {
  flex: 1;
}

.accordion-group-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.accordion-group-progress {
  font-size: 0.75rem;
  color: #6B7280;
  margin: 0;
}

.accordion-group-badge {
  color: #10B981;
  font-size: 0.875rem;
}

.accordion-steps {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
}

.accordion-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.accordion-step-current {
  background: #EBF4FF;
  border: 1px solid #3B82F6;
}

.accordion-step-accessible {
  cursor: pointer;
}

.accordion-step-accessible:hover {
  background: #F8FAFC;
}

.accordion-step-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.accordion-step-circle {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.accordion-step-icon {
  font-size: 1rem;
}

.accordion-step-content {
  flex: 1;
  min-width: 0;
}

.accordion-step-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1F2937;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Progress Summary */
.progress-summary {
  background: linear-gradient(135deg, #EBF4FF 0%, #F3E8FF 100%);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1.5rem;
  border: 1px solid #E0E7FF;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.progress-percentage {
  font-size: 0.875rem;
  font-weight: 700;
  color: #3B82F6;
}

.progress-bar {
  width: 100%;
  background: #E5E7EB;
  border-radius: 4px;
  height: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 4px;
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6B7280;
}

@media (max-width: 1023px) {
  .stepper-desktop {
    display: none;
  }
}
</style>