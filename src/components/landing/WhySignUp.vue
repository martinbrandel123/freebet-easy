<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Reason } from '../../interfaces/common'

const reasons = ref<Reason[]>([
  {
    icon: "🎯",
    title: "Simplicité",
    description: "Aucune connaissance requise, tout est expliqué pas à pas",
    highlight: "Méthode ultra-simple",
    visible: false
  },
  {
    icon: "🛡️",
    title: "Sécurité",
    description: "Méthode sans risque, les bonus couvrent les pertes potentielles",
    highlight: "Zéro risque financier",
    visible: false
  },
  {
    icon: "🤝",
    title: "Accompagnement",
    description: "Support personnalisé, communauté active et réactive",
    highlight: "Support 7j/7",
    visible: false
  },
  {
    icon: "🆓",
    title: "Gratuité",
    description: "Service 100% gratuit pour les utilisateurs, Comment est-ce possible ? Nous sommes rémunérés grâce aux liens de parrainage.",
    highlight: "Aucun frais caché",
    visible: false
  }
])

onMounted(() => {
  reasons.value.forEach((reason, index) => {
    setTimeout(() => {
      reason.visible = true
    }, (index + 1) * 300)
  })
})

const scrollToSignup = () => {
  const element = document.getElementById('signup')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="why-signup section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Pourquoi choisir le programme Freebet to Cash ?</h2>
        <p class="section-subtitle">
          Découvrez tous les avantages de notre méthode éprouvée
        </p>
      </div>

      <div class="reasons-grid">
        <div 
          v-for="(reason, index) in reasons" 
          :key="index"
          class="reason-card"
          :class="{ 'reason-visible': reason.visible }"
        >
          <div class="reason-icon">{{ reason.icon }}</div>
          <div class="reason-content">
            <div class="reason-highlight">{{ reason.highlight }}</div>
            <h3 class="reason-title">{{ reason.title }}</h3>
            <p class="reason-description">{{ reason.description }}</p>
          </div>
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">257</div>
            <div class="stat-label">Utilisateurs satisfaits</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">114&nbsp;353€</div>
            <div class="stat-label">Gains cumulés</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">96%</div>
            <div class="stat-label">Taux de satisfaction</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">21j</div>
            <div class="stat-label">Temps moyen pour gagner</div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-card">
          <h3>Prêt à commencer ?</h3>
          <p>Ils sont des centaines à avoir déjà gagné 500€ en moyenne. Pourquoi pas vous ?</p>
          <div class="cta-buttons">
            <button class="btn-primary" @click="scrollToSignup">
              🚀 Je m'inscris maintenant
            </button>
            <button class="btn-secondary" @click="scrollToSignup">
              📋 Je découvre la méthode
            </button>
          </div>
          <div class="cta-guarantee">
            <div class="guarantee-badge">
              <span class="guarantee-icon">✅</span>
              <span>100% Sans Risque • Méthode Prouvée • Support Inclus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-signup {
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.reason-card {
  background: #F8FAFC;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.6s ease;
  transform: translateY(30px);
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.reason-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
}

.reason-visible {
  transform: translateY(0);
  opacity: 1;
}

.reason-card:hover {
  background: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.reason-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.reason-content {
  flex: 1;
}

.reason-highlight {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.reason-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.75rem;
}

.reason-description {
  color: #6B7280;
  line-height: 1.6;
}

.stats-section {
  margin-bottom: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #FCD34D;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.cta-section {
  display: flex;
  justify-content: center;
}

.cta-card {
  background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cta-card h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 1.2rem;
  color: #6B7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.cta-guarantee {
  margin-top: 1.5rem;
}

.guarantee-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.guarantee-icon {
  font-size: 1.1rem;
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .reasons-grid {
    grid-template-columns: 1fr;
  }
  
  .reason-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .cta-card {
    padding: 2rem;
  }
  
  .cta-card h3 {
    font-size: 1.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .btn-primary,
  .cta-buttons .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
</style>