<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const menuItems = [
  { label: 'Comment ça marche ?', section: 'concept' },
  { label: 'Avis clients', section: 'testimonials' },
  { label: 'Inscription', section: 'signup' },
]

const ctaButton = {
  label: 'Je découvre comment gagner 500€ facilement',
  section: 'signup',
}

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

const handleAuth = () => {
  router.push('/signup')
}
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <span class="logo-text">Freebet to Cash</span>
          <span class="logo-badge">💰</span>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <a
            v-for="item in menuItems"
            :key="item.section"
            href="#"
            @click.prevent="scrollToSection(item.section)"
            class="nav-link"
          >
            {{ item.label }}
          </a>
        </div>

        <button class="cta-button" @click="scrollToSection(ctaButton.section)">
          {{ ctaButton.label }}
        </button>

        <button class="auth-button" @click="handleAuth">
          Connexion / Inscription
        </button>

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

.cta-button {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.auth-button {
  background: transparent;
  color: #3B82F6;
  border: 2px solid #3B82F6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.auth-button:hover {
  background: #3B82F6;
  color: white;
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
  
  .cta-button {
    display: block;
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
}
</style>