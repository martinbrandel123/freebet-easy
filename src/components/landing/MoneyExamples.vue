<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MoneyExample } from '../../interfaces/common'

const currentSlide = ref(0)
const autoSlideInterval = ref<NodeJS.Timeout | null>(null)

const examples: MoneyExample[] = [
  {
    title: "30 pizzas + boisson",
    description: "Chez votre pizzeria préférée",
    icon: "🍕",
    visual: "30x pizzas délicieuses"
  },
  {
    title: "5 ans d'abonnement Deezer",
    description: "Musique à volonté !",
    icon: "🎵",
    visual: "Des milliers de morceaux à écouter"
  },
  {
    title: "Console de jeux",
    description: "Console de jeux complète",
    icon: "🎮",
    visual: "Gaming time"
  },
  {
    title: "30 cinémas + popcorn",
    description: "Soirées détente garanties",
    icon: "🍿",
    visual: "Entertainment"
  },
  {
    title: "Week-end en amoureux",
    description: "Hôtel romantique",
    icon: "💑",
    visual: "Romance"
  },
  {
    title: "1 mois de courses",
    description: "Pour une personne",
    icon: "🛒",
    visual: "Alimentation"
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % examples.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? examples.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
  }
}

onMounted(() => {
  startAutoSlide()
})
</script>

<template>
  <section class="money-examples section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Ce que vous pouvez faire avec 500€</h2>
        <p class="section-subtitle">
          Voici quelques idées concrètes pour utiliser votre premier gain
        </p>
      </div>

      <div class="carousel-container" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
        <div class="carousel-wrapper">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(example, index) in examples" :key="index" class="carousel-slide">
              <div class="example-card">
                <div class="example-icon">{{ example.icon }}</div>
                <h3 class="example-title">{{ example.title }}</h3>
                <p class="example-description">{{ example.description }}</p>
                <div class="example-visual">{{ example.visual }}</div>
                <br>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-btn carousel-btn-prev" @click="prevSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button class="carousel-btn carousel-btn-next" @click="nextSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="carousel-dots">
          <button 
            v-for="(_, index) in examples" 
            :key="index"
            class="carousel-dot"
            :class="{ 'active': currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>

      <div class="money-grid">
        <div v-for="(example, index) in examples" :key="index" class="money-item">
          <div class="money-icon">{{ example.icon }}</div>
          <div class="money-content">
            <h4>{{ example.title }}</h4>
            <p>{{ example.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.money-examples {
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
}

.carousel-container {
  position: relative;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.carousel-wrapper {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.example-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.example-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="rgba(255,255,255,0.1)"><circle cx="50" cy="50" r="40"/></svg>') repeat;
  background-size: 100px 100px;
  opacity: 0.3;
}

.example-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.example-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.example-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.example-visual {
  font-size: 1rem;
  opacity: 0.8;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-btn:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn-prev {
  left: 1rem;
}

.carousel-btn-next {
  right: 1rem;
}

.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot.active {
  background: white;
  transform: scale(1.2);
}

.money-grid {
  display: none;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.money-item {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.money-item:hover {
  background: #E2E8F0;
  transform: translateY(-2px);
}

.money-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.money-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
}

.money-content p {
  color: #6B7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .carousel-container {
    margin: 0 -1rem 2rem;
    border-radius: 0;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
  
  .carousel-btn-prev {
    left: 0.5rem;
  }
  
  .carousel-btn-next {
    right: 0.5rem;
  }
  
  .money-grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .money-grid {
    display: grid;
  }
}
</style>