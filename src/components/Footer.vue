<script setup lang="ts">
const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-text">Programme Freebet to Cash</span>
            <span class="logo-badge">💰</span>
          </div>
          <p class="footer-description">
            La méthode simple et sans risque pour gagner 500€ grâce aux bonus des paris sportifs.
          </p>
          <div class="footer-stats">
            <div class="stat">
              <strong>257+</strong>
              <span>Utilisateurs satisfaits</span>
            </div>
            <div class="stat">
              <strong>114&nbsp;353€</strong>
              <span>Gains cumulés</span>
            </div>
          </div>
        </div>

        <div class="footer-section">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('hero')">Accueil</a></li>
            <li><a href="#" @click.prevent="scrollToSection('concept')">Comment ça marche</a></li>
            <li><a href="#" @click.prevent="scrollToSection('testimonials')">Témoignages</a></li>
            <li><a href="#" @click.prevent="scrollToSection('signup')">Inscription</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Support</h4>
          <ul class="footer-links">
            <li><a href="#">Centre d'aide</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Communauté</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Légal</h4>
          <ul class="footer-links">
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">RGPD</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} Freebet to Cash. Tous droits réservés.
          </p>
          
          <div class="footer-badges">
            <div class="badge">
              <span class="badge-icon">🔒</span>
              <span class="badge-text">Sécurisé</span>
            </div>
            <div class="badge">
              <span class="badge-icon">✅</span>
              <span class="badge-text">Vérifié</span>
            </div>
            <div class="badge">
              <span class="badge-icon">🛡️</span>
              <span class="badge-text">Sans risque</span>
            </div>
          </div>

          <button class="back-to-top" @click="scrollToTop">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Haut de page</span>
          </button>
        </div>
      </div>

      <div class="footer-disclaimer">
        <p>
          <strong>Avertissement :</strong> Les gains passés ne préjugent pas des gains futurs. 
          Les paris sportifs comportent des risques. Nous utilisons uniquement les bonus sans dépôt 
          et les offres de bienvenue pour minimiser les risques. Notre méthode est destinée aux personnes majeures uniquement.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1F2937;
  color: white;
  padding: 3rem 0 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #F9FAFB;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.footer-description {
  color: #D1D5DB;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.footer-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat strong {
  color: #FCD34D;
  font-size: 1.2rem;
  font-weight: 700;
}

.stat span {
  color: #9CA3AF;
  font-size: 0.9rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: #D1D5DB;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: #3B82F6;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #9CA3AF;
  font-size: 0.9rem;
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: 1rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.badge-icon {
  font-size: 1rem;
}

.badge-text {
  color: #93C5FD;
  font-weight: 500;
}

.back-to-top {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #93C5FD;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-to-top:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.footer-disclaimer {
  background: #111827;
  margin: 0 -1rem -3rem;
  padding: 1.5rem 1rem;
  border-radius: 8px 8px 0 0;
}

.footer-disclaimer p {
  color: #9CA3AF;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.footer-disclaimer strong {
  color: #F59E0B;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 767px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-stats {
    justify-content: center;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-badges {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-disclaimer {
    margin: 2rem -1rem -3rem;
  }
}

@media (min-width: 768px) {
  .footer-disclaimer {
    margin: 2rem -2rem -3rem;
    padding: 1.5rem 2rem;
  }
}
</style>