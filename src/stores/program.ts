import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Step {
  id: string
  order: number
  type: 'signup' | 'deposit' | 'bet' | 'result' | 'freebet'
  bookmaker: string,
  bet?: string,
  matrice?: string[],
  matchInfo?: MatchInfo,
  bookmakerStep: BookmakerStep[]
  title: string
  status: 'todo' | 'in_progress' | 'done'
  isOptional?: boolean
}

export interface MatchInfo {
  homeTeam: string,
  awayTeam: string,
  competition: string,
  startingDate: string
}

export interface BookmakerStep {
  name: string;
  bonus?: number;
  affiliateLink?: string;
  tutoSubscriptionVideoLink?: string;
  deposit?: number;
  bet?: string;
  betToTake?: string;
  betOdd?: number;
  betAmount?: number;
  amountType?: 'cash' | 'freebet';
}

export interface BookmakerGroup {
  id: string
  name: string
  bookmakers: string[]
  totalBonus: number
  steps: Step[]
}

export const useProgramStore = defineStore('program', () => {
  // État
  const currentStepId = ref<string>('')
  const stepStatuses = ref<Record<string, 'todo' | 'in_progress' | 'done'>>({})
  const showAdvancedSettings = ref(false)
  const history = ref<Array<{ stepId: string, action: string, timestamp: Date }>>([])

  // Données simulées - à remplacer par API plus tard
  const bookmakerGroups = ref<BookmakerGroup[]>([
    {
      id: 'group-1',
      name: 'Premier trio',
      bookmakers: ['Zebet', 'Unibet', 'Betclic'],
      totalBonus: 300,
      steps: [
        {
          id: 'signup-group-1',
          order: 1,
          type: 'signup',
          bookmaker: 'Zebet, Unibet, Betclic',
          bookmakerStep: [
            {
              name: 'Zebet',
              bonus: 100,
              affiliateLink: 'zebet.fr',
              tutoSubscriptionVideoLink: 'youtube.fr',
              deposit: 100,
            },
            {
              name: 'Unibet',
              bonus: 120,
              affiliateLink: 'unibet.fr',
              tutoSubscriptionVideoLink: 'https://www.youtube.com/watch?v=CHx12ciZ2yc&ab_channel=J%27iraidormirchezvous',
              deposit: 120,
            },
            {
              name: 'Betclic',
              bonus: 150,
              affiliateLink: 'betclic.fr',
              tutoSubscriptionVideoLink: 'youtube.fr',
              deposit: 150,
            }
          ],
          title: 'Inscription sur les 3 premiers bookmakers',
          status: 'todo'
        },
        {
          id: 'bet-group-1',
          order: 2,
          type: 'bet',
          bookmaker: 'Zebet, Unibet, Betclic',
          bet: 'Paris SG vs Lyon',
          matchInfo: {
            homeTeam: 'Paris Saint Germain',
            awayTeam: 'Lyon',
            competition: 'Ligue 1',
            startingDate: '2025-07-06T21:00:00'
          },
          bookmakerStep: [
            {
              name: 'ZebetTTTTT',
              bet: 'Paris SG vs Lyon',
              betToTake: 'Paris SG gagne le match',
              betOdd: 1.4,
              betAmount: 100,
              amountType: 'cash',
            },
            {
              name: 'Unibet',
              bet: 'Paris SG vs Lyon',
              betToTake: 'Match nul',
              betOdd: 4.2,
              betAmount: 100,
              amountType: 'cash',
            },
            {
              name: 'Betclic',
              betToTake: 'Lyon gagne le match',
              betOdd: 5.7,
              betAmount: 100,
              amountType: 'cash',
            }
          ],
          title: 'Prise des paris croisés',
          status: 'todo'
        },
        {
          id: 'freebet-group-1',
          order: 3,
          type: 'freebet',
          bookmaker: 'Zebet, Unibet, Betclic',
          bookmakerStep: [
            {
              name: 'Zebet',
              bonus: 100,
              affiliateLink: 'zebet.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            },
            {
              name: 'Unibet',
              bonus: 120,
              affiliateLink: 'unibet.fr',
              tutoSubscriptionVideoLink: 'https://www.youtube.com/watch?v=CHx12ciZ2yc&ab_channel=J%27iraidormirchezvous'
            },
            {
              name: 'Betclic',
              bonus: 150,
              affiliateLink: 'betclic.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            }
          ],
          title: 'Optimisation des freebets',
          status: 'todo'
        },
        {
          id: 'result-group-1',
          order: 4,
          type: 'result',
          bookmaker: 'Zebet, Unibet, Betclic',
          bookmakerStep: [
            {
              name: 'Zebet',
              bonus: 100,
              affiliateLink: 'zebet.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            },
            {
              name: 'Unibet',
              bonus: 120,
              affiliateLink: 'unibet.fr',
              tutoSubscriptionVideoLink: 'https://www.youtube.com/watch?v=CHx12ciZ2yc&ab_channel=J%27iraidormirchezvous'
            },
            {
              name: 'Betclic',
              bonus: 150,
              affiliateLink: 'betclic.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            }
          ],
          title: 'Résultats et gains',
          status: 'todo'
        }
      ]
    },
    {
      id: 'group-2',
      name: 'Deuxième trio',
      bookmakers: ['Bwin', 'Netbet', 'PMU'],
      totalBonus: 250,
      steps: [
        {
          id: 'signup-group-2',
          order: 5,
          type: 'signup',
          bookmaker: 'Bwin, Netbet, PMU',
          bookmakerStep: [
            {
              name: 'Bwin',
              bonus: 100,
              affiliateLink: 'Bwin.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            },
            {
              name: 'Netbet',
              bonus: 120,
              affiliateLink: 'Netbet.fr',
              tutoSubscriptionVideoLink: 'https://www.youtube.com/watch?v=CHx12ciZ2yc&ab_channel=J%27iraidormirchezvous'
            },
            {
              name: 'PMU',
              bonus: 150,
              affiliateLink: 'PMU.fr',
              tutoSubscriptionVideoLink: 'youtube.fr'
            }
          ],
          title: 'Inscription sur le 2ème trio',

          status: 'todo'
        }
        // ... autres étapes du groupe 2
      ]
    }
  ])

  // Computed
  const allSteps = computed(() => {
    return bookmakerGroups.value.flatMap(group => group.steps).sort((a, b) => a.order - b.order)
  })

  const currentStep = computed(() => {
    return allSteps.value.find(step => step.id === currentStepId.value) || allSteps.value[0]
  })

  const totalSteps = computed(() => allSteps.value.length)

  const completedSteps = computed(() => {
    return allSteps.value.filter(step => stepStatuses.value[step.id] === 'done').length
  })

  const progressPercentage = computed(() => {
    return totalSteps.value > 0 ? Math.round((completedSteps.value / totalSteps.value) * 100) : 0
  })

  const totalExpectedGain = computed(() => {
    return bookmakerGroups.value.reduce((total, group) => total + group.totalBonus, 0)
  })

  const currentGain = computed(() => {
    let gain = 0
    // allSteps.value.forEach(step => {
    //   if (stepStatuses.value[step.id] === 'done' && step.type === 'result') {
    //     gain += step.payload?.expectedGain || 0
    //   }
    // })
    return gain
  })

  const isLastStep = computed(() => {
    const currentIndex = allSteps.value.findIndex(step => step.id === currentStepId.value)
    return currentIndex === allSteps.value.length - 1
  })

  const isProgramCompleted = computed(() => {
    return allSteps.value.every(step => stepStatuses.value[step.id] === 'done')
  })

  // Actions
  const initializeProgram = () => {
    // Charger depuis localStorage
    const saved = localStorage.getItem('program-progress')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        stepStatuses.value = data.stepStatuses || {}
        currentStepId.value = data.currentStepId || allSteps.value[0]?.id || ''
      } catch (e) {
        console.error('Erreur lors du chargement de la progression:', e)
      }
    }

    // Définir l'étape courante si pas encore définie
    if (!currentStepId.value && allSteps.value.length > 0) {
      currentStepId.value = allSteps.value[0].id
    }

    // Initialiser les statuts manquants
    allSteps.value.forEach(step => {
      if (!stepStatuses.value[step.id]) {
        stepStatuses.value[step.id] = 'todo'
      }
    })
  }

  const saveProgress = () => {
    const data = {
      stepStatuses: stepStatuses.value,
      currentStepId: currentStepId.value
    }
    localStorage.setItem('program-progress', JSON.stringify(data))
  }

  const markStepAsCompleted = (stepId: string) => {
    stepStatuses.value[stepId] = 'done'
    
    // Ajouter à l'historique
    history.value.push({
      stepId,
      action: 'completed',
      timestamp: new Date()
    })

    // Passer à l'étape suivante
    const currentIndex = allSteps.value.findIndex(step => step.id === stepId)
    if (currentIndex < allSteps.value.length - 1) {
      currentStepId.value = allSteps.value[currentIndex + 1].id
    }

    saveProgress()
  }

  const markStepAsInProgress = (stepId: string) => {
    stepStatuses.value[stepId] = 'in_progress'
    currentStepId.value = stepId
    saveProgress()
  }

  const skipStep = (stepId: string) => {
    stepStatuses.value[stepId] = 'done'
    
    history.value.push({
      stepId,
      action: 'skipped',
      timestamp: new Date()
    })

    // Passer à l'étape suivante
    const currentIndex = allSteps.value.findIndex(step => step.id === stepId)
    if (currentIndex < allSteps.value.length - 1) {
      currentStepId.value = allSteps.value[currentIndex + 1].id
    }

    saveProgress()
  }

  const goToStep = (stepId: string) => {
    const step = allSteps.value.find(s => s.id === stepId)
    if (step) {
      currentStepId.value = stepId
      if (stepStatuses.value[stepId] === 'todo') {
        stepStatuses.value[stepId] = 'in_progress'
      }
      saveProgress()
    }
  }

  const resetProgram = () => {
    stepStatuses.value = {}
    currentStepId.value = allSteps.value[0]?.id || ''
    history.value = []
    allSteps.value.forEach(step => {
      stepStatuses.value[step.id] = 'todo'
    })
    localStorage.removeItem('program-progress')
  }

  return {
    // État
    currentStepId,
    stepStatuses,
    showAdvancedSettings,
    history,
    bookmakerGroups,
    
    // Computed
    allSteps,
    currentStep,
    totalSteps,
    completedSteps,
    progressPercentage,
    totalExpectedGain,
    currentGain,
    isLastStep,
    isProgramCompleted,
    
    // Actions
    initializeProgram,
    saveProgress,
    markStepAsCompleted,
    markStepAsInProgress,
    skipStep,
    goToStep,
    resetProgram
  }
})