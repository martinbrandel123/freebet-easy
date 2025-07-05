<template>
  <div class="affiliate-notice">
  <div class="notice-header">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#eab308">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <h4>Important pour ton inscription sur les sites de paris</h4>
  </div>

  <div class="notice-content">
    <p>Pour bénéficier de tous les avantages :</p>
    
    <div class="notice-steps">
      <div class="notice-step">
        <span class="step-number">1</span>
        <span>Désactive ton bloqueur de publicités avant de cliquer</span>
      </div>
      <div class="notice-step">
        <span class="step-number">2</span>
        <span>Utilise <strong>exclusivement</strong> nos boutons d'inscription</span>
      </div>
      <div class="notice-step">
        <span class="step-number">2</span>
        <span>Une fois les 3 comptes validé laissez nous savoir en cliquant sur le bouton ci-dessous</span>
      </div>
    </div>

    <div class="benefits-box">
      <div class="benefit">
        <div class="benefit-icon">🎁</div>
        <div>
          <div class="benefit-title">Pour toi</div>
          <div class="benefit-desc">Bonus augmentés + accompagnement gratuit</div>
        </div>
      </div>
      <div class="benefit">
        <div class="benefit-icon">🤝</div>
        <div>
          <div class="benefit-title">Pour nous</div>
          <div class="benefit-desc">Ça nous permet de continuer à proposer ce service gratuitement</div>
        </div>
      </div>
    </div>

    <div class="notice-footer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>Merci de nous soutenir !</span>
    </div>

    <div class="validate-button-container">
      <button class="validate-button" @click="goToNextStep" >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M5 13l4 4L19 7l-1.5-1.5L9 14.5 6.5 12 5 13z"/>
        </svg>
        Mes 3 comptes sont validés, passer à l'étape suivante
      </button>
    </div>
  </div>
</div>
</template>
<script>
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