<template>
  <div class="bilan-instruction-container">
    <!-- En-tête avec titre et total -->
    <div class="bilan-header">
      <h3 class="bilan-title">Résultats et gains</h3>
      <p class="bilan-subtitle">Voici le bilan de vos paris sur les 3 premiers bookmakers</p>
      
      <div class="total-gains" :class="getTotalClass()">
        <div class="total-label">Total des gains</div>
        <div class="total-amount">{{ formatAmount(totalGains) }}</div>
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
            <span class="detail-label">Mise totale :</span>
            <span class="detail-value">{{ result.totalStake }}€</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Gains :</span>
            <span class="detail-value">{{ result.totalWinnings }}€</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Résultat :</span>
            <span class="detail-value">{{ result.resultLabel }}</span>
          </div>
        </div>
        
        <div class="net-result" :class="getResultClass(result.netResult)">
          {{ formatAmount(result.netResult) }}
        </div>
        
        <button 
          class="withdrawal-button"
          @click="openWithdrawalVideo(result.name, result.withdrawalVideoLink)"
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
const bookmakerResults = ref([
  {
    name: 'Zebet',
    totalStake: 100,
    totalWinnings: 140,
    netResult: 40,
    resultLabel: 'Paris gagnant',
    withdrawalVideoLink: 'dQw4w9WgXcQ' // ID YouTube d'exemple
  },
  {
    name: 'Unibet', 
    totalStake: 120,
    totalWinnings: 0,
    netResult: -120,
    resultLabel: 'Paris perdant',
    withdrawalVideoLink: 'dQw4w9WgXcQ'
  },
  {
    name: 'Betclic',
    totalStake: 150,
    totalWinnings: 357,
    netResult: 207,
    resultLabel: 'Paris gagnant',
    withdrawalVideoLink: 'dQw4w9WgXcQ'
  }
])

const totalGains = computed(() => {
  return bookmakerResults.value.reduce((total, result) => total + result.netResult, 0)
})

const formatAmount = (amount: number) => {
  const sign = amount >= 0 ? '+' : ''
  return `${sign}${amount}€`
}

const getResultClass = (amount: number) => {
  if (amount > 0) return 'gain-amount'
  if (amount < 0) return 'loss-amount'
  return 'neutral-amount'
}

const getTotalClass = () => {
  if (totalGains.value > 0) return 'total-positive'
  if (totalGains.value < 0) return 'total-negative'
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

/* En-tête avec titre et total */
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

/* Total des gains */
.total-gains {
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.total-positive {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #10b981;
}

.total-negative {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 1px solid #9ca3af;
}

.total-neutral {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
}

.total-label {
  font-size: 0.9rem;
  font-weight: 500;
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
  font-size: 2rem;
  font-weight: 700;
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

/* Grille des bookmakers */
.bookmakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
}

.detail-value {
  font-weight: 500;
  color: #1f2937;
}

/* Résultats nets */
.net-result {
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
}

.gain-amount {
  color: #059669;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.loss-amount {
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #d1d5db;
}

.neutral-amount {
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
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

.withdrawal-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
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