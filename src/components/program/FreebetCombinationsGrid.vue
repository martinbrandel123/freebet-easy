<template>
  <div class="combinations-container">
    <div class="combinations-grid">
      <div
        v-for="parlay in parlays"
        :key="parlay.id"
        class="combination-card"
        :class="{ selected: selectedCombinations.includes(parlay.id) }"
      >
        <!-- En-tête avec bookmaker -->
        <div class="combination-header">
          <div class="bookmaker-badge">
            <v-icon icon="mdi-crown" size="16" />
            <span>{{ parlay.bookmaker }}</span>
          </div>
          
          <label class="mark-done-label">
            <input 
              type="checkbox" 
              :checked="selectedCombinations.includes(parlay.id)" 
              @change="toggleSelection(parlay.id)" 
            />
            <span>Pari effectué</span>
          </label>
        </div>

        <!-- Détails des paris -->
        <div class="predictions-section">
          <div class="section-title">
            <v-icon icon="mdi-soccer-field" size="18" />
            <span>Votre combiné :</span>
          </div>
          
          <div 
            v-for="(bet, index) in parlay.combiné" 
            :key="index" 
            class="prediction-card"
            :class="getPredictionClass(bet.result)"
          >
            <div class="match-teams">
              <span class="team home-team" :class="{ 'winning-team': bet.result === 'home' }">
                {{ bet.homeTeam }}
              </span>
              <span class="vs">vs</span>
              <span class="team away-team" :class="{ 'winning-team': bet.result === 'away' }">
                {{ bet.awayTeam }}
              </span>
            </div>
            
            <div class="prediction-details">
              <div class="prediction-result">
                <v-icon 
                  :icon="bet.result === 'draw' ? 'mdi-minus' : 'mdi-trophy'" 
                  size="18" 
                />
                <span class="prediction-label">
                  {{ getPredictionLabel(bet) }}
                </span>
              </div>
              
              <div class="prediction-odd">
                @{{ bet.odd.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>


        <!-- Côte et mise -->
        <div class="odds-display">
          <div class="odds-value">
            <span class="label">Côte totale</span>
            <span class="value">{{ parlay.totalOdd.toFixed(2) }}</span>
          </div>
          <div class="stake-value">
            <span class="label">Mise</span>
            <span class="value">{{ parlay.betAmount }} €{{parlay.betType}}</span>
          </div>
        </div>
        <!-- Potentiel gain -->
        <div class="potential-win">
          Gain potentiel : {{ (parlay.betAmount * parlay.totalOdd).toFixed(2) }}€
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Bet {
  homeTeam: string
  awayTeam: string
  result: 'home' | 'draw' | 'away'
  bookmaker: string
  odd: number
  startingDate: string
  bookmakerLink: string
}

interface Parlay {
  id: string
  bookmaker: string
  totalOdd: number
  combiné?: Bet[]
  betType: 'CASH' | 'FREEBET'
  betAmount: number
  isBetPlaced: boolean
}

const props = defineProps<{
  parlays: Parlay[]
}>()

const selectedCombinations = ref<string[]>([])

const toggleSelection = (parlayId: string) => {
  const index = selectedCombinations.value.indexOf(parlayId)
  if (index > -1) {
    selectedCombinations.value.splice(index, 1)
  } else {
    selectedCombinations.value.push(parlayId)
  }
}

const getPredictionLabel = (bet: Bet) => {
  switch (bet.result) {
    case 'home': return `${bet.homeTeam} gagne`
    case 'away': return `${bet.awayTeam} gagne`
    case 'draw': return 'Match nul'
    default: return ''
  }
}

const getPredictionClass = (result: string) => {
  return {
    'prediction-win': result !== 'draw',
    'prediction-draw': result === 'draw'
  }
}
</script>

<style scoped>
.combinations-container {
  padding: 1rem 0;
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.combination-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.combination-card.selected {
  border-color: #3b82f6;
  background-color: #f0f7ff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
}

.combination-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bookmaker-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.mark-done-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
  cursor: pointer;
}

.mark-done-label input {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.odds-display {
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
}

.odds-value, .stake-value {
  display: flex;
  flex-direction: column;
}

.odds-value .value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
}

.stake-value .value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #059669;
}

.label {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.predictions-section {
  margin-bottom: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #334155;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.prediction-card {
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.prediction-win {
  background-color: #f0fdf4;
  /* border-left: 3px solid #16a34a; */
}

.prediction-draw {
  background-color: #f8fafc;
  /* border-left: 3px solid #94a3b8; */
}

.match-teams {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.home-team, .away-team {
  color: #64748b;
}

.winning-team {
  font-weight: 700;
  color: #166534;
}

.vs {
  color: #94a3b8;
  font-size: 0.8em;
}

.prediction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prediction-result {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.prediction-label {
  font-weight: 900;
  font-size:0.75rem;
  color: #166534;
}

.prediction-odd {
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
}

.potential-win {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e40af;
  padding: 0.5rem;
  background: #eff6ff;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .combinations-grid {
    grid-template-columns: 1fr;
  }
}
</style>