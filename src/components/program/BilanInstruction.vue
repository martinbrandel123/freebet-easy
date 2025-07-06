<template>
  <div class="bilan-instruction-container">
    <!-- En-tête avec titre et totaux -->
    <div class="bilan-header">
      <h3 class="bilan-title">Résultats et gains</h3>
      <p class="bilan-subtitle">Voici le bilan de vos paris sur les 3 premiers bookmakers</p>
      
      <div class="totals-grid">
        <div class="total-card total-gains" :class="getTotalGainsClass()">
          <div class="total-label">Total des gains</div>
          <div class="total-amount">{{ formatAmount(totalGains) }}</div>
          <div class="total-description">Mises + bénéfices</div>
        </div>
        
        <div class="total-card total-benefice" :class="getTotalBeneficeClass()">
          <div class="total-label">Total des bénéfices</div>
          <div class="total-amount">{{ formatAmount(totalBenefice) }}</div>
          <div class="total-description">Gains - mises</div>
        </div>
      </div>
    </div>

    <!-- Grille des résultats par bookmaker -->
    <div class="bookmakers-grid">
      <div 
        v-for="(result, index) in bookmakerResults" 
        :key="index"
        class="bookmaker-result"
      >
        <div class="bookmaker-header">
          <BookmakerLogo :bookmaker="result.name" size="sm" />
          <h4 class="bookmaker-name">{{ result.name }}</h4>
        </div>
        
        <div class="bookmaker-details">
          <div class="detail-row">
            <span class="detail-label">Mise cash :</span>
            <span class="detail-value">{{ result.cashStake }}€</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Gains totaux :</span>
            <span class="detail-value" :class="getAmountClass(result.totalGains)">
              {{ result.totalGains }}€
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Bénéfice :</span>
            <span class="detail-value" :class="getAmountClass(result.benefice)">
              {{ formatAmount(result.benefice) }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Statut :</span>
            <span class="detail-value">{{ result.resultLabel }}</span>
          </div>
        </div>
        
        <div class="net-result" :class="getBeneficeClass(result.benefice)">
          <div class="result-label">Bénéfice net</div>
          <div class="result-amount">{{ formatAmount(result.benefice) }}</div>
        </div>
        
        <button 
          class="withdrawal-button"
          @click="openWithdrawalVideo(result.name, result.withdrawalVideoLink)"
          :disabled="result.benefice <= 0"
        >
          <v-icon icon="mdi-play-circle" size="18" />
          Comment faire un retrait ?
        </button>
      </div>
    </div>

    <!-- Instructions de retrait -->
    <div class="withdrawal-instructions">
      <div class="instructions-header">
        <span class="instructions-icon">💰</span>
        <h3 class="instructions-title">Voici comment retirer vos gains</h3>
      </div>
      
      <ol class="instructions-list">
        <li>
          <span class="step-number">1</span>
          <span>Connectez-vous à votre compte sur chaque bookmaker où vous avez des gains</span>
        </li>
        <li>
          <span class="step-number">2</span>
          <span>Allez dans la section "Mon compte" puis "Retrait"</span>
        </li>
        <li>
          <span class="step-number">3</span>
          <span>Choisissez votre méthode de retrait (virement bancaire recommandé)</span>
        </li>
        <li>
          <span class="step-number">4</span>
          <span>Saisissez le montant à retirer et confirmez</span>
        </li>
        <li>
          <span class="step-number">5</span>
          <span>Vos gains seront transférés sous 1-3 jours ouvrés</span>
        </li>
      </ol>
    </div>

    <!-- Call-to-action pour la suite -->
    <div class="next-action">
      <h3>🚀 Prêt pour la suite ?</h3>
      <p>Vous avez terminé avec les 3 premiers bookmakers. Passons maintenant aux 3 suivants pour continuer à maximiser vos gains !</p>
      <button class="next-button" @click="goToNextBookmakers">
        Passer aux 3 bookmakers suivants
        <v-icon icon="mdi-arrow-right" size="18" />
      </button>
    </div>

    <!-- Modal Vidéo -->
    <VideoModal
      v-if="showVideoModal"
      :videoId="currentVideoId"
      @close="closeVideo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BookmakerLogo from './BookmakerLogo.vue'
import VideoModal from '../modal/VideoModal.vue'

const props = defineProps({
  currentStep: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['nextStep'])

const showVideoModal = ref(false)
const currentVideoId = ref('')

// Données simulées des résultats - à remplacer par les vraies données
// Exemple : 3 paris de 100€ avec 127€ de bénéfice = 427€ de gains et 127€ de bénéfice
const bookmakerResults = ref([
  {
    name: 'Zebet',
    cashStake: 100, // Mise en cash uniquement
    totalGains: 140, // Ce que le bookmaker a payé
    benefice: 40, // totalGains - cashStake
    resultLabel: 'Paris gagnant',
    withdrawalVideoLink: 'dQw4w9WgXcQ'
  },
  {
    name: 'Unibet', 
    cashStake: 100,
    totalGains: 0, // Rien gagné
    benefice: -100, // 0 - 100 = -100€
    resultLabel: 'Paris perdant',
    withdrawalVideoLink: 'dQw4w9WgXcQ'
  },
  {
    name: 'Betclic',
    cashStake: 100,
    totalGains: 287, // Ce que le bookmaker a payé
    benefice: 187, // 287 - 100 = 187€
    resultLabel: 'Paris gagnant',
    withdrawalVideoLink: 'dQw4w9WgXcQ'
  }
])

// Calculs des totaux
const totalCashStakes = computed(() => {
  return bookmakerResults.value.reduce((total, result) => total + result.cashStake, 0)
})

const totalBenefice = computed(() => {
  return bookmakerResults.value.reduce((total, result) => total + result.benefice, 0)
})

const totalGains = computed(() => {
  // Gains = Mises totales + Bénéfice
  return totalCashStakes.value + totalBenefice.value
})

const formatAmount = (amount: number) => {
  const sign = amount >= 0 ? '+' : ''
  return `${sign}${amount}€`
}

const getAmountClass = (amount: number) => {
  if (amount > 0) return 'positive-amount'
  if (amount < 0) return 'negative-amount'
  return 'neutral-amount'
}

const getBeneficeClass = (amount: number) => {
  if (amount > 0) return 'benefice-positive'
  if (amount < 0) return 'benefice-negative'
  return 'benefice-neutral'
}

const getTotalGainsClass = () => {
  if (totalGains.value > totalCashStakes.value) return 'total-positive'
  if (totalGains.value < totalCashStakes.value) return 'total-negative'
  return 'total-neutral'
}

const getTotalBeneficeClass = () => {
  if (totalBenefice.value > 0) return 'total-positive'
  if (totalBenefice.value < 0) return 'total-negative'
  return 'total-neutral'
}

const openWithdrawalVideo = (bookmakerName: string, videoId: string) => {
  currentVideoId.value = videoId
  showVideoModal.value = true
}

const closeVideo = () => {
  showVideoModal.value = false
  currentVideoId.value = ''
}

const goToNextBookmakers = () => {
  emit('nextStep')
}
</script>

<style scoped>
.bilan-instruction-container {
  max-width: 800px;
  margin: 0 auto;
}

/* En-tête avec titre et totaux */
.bilan-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.bilan-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.bilan-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

/* Grille des totaux */
.totals-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.total-card {
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid;
}

.total-positive {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-color: #10b981;
}

.total-negative {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-color: #9ca3af;
}

.total-neutral {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
}

.total-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.total-positive .total-label {
  color: #065f46;
}

.total-negative .total-label {
  color: #4b5563;
}

.total-neutral .total-label {
  color: #64748b;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.total-positive .total-amount {
  color: #059669;
}

.total-negative .total-amount {
  color: #6b7280;
}

.total-neutral .total-amount {
  color: #64748b;
}

.total-description {
  font-size: 0.8rem;
  opacity: 0.8;
  font-style: italic;
}

.total-positive .total-description {
  color: #047857;
}

.total-negative .total-description {
  color: #6b7280;
}

.total-neutral .total-description {
  color: #64748b;
}

/* Grille des bookmakers */
.bookmakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.bookmaker-result {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.bookmaker-result:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.bookmaker-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.bookmaker-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.bookmaker-details {
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.detail-label {
  color: #6b7280;
  font-weight: 500;
}

.detail-value {
  font-weight: 600;
  color: #1f2937;
}

.positive-amount {
  color: #059669 !important;
}

.negative-amount {
  color: #6b7280 !important;
}

.neutral-amount {
  color: #64748b !important;
}

/* Résultats nets */
.net-result {
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid;
}

.benefice-positive {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-color: #10b981;
}

.benefice-negative {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-color: #9ca3af;
}

.benefice-neutral {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
}

.result-label {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  opacity: 0.8;
}

.benefice-positive .result-label {
  color: #065f46;
}

.benefice-negative .result-label {
  color: #4b5563;
}

.benefice-neutral .result-label {
  color: #64748b;
}

.result-amount {
  font-size: 1.3rem;
  font-weight: 700;
}

.benefice-positive .result-amount {
  color: #059669;
}

.benefice-negative .result-amount {
  color: #6b7280;
}

.benefice-neutral .result-amount {
  color: #64748b;
}

.withdrawal-button {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.withdrawal-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.withdrawal-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

/* Instructions de retrait */
.withdrawal-instructions {
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.instructions-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.instructions-icon {
  font-size: 1.5rem;
}

.instructions-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #92400e;
  margin: 0;
}

.instructions-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.instructions-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #451a03;
  line-height: 1.5;
}

.instructions-list li:last-child {
  margin-bottom: 0;
}

.step-number {
  background: #f59e0b;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* Call-to-action */
.next-action {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.next-action h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.next-action p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.next-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.next-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 767px) {
  .bilan-instruction-container {
    padding: 0;
  }
  
  .totals-grid {
    grid-template-columns: 1fr;
  }
  
  .bookmakers-grid {
    grid-template-columns: 1fr;
  }
  
  .total-amount {
    font-size: 1.5rem;
  }
  
  .next-action {
    padding: 1.5rem;
  }
  
  .bilan-header {
    padding-bottom: 1rem;
  }
}
</style>