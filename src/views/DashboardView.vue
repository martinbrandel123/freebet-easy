<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  // Vérifier l'authentification au montage du composant
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="dashboard-view">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-text">Freebet to Cash</span>
          </div>
          
          <!-- <div class="user-menu">
            <div v-if="authStore.userInfo" class="user-info">
              <img 
                v-if="authStore.userInfo.picture" 
                :src="authStore.userInfo.picture" 
                :alt="authStore.userInfo.name"
                class="user-avatar"
              >
              <div v-else class="user-avatar-placeholder">
                {{ authStore.userInfo.name?.charAt(0) || '👤' }}
              </div>
              <span class="user-name">{{ authStore.userInfo.name }}</span>
            </div>
            <button @click="handleLogout" class="logout-button">
              Déconnexion
            </button>
          </div> -->
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

          <div class="dashboard-card">
            <div class="card-icon">💬</div>
            <h3>Commencer le programme</h3>
            <p>Gagner en moyenne 500€ étapes par étapes</p>
            <button class="card-button">C'est parti !</button>
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

        <div class="progress-section">
          <h2>Votre progression</h2>
          <div class="progress-card">
            <div class="progress-header">
              <h3>Parcours vers les 300€</h3>
              <span class="progress-percentage">62%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 62%"></div>
            </div>
            <div class="progress-steps">
              <div class="step">
                <div class="step-number">1</div>
                <span>Inscription terminée ✅</span>
              </div>
              <div class="step pending">
                <div class="step-number">2</div>
                <span>Lire le guide</span>
              </div>
              <div class="step pending">
                <div class="step-number">3</div>
                <span>Premier site partenaire</span>
              </div>
              <div class="step pending">
                <div class="step-number">4</div>
                <span>Premiers gains</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

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

.logo-badge {
  font-size: 1.2rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.user-name {
  font-weight: 500;
  color: #1F2937;
}

.logout-button {
  background: #EF4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background: #DC2626;
  transform: translateY(-1px);
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
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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

.dashboard-card p {
  color: #6B7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
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

.card-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.progress-section {
  margin-top: 3rem;
}

.progress-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1.5rem;
  text-align: center;
}

.progress-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.progress-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
}

.progress-percentage {
  font-size: 1.2rem;
  font-weight: 700;
  color: #3B82F6;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  transition: width 0.5s ease;
}

.progress-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
}

.step.pending {
  background: #F8FAFC;
  border-color: #E5E7EB;
  opacity: 0.6;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step.pending .step-number {
  background: #9CA3AF;
}

@media (max-width: 767px) {
  .container {
    padding: 0 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .progress-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .progress-steps {
    grid-template-columns: 1fr;
  }
}
</style>