<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthGoogleButton from '../components/AuthGoogleButton.vue'
import { useAuthStore } from '../stores/auth'
import { AuthService } from '../services/authService'

const router = useRouter()
const authStore = useAuthStore()

// Configuration
const GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID_GOOGLE.apps.googleusercontent.com'
const API_URL = 'https://votre-api.com/auth'

// État du formulaire
const currentStep = ref(1)
const isLoading = ref(false)
const error = ref('')
const success = ref(false)

// Données du formulaire
const formData = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  age: '',
  isFromFrance: true,
  bookmakers: [] as string[],
  acceptTerms: false,
  acceptNewsletter: true,
  balance: 300
})

// Validation en temps réel
const errors = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  age: '',
  selectedBookmakers: '',
  acceptTerms: ''
})

// Liste des bookmakers
const bookmakers = [
{ id: 'zebet', name: 'Zebet', logo: '🎯' },      // focalisé sur la cible, précision
{ id: 'vibrez', name: 'Vibrez', logo: '🧩' },    // vibration, énergie
{ id: 'bwin', name: 'Bwin', logo: '💥' },        // impact, explosion d’énergie
{ id: 'betclic', name: 'Betclic', logo: '🔥' },  // intensité et passion (déjà utilisé)
{ id: 'betsson', name: 'Betsson', logo: '🎰' },  // machine à sous, casino :contentReference[oaicite:1]{index=1}
{ id: 'unibet', name: 'Unibet', logo: '🧩' },    // vibration, énergie
{ id: 'parionssport', name: 'Parions sport', logo: '🏆' }, // victoire, compétition
{ id: 'feelingbet', name: 'Feelingbet', logo: '😊' },     // ressenti et émotion
{ id: 'olybet', name: 'Olybet', logo: '🥇' },              // médaille d’or, olympisme
{ id: 'genybet', name: 'Genybet', logo: '⚡' },            // rapidité, énergie (déjà utilisé)
{ id: 'netbet', name: 'Netbet', logo: '🎲' },              // dé, chance, jeux :contentReference[oaicite:2]{index=2}
{ id: 'pmu', name: 'Pmu', logo: '🐎' },                   // pari hippique
{ id: 'vbet', name: 'Vbet', logo: '🚀' },                 // envol, montée en flèche
{ id: 'winamax', name: 'Winamax', logo: '🏅' }   
]

// Validation en temps réel
const validateField = (field: string) => {
  switch (field) {
    case 'email':
      if (!formData.email) {
        errors.email = 'Email requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Format email invalide'
      } else {
        errors.email = ''
      }
      break
    case 'password':
      if (!formData.password) {
        errors.password = 'Mot de passe requis'
      } else if (formData.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
      } else {
        errors.password = ''
      }
      break
    case 'firstName':
      errors.firstName = !formData.firstName ? 'Prénom requis' : ''
      break
    case 'lastName':
      errors.lastName = !formData.lastName ? 'Nom requis' : ''
      break
    case 'age':
      if (!formData.age) {
        errors.age = 'Âge requis'
      } else if (parseInt(formData.age) < 18) {
        errors.age = 'Vous devez avoir au moins 18 ans'
      } else {
        errors.age = ''
      }
      break
    case 'acceptTerms':
      errors.acceptTerms = !formData.acceptTerms 
        ? 'Vous devez accepter les conditions' : ''
      break
  }
}

// Validation complète
const isFormValid = computed(() => {
  return !errors.email && !errors.password && !errors.firstName && !errors.lastName && 
         !errors.age && !errors.acceptTerms &&
         formData.email && formData.password &&  formData.firstName && formData.lastName && 
         formData.age && formData.acceptTerms
})

const isStep1Valid = computed(() => {
  return formData.email && 
         formData.password && 
         formData.firstName && 
         formData.lastName && 
         formData.age &&
         !errors.email &&
         !errors.password &&
         !errors.firstName &&
         !errors.lastName &&
         !errors.age
})

// Gestion des bookmakers
const toggleBookmaker = (bookmakerId: string) => {
  const index = formData.bookmakers.indexOf(bookmakerId)
  if (index > -1) {
    formData.bookmakers.splice(index, 1)
  } else {
    formData.bookmakers.push(bookmakerId)
  }
  validateField('selectedBookmakers')
}

// Soumission du formulaire
const submitForm = async () => {
  // Valider tous les champs
  Object.keys(errors).forEach(field => validateField(field))
  
  if (!isFormValid.value) return

  isLoading.value = true
  error.value = ''

  try {
    const response = await AuthService.register(formData)

    if (response.status != 200) {
      // const errorData = await response.json();
      throw new Error('Erreur lors de l\'inscription')
    }

    success.value = true
    currentStep.value = 3

  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Gestion du succès Google
const handleGoogleSuccess = (token: string, userInfo?: any) => {
  success.value = true
  currentStep.value = 3
}

const handleGoogleError = (errorMessage: string) => {
  error.value = errorMessage
}

// Navigation
const goToStep = (step: number) => {
  if (step === 2 && currentStep.value === 1) {
    // Valider l'étape 1 avant de passer à l'étape 2
    validateField('email')
    validateField('firstName')
    validateField('lastName')
    validateField('age')
    
    if (errors.email || errors.firstName || errors.lastName || errors.age) {
      return
    }
  }
  currentStep.value = step
}

const goHome = () => {
  router.push('/')
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="signup-view">
    <div class="signup-container">
      <!-- Header -->

      <header class="signup-header">
        <button @click="goHome" class="back-button">
          <v-icon icon="mdi-arrow-left" size="small"></v-icon>
          Quitter l'inscription
        </button>
        
        <div class="logo">
          <span class="logo-text">Freebet to Cash</span>
        </div>
      </header>
      
      <!-- Progress indicator -->
      <div class="progress-indicator">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${(currentStep / 3) * 100}%` }"></div>
        </div>
        <div class="progress-steps">
          <div class="progress-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="step-circle">1</div>
            <span>Inscription</span>
          </div>
          <div class="progress-step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="step-circle">2</div>
            <span>Préférences</span>
          </div>
          <div class="progress-step" :class="{ active: currentStep >= 3 }">
            <div class="step-circle">3</div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <main class="signup-main">
        <!-- Étape 1: Inscription -->
        <div v-if="currentStep === 1" class="signup-step">
          <div class="step-header">
            <h1>Créez votre compte</h1>
            <p>Rejoignez plus de 257 membres qui ont déjà encaissé 500€ en moyenne</p>
          </div>

          <div class="signup-options">
            <!-- Google OAuth -->
            <div class="google-section">
              <AuthGoogleButton
                :client-id="GOOGLE_CLIENT_ID"
                :api-url="`${API_URL}/google`"
                redirect-path="/signup?step=2"
                button-text="ou continuez avec votre email"
                theme="filled_blue"
                size="large"
                shape="rectangular"
                @success="handleGoogleSuccess"
                @error="handleGoogleError"
              />
            </div>

            <!-- Formulaire email -->
            <form @submit.prevent="goToStep(2)" class="signup-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Prénom</label>
                  <input 
                    type="text" 
                    id="firstName"
                    v-model="formData.firstName"
                    @blur="validateField('firstName')"
                    @input="validateField('firstName')"
                    :class="{ error: errors.firstName }"
                    placeholder="Votre prénom"
                    required
                  >
                  <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>
                
                <div class="form-group">
                  <label for="lastName">Nom</label>
                  <input 
                    type="text" 
                    id="lastName"
                    v-model="formData.lastName"
                    @blur="validateField('lastName')"
                    @input="validateField('lastName')"
                    :class="{ error: errors.lastName }"
                    placeholder="Votre nom"
                    required
                  >
                  <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="email">Adresse email</label>
                <input 
                  type="email" 
                  id="email"
                  v-model="formData.email"
                  @blur="validateField('email')"
                  @input="validateField('email')"
                  :class="{ error: errors.email }"
                  placeholder="votre@email.com"
                  required
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input 
                  type="password" 
                  id="password"
                  v-model="formData.password"
                  @blur="validateField('password')"
                  @input="validateField('password')"
                  :class="{ error: errors.password }"
                  placeholder="••••••••"
                  required
                >
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              </div>

              <div class="form-group">
                <label for="age">Âge</label>
                <input 
                  type="number" 
                  id="age"
                  v-model="formData.age"
                  @blur="validateField('age')"
                  @input="validateField('age')"
                  :class="{ error: errors.age }"
                  placeholder="18"
                  min="18"
                  max="99"
                  required
                >
                <span v-if="errors.age" class="error-message">{{ errors.age }}</span>
              </div>

              <button type="submit" class="continue-button" :disabled="!isStep1Valid">
                Continuer
                <v-icon icon="mdi-arrow-right" size="small"></v-icon>

              </button>
            </form>
          </div>
        </div>

        <!-- Étape 2: Préférences -->
        <div v-if="currentStep === 2" class="signup-step">
          <div class="step-header">
            <h1>Information supplementaire</h1>
          </div>

          <form @submit.prevent="submitForm" class="preferences-form">
            <!-- Pays de résidence -->
          <div class="form-section">
            <h3>Pays de résidence actuelle</h3>
            <p class="field-description">Veuillez indiquer où vous vivez actuellement (ceci n'est pas lié à votre nationalité)</p>
            
            <div class="toggle-group">
              <label class="toggle-option" :class="{ active: formData.isFromFrance }">
                <input 
                  type="radio" 
                  :value="true" 
                  v-model="formData.isFromFrance"
                  name="residence-country"
                >
                <span class="toggle-content">
                  <span class="flag">🥖</span>
                  <span>France</span>
                </span>
              </label>
              
              <label class="toggle-option" :class="{ active: !formData.isFromFrance }">
                <input 
                  type="radio" 
                  :value="false" 
                  v-model="formData.isFromFrance"
                  name="residence-country"
                >
                <span class="toggle-content">
                  <span class="flag">🌍</span>
                  <span>Hors de France</span>
                </span>
              </label>
            </div>
          </div>

            <!-- Bookmakers -->
            <div class="form-section">
              <h3>⚠️ Sites de paris ⚠️</h3>
              <p class="section-description">Attention : sélectionnez impérativement les sites de paris  sur lesquels vous avez déjà été inscrit, même si votre compte n'est plus actif ou supprimé.</p>
              
              <div class="bookmakers-grid">
                <label 
                  v-for="bookmaker in bookmakers" 
                  :key="bookmaker.id"
                  class="bookmaker-option"
                  :class="{ selected: formData.bookmakers.includes(bookmaker.id) }"
                >
                  <input 
                    type="checkbox" 
                    :value="bookmaker.id"
                    v-model="formData.bookmakers"
                  >
                  <span class="bookmaker-content">
                    <span class="bookmaker-logo">{{ bookmaker.logo }}</span>
                    <span class="bookmaker-name">{{ bookmaker.name }}</span>
                    <span class="checkmark">✓</span>
                  </span>
                </label>
              </div>
              <span v-if="errors.selectedBookmakers" class="error-message">{{ errors.selectedBookmakers }}</span>
            </div>

            <!-- Conditions -->
            <div class="form-section">
              <div class="checkbox-group">
                <label class="checkbox-label" :class="{ error: errors.acceptTerms }">
                  <input 
                    type="checkbox" 
                    v-model="formData.acceptTerms"
                    @change="validateField('acceptTerms')"
                    required
                  >
                  <span class="custom-checkbox"></span>
                  <span class="checkbox-text">
                    J'accepte les <a href="#" class="link">conditions d'utilisation</a> et 
                    la <a href="#" class="link">politique de confidentialité</a>
                  </span>
                </label>
                <span v-if="errors.acceptTerms" class="error-message">{{ errors.acceptTerms }}</span>
              </div>

              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.acceptNewsletter">
                  <span class="custom-checkbox"></span>
                  <span class="checkbox-text">
                    Je souhaite recevoir des conseils et offres exclusives par email
                  </span>
                </label>
              </div>
            </div>

            <!-- Erreur globale -->
            <div v-if="error" class="error-banner">
              <span class="error-icon">⚠️</span>
              <span>{{ error }}</span>
            </div>

            <!-- Boutons -->
            <div class="form-actions">
              <button type="button" @click="goToStep(1)" class="back-button-form">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Retour
              </button>
              
              <button 
                type="submit"
                class="submit-button"
                :disabled="!isFormValid || isLoading"
              >
                <span v-if="isLoading">
                  <div class="spinner"></div>
                </span>
                <span v-else>
                  Créer mon compte
                  <v-icon icon="mdi-arrow-right" size="small"></v-icon>
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Étape 3: Confirmation -->
        <div v-if="currentStep === 3" class="signup-step success-step">
          <div class="success-content">
            <div class="success-icon">🎉</div>
            <h1>Félicitations !</h1>
            <p>Votre compte a été créé avec succès. Vérifiez votre boîte email pour activer votre compte.</p>
            
            <div class="email-verification">
              <div class="email-icon">📧</div>
              <div class="email-content">
                <h3>Vérifiez votre email</h3>
                <p>Nous avons envoyé un lien d'activation à <strong>{{ formData.email }}</strong></p>
                <p class="email-note">N'oubliez pas de vérifier vos spams si vous ne recevez rien dans les 5 minutes.</p>
              </div>
            </div>

            <div class="next-steps">
              <h3>Prochaines étapes :</h3>
              <ol>
                <li>Cliquez sur le lien dans votre email</li>
                <li>Accédez à votre espace membre</li>
                <li>Suivez le guide étape par étape</li>
                <li>Commencez à gagner vos premiers 300€ !</li>
              </ol>
            </div>

            <div class="success-actions">
              <button @click="goToDashboard" class="dashboard-button">
                Accéder à mon espace
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              
              <button @click="goHome" class="home-button">
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="signup-footer">
        <div class="security-badges">
          <div class="badge">🔒 Données sécurisées</div>
          <div class="badge">✅ Sans engagement</div>
          <div class="badge">🛡️ 100% gratuit</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.signup-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.signup-container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* Header */
.signup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #F1F5F9;
}

.back-button {
  background: none;
  border: none;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.back-button:hover {
  background: #F1F5F9;
  color: #3B82F6;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-badge {
  font-size: 1.1rem;
}

/* Progress indicator */
.progress-indicator {
  padding: 2rem;
  background: #FAFBFC;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #E2E8F0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  transition: width 0.5s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748B;
  transition: all 0.3s ease;
}

.progress-step.active {
  color: #3B82F6;
}

.progress-step.completed {
  color: #10B981;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E2E8F0;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.progress-step.active .step-circle {
  background: #3B82F6;
  color: white;
}

.progress-step.completed .step-circle {
  background: #10B981;
  color: white;
}

/* Main content */
.signup-main {
  padding: 2rem;
}

.signup-step {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
}

.step-header p {
  color: #64748B;
  font-size: 1.1rem;
  margin: 0;
}

/* Forms */
.signup-form,
.preferences-form {
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
  font-size: 0.9rem;
}

.form-group input {
  padding: 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #FAFBFC;
}

.form-group input:focus {
  outline: none;
  border-color: #3B82F6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error {
  border-color: #EF4444;
  background: #FEF2F2;
}

.error-message {
  color: #EF4444;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Sections */
.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #64748B;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

/* Toggle group */
.toggle-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.toggle-option {
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-option input {
  display: none;
}

.toggle-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  background: #FAFBFC;
  transition: all 0.3s ease;
}

.toggle-option.active .toggle-content {
  border-color: #3B82F6;
  background: #EBF4FF;
  color: #3B82F6;
}

.flag {
  font-size: 1.5rem;
}

/* Bookmakers */
.bookmakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.bookmaker-option {
  cursor: pointer;
  transition: all 0.3s ease;
}

.bookmaker-option input {
  display: none;
}

.bookmaker-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  background: #FAFBFC;
  transition: all 0.3s ease;
  position: relative;
}

.bookmaker-option.selected .bookmaker-content {
  border-color: #10B981;
  background: #ECFDF5;
  color: #10B981;
}

.bookmaker-logo {
  font-size: 2rem;
}

.bookmaker-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.checkmark {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #10B981;
  font-weight: bold;
}

.bookmaker-option.selected .checkmark {
  opacity: 1;
}

/* Checkboxes */
.checkbox-group {
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1.5;
}

.checkbox-label.error {
  color: #EF4444;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 4px;
  background: white;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.checkbox-label input:checked + .custom-checkbox {
  background: #3B82F6;
  border-color: #3B82F6;
}

.checkbox-label input:checked + .custom-checkbox::after {
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
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

/* Error banner */
.error-banner {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.error-icon {
  flex-shrink: 0;
}

/* Buttons */
.continue-button,
.submit-button {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.continue-button:hover:not(:disabled),
.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.continue-button:disabled,
.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.back-button-form {
  background: #F1F5F9;
  color: #64748B;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button-form:hover {
  background: #E2E8F0;
  color: #475569;
}

.submit-button {
  flex: 1;
}

/* Spinner */
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

/* Success step */
.success-step {
  text-align: center;
}

.success-content {
  max-width: 500px;
  margin: 0 auto;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #10B981;
  margin-bottom: 1rem;
}

.success-content > p {
  font-size: 1.1rem;
  color: #64748B;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.email-verification {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: left;
}

.email-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.email-content h3 {
  color: #059669;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.email-content p {
  color: #065F46;
  margin: 0;
  font-size: 0.95rem;
}

.email-note {
  font-style: italic;
  opacity: 0.8;
  margin-top: 0.5rem !important;
}

.next-steps {
  background: #FAFBFC;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.next-steps h3 {
  color: #1E293B;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.next-steps ol {
  color: #475569;
  padding-left: 1.5rem;
}

.next-steps li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-button {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.dashboard-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.home-button {
  background: none;
  color: #64748B;
  border: 1px solid #E2E8F0;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.home-button:hover {
  background: #F1F5F9;
  color: #475569;
}

/* Footer */
.signup-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #F1F5F9;
  background: #FAFBFC;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  background: white;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #E2E8F0;
}

/* Responsive */
@media (max-width: 767px) {
  .signup-view {
    padding: 0.5rem;
  }
  
  .signup-container {
    border-radius: 16px;
  }
  
  .signup-header {
    padding: 1rem 1.5rem;
  }
  
  .progress-indicator {
    padding: 1.5rem;
  }
  
  .signup-main {
    padding: 1.5rem;
  }
  
  .step-header h1 {
    font-size: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .toggle-group {
    grid-template-columns: 1fr;
  }
  
  .bookmakers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .back-button-form {
    order: 2;
  }
  
  .submit-button {
    order: 1;
  }
  
  .security-badges {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .success-content h1 {
    font-size: 2rem;
  }
  
  .email-verification {
    flex-direction: column;
    text-align: center;
  }
}
</style>