<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}

const goToSignup = () => {
  router.push('/signup')
  isMenuOpen.value = false
}

const goToLogin = () => {
  router.push('/login')
  isMenuOpen.value = false
}

const goToDashboard = () => {
  router.push('/dashboard')
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <span class="logo-text">Genius Programme</span>
          <span class="logo-badge">💰</span>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <a href="#" @click.prevent="scrollToSection('hero')" class="nav-link">Accueil</a>
          <a href="#" @click.prevent="scrollToSection('concept')" class="nav-link">Comment ça marche ?</a>
          <a href="#" @click.prevent="scrollToSection('testimonials')" class="nav-link">Avis clients</a>
          <a href="#" @click.prevent="scrollToSection('signup')" class="nav-link">Inscription</a>
        </div>

        <div class="nav-actions">
          <template v-if="authStore.isAuthenticated">
            <button class="user-button" @click="goToDashboard">
              <span v-if="authStore.userInfo?.picture">
                <img :src="authStore.userInfo.picture" :alt="authStore.userInfo.name" class="user-avatar">
              </span>
              <span v-else class="user-initial">
                {{ authStore.userInfo?.name?.charAt(0) || '👤' }}
              </span>
              <span class="user-name">{{ authStore.userInfo?.name || 'Mon compte' }}</span>
            </button>
          </template>
          
          <template v-else>
            <button class="login-button" @click="goToLogin">
              Connexion
            </button>
            <button class="cta-button" @click="goToSignup">
              S'inscrire gratuitement
            </button>
          </template>
        </div>

        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 70px;
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

.nav-menu {
  display: none;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #4B5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #3B82F6;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: #3B82F6;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-actions {
  display: none;
  align-items: center;
  gap: 1rem;
}

.login-button {
  background: none;
  color: #4B5563;
  border: 1px solid #E5E7EB;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #F9FAFB;
  color: #3B82F6;
  border-color: #3B82F6;
}

.cta-button {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.user-button {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #1F2937;
}

.user-button:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.user-initial {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.user-name {
  font-size: 0.9rem;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #4B5563;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }
  
  .nav-actions {
    display: flex;
  }
  
  .menu-toggle {
    display: none;
  }
}

@media (max-width: 767px) {
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-menu-open {
    display: flex;
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid #E5E7EB;
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .nav-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .login-button,
  .cta-button,
  .user-button {
    width: 100%;
    justify-content: center;
  }
}
</style>