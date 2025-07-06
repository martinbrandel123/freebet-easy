<template>
  <div class="freebet-header">
    <div class="header-content">
      <h1 class="main-title">27 Combinés à faire</h1>
      
      <div class="freebet-summary">
        <div class="freebet-item">
          <span class="freebet-amount">100 €</span>
          <span class="freebet-bookmaker">sur Zebet</span>
        </div>
        <div class="separator">•</div>
        <div class="freebet-item">
          <span class="freebet-amount">100 €</span>
          <span class="freebet-bookmaker">sur Winamax</span>
        </div>
      </div>

      <div class="matches-summary">
        <span class="match-item">PSG vs OM</span>
        <span class="separator">•</span>
        <span class="match-item">Lyon vs Nice</span>
        <span class="separator">•</span>
        <span class="match-item">Lille vs Rennes</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  freebets: {
    type: Array,
    default: () => [
      { bookmaker: 'Zebet', amount: 100 },
      { bookmaker: 'Winamax', amount: 100 }
    ]
  },
  matches: {
    type: Array,
    default: () => [
      { home: 'PSG', away: 'OM' },
      { home: 'Lyon', away: 'Nice' },
      { home: 'Lille', away: 'Rennes' }
    ]
  }
})
</script>

<style scoped>
.freebet-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

.header-content {
  text-align: center;
}

.main-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.freebet-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.freebet-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.freebet-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fcd34d;
}

.freebet-bookmaker {
  font-size: 0.9rem;
  opacity: 0.9;
}

.separator {
  font-size: 1.2rem;
  opacity: 0.7;
}

.matches-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  opacity: 0.8;
  flex-wrap: wrap;
}

.match-item {
  white-space: nowrap;
}

@media (max-width: 767px) {
  .main-title {
    font-size: 1.5rem;
  }
  
  .freebet-summary {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .matches-summary {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .separator {
    display: none;
  }
}
</style>