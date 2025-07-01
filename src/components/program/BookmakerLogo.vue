<script setup lang="ts">
interface Props {
  bookmaker: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const logoMap: Record<string, string> = {
  'Zebet': '🎯',
  'Unibet': '🧩', 
  'Betclic': '🔥',
  'Bwin': '💥',
  'Netbet': '🎲',
  'PMU': '🐎',
  'Betsson': '🎰',
  'Parions Sport': '🏆',
  'Feelingbet': '😊',
  'Olybet': '🥇',
  'Genybet': '⚡',
  'Vbet': '🚀',
  'Winamax': '🏅'
}

const sizeClasses = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-12 h-12 text-2xl',
  lg: 'w-16 h-16 text-3xl'
}

const getLogo = (name: string) => {
  return logoMap[name] || '🎲'
}
</script>

<template>
  <div 
    class="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100"
    :class="sizeClasses[size]"
  >
    <span>{{ getLogo(bookmaker) }}</span>
  </div>
</template>