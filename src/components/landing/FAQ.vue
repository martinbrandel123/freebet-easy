<script setup lang="ts">
import { ref } from 'vue'
import type { FAQ } from '../../interfaces/common'

const activeIndex = ref<number | null>(null)

const faqs: FAQ[] = [
  {
    question: "Est-ce vraiment sans risque ?",
    answer: "Oui, absolument ! Notre méthode utilise exclusivement les bonus de bienvenue offerts par les sites de paris sportifs. Ces bonus couvrent toujours vos mises initiales, ce qui signifie que vous ne pouvez pas perdre votre propre argent. C'est mathématiquement impossible avec notre approche. Le seul risque potentiel survient en cas d'erreur lors de l'inscription sur les sites de paris (par exemple, si les conditions du bonus ne sont pas respectées). Mais rassurez-vous : notre accompagnement étape par étape est justement conçu pour éviter ce type d'erreurs."
  },
  {
    question: "Combien de temps faut-il pour gagner 500€ ?",
    answer: "En moyenne, nos utilisateurs gagnent leurs premiers 500€ en 3 semaines en suivant notre méthode pas à pas. Certains y arrivent même en 2 semaines ! Tout dépend du temps que vous pouvez y consacrer, mais même 5 minutes par jour suffisent."
  },
  {
    question: "Faut-il être expert en paris sportifs ?",
    answer: "Pas du tout ! Notre méthode ne nécessite aucune connaissance en sport ou en paris. Nous vous expliquons tout étape par étape."
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, notre service est 100% gratuit pour vous. Comment est-ce possible ? Nous sommes simplement rémunérés grâce aux liens de parrainage. lorsque vous vous inscrivez via nos liens. Vous ne payez jamais rien."
  },
  {
    question: "Comment récupérer mes gains ?",
    answer: "Une fois que vous avez complété les conditions des bonus, vous pouvez retirer vos gains directement sur votre compte bancaire via les méthodes proposées par chaque site (virement, carte bancaire, portefeuilles électroniques)."
  },
  {
    question: "C'est légal ?",
    answer: "Oui, c'est parfaitement légal ! Nous utilisons simplement les offres promotionnelles officielles des sites de paris agréés. C'est une pratique courante et totalement transparente."
  },
  {
    question: "Que se passe-t-il après l'inscription ?",
    answer: "Immédiatement après votre inscription, vous recevrez un email avec accès à notre plateforme privée, notre guide complet, la liste des meilleurs sites partenaires, et une invitation à rejoindre notre communauté Telegram pour le support."
  },
  {
    question: "Puis-je recommencer pour gagner plus ?",
    answer: "Les 500€ correspondent aux gains générés grâce aux premiers bonus de bienvenue. Cependant, vos proches peuvent eux aussi profiter de cette méthode. Vous pouvez leur recommander notre approche et recevoir une commission une fois leur parcours terminé."
  }
]

const toggleFAQ = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
</script>

<template>
  <section class="faq section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Questions fréquentes</h2>
        <p class="section-subtitle">
          Toutes les réponses à vos questions sur le programme Freebet to Cash
        </p>
      </div>

      <div class="faq-container">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
        >
          <button 
            class="faq-question"
            @click="toggleFAQ(index)"
          >
            <span class="question-text">{{ faq.question }}</span>
            <span class="question-icon">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                :class="{ 'rotated': activeIndex === index }"
              >
                <path 
                  d="M6 9l6 6 6-6" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
          
          <div class="faq-answer" :class="{ 'expanded': activeIndex === index }">
            <div class="answer-content">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-contact">
        <div class="contact-card">
          <div class="contact-icon">💬</div>
          <div class="contact-content">
            <h3>Vous avez d'autres questions ?</h3>
            <p>Notre équipe est disponible 7j/7 pour vous accompagner</p>
            <button class="contact-btn">Contactez notre support</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: #F8FAFC;
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

.faq-container {
  max-width: 800px;
  margin: 0 auto 4rem;
}

.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq-item.active {
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #F8FAFC;
}

.question-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1F2937;
  flex: 1;
  margin-right: 1rem;
}

.question-icon {
  flex-shrink: 0;
  color: #3B82F6;
  transition: transform 0.3s ease;
}

.question-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.expanded {
  max-height: 200px;
}

.answer-content {
  padding: 0 2rem 1.5rem;
  border-top: 1px solid #E5E7EB;
}

.answer-content p {
  color: #6B7280;
  line-height: 1.6;
  margin-top: 1rem;
  font-size: 1.05rem;
}

.faq-contact {
  display: flex;
  justify-content: center;
}

.contact-card {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.contact-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.contact-content {
  flex: 1;
}

.contact-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.contact-content p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.contact-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 767px) {
  .section-title {
    font-size: 2rem;
  }
  
  .faq-question {
    padding: 1.25rem 1.5rem;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
  
  .answer-content {
    padding: 0 1.5rem 1.25rem;
  }
  
  .contact-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
  
  .contact-icon {
    font-size: 2.5rem;
  }
}
</style>