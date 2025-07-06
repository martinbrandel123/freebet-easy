<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Step } from '../../interfaces/common'

const steps = ref<Step[]>([
  {
    number: 1,
    title: "Inscription sur les sites de paris sportifs",
    description: "Nous vous accompagnons dans votre inscription sur les meilleures plateformes agréées par l'ANJ (Autorité Nationale des Jeux).",
    icon: "📝",
    visible: false
  },
  {
    number: 2,
    title: "Utilisation du bonus",
    description: "Bénéficiez des offres de bienvenue généreuses sans risque",
    icon: "🎁",
    visible: false
  },
  {
    number: 3,
    title: "Accompagnement personnalisé",
    description: "Notre équipe vous accompagne à chaque étape du processus",
    icon: "🤝",
    visible: false
  },
  {
    number: 4,
    title: "Retrait des gains",
    description: "Récupérez vos gains directement sur votre compte bancaire par virement",
    icon: "💰",
    visible: false
  }
])

onMounted(() => {
  steps.value.forEach((step, index) => {
    setTimeout(() => {
      step.visible = true
    }, (index + 1) * 200)
  })
})
</script>

<template>
  <section id="concept" class="concept section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Comment ça marche ?</h2>
        <p class="section-subtitle">
          Le programme Freebet to Cash vous guide pas à pas pour profiter des offres de bienvenue des sites de paris sportifs. 
          <strong>Aucune expérience requise</strong>, tout est expliqué pour que vous puissiez gagner en moyenne 500€ en un mois, sans risque !
        </p>
      </div>

      <div class="steps-container">
        <div 
          v-for="(step, index) in steps" 
          :key="step.number"
          class="step-card"
          :class="{ 'step-visible': step.visible }"
        >
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-number">{{ step.number }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>

      <div class="concept-guarantee">
        <div class="guarantee-card">
          <div class="guarantee-icon">🛡️</div>
          <div class="guarantee-content">
            <h3>Garantie Sans Risque</h3>
            <p>Notre méthode exclut totalement le hasard, chaque étape s'appuyant sur des calculs précis et des stratégies éprouvées.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.concept {
  background: #F8FAFC;
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
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.step-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.6s ease;
  transform: translateY(30px);
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
}

.step-visible {
  transform: translateY(0);
  opacity: 1;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1rem;
}

.step-description {
  color: #6B7280;
  line-height: 1.6;
}

.concept-guarantee {
  display: flex;
  justify-content: center;
}

.guarantee-card {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}

.guarantee-icon {
  font-size: 2.5rem;
}

.guarantee-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.guarantee-content p {
  opacity: 0.9;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .steps-container {
    grid-template-columns: 1fr;
  }
  
  .guarantee-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>