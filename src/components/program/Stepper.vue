<script setup lang="ts">
import { computed } from 'vue'
import { useProgramStore } from '../../stores/program'
import BookmakerLogo from './BookmakerLogo.vue'

interface Props {
  layout?: 'horizontal' | 'vertical' | 'accordion'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical'
})

const programStore = useProgramStore()

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
      return 'bg-green-500 text-white'
    case 'in_progress':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-gray-200 text-gray-600'
  }
}

const getStatusBadge = (stepId: string) => {
  const status = programStore.stepStatuses[stepId]
  switch (status) {
    case 'done':
      return { text: 'Terminé', class: 'bg-green-100 text-green-800' }
    case 'in_progress':
      return { text: 'En cours', class: 'bg-blue-100 text-blue-800' }
    default:
      return { text: 'À faire', class: 'bg-gray-100 text-gray-600' }
  }
}

const canClickStep = (stepId: string) => {
  const stepIndex = programStore.allSteps.findIndex(step => step.id === stepId)
  const currentIndex = programStore.allSteps.findIndex(step => step.id === programStore.currentStepId)
  
  // Peut cliquer si c'est l'étape courante ou une étape précédente
  return stepIndex <= currentIndex || programStore.stepStatuses[stepId] === 'done'
}

const handleStepClick = (stepId: string) => {
  if (canClickStep(stepId)) {
    programStore.goToStep(stepId)
  }
}

// Grouper les étapes par bookmaker group pour l'affichage
const groupedSteps = computed(() => {
  return programStore.bookmakerGroups.map(group => ({
    ...group,
    steps: group.steps.map(step => ({
      ...step,
      status: programStore.stepStatuses[step.id] || 'todo'
    }))
  }))
})
</script>

<template>
  <div class="stepper" :class="`stepper-${layout}`">
    <!-- Layout Vertical (Desktop) -->
    <div v-if="layout === 'vertical'" class="space-y-6">
      <div v-for="group in groupedSteps" :key="group.id" class="group-section">
        <!-- En-tête du groupe -->
        <div class="group-header mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div class="flex items-center gap-3">
            <div class="flex -space-x-2">
              <BookmakerLogo 
                v-for="bookmaker in group.bookmakers" 
                :key="bookmaker"
                :bookmaker="bookmaker" 
                size="sm"
                class="border-2 border-white"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ group.name }}</h3>
              <p class="text-sm text-gray-600">{{ group.bookmakers.join(', ') }} • Bonus {{ group.totalBonus }}€</p>
            </div>
          </div>
        </div>

        <!-- Étapes du groupe -->
        <div class="space-y-3 ml-4">
          <div 
            v-for="(step, index) in group.steps" 
            :key="step.id"
            class="step-item flex items-center gap-4 p-3 rounded-lg transition-all duration-200"
            :class="{
              'bg-blue-50 border border-blue-200': step.id === programStore.currentStepId,
              'hover:bg-gray-50 cursor-pointer': canClickStep(step.id),
              'opacity-60': !canClickStep(step.id)
            }"
            @click="handleStepClick(step.id)"
          >
            <!-- Connecteur vertical -->
            <div v-if="index < group.steps.length - 1" class="absolute left-8 mt-12 w-0.5 h-8 bg-gray-200"></div>
            
            <!-- Icône de l'étape -->
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
              :class="getStatusColor(step.id)"
            >
              <span v-if="step.status === 'done'">✓</span>
              <span v-else>{{ step.order }}</span>
            </div>

            <!-- Contenu de l'étape -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">{{ getStepIcon(step.type) }}</span>
                <h4 class="font-medium text-gray-900 truncate">{{ step.title }}</h4>
              </div>
              <p class="text-sm text-gray-600">{{ step.bookmaker }}</p>
            </div>

            <!-- Badge de statut -->
            <div class="flex-shrink-0">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getStatusBadge(step.id).class"
              >
                {{ getStatusBadge(step.id).text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Layout Horizontal (Tablette) -->
    <div v-else-if="layout === 'horizontal'" class="overflow-x-auto pb-4">
      <div class="flex gap-4 min-w-max">
        <div 
          v-for="step in programStore.allSteps" 
          :key="step.id"
          class="step-card flex-shrink-0 w-64 p-4 bg-white border rounded-lg transition-all duration-200"
          :class="{
            'border-blue-300 shadow-md': step.id === programStore.currentStepId,
            'hover:shadow-sm cursor-pointer': canClickStep(step.id),
            'opacity-60': !canClickStep(step.id)
          }"
          @click="handleStepClick(step.id)"
        >
          <div class="flex items-center gap-3 mb-3">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              :class="getStatusColor(step.id)"
            >
              <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
              <span v-else>{{ step.order }}</span>
            </div>
            <span class="text-lg">{{ getStepIcon(step.type) }}</span>
          </div>
          
          <h4 class="font-medium text-gray-900 mb-2 line-clamp-2">{{ step.title }}</h4>
          <p class="text-sm text-gray-600 mb-3">{{ step.bookmaker }}</p>
          
          <span 
            class="inline-block px-2 py-1 text-xs font-medium rounded-full"
            :class="getStatusBadge(step.id).class"
          >
            {{ getStatusBadge(step.id).text }}
          </span>
        </div>
      </div>
    </div>

    <!-- Layout Accordion (Mobile) -->
    <div v-else-if="layout === 'accordion'" class="space-y-2">
      <div v-for="group in groupedSteps" :key="group.id">
        <!-- En-tête du groupe (toujours visible) -->
        <div class="group-header p-3 bg-gray-50 rounded-lg border">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <BookmakerLogo :bookmaker="group.bookmakers[0]" size="sm" />
              <div>
                <h3 class="font-medium text-sm">{{ group.name }}</h3>
                <p class="text-xs text-gray-600">{{ group.totalBonus }}€</p>
              </div>
            </div>
            <span class="text-xs text-gray-500">
              {{ group.steps.filter(s => programStore.stepStatuses[s.id] === 'done').length }}/{{ group.steps.length }}
            </span>
          </div>
        </div>

        <!-- Étapes du groupe -->
        <div class="space-y-1 ml-2">
          <div 
            v-for="step in group.steps" 
            :key="step.id"
            class="step-item p-3 bg-white border rounded-lg"
            :class="{
              'border-blue-300 bg-blue-50': step.id === programStore.currentStepId,
              'cursor-pointer': canClickStep(step.id),
              'opacity-60': !canClickStep(step.id)
            }"
            @click="handleStepClick(step.id)"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                :class="getStatusColor(step.id)"
              >
                <span v-if="programStore.stepStatuses[step.id] === 'done'">✓</span>
                <span v-else>{{ step.order }}</span>
              </div>
              
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-sm text-gray-900 truncate">{{ step.title }}</h4>
                <p class="text-xs text-gray-600">{{ step.bookmaker }}</p>
              </div>
              
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full flex-shrink-0"
                :class="getStatusBadge(step.id).class"
              >
                {{ getStatusBadge(step.id).text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-vertical {
  @apply relative;
}

.step-item {
  @apply relative;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>