<script setup lang="ts">
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import ConceptExplanation from '../components/ConceptExplanation.vue'
import MoneyExamples from '../components/MoneyExamples.vue'
import Testimonials from '../components/Testimonials.vue'
import WhySignUp from '../components/WhySignUp.vue'
import SignUpForm from '../components/SignUpForm.vue'
import FAQ from '../components/FAQ.vue'
import Footer from '../components/Footer.vue'
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