<template>
  <div class="combinations-container">
    <!-- Grille des combinaisons -->
    <div class="combinations-grid">
      <div 
        v-for="combination in combinations" 
        :key="combination.id"
        class="combination-card"
        :class="{ 
          'selected': selectedCombinations.includes(combination.id),
          'already-bet': combination.alreadyBet 
        }"
        @click="toggleSelection(combination.id)"
      >
        <!-- Icône de sélection -->
        <div v-if="selectedCombinations.includes(combination.id)" class="selection-icon">
          ✅
        </div>

        <!-- Bookmaker en haut à gauche -->
        <div class="bookmaker-badge">
          {{ combination.bookmaker }}
        </div>

        <!-- Pronostics détaillés -->
        <div class="predictions-section">
          <div class="prediction-item">
            <span class="match-teams">PSG vs OM</span>
            <span class="prediction-result" :class="getPredictionClass(combination.predictions[0])">
              {{ getPredictionLabel(combination.predictions[0]) }}
            </span>
          </div>
          <div class="prediction-item">
            <span class="match-teams">Lyon vs Nice</span>
            <span class="prediction-result" :class="getPredictionClass(combination.predictions[1])">
              {{ getPredictionLabel(combination.predictions[1]) }}
            </span>
          </div>
          <div class="prediction-item">
            <span class="match-teams">Lille vs Rennes</span>
            <span class="prediction-result" :class="getPredictionClass(combination.predictions[2])">
              {{ getPredictionLabel(combination.predictions[2]) }}
            </span>
          </div>
        </div>

        <!-- Côte combinée (élément principal) -->
        <div class="combined-odds">
          @{{ combination.combinedOdds }}
        </div>

        <!-- Mise -->
        <div class="stake-amount">
          Mise : {{ combination.stake }} €
        </div>

        <!-- Bouton d'état -->
        <div class="bet-status">
          <span v-if="combination.alreadyBet" class="status-badge already-bet">
            Déjà pronostiqué
          </span>
          <span v-else class="status-badge not-bet">
            Non pronostiqué
          </span>
        </div>
      </div>
    </div>

    <!-- Barre d'actions fixe -->
    <div class="actions-bar">
      <button 
        class="validate-button"
        :class="{ 'active': selectedCombinations.length > 0 }"
        :disabled="selectedCombinations.length === 0"
        @click="validateSelections"
      >
        <span v-if="selectedCombinations.length === 0">
          Sélectionnez des combinaisons
        </span>
        <span v-else>
          Valider {{ selectedCombinations.length }} sélection{{ selectedCombinations.length > 1 ? 's' : '' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Combination {
  id: string
  predictions: number[] // 1, 2, 3 pour chaque match (V, N, D)
  combinedOdds: string
  stake: number
  bookmaker: string
  alreadyBet: boolean
}

const selectedCombinations = ref<string[]>([])

// Génération des 27 combinaisons (3^3 = 27)
const combinations = ref<Combination[]>([])

const generateCombinations = () => {
  const results: Combination[] = []
  const bookmakers = ['Zebet', 'Winamax']
  let id = 1

  // Générer toutes les combinaisons possibles (3^3 = 27)
  for (let match1 = 1; match1 <= 3; match1++) {
    for (let match2 = 1; match2 <= 3; match2++) {
      for (let match3 = 1; match3 <= 3; match3++) {
        const predictions = [match1, match2, match3]
        
        // Calcul simulé des côtes
        const baseOdd = 2.5 + Math.random() * 15
        const combinedOdds = baseOdd.toFixed(2)
        
        // Un seul bookmaker par combiné
        const bookmaker = bookmakers[Math.floor(Math.random() * bookmakers.length)]
        
        // Mise fixe ou variable selon le bookmaker
        const stake = bookmaker === 'Zebet' ? 100 : 100

        results.push({
          id: `combo-${id}`,
          predictions,
          combinedOdds,
          stake,
          bookmaker,
          alreadyBet: Math.random() > 0.7 // 30% de chance d'être déjà pronostiqué
        })
        id++
      }
    }
  }
  
  combinations.value = results
}

const toggleSelection = (combinationId: string) => {
  const index = selectedCombinations.value.indexOf(combinationId)
  if (index > -1) {
    selectedCombinations.value.splice(index, 1)
  } else {
    selectedCombinations.value.push(combinationId)
  }
}

const getPredictionLabel = (prediction: number) => {
  switch (prediction) {
    case 1: return 'V' // Victoire
    case 2: return 'N' // Nul
    case 3: return 'D' // Défaite
    default: return '?'
  }
}

const getPredictionClass = (prediction: number) => {
  switch (prediction) {
    case 1: return 'prediction-win'
    case 2: return 'prediction-draw'
    case 3: return 'prediction-loss'
    default: return 'prediction-unknown'
  }
}

const validateSelections = () => {
  if (selectedCombinations.value.length > 0) {
    console.log('Combinaisons sélectionnées:', selectedCombinations.value)
    // Ici vous pouvez émettre un événement ou appeler une fonction parent
  }
}

onMounted(() => {
  generateCombinations()
})
</script>

<style scoped>
.combinations-container {
  position: relative;
  padding-bottom: 80px; /* Espace pour la barre d'actions */
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .combinations-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.combination-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  .combination-card {
    height: 150px;
    padding: 1rem;
  }
}

.combination-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

.combination-card.selected {
  border-color: #3b82f6;
  border-width: 3px;
  background: #eff6ff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.combination-card.already-bet {
  opacity: 0.7;
  background: #f8fafc;
}

.selection-icon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1rem;
  z-index: 1;
}

.bookmaker-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.predictions-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.prediction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.match-teams {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.prediction-result {
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  min-width: 24px;
  text-align: center;
}

.prediction-win {
  background: #dcfce7;
  color: #166534;
}

.prediction-draw {
  background: #f1f5f9;
  color: #475569;
}

.prediction-loss {
  background: #fee2e2;
  color: #dc2626;
}

.combined-odds {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin: 0.75rem 0;
}

.stake-amount {
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.bet-status {
  display: flex;
  justify-content: flex-end;
}

.status-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
}

.status-badge.already-bet {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.not-bet {
  background: #ecfdf5;
  color: #065f46;
}

.actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.validate-button {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  background: #9ca3af;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: not-allowed;
  transition: all 0.3s ease;
}

.validate-button.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.validate-button.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

@media (max-width: 767px) {
  .combined-odds {
    font-size: 1.25rem;
  }
  
  .stake-amount {
    font-size: 0.8rem;
  }
  
  .status-badge {
    font-size: 0.65rem;
  }
  
  .match-teams {
    font-size: 0.8rem;
  }
  
  .prediction-result {
    font-size: 0.8rem;
  }
}
</style>