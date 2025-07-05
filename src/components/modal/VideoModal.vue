<template>
  <div class="video-modal" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <iframe
        width="100%"
        height="100%"
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  videoId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 800px;
  height: 70vh;
  position: relative;
  background: black;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>