import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Step {
  id: string
  order: number
  type: 'signup' | 'deposit' | 'bet' | 'result' | 'freebet'
  bookmaker: string
  title: string
  instructions: string
  payload?: {
    depositAmount?: number
    odds?: number
    betAmount?: number
    promoCode?: string
    referralLink?: string
    expectedGain?: number
  }
  status: 'todo' | 'in_progress' | 'done'
  isOptional?: boolean
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
          title: 'Inscription sur les 3 premiers bookmakers',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Inscrivez-vous sur ces 3 sites :</h4>
              <div class="grid gap-3">
                <div class="p-3 border rounded-lg">
                  <strong>1. Zebet</strong> - Bonus 100€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">WELCOME100</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage Zebet</a>
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>2. Unibet</strong> - Bonus 100€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">BONUS100</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage Unibet</a>
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>3. Betclic</strong> - Bonus 100€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">FIRST100</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage Betclic</a>
                </div>
              </div>
              <p class="text-sm text-gray-600">⚠️ Utilisez impérativement nos liens de parrainage pour bénéficier des bonus</p>
            </div>
          `,
          payload: {
            depositAmount: 75,
            expectedGain: 300
          },
          status: 'todo'
        },
        {
          id: 'deposit-group-1',
          order: 2,
          type: 'deposit',
          bookmaker: 'Zebet, Unibet, Betclic',
          title: 'Dépôt de 75€ sur chaque site',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Effectuez un dépôt de 75€ sur chaque site :</h4>
              <div class="bg-blue-50 p-4 rounded-lg">
                <p><strong>Montant à déposer :</strong> 75€ × 3 = 225€ au total</p>
                <p class="text-sm text-gray-600 mt-2">Ce montant sera récupéré + les bonus à la fin du processus</p>
              </div>
              <div class="space-y-2">
                <p>✅ Zebet : 75€ déposés</p>
                <p>✅ Unibet : 75€ déposés</p>
                <p>✅ Betclic : 75€ déposés</p>
              </div>
            </div>
          `,
          payload: {
            depositAmount: 75
          },
          status: 'todo'
        },
        {
          id: 'bet-group-1',
          order: 3,
          type: 'bet',
          bookmaker: 'Zebet, Unibet, Betclic',
          title: 'Prise des paris croisés',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Placez ces paris simultanément :</h4>
              <div class="grid gap-3">
                <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <strong>Zebet :</strong> Équipe A gagne - Cote 2.1 - Mise 71€
                </div>
                <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <strong>Unibet :</strong> Match nul - Cote 3.2 - Mise 47€
                </div>
                <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <strong>Betclic :</strong> Équipe B gagne - Cote 4.1 - Mise 37€
                </div>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <p class="font-semibold">⚠️ Important :</p>
                <p class="text-sm">Placez tous les paris dans les 5 minutes pour garantir les cotes</p>
              </div>
            </div>
          `,
          payload: {
            odds: 2.1,
            betAmount: 155
          },
          status: 'todo'
        },
        {
          id: 'freebet-group-1',
          order: 4,
          type: 'freebet',
          bookmaker: 'Zebet, Unibet, Betclic',
          title: 'Optimisation des freebets',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Utilisez vos freebets obtenus :</h4>
              <div class="space-y-3">
                <div class="p-3 border rounded-lg">
                  <strong>Freebet Zebet (100€) :</strong>
                  <br>Pariez sur Équipe C - Cote 2.0
                  <br>Gain potentiel : 100€
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>Freebet Unibet (100€) :</strong>
                  <br>Pariez sur Équipe D - Cote 1.9
                  <br>Gain potentiel : 90€
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>Freebet Betclic (100€) :</strong>
                  <br>Pariez sur Équipe E - Cote 2.1
                  <br>Gain potentiel : 110€
                </div>
              </div>
            </div>
          `,
          status: 'todo'
        },
        {
          id: 'result-group-1',
          order: 5,
          type: 'result',
          bookmaker: 'Zebet, Unibet, Betclic',
          title: 'Résultats et gains',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Bilan de ce trio de bookmakers :</h4>
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <p class="text-lg font-semibold text-green-800">Gain total : +300€</p>
                <div class="mt-3 space-y-1 text-sm">
                  <p>• Dépôts récupérés : 225€</p>
                  <p>• Bonus freebets : 300€</p>
                  <p>• Gains nets : 300€</p>
                </div>
              </div>
              <p class="text-center text-gray-600">Prêt pour le prochain trio de bookmakers ?</p>
            </div>
          `,
          payload: {
            expectedGain: 300
          },
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
          order: 6,
          type: 'signup',
          bookmaker: 'Bwin, Netbet, PMU',
          title: 'Inscription sur le 2ème trio',
          instructions: `
            <div class="space-y-4">
              <h4 class="font-semibold text-lg">Inscrivez-vous sur ces 3 nouveaux sites :</h4>
              <div class="grid gap-3">
                <div class="p-3 border rounded-lg">
                  <strong>1. Bwin</strong> - Bonus 80€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">BWIN80</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage Bwin</a>
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>2. Netbet</strong> - Bonus 100€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">NET100</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage Netbet</a>
                </div>
                <div class="p-3 border rounded-lg">
                  <strong>3. PMU</strong> - Bonus 70€
                  <br>Code promo : <code class="bg-gray-100 px-2 py-1 rounded">PMU70</code>
                  <br><a href="#" class="text-blue-600 underline">Lien de parrainage PMU</a>
                </div>
              </div>
            </div>
          `,
          payload: {
            depositAmount: 60,
            expectedGain: 250
          },
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
    allSteps.value.forEach(step => {
      if (stepStatuses.value[step.id] === 'done' && step.type === 'result') {
        gain += step.payload?.expectedGain || 0
      }
    })
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