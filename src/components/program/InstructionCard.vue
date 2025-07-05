<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgramStore } from '../../stores/program'
import BookmakerLogo from './BookmakerLogo.vue'
import SignupInstruction from './SignupInstruction.vue'
import SignupInInstructionHeader from './SignupInstructionHeader.vue'
import BetInstruction from './BetInstruction.vue'
import BetInstructionHeader from './BetInstructionHeader.vue'

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
  <div v-if="currentStep" class="instruction-card">
    <!-- En-tête de la carte -->
    <div class="card-header">
      <div class="header-content">
        <!-- Icône et logos des bookmakers -->
        <div class="header-icons">
          <div class="step-icon-wrapper">
            <span class="step-icon">{{ getStepIcon(currentStep.type) }}</span>
          </div>
          
          <!-- Logos des bookmakers si plusieurs -->
          <div v-if="currentStep.bookmaker.includes(',')" class="bookmaker-logos">
            <BookmakerLogo 
              v-for="bookmaker in currentStep.bookmaker.split(', ')" 
              :key="bookmaker"
              :bookmaker="bookmaker.trim()" 
              size="sm"
              class="bookmaker-logo"
            />
          </div>
          <BookmakerLogo 
            v-else
            :bookmaker="currentStep.bookmaker" 
            size="sm"
            class="single-bookmaker-logo"
          />
        </div>

        <!-- Titre et informations -->
        <div class="header-info">
          <div class="header-badges">
            <span class="type-badge">
              {{ getStepTypeLabel(currentStep.type) }}
            </span>
            <span class="step-badge">
              Étape {{ currentStep.order }} / {{ programStore.totalSteps }}
            </span>
          </div>
          
          <h2 class="card-title">
            {{ currentStep.title }}
          </h2>
          
          <p class="card-bookmaker">
            {{ currentStep.bookmaker }}
          </p>

        </div>
      </div>
    </div>

    <!-- Contenu des instructions -->
    <div class="card-content">
      <!-- <div class="instructions-content">
        <div v-html="currentStep.instructions"></div>
      </div> -->

      <div v-if="currentStep.type === 'signup'">
        <SignupInInstructionHeader/>
        <div v-for="(bookmaker, index) in currentStep.bookmakerStep" :key="index" style="margin-top: 10px;margin-bottom: 10px;">
          <SignupInstruction :bookmakerData="bookmaker"/>
        </div>
      </div>

      <div v-if="currentStep.type === 'bet'">
        <BetInstructionHeader :bookmakerData="currentStep"/>
        <BetInstruction :currentStep="currentStep"/>
      </div>


      <!-- Informations supplémentaires selon le type d'étape -->
      <!-- <div v-if="currentStep.payload" class="additional-info"> -->
        <!-- Montant de dépôt -->

        <!-- <div v-if="currentStep.payload.depositAmount" class="info-card deposit-info">
          <div class="info-header">
            <span class="info-icon">💳</span>
            <h4 class="info-title">Montant à déposer</h4>
          </div>
          <p class="info-content">
            {{ currentStep.payload.depositAmount }}€ par site
            <span v-if="currentStep.bookmaker.includes(',')">
              ({{ currentStep.payload.depositAmount * currentStep.bookmaker.split(',').length }}€ au total)
            </span>
          </p>
        </div> -->
        
      <!-- </div> -->
    </div>

    <!-- Actions -->
    <div class="card-actions">
      <div class="action-buttons">
        <!-- Bouton principal -->
        <button 
          @click="handleMarkAsDone"
          :disabled="!canMarkAsDone"
          class="btn-primary action-primary"
        >
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Marquer comme fait</span>
        </button>

        <!-- Bouton secondaire (skip) -->
        <button 
          v-if="canSkip"
          @click="showSkipConfirmation = true"
          class="btn-secondary action-secondary"
        >
          Passer cette étape
        </button>

        <!-- Paramètres avancés -->
        <button 
          @click="programStore.showAdvancedSettings = !programStore.showAdvancedSettings"
          class="btn-settings"
          title="Paramètres avancés"
        >
          <svg class="settings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Aide contextuelle -->
      <div class="help-card">
        <div class="help-content">
          <svg class="help-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="help-text">
            <p class="help-title">Besoin d'aide ?</p>
            <p class="help-description">Notre support est disponible 7j/7 pour vous accompagner. N'hésitez pas à nous contacter si vous avez des questions.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation pour skip -->
    <div v-if="showSkipConfirmation" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Passer cette étape ?</h3>
        <p class="modal-description">
          Ceci risque d'altérer le calcul du bénéfice et pourrait affecter les étapes suivantes. 
          Êtes-vous sûr de vouloir continuer ?
        </p>
        <div class="modal-actions">
          <button 
            @click="showSkipConfirmation = false"
            class="modal-btn modal-btn-cancel"
          >
            Annuler
          </button>
          <button 
            @click="handleSkip"
            class="modal-btn modal-btn-confirm"
          >
            Passer l'étape
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- État de chargement si pas d'étape courante -->
  <div v-else class="loading-card">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <h3 class="loading-title">Chargement...</h3>
      <p class="loading-description">Préparation de votre prochaine étape</p>
    </div>
  </div>
</template>

<style scoped>
.instruction-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
  overflow: hidden;
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

.card-header {
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  padding: 2rem;
  border-bottom: 1px solid #E5E7EB;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.header-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.step-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #E5E7EB;
}

.step-icon {
  font-size: 2rem;
}

.bookmaker-logos {
  display: flex;
  gap: -0.5rem;
}

.bookmaker-logo {
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.single-bookmaker-logo {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-info {
  flex: 1;
}

.header-badges {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.type-badge {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.step-badge {
  background: #F1F5F9;
  color: #64748B;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .card-title {
    font-size: 1.75rem;
  }
}

.card-bookmaker {
  color: #6B7280;
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.gain-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  color: #065F46;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid #10B981;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
}

.gain-icon {
  font-size: 1.1rem;
}

.card-content {
  padding: 2rem;
}

.instructions-content {
  margin-bottom: 2rem;
}

.instructions-content :deep(h4) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1rem 0;
}

.instructions-content :deep(p) {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.instructions-content :deep(code) {
  background: #F1F5F9;
  color: #3B82F6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
}

.instructions-content :deep(a) {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
}

.instructions-content :deep(a:hover) {
  text-decoration: underline;
}

.additional-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid;
}

.deposit-info {
  background: #FFFBEB;
  border-color: #F59E0B;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #92400E;
  margin: 0;
}

.info-content {
  color: #451A03;
  line-height: 1.5;
  margin: 0;
}

.promo-codes {
  margin-top: 1.5rem;
}

.promo-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1rem 0;
}

.promo-grid {
  display: grid;
  gap: 1rem;
}

.promo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F8FAFC;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #E2E8F0;
}

.promo-bookmaker {
  font-weight: 600;
  color: #1F2937;
}

.promo-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.promo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.copy-icon {
  width: 1rem;
  height: 1rem;
}

.card-actions {
  background: #F8FAFC;
  padding: 2rem;
  border-top: 1px solid #E5E7EB;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .action-buttons {
    flex-direction: row;
    align-items: center;
  }
}

.action-primary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
}

.action-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.action-secondary {
  background: #F1F5F9;
  color: #64748B;
  border: 1px solid #E2E8F0;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 640px) {
  .action-secondary {
    width: auto;
  }
}

.action-secondary:hover {
  background: #E2E8F0;
  color: #475569;
}

.btn-settings {
  background: #F1F5F9;
  color: #64748B;
  border: 1px solid #E2E8F0;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .btn-settings {
    width: auto;
  }
}

.btn-settings:hover {
  background: #E2E8F0;
  color: #475569;
}

.settings-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.help-card {
  background: linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%);
  border: 1px solid #93C5FD;
  border-radius: 12px;
  padding: 1.5rem;
}

.help-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.help-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3B82F6;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.help-text {
  flex: 1;
}

.help-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1E3A8A;
  margin: 0 0 0.5rem 0;
}

.help-description {
  color: #1E40AF;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 28rem;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1rem 0;
}

.modal-description {
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.modal-btn-cancel {
  background: #F1F5F9;
  color: #64748B;
}

.modal-btn-cancel:hover {
  background: #E2E8F0;
  color: #475569;
}

.modal-btn-confirm {
  background: #EF4444;
  color: white;
}

.modal-btn-confirm:hover {
  background: #DC2626;
}

.loading-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
  padding: 3rem 2rem;
  text-align: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #E5E7EB;
  border-top: 3px solid #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.loading-description {
  color: #6B7280;
  margin: 0;
}

@media (max-width: 767px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .card-header,
  .card-content,
  .card-actions {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .promo-item {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .help-content {
    flex-direction: column;
    text-align: center;
  }
}

</style>