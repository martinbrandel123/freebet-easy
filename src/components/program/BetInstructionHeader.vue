<template>
  <div class="affiliate-notice">
    <div class="notice-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#eab308">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <h4>Important : Validation de vos comptes {{ bookmakerData.bookmaker }}</h4>
    </div>

    <div class="notice-content">
      <p>Pour pouvoir parier et bénéficier de tous les avantages :</p>
      
      <div class="notice-steps">
        <div class="notice-step">
          <span class="step-number">1</span>
          <span>Vérifiez que vos comptes sur les 3 bookmakers sont <strong>validés</strong></span>
        </div>

          <div class="validation-checklist">
            <div class="checklist-item">
              <span class="check-icon">✓</span>
              <span class="check-text">Email/SMS de confirmation reçu</span>
            </div>
            <div class="checklist-item">
              <span class="check-icon">✓</span>
              <span class="check-text">Possible d'éffectuer un retrait bancaire</span>
            </div>
            <div class="checklist-item">
              <span class="check-icon">✓</span>
              <span class="check-text">"Compte vérifié" visible sur votre profil</span>
            </div>
          </div>


        <div class="notice-step">
          <span class="step-number">2</span>
          <span>La validation peut prendre 24-72h (code postal reçu par courrier ou validation de votre justificatif de domicile)</span>
        </div>
        <div class="notice-step">
          <span class="step-number">3</span>
          <span>Une fois les 3 comptes validés, vous pourrez déposer vos paris</span>
        </div>
      </div>



      <div class="benefits-box">
        <div class="benefit">
          <div class="benefit-icon">⏳</div>
          <div>
            <div class="benefit-title">Patience nécessaire</div>
            <div class="benefit-desc">Cette étape de validation est obligatoire pour tous les bookmakers ARJEL</div>
          </div>
        </div>
        <div class="benefit">
          <div class="benefit-icon">📬</div>
          <div>
            <div class="benefit-title">Vérifiez votre boîte mail</div>
            <div class="benefit-desc">Pensez à vérifier vos spams/courriers indésirables</div>
          </div>
        </div>
      </div>

      <div class="notice-footer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>N'oubliez pas de cliquer sur <strong>"Recevoir les paris"</strong> après validation de vos 3 comptes</span>
      </div>

      <div class="validate-button-container">
        <!--  @click="handleValidation" -->
        <button class="validate-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Mes comptes sont validés, recevoir les paris
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bookmakerData: {
    type: Object,
    // type: Object as () => {
    //   id: string
    //   order: number
    //   type: string
    //   bookmaker: string
    //   bookmakerStep: Array<{
    //     name: string
    //     bet?: string
    //     betToTake: string
    //     betOdd: number
    //     betAmount: number
    //     amountType: string
    //   }>
    // },
    required: true,
  },
})
</script>

<style>



.affiliate-notice {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.notice-header h4 {
  margin: 0;
  color: #1e293b;
  font-size: 1rem;
}

.notice-header svg {
  flex-shrink: 0;
}

.notice-content p {
  margin: 0 0 1rem 0;
  color: #334155;
  font-size: 0.9rem;
}

.notice-steps {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.notice-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #fff7ed;
  border-radius: 8px;
  font-size: 0.9rem;
}

.notice-step strong {
  color: #ea580c;
}

.step-number {
  background: #ea580c;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.benefits-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.benefit {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.benefit-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #1e293b;
  margin-bottom: 0.15rem;
}

.benefit-desc {
  font-size: 0.8rem;
  color: #64748b;
}

.notice-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #10b981;
  font-weight: 500;
}

.notice-footer svg {
  flex-shrink: 0;
}



.validation-checklist {
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
  border-radius: 0 8px 8px 0;
  padding: 1rem;
  margin: 0.5rem 0 1.5rem 2rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  line-height: 1.5;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: #10b981;
  color: white;
  border-radius: 50%;
  margin-right: 0.75rem;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.check-text {
  color: #334155;
}

.notice-step.validated-accounts-check {
  margin-bottom: 0.5rem;
}

/* Animation pour les checkmarks */
.checklist-item {
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;
}

.checklist-item:nth-child(1) { animation-delay: 0.1s; }
.checklist-item:nth-child(2) { animation-delay: 0.3s; }
.checklist-item:nth-child(3) { animation-delay: 0.5s; }

@keyframes fadeIn {
  to { opacity: 1; }
}



.validate-button-container {
  margin: 1.5rem 0;
  text-align: center;
}

.validate-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.validate-button:hover {
  background: #059669;
  transform: translateY(-1px);
}

.validate-button:active {
  transform: translateY(0);
}

.validate-button svg {
  flex-shrink: 0;
}
</style>