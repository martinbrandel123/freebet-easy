<template>
  <div class="spinner" :class="{ [`spinner-${size}`]: size }">
    <div class="spinner-inner"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'medium'
})
</script>

<style scoped>
.spinner {
  display: inline-block;
  position: relative;
}

.spinner-inner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-small .spinner-inner {
  width: 16px;
  height: 16px;
  border-width: 1px;
}

.spinner-medium .spinner-inner {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner-large .spinner-inner {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>