<template>
  <div class="freebet-instruction-container">
    <FreebetInstructionHeader />
    <FreebetCombinationsGrid />
  </div>
</template>

<script setup lang="ts">
import FreebetInstructionHeader from './FreebetInstructionHeader.vue'
import FreebetCombinationsGrid from './FreebetCombinationsGrid.vue'

const props = defineProps({
  currentStep: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.freebet-instruction-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 767px) {
  .freebet-instruction-container {
    padding: 0 0.5rem;
  }
}
</style>