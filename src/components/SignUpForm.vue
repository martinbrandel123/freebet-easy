<script setup lang="ts">
import { ref } from 'vue'
import AuthGoogleButton from './AuthGoogleButton.vue'

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

const handleGoogleSuccess = (token: string, userInfo?: any) => {
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
                  <p>Plus que 47 places disponibles ce mois-ci</p>
                </div>
              </div>
            </div>
          </div>

          <div class="signup-form-container">
            <div v-if="!isSuccess" class="signup-options">
              <!-- Option Google -->
              <div class="google-signup-section">
                <h3>Inscription rapide</h3>
                <AuthGoogleButton
                  :client-id="GOOGLE_CLIENT_ID"
                  :api-url="API_URL"
                  redirect-path="/dashboard"
                  button-text="ou inscrivez-vous avec votre email"
                  theme="filled_blue"
                  size="large"
                  shape="rectangular"
                  @success="handleGoogleSuccess"
                  @error="handleGoogleError"
                />
              </div>

              <!-- Formulaire traditionnel -->
              <form @submit.prevent="submitForm" class="signup-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">Prénom *</label>
                    <input 
                      type="text" 
                      id="firstName"
                      v-model="formData.firstName"
                      :class="{ 'error': errors.firstName }"
                      placeholder="Votre prénom"
                    >
                    <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                  </div>
                  
                  <div class="form-group">
                    <label for="lastName">Nom *</label>
                    <input 
                      type="text" 
                      id="lastName"
                      v-model="formData.lastName"
                      :class="{ 'error': errors.lastName }"
                      placeholder="Votre nom"
                    >
                    <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="formData.email"
                    :class="{ 'error': errors.email }"
                    placeholder="votre@email.com"
                  >
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="age">Âge *</label>
                    <input 
                      type="number" 
                      id="age"
                      v-model="formData.age"
                      :class="{ 'error': errors.age }"
                      placeholder="18"
                      min="18"
                      max="99"
                    >
                    <span v-if="errors.age" class="error-message">{{ errors.age }}</span>
                  </div>
                  
                  <div class="form-group">
                    <label for="country">Pays</label>
                    <select id="country" v-model="formData.country">
                      <option v-for="country in countries" :key="country" :value="country">
                        {{ country }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="formData.consent"
                      :class="{ 'error': errors.consent }"
                    >
                    <span class="checkmark"></span>
                    <span class="checkbox-text">
                      J'accepte les <a href="#" class="link">conditions d'utilisation</a> et 
                      la <a href="#" class="link">politique de confidentialité</a> *
                    </span>
                  </label>
                  <span v-if="errors.consent" class="error-message">{{ errors.consent }}</span>
                </div>

                <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="formData.newsletter">
                    <span class="checkmark"></span>
                    <span class="checkbox-text">
                      Je souhaite recevoir des conseils et offres par email
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  class="submit-btn"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <div class="spinner"></div>
                    Inscription en cours...
                  </span>
                  <span v-else>
                    🚀 Je m'inscris maintenant - C'est gratuit !
                  </span>
                </button>

                <div class="form-footer">
                  <div class="security-badges">
                    <div class="badge">🔒</div>
                    <div class="badge">✅</div>
                    <div class="badge">🛡️</div>
                  </div>
                  <p>Vos données sont sécurisées et ne seront jamais partagées</p>
                </div>
              </form>
            </div>

            <div v-if="isSuccess" class="success-message">
              <div class="success-icon">🎉</div>
              <h3>Félicitations !</h3>
              <p>Votre inscription a été confirmée. Vous allez recevoir un email avec toutes les informations pour commencer à gagner vos premiers 300€.</p>
              <div class="success-next-steps">
                <h4>Prochaines étapes :</h4>
                <ol>
                  <li>Vérifiez votre boîte email</li>
                  <li>Rejoignez notre groupe privé</li>
                  <li>Suivez le guide étape par étape</li>
                  <li>Gagnez vos premiers 300€ !</li>
                </ol>
              </div>
              <a href="/dashboard" class="dashboard-link">
                Accéder à mon espace membre
              </a>
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

.signup-form-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  color: #1F2937;
}

.signup-options {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.google-signup-section {
  text-align: center;
}

.google-signup-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1.5rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select {
  padding: 0.875rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error {
  border-color: #EF4444;
}

.error-message {
  color: #EF4444;
  font-size: 0.875rem;
}

.checkbox-group {
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: #E5E7EB;
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: #3B82F6;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.checkbox-text {
  flex: 1;
}

.link {
  color: #3B82F6;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
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
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.badge {
  font-size: 1.5rem;
}

.form-footer p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-message h3 {
  font-size: 2rem;
  color: #10B981;
  margin-bottom: 1rem;
}

.success-message p {
  font-size: 1.1rem;
  color: #6B7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.success-next-steps {
  background: #F0FDF4;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
}

.success-next-steps h4 {
  color: #059669;
  margin-bottom: 1rem;
}

.success-next-steps ol {
  color: #374151;
  padding-left: 1.5rem;
}

.success-next-steps li {
  margin-bottom: 0.5rem;
}

.dashboard-link {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
}

.dashboard-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
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
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .signup-form-container {
    padding: 2rem 1.5rem;
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