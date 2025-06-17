<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentTestimonial = ref(0)
const autoSlideInterval = ref<NodeJS.Timeout | null>(null)

const testimonials = [
  {
    name: "Sophie",
    age: 28,
    location: "Paris",
    text: "J'ai gagné 320€ en 3 semaines, sans stress ni prise de tête ! Le support est vraiment top, ils répondent rapidement.",
    rating: 5,
    avatar: "👩‍💼",
    gain: "320€"
  },
  {
    name: "Karim",
    age: 34,
    location: "Lyon",
    text: "Enfin une méthode claire et qui fonctionne ! J'ai pu m'offrir un petit voyage avec mes gains. Je recommande vivement !",
    rating: 5,
    avatar: "👨‍💻",
    gain: "485€"
  },
  {
    name: "Julie",
    age: 25,
    location: "Marseille",
    text: "Le suivi est exceptionnel, j'ai tout compris rapidement et ça marche vraiment. En un mois j'ai récupéré 732€ pile !",
    rating: 5,
    avatar: "👩‍🎓",
    gain: "732€"
  },
  {
    name: "Thomas",
    age: 31,
    location: "Toulouse",
    text: "Sceptique au début, mais les résultats parlent d'eux-mêmes. Méthode sérieuse et équipe disponible. Parfait pour arrondir les fins de mois !",
    rating: 5,
    avatar: "👨‍🔧",
    gain: "295€"
  },
  {
    name: "Marie",
    age: 29,
    location: "Nantes",
    text: "Simple, efficace et sans risque comme promis. J'ai maintenant un complément de revenu régulier. Merci pour cette opportunité !",
    rating: 5,
    avatar: "👩‍⚕️",
    gain: "340€"
  }
]

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const prevTestimonial = () => {
  currentTestimonial.value = currentTestimonial.value === 0 ? testimonials.length - 1 : currentTestimonial.value - 1
}

const goToTestimonial = (index: number) => {
  currentTestimonial.value = index
}

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextTestimonial()
  }, 5000)
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
  <section id="testimonials" class="testimonials section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Ils ont déjà gagné leurs premiers 500€</h2>
        <p class="section-subtitle">
          Découvrez les témoignages de nos membres satisfaits
        </p>
      </div>

      <div class="testimonials-carousel" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
        <div class="testimonials-wrapper">
          <div class="testimonials-track" :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-slide">
              <div class="testimonial-card">
                <div class="testimonial-header">
                  <div class="testimonial-avatar">{{ testimonial.avatar }}</div>
                  <div class="testimonial-info">
                    <h4 class="testimonial-name">{{ testimonial.name }}, {{ testimonial.age }} ans</h4>
                    <p class="testimonial-location">{{ testimonial.location }}</p>
                    <div class="testimonial-gain">Gain: {{ testimonial.gain }}</div>
                  </div>
                  <div class="testimonial-rating">
                    <div class="stars">
                      <span v-for="star in testimonial.rating" :key="star">⭐</span>
                    </div>
                  </div>
                </div>
                <div class="testimonial-content">
                  <div class="quote-icon">"</div>
                  <p class="testimonial-text">{{ testimonial.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="testimonial-btn testimonial-btn-prev" @click="prevTestimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button class="testimonial-btn testimonial-btn-next" @click="nextTestimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="testimonial-dots">
          <button 
            v-for="(_, index) in testimonials" 
            :key="index"
            class="testimonial-dot"
            :class="{ 'active': currentTestimonial === index }"
            @click="goToTestimonial(index)"
          ></button>
        </div>
      </div>

      <div class="trust-indicators">
        <div class="trust-item">
          <div class="trust-icon">✅</div>
          <div class="trust-text">
            <strong>100% Avis Vérifiés</strong>
            <p>Tous nos témoignages sont authentiques</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🛡️</div>
          <div class="trust-text">
            <strong>Méthode Sans Risque</strong>
            <p>Aucune perte d'argent possible</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🎯</div>
          <div class="trust-text">
            <strong>Résultats Garantis</strong>
            <p>450€ en moyenne en suivant la méthode</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
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

.testimonials-carousel {
  position: relative;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: 20px;
}

.testimonials-wrapper {
  overflow: hidden;
}

.testimonials-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.testimonial-avatar {
  font-size: 3rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  border-radius: 50%;
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
}

.testimonial-location {
  color: #6B7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.testimonial-gain {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
}

.testimonial-rating {
  text-align: right;
}

.stars {
  font-size: 1.2rem;
  line-height: 1;
}

.testimonial-content {
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: 4rem;
  color: #E5E7EB;
  font-family: serif;
}

.testimonial-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #374151;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.testimonial-btn {
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-btn:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.testimonial-btn-prev {
  left: 1rem;
}

.testimonial-btn-next {
  right: 1rem;
}

.testimonial-dots {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.testimonial-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #CBD5E0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-dot.active {
  background: #3B82F6;
  transform: scale(1.2);
}

.trust-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.trust-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.trust-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.trust-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.trust-text strong {
  display: block;
  color: #1F2937;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.trust-text p {
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .testimonials-carousel {
    margin: 0 -1rem 2rem;
  }
  
  .testimonial-card {
    padding: 2rem 1.5rem;
  }
  
  .testimonial-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .testimonial-rating {
    text-align: center;
  }
  
  .testimonial-btn {
    width: 40px;
    height: 40px;
  }
  
  .testimonial-btn-prev {
    left: 0.5rem;
  }
  
  .testimonial-btn-next {
    right: 0.5rem;
  }
  
  .trust-indicators {
    grid-template-columns: 1fr;
  }
  
  .trust-item {
    text-align: center;
    flex-direction: column;
  }
}
</style>