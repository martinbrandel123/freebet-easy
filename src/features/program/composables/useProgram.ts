import { computed } from 'vue'
import { useProgramStore } from '../stores'

export function useProgram() {
  const programStore = useProgramStore()

  const currentStep = computed(() => programStore.currentStep)
  const progress = computed(() => ({
    current: programStore.completedSteps,
    total: programStore.totalSteps,
    percentage: programStore.progressPercentage
  }))
  const isCompleted = computed(() => programStore.isProgramCompleted)

  const completeStep = (stepId: string) => {
    programStore.markStepAsCompleted(stepId)
  }

  const skipStep = (stepId: string) => {
    programStore.skipStep(stepId)
  }

  const goToStep = (stepId: string) => {
    programStore.goToStep(stepId)
  }

  const resetProgress = () => {
    programStore.resetProgram()
  }

  return {
    // State
    currentStep,
    progress,
    isCompleted,
    allSteps: programStore.allSteps,
    stepStatuses: programStore.stepStatuses,
    
    // Actions
    completeStep,
    skipStep,
    goToStep,
    resetProgress,
    initialize: programStore.initializeProgram
  }
}