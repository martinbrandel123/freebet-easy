<template>

</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Bookmaker {
  name: string,
  balanceCash: number,
  balanceFreebet: number,
}

interface Bilan {
  bookmakers: Bookmaker[],
}
</script>