<script setup lang="ts">
import { computed, ref } from 'vue'
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
      return 'text-green-600 bg-green-100 border-green-300'
    case 'in_progress':
      return 'text-blue-600 bg-blue-100 border-blue-300'
    default:
      return 'text-gray-400 bg-gray-100 border-gray-300'
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
    <div class="hidden lg:block stepper-desktop">
      <div class="stepper-header">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Progression du programme</h3>
      </div>
      
      <div class="space-y-6">
        <div 
          v-for="(group, groupIndex) in groupedSteps" 
          :key="groupIndex"
          class="group-section"
        >
          <!-- Group Header -->
          <div class="group-header flex items-center gap-3 mb-4">
            <div class="flex -space-x-1">
              <BookmakerLogo 
                v-for="bookmaker in group.bookmaker.split(', ')" 
                :key="bookmaker"
                :bookmaker="bookmaker.trim()" 
                size="sm"
                class="border-2 border-white"
              />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">{{ group.bookmaker }}</h4>
              <p class="text-sm text-gray-500">
                {{ group.steps.filter(s => programStore.stepStatuses[s.id] === 'done').length }}/{{ group.steps.length }} terminées
              </p>
            </div>
            <div v-if="group.isCompleted" class="ml-auto">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Terminé
              </span>
            </div>
          </div>

          <!-- Steps in group -->
          <div class="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <div 
              v-for="step in group.steps" 
              :key="step.id"
              class="step-item flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer"
              :class="[
                programStore.currentStepId === step.id 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'hover:bg-gray-50 border border-gray-200',
                canAccessStep(step) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              ]"
              @click="handleStepClick(step)"
            >
              <!-- Step icon and status -->
              <div class="flex items-center gap-2">
                <div 
                  class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium"
                  :class="getStatusColor(step.id)"
                >
                  <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
                  <span v-else-if="programStore.stepStatuses[step.id] === 'in_progress'">{{ step.order }}</span>
                  <span v-else>{{ step.order }}</span>
                </div>
                <span class="text-lg">{{ getStepIcon(step.type) }}</span>
              </div>

              <!-- Step content -->
              <div class="flex-1 min-w-0">
                <h5 class="font-medium text-gray-900 truncate">{{ step.title }}</h5>
                <p class="text-sm text-gray-500">{{ step.bookmaker }}</p>
              </div>

              <!-- Current step indicator -->
              <div v-if="programStore.currentStepId === step.id" class="flex-shrink-0">
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Stepper -->
    <div class="lg:hidden stepper-mobile">
      <!-- Current step summary -->
      <div class="current-step-summary bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium"
              :class="getStatusColor(programStore.currentStep?.id || '')"
            >
              {{ programStore.currentStep?.order }}
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">{{ programStore.currentStep?.title }}</h4>
              <p class="text-sm text-gray-500">{{ programStore.currentStep?.bookmaker }}</p>
            </div>
          </div>
          <button 
            @click="showMobileAccordion = !showMobileAccordion"
            class="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg 
              class="w-5 h-5 transition-transform duration-200"
              :class="{ 'rotate-180': showMobileAccordion }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Expandable full stepper -->
      <div 
        v-if="showMobileAccordion"
        class="mobile-accordion bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <h3 class="font-semibold text-gray-900 mb-4">Toutes les étapes</h3>
        
        <div class="space-y-4">
          <div 
            v-for="(group, groupIndex) in groupedSteps" 
            :key="groupIndex"
            class="group-section"
          >
            <!-- Group Header -->
            <div class="group-header flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
              <BookmakerLogo 
                v-for="bookmaker in group.bookmaker.split(', ').slice(0, 1)" 
                :key="bookmaker"
                :bookmaker="bookmaker.trim()" 
                size="sm"
              />
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 text-sm">{{ group.bookmaker }}</h4>
                <p class="text-xs text-gray-500">
                  {{ group.steps.filter(s => programStore.stepStatuses[s.id] === 'done').length }}/{{ group.steps.length }}
                </p>
              </div>
              <div v-if="group.isCompleted">
                <span class="text-green-600 text-sm">✓</span>
              </div>
            </div>

            <!-- Steps -->
            <div class="space-y-2 ml-2">
              <div 
                v-for="step in group.steps" 
                :key="step.id"
                class="step-item flex items-center gap-2 p-2 rounded-lg"
                :class="[
                  programStore.currentStepId === step.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'border border-gray-100',
                  canAccessStep(step) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                ]"
                @click="handleStepClick(step)"
              >
                <div 
                  class="w-6 h-6 rounded-full border flex items-center justify-center text-xs"
                  :class="getStatusColor(step.id)"
                >
                  <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
                  <span v-else>{{ step.order }}</span>
                </div>
                <span class="text-sm">{{ getStepIcon(step.type) }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ step.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="progress-summary mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">Progression globale</span>
        <span class="text-sm font-bold text-blue-600">{{ programStore.progressPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          :style="{ width: `${programStore.progressPercentage}%` }"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-gray-500 mt-1">
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
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding-right: 1rem;
}

.stepper-desktop::-webkit-scrollbar {
  width: 4px;
}

.stepper-desktop::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.stepper-desktop::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.stepper-desktop::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.step-item {
  transition: all 0.2s ease;
}

.step-item:hover:not(.cursor-not-allowed) {
  transform: translateX(2px);
}

.mobile-accordion {
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

.group-section {
  position: relative;
}

.group-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
}

@media (max-width: 1023px) {
  .stepper-desktop {
    display: none;
  }
}
</style>