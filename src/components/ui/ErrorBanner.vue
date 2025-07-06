<template>
  <div class="error-banner">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<style scoped>
.error-banner {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error, #EF4444);
  padding: var(--space-sm, 1rem) var(--space-md, 1.5rem);
  border-radius: var(--radius-sm, 8px);
  margin-bottom: var(--space-md, 1.5rem);
  border-left: 4px solid var(--color-error, #EF4444);
  display: flex;
  align-items: center;
  gap: var(--space-xs, 0.5rem);
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease-out;
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0, 0, 0, 0.1));
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(-10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>