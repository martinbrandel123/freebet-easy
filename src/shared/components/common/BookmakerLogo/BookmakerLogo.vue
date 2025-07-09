<template>
  <div 
    class="bookmaker-logo"
    :class="sizeClasses[size]"
  >
    <span>{{ getLogo(bookmaker) }}</span>
  </div>
</template>

<script setup lang="ts">
import { BOOKMAKERS } from '../../../utils/constants'

interface Props {
  bookmaker: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-12 h-12 text-2xl',
  lg: 'w-16 h-16 text-3xl'
}

const getLogo = (name: string) => {
  const bookmaker = BOOKMAKERS.find(b => b.name === name)
  return bookmaker?.logo || '🎲'
}
</script>

<style scoped>
.bookmaker-logo {
  @apply flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100;
}
</style>