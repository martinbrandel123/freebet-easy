<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgramStore } from '../../stores/program'
import BookmakerLogo from './BookmakerLogo.vue'

const programStore = useProgramStore()
const showSkipConfirmation = ref(false)

const currentStep = computed(() => programStore.currentStep)

const canMarkAsDone = computed(() => {
  // Pour l'instant, toujours autorisé. Plus tard, on ajoutera des validations
  return true
})

const canSkip = computed(() => {
  return programStore.showAdvancedSettings && currentStep.value?.isOptional !== false
})

const handleMarkAsDone = () => {
  if (canMarkAsDone.value && currentStep.value) {
    programStore.markStepAsCompleted(currentStep.value.id)
    
    // Toast notification
    // TODO: Implémenter le système de toast
    console.log('Étape validée ✓')
  }
}

const handleSkip = () => {
  if (currentStep.value) {
    programStore.skipStep(currentStep.value.id)
    showSkipConfirmation.value = false
    
    // Toast notification
    console.log('Étape ignorée')
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // TODO: Toast success
    console.log('Copié dans le presse-papier')
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}

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

const getStepTypeLabel = (type: string) => {
  const labels = {
    signup: 'Inscription',
    deposit: 'Dépôt',
    bet: 'Paris',
    freebet: 'Freebets',
    result: 'Résultats'
  }
  return labels[type as keyof typeof labels] || 'Étape'
}
</script>

<template>
  <div v-if="currentStep" class="instruction-card bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <!-- En-tête de la carte -->
    <div class="card-header bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
      <div class="flex items-start gap-4">
        <!-- Icône et logos des bookmakers -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
            {{ getStepIcon(currentStep.type) }}
          </div>
          
          <!-- Logos des bookmakers si plusieurs -->
          <div v-if="currentStep.bookmaker.includes(',')" class="flex -space-x-1">
            <BookmakerLogo 
              v-for="bookmaker in currentStep.bookmaker.split(', ')" 
              :key="bookmaker"
              :bookmaker="bookmaker.trim()" 
              size="sm"
              class="border-2 border-white"
            />
          </div>
          <BookmakerLogo 
            v-else
            :bookmaker="currentStep.bookmaker" 
            size="sm"
          />
        </div>

        <!-- Titre et informations -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {{ getStepTypeLabel(currentStep.type) }}
            </span>
            <span class="text-sm text-gray-500">
              Étape {{ currentStep.order }} / {{ programStore.totalSteps }}
            </span>
          </div>
          
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            {{ currentStep.title }}
          </h2>
          
          <p class="text-gray-600">
            {{ currentStep.bookmaker }}
          </p>

          <!-- Informations sur les gains attendus -->
          <div v-if="currentStep.payload?.expectedGain" class="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <span>💰</span>
            <span>Gain attendu : +{{ currentStep.payload.expectedGain }}€</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu des instructions -->
    <div class="card-content p-6">
      <div class="prose prose-sm max-w-none">
        <div v-html="currentStep.instructions"></div>
      </div>

      <!-- Informations supplémentaires selon le type d'étape -->
      <div v-if="currentStep.payload" class="mt-6 space-y-4">
        <!-- Montant de dépôt -->
        <div v-if="currentStep.payload.depositAmount" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-yellow-600">💳</span>
            <h4 class="font-semibold text-yellow-800">Montant à déposer</h4>
          </div>
          <p class="text-yellow-700">
            {{ currentStep.payload.depositAmount }}€ par site
            <span v-if="currentStep.bookmaker.includes(',')">
              ({{ currentStep.payload.depositAmount * currentStep.bookmaker.split(',').length }}€ au total)
            </span>
          </p>
        </div>

        <!-- Codes promo -->
        <div v-if="currentStep.type === 'signup'" class="space-y-2">
          <h4 class="font-semibold text-gray-900">Codes promo à utiliser :</h4>
          <div class="grid gap-2">
            <div 
              v-for="bookmaker in currentStep.bookmaker.split(', ')" 
              :key="bookmaker"
              class="flex items-center justify-between bg-gray-50 rounded-lg p-3"
            >
              <span class="font-medium">{{ bookmaker.trim() }}</span>
              <button 
                @click="copyToClipboard('BONUS100')"
                class="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                <span>BONUS100</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="card-actions bg-gray-50 p-6 border-t border-gray-200">
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Bouton principal -->
        <button 
          @click="handleMarkAsDone"
          :disabled="!canMarkAsDone"
          class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Marquer comme fait</span>
        </button>

        <!-- Bouton secondaire (skip) -->
        <button 
          v-if="canSkip"
          @click="showSkipConfirmation = true"
          class="sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Passer cette étape
        </button>

        <!-- Paramètres avancés -->
        <button 
          @click="programStore.showAdvancedSettings = !programStore.showAdvancedSettings"
          class="sm:w-auto bg-gray-100 text-gray-600 p-3 rounded-lg hover:bg-gray-200 transition-colors"
          title="Paramètres avancés"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Aide contextuelle -->
      <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">Besoin d'aide ?</p>
            <p>Notre support est disponible 7j/7 pour vous accompagner. N'hésitez pas à nous contacter si vous avez des questions.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation pour skip -->
    <div v-if="showSkipConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Passer cette étape ?</h3>
        <p class="text-gray-600 mb-6">
          Ceci risque d'altérer le calcul du bénéfice et pourrait affecter les étapes suivantes. 
          Êtes-vous sûr de vouloir continuer ?
        </p>
        <div class="flex gap-3">
          <button 
            @click="showSkipConfirmation = false"
            class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button 
            @click="handleSkip"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Passer l'étape
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- État de chargement si pas d'étape courante -->
  <div v-else class="instruction-card bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
    <div class="animate-pulse">
      <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
</template>

<style scoped>
.instruction-card {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose {
  @apply text-gray-700;
}

.prose h4 {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.prose p {
  @apply mb-3;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.prose .space-y-4 > * + * {
  @apply mt-4;
}

.prose .grid {
  @apply grid;
}

.prose .gap-3 {
  @apply gap-3;
}
</style>