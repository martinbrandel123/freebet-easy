<script setup lang="ts">
import { ref } from 'vue'
import AuthGoogleButton from '../auth/AuthGoogleButton.vue'
import type { User } from '../../interfaces/auth'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  country: 'France',
  consent: false,
  newsletter: true
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errors = ref<Record<string, string>>({})

const countries = [
  'France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg', 'Monaco'
]

// Configuration Google OAuth
const GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID_GOOGLE.apps.googleusercontent.com'
const API_URL = 'https://votre-api.com/auth/google'

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'Le prénom est requis'
  }
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Le nom est requis'
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Email invalide'
  }
  
  if (!formData.value.age) {
    errors.value.age = 'L\'âge est requis'
  } else if (parseInt(formData.value.age) < 18) {
    errors.value.age = 'Vous devez avoir au moins 18 ans'
  }
  
  if (!formData.value.consent) {
    errors.value.consent = 'Vous devez accepter les conditions'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isSuccess.value = true
    
    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      country: 'France',
      consent: false,
      newsletter: true
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleGoogleSuccess = (token: string, userInfo?: User) => {
  console.log('Inscription Google réussie:', { token, userInfo })
  isSuccess.value = true
}

const handleGoogleError = (errorMessage: string) => {
  console.error('Erreur Google:', errorMessage)
}
</script>

<template>
  <section id="signup" class="signup section-padding">
    <div class="container">
      <div class="signup-content">
        <div class="signup-header">
          <h2 class="section-title">Commencez à gagner vos 300€ dès maintenant</h2>
          <p class="section-subtitle">
            Inscription gratuite • Aucun engagement • Résultats garantis
          </p>
        </div>

        <div class="signup-wrapper">
          <div class="signup-info">
            <div class="info-card">
              <h3>Ce que vous allez recevoir :</h3>
              <ul class="benefits-list">
                <li>
                  <span class="benefit-icon">✅</span>
                  <span>Guide complet étape par étape</span>
                </li>
                <li>
                  <span class="benefit-icon">✅</span>
                  <span>Accès à notre communauté privée</span>
                </li>
                <li>
                  <span class="benefit-icon">✅</span>
                  <span>Support personnalisé 7j/7</span>
                </li>
                <li>
                  <span class="benefit-icon">✅</span>
                  <span>Liste des meilleurs sites partenaires</span>
                </li>
                <li>
                  <span class="benefit-icon">✅</span>
                  <span>Calculateur de gains automatique</span>
                </li>
              </ul>
              
              <div class="urgency-banner">
                <div class="urgency-icon">⏰</div>
                <div class="urgency-text">
                  <strong>Offre limitée</strong>
                  <p>Plus que 7 places disponibles ce mois-ci</p>
                </div>
              </div>

              <br>
              <button 
                type="submit" 
                class="submit-btn"
              >
                <span>
                  🚀 Je m'inscris maintenant - C'est gratuit !
                </span>
              </button>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.signup {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.signup-content {
  max-width: 1200px;
  margin: 0 auto;
}

.signup-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.signup-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.signup-info {
  position: sticky;
  top: 2rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
}

.info-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  margin-bottom: 2rem;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.benefit-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.urgency-banner {
  background: rgba(249, 115, 22, 0.2);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.urgency-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.urgency-text strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.urgency-text p {
  margin: 0;
  opacity: 0.9;
}

.submit-btn {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 1.25rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .signup-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .signup-info {
    position: static;
  }
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .info-card {
    padding: 2rem;
  }
  
  .urgency-banner {
    flex-direction: column;
    text-align: center;
  }
}
</style>