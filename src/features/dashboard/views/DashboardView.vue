<template>
  <div class="dashboard-view">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-text">Freebet to Cash</span>
          </div>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="container">
        <div class="welcome-section">
          <h1>Bienvenue dans votre espace membre !</h1>
          <p>Félicitations, vous êtes maintenant prêt à commencer votre parcours vers vos premiers 300€.</p>
        </div>

        <div class="dashboard-grid">
          <div class="dashboard-card">
            <div class="card-icon">📚</div>
            <h3>Guide complet</h3>
            <p>Accédez au guide étape par étape pour commencer à gagner vos premiers 300€</p>
            <button class="card-button">Commencer le guide</button>
          </div>

          <div class="dashboard-card featured">
            <div class="card-icon">🚀</div>
            <h3>Commencer le programme</h3>
            <p>Gagner en moyenne 500€ étapes par étapes avec notre programme automatisé</p>
            <button class="card-button" @click="goToProgram">C'est parti !</button>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">🎯</div>
            <h3>Sites partenaires</h3>
            <p>Découvrez la liste des meilleurs sites avec les bonus les plus avantageux</p>
            <button class="card-button">Voir les sites</button>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">🧮</div>
            <h3>Calculateur de gains</h3>
            <p>Utilisez notre outil pour calculer vos gains potentiels automatiquement</p>
            <button class="card-button">Ouvrir le calculateur</button>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">📞</div>
            <h3>Support personnalisé</h3>
            <p>Besoin d'aide ? Notre équipe est disponible 7j/7 pour vous accompagner</p>
            <button class="card-button">Contacter le support</button>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">📊</div>
            <h3>Suivi des gains</h3>
            <p>Suivez vos progrès et vos gains en temps réel</p>
            <button class="card-button">Voir mes gains</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProgram = () => {
  router.push('/program')
}
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  background: #F8FAFC;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-main {
  padding: 2rem 0;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
}

.welcome-section p {
  font-size: 1.2rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.dashboard-card.featured {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.02);
}

.dashboard-card.featured:hover {
  transform: scale(1.05) translateY(-2px);
}

.dashboard-card.featured::before {
  content: '⭐ RECOMMANDÉ';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #FCD34D;
  color: #92400E;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.dashboard-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.75rem;
}

.dashboard-card.featured h3 {
  color: white;
}

.dashboard-card p {
  color: #6B7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.dashboard-card.featured p {
  color: rgba(255, 255, 255, 0.9);
}

.card-button {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.dashboard-card.featured .card-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.dashboard-card.featured .card-button:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

@media (max-width: 767px) {
  .container {
    padding: 0 1rem;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>