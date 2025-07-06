<script setup lang="ts">
import Header from '../components/layout/Header.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import ConceptExplanation from '../components/landing/ConceptExplanation.vue'
import MoneyExamples from '../components/landing/MoneyExamples.vue'
import Testimonials from '../components/landing/Testimonials.vue'
import WhySignUp from '../components/landing/WhySignUp.vue'
import SignUpForm from '../components/landing/SignUpForm.vue'
import FAQ from '../components/landing/FAQ.vue'
import Footer from '../components/layout/Footer.vue'
</script>

<template>
  <div class="home-view">
    <Header />
    <main>
      <HeroSection />
      <ConceptExplanation />
      <MoneyExamples />
      <Testimonials />
      <WhySignUp />
      <SignUpForm />
      <FAQ />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}
</style>