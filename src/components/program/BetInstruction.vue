<template>
  <div class="bet-instruction-container">
    <!-- Titre principal -->

    <div>
      <h3 class="card-title-centered">Vous avez 3 paris à prendre <v-icon>mdi-hand-pointing-down</v-icon></h3>
    </div>

    <!-- Bloc info match -->
    <div class="match-info-block">
      <div class="match-header">
        <div class="competition-name">{{ currentStep.matchInfo.competition }}</div>
        <div class="match-date">{{ formatDate(currentStep.matchInfo.startingDate) }}</div>
      </div>

      <div class="teams-row">
        <div class="team-name left">{{ currentStep.matchInfo.homeTeam }}</div>
        <div class="match-hour">{{ formatHour(currentStep.matchInfo.startingDate) }}</div>
        <div class="team-name right">{{ currentStep.matchInfo.awayTeam }}</div>
      </div>
    </div>

    <!-- Carte des paris -->
    <div class="bet-card no-shadow">
      <div
        v-for="(step, index) in currentStep.bookmakerStep"
        :key="`${step.name}-${index}`"
        class="bet-step"
        :class="{ 'last-step': index === currentStep.bookmakerStep.length - 1 }"
      >
        <div class="step-index">{{ index + 1 }}</div>

        <div class="step-content">
          <div class="step-header">
            <BookmakerLogo :bookmaker="step.name" size="sm" />
            <h4 class="step-bookmaker">{{ step.name }}</h4>
          </div>

          <div class="step-details">
            <div class="detail-item bet-to-take">
              <span class="detail-label">Pari à prendre : <span class="detail-value highlight">{{ step.betToTake }}</span></span>
              
            </div>
            <div class="detail-item">
              <span class="detail-label">Côte : <span class="detail-value odd-value">@{{ step.betOdd }}</span></span>
              
            </div>
            <div class="detail-item">
              <span class="detail-label">Mise : <span class="detail-value amount-value">
                {{ formatAmount(step.betAmount, step.amountType) }} </span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookmakerLogo from './BookmakerLogo.vue'

const props = defineProps({
  currentStep: {
    type: Object,
    required: true,
  },
})

const formatAmount = (amount: number, type: string) => {
  return type === 'cash' ? `${amount}€ CASH` : `${amount} ${type}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const formatHour = (dateString: string) => {
  const date = new Date(dateString)
  return date
    .toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(':', '.')
}
</script>

<style scoped>
/***************************
 * Variables globales
 ***************************/
.bet-instruction-container {
  --primary-color: #4f46e5;
  --primary-light: #6366f1;
  --text-dark: #1e293b;
  --text-light: #64748b;
  --bg-light: #f8fafc;
  --bg-bet: #eef2ff;
  --border-color: #e2e8f0;
  --success-color: #10b981;
  max-width: 800px;
  margin: 0 auto;
}

/***************************
 * Titre principal
 ***************************/
.card-title-centered {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

/***************************
 * Bloc d'informations match
 ***************************/
.match-info-block {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.competition-name,
.match-date {
  font-weight: 600;
  font-size: 1rem;
  max-width: 48%;
  word-break: break-word;
  white-space: normal;
}

.teams-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
}

.team-name {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
  white-space: normal;
  min-width: 0;
}

.match-hour {
  background: white;
  color: var(--primary-color);
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  white-space: nowrap;
  flex-shrink: 0;
}

/***************************
 * Carte & étapes de paris
 ***************************/
.bet-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
}

.bet-card.no-shadow {
  box-shadow: none;
}

.bet-step {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: var(--bg-bet);
  margin-bottom: 1rem;
}

.bet-step:last-child,
.bet-step.last-step {
  margin-bottom: 0;
}

.step-index {
  background: var(--primary-color);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-content {
  flex: 1;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.step-bookmaker {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
}

.step-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .step-details .bet-to-take { grid-column: 1 / -1; }
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 500;
}

.detail-value {
  font-size: 0.95rem;
  color: var(--text-dark);
  font-weight: 500;
}

.highlight {
  color: var(--primary-color);
  font-weight: 600;
}

.odd-value {
  color: var(--success-color);
  font-weight: 700;
}

.amount-value {
  font-weight: 600;
}
</style>