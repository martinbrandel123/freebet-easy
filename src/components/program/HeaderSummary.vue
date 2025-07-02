<script setup lang="ts">
import { computed } from 'vue'
import { useProgramStore } from '../../stores/program'

const programStore = useProgramStore()

const progressColor = computed(() => {
  if (programStore.progressPercentage < 30) return '#EF4444'
  if (programStore.progressPercentage < 70) return '#F59E0B'
  return '#10B981'
})
</script>

<template>
  <div class="header-summary">
    <div class="container">
      <div class="header-content">
        <!-- Titre et description -->
        <div class="header-info">
          <h1 class="header-title">Programme Bonus Bookmakers</h1>
          <p class="header-description">
            Suivez le guide étape par étape pour maximiser vos gains
          </p>
        </div>

        <!-- KPIs -->
        <div class="header-kpis">
          <!-- Progression -->
          <div class="kpi-card kpi-progress">
            <div class="kpi-content">
              <span class="kpi-label">Progression</span>
              <div class="kpi-value-group">
                <span class="kpi-value">
                  {{ programStore.completedSteps }}/{{ programStore.totalSteps }}
                </span>
                <span class="kpi-percentage">({{ programStore.progressPercentage }}%)</span>
              </div>
            </div>
            <div class="progress-circle">
              <svg class="circle-svg" viewBox="0 0 36 36">
                <path
                  class="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle-progress"
                  :stroke="progressColor"
                  :stroke-dasharray="`${programStore.progressPercentage}, 100`"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="circle-text">{{ programStore.progressPercentage }}%</div>
            </div>
          </div>

          <!-- Gains actuels -->
          <div class="kpi-card kpi-gains">
            <div class="kpi-content">
              <span class="kpi-label">Gains actuels</span>
              <span class="kpi-value kpi-value-gains">
                +{{ programStore.currentGain }}€
              </span>
            </div>
            <div class="kpi-icon kpi-icon-gains">
              <span>💰</span>
            </div>
          </div>

          <!-- Objectif total -->
          <div class="kpi-card kpi-target">
            <div class="kpi-content">
              <span class="kpi-label">Objectif total</span>
              <span class="kpi-value kpi-value-target">
                {{ programStore.totalExpectedGain }}€
              </span>
            </div>
            <div class="kpi-icon kpi-icon-target">
              <span>🎯</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barre de progression linéaire -->
      <div class="linear-progress">
        <div class="progress-track">
          <div 
            class="progress-bar"
            :style="{ 
              width: `${programStore.progressPercentage}%`,
              backgroundColor: progressColor
            }"
          ></div>
        </div>
      </div>

      <!-- Message de fin si programme terminé -->
      <div v-if="programStore.isProgramCompleted" class="completion-banner">
        <div class="completion-content">
          <span class="completion-icon">🎉</span>
          <div class="completion-text">
            <h3 class="completion-title">Programme terminé !</h3>
            <p class="completion-description">
              Bénéfice réalisé : +{{ programStore.currentGain }}€ - N'hésitez pas à recommander à vos amis !
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
}

@media (min-width: 1024px) {
  .header-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }
}

.header-info {
  flex: 1;
}

.header-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.75rem 0;
}

@media (min-width: 768px) {
  .header-title {
    font-size: 2.5rem;
  }
}

.header-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
}

.header-kpis {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .header-kpis {
    gap: 2rem;
  }
}

.kpi-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 0;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (min-width: 768px) {
  .kpi-card {
    flex: none;
    min-width: 180px;
  }
}

.kpi-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.kpi-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.kpi-value-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.kpi-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.kpi-value-gains {
  color: #FCD34D;
}

.kpi-value-target {
  color: #93C5FD;
}

.kpi-percentage {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.progress-circle {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
}

.circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3;
}

.circle-progress {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
}

.kpi-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.kpi-icon span {
  font-size: 1.5rem;
}

.linear-progress {
  margin-top: 1.5rem;
}

.progress-track {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  height: 0.75rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: all 0.5s ease;
  border-radius: 6px;
  background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
}

.completion-banner {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.completion-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.completion-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.completion-text {
  flex: 1;
}

.completion-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.completion-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .header-content {
    padding: 1.5rem 0;
  }
  
  .header-title {
    font-size: 1.75rem;
  }
  
  .kpi-card {
    min-width: 100%;
  }
  
  .completion-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>