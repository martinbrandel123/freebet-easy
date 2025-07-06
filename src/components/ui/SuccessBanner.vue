<template>
  <div class="success-banner">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
.success-banner {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--color-success, #10B981);
  padding: var(--space-sm, 1rem) var(--space-md, 1.5rem);
  border-radius: var(--radius-sm, 8px);
  margin-bottom: var(--space-md, 1.5rem);
  border-left: 4px solid var(--color-success, #10B981);
  display: flex;
  align-items: center;
  gap: var(--space-xs, 0.5rem);
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease-out;
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0, 0, 0, 0.1));
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>