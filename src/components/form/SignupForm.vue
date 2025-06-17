<template>
  <v-container class="signup-form-container">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="signup-card" elevation="0">
          <v-card-title class="text-center pa-6">
            <div class="signup-header">
              <h1 class="text-h4 font-weight-bold mb-2">Rejoignez Freebet to Cash</h1>
              <p class="text-body-1 text-medium-emphasis">
                Commencez à gagner vos premiers 500€ sans risque
              </p>
            </div>
          </v-card-title>

          <v-card-text class="pa-6">
            <!-- OAuth Buttons -->
            <div class="oauth-section mb-6">
              <v-btn
                @click="handleGoogleAuth"
                :loading="loading"
                block
                size="large"
                variant="outlined"
                class="google-btn mb-4"
                prepend-icon="mdi-google"
              >
                Continuer avec Google
              </v-btn>

              <div class="divider-section">
                <v-divider></v-divider>
                <span class="divider-text">ou</span>
                <v-divider></v-divider>
              </div>
            </div>

            <!-- Stepper -->
            <v-stepper
              v-model="currentStep"
              :items="stepperItems"
              hide-actions
              class="custom-stepper mb-6"
            >
              <!-- Step 1: Email -->
              <template v-slot:item.1>
                <div class="step-content">
                  <h3 class="text-h6 mb-4">Votre adresse email</h3>
                  
                  <v-text-field
                    v-model="formData.email"
                    :error-messages="errors.email"
                    label="Adresse email"
                    type="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    :loading="emailLoading"
                    @blur="validateField('email')"
                  ></v-text-field>

                  <v-btn
                    @click="handleEmailStep"
                    :loading="emailLoading"
                    :disabled="!formData.email || !!errors.email"
                    color="primary"
                    size="large"
                    block
                    class="mt-4"
                  >
                    Continuer
                  </v-btn>
                </div>
              </template>

              <!-- Step 2: Personal Info -->
              <template v-slot:item.2>
                <div class="step-content">
                  <h3 class="text-h6 mb-4">Informations personnelles</h3>
                  
                  <v-text-field
                    v-model="formData.name"
                    :error-messages="errors.name"
                    label="Nom complet"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    @blur="validateField('name')"
                    class="mb-4"
                  ></v-text-field>

                  <v-text-field
                    v-model.number="formData.age"
                    :error-messages="errors.age"
                    label="Âge"
                    type="number"
                    variant="outlined"
                    prepend-inner-icon="mdi-calendar"
                    @blur="validateField('age')"
                    class="mb-4"
                  ></v-text-field>

                  <div class="france-residence mb-4">
                    <p class="text-body-2 mb-2">Résidez-vous en France ?</p>
                    <v-btn-toggle
                      v-model="franceToggle"
                      @update:model-value="updateFranceResidence"
                      mandatory
                      color="primary"
                      class="residence-toggle"
                    >
                      <v-btn value="yes" size="large">
                        <v-icon start>mdi-check</v-icon>
                        Oui
                      </v-btn>
                      <v-btn value="no" size="large">
                        <v-icon start>mdi-close</v-icon>
                        Non
                      </v-btn>
                    </v-btn-toggle>
                    <div v-if="errors.isFrance" class="text-error text-caption mt-2">
                      {{ errors.isFrance }}
                    </div>
                  </div>

                  <div class="step-actions">
                    <v-btn
                      @click="currentStep = 1"
                      variant="outlined"
                      class="mr-4"
                    >
                      Retour
                    </v-btn>
                    <v-btn
                      @click="nextStep"
                      :disabled="!canProceedToStep3"
                      color="primary"
                    >
                      Continuer
                    </v-btn>
                  </div>
                </div>
              </template>

              <!-- Step 3: Bookmakers -->
              <template v-slot:item.3>
                <div class="step-content">
                  <h3 class="text-h6 mb-4">Bookmakers utilisés</h3>
                  <p class="text-body-2 text-medium-emphasis mb-4">
                    Sélectionnez les sites de paris que vous utilisez ou souhaitez utiliser
                  </p>

                  <div class="bookmakers-grid">
                    <v-card
                      v-for="bookmaker in bookmakersList"
                      :key="bookmaker.id"
                      :class="['bookmaker-card', { 'selected': formData.bookmakers.includes(bookmaker.id) }]"
                      @click="toggleBookmaker(bookmaker.id)"
                      hover
                    >
                      <v-card-text class="text-center pa-4">
                        <div class="bookmaker-logo mb-2">{{ bookmaker.icon }}</div>
                        <h4 class="text-subtitle-1 font-weight-medium">{{ bookmaker.name }}</h4>
                        <p class="text-caption text-medium-emphasis">{{ bookmaker.bonus }}</p>
                        <v-icon
                          v-if="formData.bookmakers.includes(bookmaker.id)"
                          color="primary"
                          class="selection-check"
                        >
                          mdi-check-circle
                        </v-icon>
                      </v-card-text>
                    </v-card>
                  </div>

                  <div v-if="errors.bookmakers" class="text-error text-caption mt-2">
                    {{ errors.bookmakers }}
                  </div>

                  <div class="step-actions mt-6">
                    <v-btn
                      @click="currentStep = 2"
                      variant="outlined"
                      class="mr-4"
                    >
                      Retour
                    </v-btn>
                    <v-btn
                      @click="handleSubmit"
                      :loading="loading"
                      :disabled="formData.bookmakers.length === 0"
                      color="primary"
                      size="large"
                    >
                      Finaliser l'inscription
                    </v-btn>
                  </div>
                </div>
              </template>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="500" persistent>
      <v-card class="text-center pa-6">
        <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
        <h2 class="text-h5 mb-4">Inscription réussie !</h2>
        <p class="text-body-1 mb-4">
          Félicitations ! Votre compte a été créé avec succès. 
          Vous allez recevoir un email avec toutes les informations pour commencer.
        </p>
        <v-btn color="primary" @click="handleSuccessClose">
          Commencer maintenant
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="4000"
      location="top"
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import authService from '../../services/authService'
import { signupSchema, magicLinkSchema } from '../../utils/validation'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const formData = reactive({
  email: '',
  name: '',
  age: null as number | null,
  isFrance: false,
  bookmakers: [] as string[]
})

// Form state
const currentStep = ref(1)
const loading = ref(false)
const emailLoading = ref(false)
const errors = reactive({
  email: '',
  name: '',
  age: '',
  isFrance: '',
  bookmakers: ''
})

// UI state
const showSuccessDialog = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const franceToggle = ref<'yes' | 'no' | null>(null)

// Stepper configuration
const stepperItems = [
  { title: 'Email', value: 1 },
  { title: 'Informations', value: 2 },
  { title: 'Bookmakers', value: 3 }
]

// Bookmakers list
const bookmakersList = [
  { id: 'betclic', name: 'Betclic', icon: '🎯', bonus: 'Jusqu\'à 100€' },
  { id: 'winamax', name: 'Winamax', icon: '🏆', bonus: 'Jusqu\'à 200€' },
  { id: 'parionssport', name: 'ParionsSport', icon: '⚽', bonus: 'Jusqu\'à 150€' },
  { id: 'unibet', name: 'Unibet', icon: '🎲', bonus: 'Jusqu\'à 100€' },
  { id: 'pmu', name: 'PMU Sport', icon: '🐎', bonus: 'Jusqu\'à 100€' },
  { id: 'zebet', name: 'ZEbet', icon: '🎪', bonus: 'Jusqu\'à 150€' }
]

// Computed properties
const canProceedToStep3 = computed(() => {
  return formData.name && formData.age && formData.age >= 18 && formData.isFrance
})

// Methods
const validateField = async (field: keyof typeof formData) => {
  try {
    if (field === 'email') {
      await magicLinkSchema.validateAt('email', { email: formData.email })
    } else {
      await signupSchema.validateAt(field, formData)
    }
    errors[field] = ''
  } catch (error: any) {
    errors[field] = error.message
  }
}

const handleGoogleAuth = () => {
  window.location.href = authService.getGoogleAuthUrl()
}

const handleEmailStep = async () => {
  try {
    await validateField('email')
    if (!errors.email) {
      emailLoading.value = true
      await authStore.sendMagicLink({ email: formData.email })
      showNotification('Un lien de connexion a été envoyé à votre email', 'success')
      currentStep.value = 2
    }
  } catch (error: any) {
    showNotification(error.message, 'error')
  } finally {
    emailLoading.value = false
  }
}

const updateFranceResidence = (value: 'yes' | 'no') => {
  formData.isFrance = value === 'yes'
  if (!formData.isFrance) {
    errors.isFrance = 'Seuls les résidents français peuvent s\'inscrire'
  } else {
    errors.isFrance = ''
  }
}

const toggleBookmaker = (bookmakerId: string) => {
  const index = formData.bookmakers.indexOf(bookmakerId)
  if (index > -1) {
    formData.bookmakers.splice(index, 1)
  } else {
    formData.bookmakers.push(bookmakerId)
  }
  errors.bookmakers = ''
}

const nextStep = () => {
  if (canProceedToStep3.value) {
    currentStep.value = 3
  }
}

const handleSubmit = async () => {
  try {
    // Validate all fields
    await signupSchema.validate(formData, { abortEarly: false })
    
    loading.value = true
    const response = await authStore.signup({
      ...formData,
      age: formData.age!
    })
    
    if (response.success) {
      showSuccessDialog.value = true
    }
  } catch (error: any) {
    if (error.inner) {
      // Yup validation errors
      error.inner.forEach((err: any) => {
        if (err.path && errors.hasOwnProperty(err.path)) {
          errors[err.path as keyof typeof errors] = err.message
        }
      })
    } else {
      showNotification(error.message, 'error')
    }
  } finally {
    loading.value = false
  }
}

const handleSuccessClose = () => {
  showSuccessDialog.value = false
  router.push('/')
}

const showNotification = (message: string, color: 'success' | 'error' = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}
</script>

<style scoped>
.signup-form-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.signup-card {
  border-radius: 16px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.signup-header {
  text-align: center;
}

.oauth-section {
  margin-bottom: 2rem;
}

.google-btn {
  border: 2px solid #e0e0e0 !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

.divider-section {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider-text {
  margin: 0 1rem;
  color: #666;
  font-size: 0.875rem;
}

.custom-stepper {
  box-shadow: none !important;
}

.step-content {
  padding: 1rem 0;
}

.france-residence {
  text-align: center;
}

.residence-toggle {
  width: 100%;
}

.residence-toggle .v-btn {
  flex: 1;
}

.bookmakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.bookmaker-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.bookmaker-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.bookmaker-card.selected {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.bookmaker-logo {
  font-size: 2rem;
}

.selection-check {
  position: absolute;
  top: 8px;
  right: 8px;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

@media (max-width: 600px) {
  .signup-form-container {
    padding: 1rem 0;
  }
  
  .bookmakers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .step-actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>