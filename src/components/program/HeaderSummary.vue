<script setup lang="ts">
import { computed } from 'vue'
import { useProgramStore } from '../../stores/program'

const programStore = useProgramStore()

const progressColor = computed(() => {
  if (programStore.progressPercentage < 30) return 'bg-red-500'
  if (programStore.progressPercentage < 70) return 'bg-yellow-500'
  return 'bg-green-500'
})
</script>

<template>
  <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- Titre et description -->
        <div class="flex-1">
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Programme Bonus Bookmakers
          </h1>
          <p class="text-gray-600">
            Suivez le guide étape par étape pour maximiser vos gains
          </p>
        </div>

        <!-- KPIs -->
        <div class="flex flex-wrap gap-4 lg:gap-6">
          <!-- Progression -->
          <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500">Progression</span>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-gray-900">
                  {{ programStore.completedSteps }}/{{ programStore.totalSteps }}
                </span>
                <span class="text-sm text-gray-500">({{ programStore.progressPercentage }}%)</span>
              </div>
            </div>
            <div class="w-12 h-12 relative">
              <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  stroke-width="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  :stroke="progressColor"
                  stroke-width="3"
                  :stroke-dasharray="`${programStore.progressPercentage}, 100`"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-bold text-gray-700">{{ programStore.progressPercentage }}%</span>
              </div>
            </div>
          </div>

          <!-- Gains actuels -->
          <div class="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-3">
            <div class="flex flex-col">
              <span class="text-sm text-green-600">Gains actuels</span>
              <span class="text-lg font-bold text-green-800">
                +{{ programStore.currentGain }}€
              </span>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-green-600">💰</span>
            </div>
          </div>

          <!-- Objectif total -->
          <div class="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3">
            <div class="flex flex-col">
              <span class="text-sm text-blue-600">Objectif total</span>
              <span class="text-lg font-bold text-blue-800">
                {{ programStore.totalExpectedGain }}€
              </span>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600">🎯</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barre de progression linéaire -->
      <div class="mt-4">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-500 ease-out"
            :class="progressColor"
            :style="{ width: `${programStore.progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Message de fin si programme terminé -->
      <div v-if="programStore.isProgramCompleted" class="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🎉</span>
          <div>
            <h3 class="font-bold text-green-800">Programme terminé !</h3>
            <p class="text-green-700">
              Bénéfice réalisé : +{{ programStore.currentGain }}€ - N'hésitez pas à recommander à vos amis !
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>