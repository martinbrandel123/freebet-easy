<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="button-spinner">
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
    </span>
    
    <span v-if="icon && !loading" :class="iconClasses">
      <component :is="icon" />
    </span>
    
    <span v-if="$slots.default" :class="{ 'ml-2': icon && !loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    'button--disabled': props.disabled,
    'button--loading': props.loading,
    'button--full-width': props.fullWidth
  }
])

const iconClasses = computed(() => [
  'button-icon',
  {
    'button-icon--only': !props.$slots?.default
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.button {
  @apply inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  border-radius: 8px;
  cursor: pointer;
}

/* Variants */
.button--primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.button--primary:hover:not(.button--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.button--secondary {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.button--secondary:hover:not(.button--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.button--outline {
  @apply bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
}

.button--ghost {
  @apply bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500;
}

/* Sizes */
.button--sm {
  @apply px-3 py-1.5 text-sm;
}

.button--md {
  @apply px-4 py-2 text-base;
}

.button--lg {
  @apply px-6 py-3 text-lg;
}

/* States */
.button--disabled {
  @apply opacity-50 cursor-not-allowed;
  transform: none !important;
}

.button--loading {
  @apply cursor-wait;
}

.button--full-width {
  @apply w-full;
}

/* Icon */
.button-icon {
  @apply flex-shrink-0;
}

.button-icon--only {
  @apply mr-0;
}

.button-spinner {
  @apply mr-2;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>