<template>
  <div class="signup-instruction">
    <!-- Section Principale -->
    <div class="signup-card">
      <!-- En-tête avec logo et bonus -->
      <div class="card-header">
        <div class="bookmaker-info">
          <BookmakerLogo :bookmaker="bookmakerData.name" size="md" />
          <h3 class="bookmaker-name">{{ bookmakerData.name }}</h3>
        </div>

        <div class="bonus-badge">
          Dépôt : {{ bookmakerData.deposit }} €
        </div>
      </div>

      <!-- Instructions -->
      <div class="instructions">
        <div class="instruction-step">
          <span class="step-number">1</span>
          <span class="step-text">Inscris-toi sur {{ bookmakerData.name }} en cliquant sur le bouton ci-dessous</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">2</span>
          <span class="step-text">Effectue un dépôt de {{ bookmakerData.deposit }} €</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">3</span>
          <span class="step-text">Utilise bien notre bouton d'inscription pour bénéficier des meilleurs bonus !</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">4</span>
          <span class="step-text">Attendez que {{  bookmakerData.name }} valide votre compte</span>
        </div>
      </div>
+


      <!-- Bouton d'inscription -->
      <a
        :href="bookmakerData.affiliateLink"
        target="_blank"
        class="signup-btn"
        @click="trackSignup(bookmakerData.name)"
      >
        <span>S'inscrire sur {{ bookmakerData.name }} avec notre lien OFFICIEL</span>
      </a>

      <!-- Bouton Tutoriel Vidéo -->
      <button 
        v-if="bookmakerData.tutoSubscriptionVideoLink" 
        class="video-btn" 
        @click="showVideo(bookmakerData.tutoSubscriptionVideoLink)"
      >
        <v-icon>mdi-play-circle</v-icon>
        Voir le tutoriel vidéo d'inscription
      </button>
    </div>

    <!-- Modal Vidéo -->
    <VideoModal
      v-if="showVideoModal"
      :videoId="bookmakerData.tutoSubscriptionVideoLink"
      @close="closeVideo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BookmakerLogo from './BookmakerLogo.vue'
import VideoModal from '../modal/VideoModal.vue'

const props = defineProps({
  bookmakerData: {
    type: Object,
    required: true,
  }
})

const showVideoModal = ref(false)
const currentVideoUrl = ref('')

const showVideo = (videoUrl: string) => {
  currentVideoUrl.value = videoUrl
  showVideoModal.value = true
}

const closeVideo = () => {
  showVideoModal.value = false
}

const trackSignup = (bookmaker: string) => {
  console.log('Inscription sur', bookmaker)
  // Ici vous pourriez ajouter un tracking Google Analytics ou autre
}
</script>

<style scoped>
.signup-instruction {
  margin: 0 auto;
}

.signup-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.bookmaker-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bookmaker-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.bonus-badge {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.instructions {
  margin-bottom: 1.5rem;
}

.instruction-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.step-number {
  background: #4f46e5;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.9rem;
  color: #334155;
}

.deposit-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-label {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.deposit-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.affiliate-message {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin-bottom: 1.5rem;
}

.affiliate-message p {
  font-weight: 600;
  color: #065f46;
  margin-bottom: 0.5rem;
}

.affiliate-message ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.affiliate-message li {
  font-size: 0.85rem;
  color: #334155;
  margin-bottom: 0.25rem;
  position: relative;
  padding-left: 1.25rem;
}

.affiliate-message li:before {
  content: "✓";
  color: #10b981;
  position: absolute;
  left: 0;
}

.signup-btn {
  display: block;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.video-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: white;
  color: #3b82f6;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.video-btn:hover {
  background: #f8fafc;
  border-color: #bfdbfe;
}

.video-btn svg {
  color: #ef4444;
}
</style>