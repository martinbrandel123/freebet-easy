<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scrollToSignup = () => {
  const element = document.getElementById('signup')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const memberCount = ref(0)
const totalEarnings = ref(0)

onMounted(() => {
  // Animation des compteurs
  const animateCounter = (targetValue: number, setter: (value: number) => void, duration: number = 2000) => {
    let start = 0
    const increment = targetValue / (duration / 50)
    const timer = setInterval(() => {
      start += increment
      if (start >= targetValue) {
        start = targetValue
        clearInterval(timer)
      }
      setter(Math.floor(start))
    }, 50)
  }

  setTimeout(() => {
    animateCounter(257, (value) => memberCount.value = value)
    animateCounter(114353, (value) => totalEarnings.value = value)
  }, 1000)
})
</script>

<template>
  <section id="hero" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title fade-in">
            Gagnez <span class="highlight">jusqu'à 500€ sans risque</span> grâce aux bonus des bookmakers arjel
          </h1>
          
          <p class="hero-subtitle fade-in">
            Découvrez la méthode qui permet déjà à des centaines de personnes de générer un complément de revenu, 
            <strong>pas besoin d'être un expert !</strong>
          </p>

          <div class="hero-stats fade-in">
            <div class="stat">
              <span class="stat-number">+{{ memberCount.toLocaleString() }}</span>
              <span class="stat-label">utilisateurs satisfaits</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ totalEarnings.toLocaleString() }}€</span>
              <span class="stat-label">gains cumulés</span>
            </div>
          </div>

          <div class="hero-cta fade-in">
            <button class="btn-primary" @click="scrollToSignup">
              🚀 Je veux gagner 500€ maintenant !
            </button>
            <p class="cta-subtitle">100% gratuit • Sans engagement • Méthode prouvée</p>
          </div>
        </div>

        <div class="hero-visual fade-in">
          <div class="money-card">
            <div class="money-amount">500€</div>
            <div class="money-label">Votre premier gain</div>
            <div class="money-features">
              <div class="feature">✅ Sans risque</div>
              <div class="feature">✅ Méthode simple</div>
              <div class="feature">✅ Accompagnement</div>
            </div>
          </div>
        </div>
      </div>

      
      <br><br>
      <div class="scroll-indicator animate-bounce">
<div class="scroll-arrow">⬇️</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,0 1000,100 0,80"/></svg>') repeat-x;
  background-size: 100px 100px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.highlight {
  background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #FCD34D;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-cta {
  text-align: center;
}

.cta-subtitle {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.money-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.money-amount {
  font-size: 3rem;
  font-weight: 700;
  color: #FCD34D;
  margin-bottom: 0.5rem;
}

.money-label {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.money-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.9rem;
  opacity: 0.9;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  cursor:default;
}

.scroll-arrow {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .hero {
    padding: 10rem 0 6rem;
  }
  
  .hero-content {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.4rem;
  }
  
  .hero-cta {
    text-align: left;
  }
  
  .hero-stats {
    justify-content: flex-start;
  }
}

@media (max-width: 767px) {
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .money-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>